import React from 'react';
import { Stethoscope, Building2, Store, Scissors, Dog, TreePine } from 'lucide-react';
import { useRole, RoleType } from '../context/RoleContext';

export function RoleSelector() {
  const { setRole } = useRole();

  const handleSelect = (role: RoleType) => {
    setRole(role);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">PawCare Admin Dashboard</h1>
          <p className="text-lg text-slate-600">Please select your provider portal to continue</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <button 
            onClick={() => handleSelect('vet')}
            className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center cursor-pointer hover:border-primary/50"
          >
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Stethoscope size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Veterinary Clinic</h2>
            <p className="text-slate-500 text-sm">Manage appointments, patient records, and staff schedules.</p>
          </button>

          <button 
            onClick={() => handleSelect('shelter')}
            className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center cursor-pointer hover:border-blue-500/50"
          >
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Animal Shelter</h2>
            <p className="text-slate-500 text-sm">Track animal listings, adoptions, and medical statuses.</p>
          </button>

          <button 
            onClick={() => handleSelect('store')}
            className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center cursor-pointer hover:border-purple-500/50"
          >
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Store size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Pet Store</h2>
            <p className="text-slate-500 text-sm">Manage inventory, monitor low stock, and process orders.</p>
          </button>

          <button 
            onClick={() => handleSelect('grooming')}
            className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center cursor-pointer hover:border-pink-500/50"
          >
            <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Scissors size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Grooming Spa</h2>
            <p className="text-slate-500 text-sm">Manage grooming appointments, services, and pet hygiene records.</p>
          </button>

          <button 
            onClick={() => handleSelect('training')}
            className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center cursor-pointer hover:border-orange-500/50"
          >
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Dog size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Training Center</h2>
            <p className="text-slate-500 text-sm">Schedule obedience classes, track pet progress, and manage trainers.</p>
          </button>

          <button 
            onClick={() => handleSelect('parks')}
            className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center cursor-pointer hover:border-emerald-500/50"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TreePine size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Pet Parks</h2>
            <p className="text-slate-500 text-sm">Monitor park visitor traffic, manage facilities, and post safety alerts.</p>
          </button>
        </div>
      </div>
    </div>
  );
}
