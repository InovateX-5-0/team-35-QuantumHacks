import React from 'react';
import { Scissors, Clock, DollarSign, Plus, Settings2 } from 'lucide-react';
import { mockData } from '../../data/mockData';

export function GroomingServices() {
  const services = mockData.grooming.services;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Grooming Services</h1>
          <p className="text-slate-500">Manage your salon service catalog and pricing.</p>
        </div>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200">
          <Plus size={20} /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center">
                <Scissors size={24} />
              </div>
              <button className="text-slate-400 hover:text-slate-600 p-1">
                <Settings2 size={18} />
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-2">{service.name}</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Clock size={16} className="text-pink-500" />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <DollarSign size={16} className="text-emerald-500" />
                <span className="font-bold text-slate-800">${service.price}</span>
              </div>
            </div>

            <button className="w-full py-2 bg-slate-50 text-slate-700 rounded-xl font-bold text-sm hover:bg-pink-600 hover:text-white transition-all">
              Edit Package
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
