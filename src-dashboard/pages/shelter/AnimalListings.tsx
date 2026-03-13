import React, { useState } from 'react';
import { mockData } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Search, Plus } from 'lucide-react';

export function AnimalListings() {
  const [animals] = useState(mockData.shelter.animals);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = animals.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Animal Listings</h1>
          <p className="text-slate-500">Manage all shelter animal profiles and statuses.</p>
        </div>
        
        <div className="flex w-full sm:w-auto gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search animals..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">
            <Plus size={18} />
            Add Animal
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Species</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Breed</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Age</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((animal) => (
                <tr key={animal.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{animal.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{animal.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{animal.species}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{animal.breed}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{animal.age}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      animal.status === 'available' ? 'success' : 
                      animal.status === 'adopted' ? 'default' : 
                      animal.status === 'medical_hold' ? 'error' : 'warning'
                    }>
                      {animal.status.replace('_', ' ').toUpperCase()}
                    </Badge>
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
