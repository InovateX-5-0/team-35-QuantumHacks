import React, { useState } from 'react';
import { Search, MoreVertical, Plus, Filter, FileText, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import { useFirebaseData } from '../../hooks/useFirebaseData';

export function PatientRecords() {
  const { patients, loading } = useFirebaseData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient => 
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.species?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center text-slate-500">Loading records...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Patient Records</h1>
          <p className="text-slate-500">Access comprehensive digital health cards for all pets.</p>
        </div>
        
        <div className="flex w-full sm:w-auto gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                <img src={patient.photo} alt={patient.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-800 text-lg truncate">{patient.name}</h3>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
                <p className="text-sm text-slate-500 truncate">{patient.breed} • {patient.age}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 p-3 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Last Visit</p>
                <p className="text-xs font-bold text-slate-700">{patient.lastVisit || 'N/A'}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                <p className="text-xs font-bold text-emerald-600">Healthy</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex -space-x-1.5">
                <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-blue-600">
                  <ShieldCheck size={12} />
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-amber-600">
                  <Activity size={12} />
                </div>
              </div>
              <button className="text-teal-600 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                Full Records <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
        {filteredPatients.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="opacity-20" />
            </div>
            <p className="font-medium">No patient records found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
