import React from 'react';
import { Users, Clock, MapPin, Search } from 'lucide-react';
import { mockData } from '../../data/mockData';

export function VisitorTraffic() {
  const visitors = mockData.parks.visitors;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Visitor Traffic</h1>
          <p className="text-slate-500">Live monitoring of pet park visitors and stay duration.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 font-bold text-sm flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             22 Active Pets
           </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Visitor ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Pet Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Check-in Time</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Duration</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visitors.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-500">#{v.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{v.petName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{v.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{v.duration}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      In Park
                    </span>
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
