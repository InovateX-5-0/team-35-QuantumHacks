import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Search, Filter, CheckCircle2, XCircle, Clock, Eye, MoreVertical, Check, X } from 'lucide-react';
import { useFirebaseData } from '../../hooks/useFirebaseData';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useToast } from '../../context/ToastContext';

export function AdoptionApplications() {
  const { applications, loading } = useFirebaseData();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const appRef = doc(db, 'adoption_applications', id);
      await updateDoc(appRef, { status: newStatus });
      showToast(`Application ${newStatus}`, 'success');
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.petName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="p-8 text-center text-slate-500">Loading applications...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Adoption Applications</h1>
          <p className="text-slate-500">Review and process adoption requests.</p>
        </div>
        
        <div className="flex w-full sm:w-auto gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search applications..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Applicant</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Pet</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Fee</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Home Type</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{app.applicantName}</p>
                    <p className="text-xs text-slate-500">{app.experience}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{app.petName}</td>
                  <td className="px-6 py-4 text-sm font-bold text-emerald-600">${app.adoptionFee || 0}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{app.date}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      app.status === 'approved' ? 'success' : 
                      app.status === 'pending' ? 'warning' : 'error'
                    }>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{app.homeType}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {app.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(app.id, 'approved')}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <Check size={18} />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(app.id, 'rejected')}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
