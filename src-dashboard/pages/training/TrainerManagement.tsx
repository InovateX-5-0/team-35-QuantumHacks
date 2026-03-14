import React from 'react';
import { Award, Star, Mail, Phone, MoreVertical } from 'lucide-react';
import { mockData } from '../../data/mockData';

export function TrainerManagement() {
  const trainers = mockData.training.trainers;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Trainer Management</h1>
          <p className="text-slate-500">Manage your certified pet trainers and their assignments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
            <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-600" />
            <div className="px-6 pb-6 mt-[-32px]">
              <div className="flex justify-between items-end mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white border-4 border-white shadow-md overflow-hidden bg-slate-100 flex items-center justify-center text-orange-600 font-bold text-xl">
                  {trainer.name.charAt(0)}
                </div>
                <div className="flex gap-2 mb-1">
                  <button className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">
                    <Mail size={16} />
                  </button>
                  <button className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">
                    <Phone size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800">{trainer.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{trainer.specialty} Specialist</p>

              <div className="flex gap-4 border-t border-slate-50 pt-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <Award size={14} className="text-amber-500" />
                  {trainer.experience} Exp
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <Star size={14} className="text-amber-500" />
                  4.9 Rating
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
