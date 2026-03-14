import React from 'react';
import { ShieldAlert, AlertCircle, Info, Plus, Trash2 } from 'lucide-react';
import { mockData } from '../../data/mockData';

export function ParkAlerts() {
  const alerts = mockData.parks.alerts;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Park Safety Alerts</h1>
          <p className="text-slate-500">Post and manage facility updates and safety warnings.</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
          <Plus size={20} /> New Alert
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-6 rounded-2xl border flex gap-6 items-start transition-all hover:shadow-md ${
            alert.status === 'active' ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'
          }`}>
            <div className={`p-3 rounded-xl ${
              alert.status === 'active' ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-600'
            }`}>
              {alert.type === 'Weather' ? <AlertCircle size={24} /> : <Info size={24} />}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-bold ${alert.status === 'active' ? 'text-rose-900' : 'text-slate-800'}`}>
                  {alert.type} Update
                </h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  alert.status === 'active' ? 'bg-rose-200 text-rose-700' : 'bg-slate-300 text-slate-700'
                }`}>
                  {alert.status}
                </span>
              </div>
              <p className={`text-sm ${alert.status === 'active' ? 'text-rose-700' : 'text-slate-600'}`}>
                {alert.message}
              </p>
            </div>

            <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
