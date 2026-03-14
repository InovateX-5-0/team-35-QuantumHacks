import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Clock, User, Plus } from 'lucide-react';
import { mockData } from '../../data/mockData';

export function TrainingClasses() {
  const classes = mockData.training.classes;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Training Classes</h1>
          <p className="text-slate-500">Schedule and manage obedience and skill-building sessions.</p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200">
          <Plus size={20} /> Create Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-orange-50 text-orange-600 p-3 rounded-xl font-bold text-sm">
                Next Session: Today
              </div>
              <Badge variant="success">Active</Badge>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-4">{cls.name}</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                <Clock size={16} className="text-orange-500" />
                {cls.time}
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                <User size={16} className="text-orange-500" />
                {cls.trainer}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-orange-600 text-white rounded-xl font-bold text-sm hover:bg-orange-700 transition-colors">
                Manage Roster
              </button>
              <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
