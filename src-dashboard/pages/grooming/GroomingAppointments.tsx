import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Search, Clock, CheckCircle2, XCircle, MoreVertical } from 'lucide-react';
import { mockData } from '../../data/mockData';

export function GroomingAppointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const appointments = mockData.grooming.appointments;

  const filteredAppointments = appointments.filter(app =>
    app.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Grooming Appointments</h1>
          <p className="text-slate-500">Track and manage upcoming grooming sessions.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search appointments..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
          />
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
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Package</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{app.petName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{app.owner}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{app.time}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{app.type}</td>
                  <td className="px-6 py-4">
                    <Badge variant={app.status === 'confirmed' ? 'success' : 'warning'}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <CheckCircle2 size={18} />
                      </button>
                      <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
