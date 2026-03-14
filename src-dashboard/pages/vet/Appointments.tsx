import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../context/ToastContext';
import { Search, Filter, Calendar, Clock, CheckCircle, XCircle, AlertCircle, MoreVertical, CheckCircle2 } from 'lucide-react';
import { useFirebaseData } from '../../hooks/useFirebaseData';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export function Appointments() {
  const { appointments, loading, error } = useFirebaseData();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const appRef = doc(db, 'appointments', id);
      await updateDoc(appRef, { status: newStatus });
      showToast(`Appointment ${newStatus} successfully!`, newStatus === 'cancelled' ? 'error' : 'success');
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = 
      app.petName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.ownerName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Loading appointments...</div>;
  if (error) return (
    <div className="p-12 text-center bg-rose-50 rounded-2xl border border-rose-100 mx-auto max-w-lg">
      <AlertCircle className="mx-auto text-rose-500 mb-4" size={40} />
      <h3 className="text-lg font-bold text-rose-900 mb-2">Access Error</h3>
      <p className="text-rose-600">{error}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
          <p className="text-slate-500">Manage today's schedule and upcoming visits.</p>
        </div>
        
        <div className="flex w-full sm:w-auto gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search appointments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Pet Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Owner</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Time</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Type</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{app.petName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{app.ownerName || app.owner}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{app.time}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{app.type}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      app.status === 'confirmed' ? 'success' : 
                      app.status === 'pending' ? 'warning' : 'error'
                    }>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {app.status !== 'confirmed' && (
                        <button 
                          onClick={() => handleStatusUpdate(app.id, 'confirmed')}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Confirm"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                      )}
                      {app.status !== 'cancelled' && (
                        <button 
                          onClick={() => handleStatusUpdate(app.id, 'cancelled')}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Cancel"
                        >
                          <XCircle size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No appointments found.
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
