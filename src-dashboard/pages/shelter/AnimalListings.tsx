import React, { useState } from 'react';
import { mockData } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Search, Plus, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export function AnimalListings() {
  const [animals, setAnimals] = useState(mockData.shelter.animals);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: '',
  });
  const { toast } = useToast();

  const handleAddAnimal = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `A${(animals.length + 1).toString().padStart(3, '0')}`;
    setAnimals([...animals, { ...newAnimal, id, status: 'available' }]);
    setIsModalOpen(false);
    setNewAnimal({ name: '', species: 'Dog', breed: '', age: '' });
    toast('Animal added to listings successfully!', 'success');
  };

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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
          >
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Add New Animal</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddAnimal} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Animal Name</label>
                <input 
                  required
                  type="text" 
                  value={newAnimal.name}
                  onChange={(e) => setNewAnimal({...newAnimal, name: (e.target as HTMLInputElement).value})}
                  placeholder="e.g. Buddy"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Species</label>
                  <select 
                    value={newAnimal.species}
                    onChange={(e) => setNewAnimal({...newAnimal, species: (e.target as HTMLSelectElement).value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Age</label>
                  <input 
                    required
                    type="text" 
                    value={newAnimal.age}
                    onChange={(e) => setNewAnimal({...newAnimal, age: (e.target as HTMLInputElement).value})}
                    placeholder="e.g. 2 yrs"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Breed</label>
                <input 
                  required
                  type="text" 
                  value={newAnimal.breed}
                  onChange={(e) => setNewAnimal({...newAnimal, breed: (e.target as HTMLInputElement).value})}
                  placeholder="e.g. Golden Retriever"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                >
                  Add Animal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
