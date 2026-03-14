import React, { useState } from 'react';
import { Scissors, Clock, DollarSign, Plus, Settings2, X } from 'lucide-react';
import { mockData } from '../../data/mockData';

export function GroomingServices() {
  const [services, setServices] = useState(mockData.grooming.services);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    duration: '',
    price: '',
  });

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (services.length + 1).toString();
    setServices([...services, { ...newService, id, price: Number(newService.price) }]);
    setIsModalOpen(false);
    setNewService({ name: '', duration: '', price: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Grooming Services</h1>
          <p className="text-slate-500">Manage your salon service catalog and pricing.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200"
        >
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

       {isModalOpen && (
         <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
           <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold text-slate-800">Add New Service</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                 <X size={24} />
               </button>
             </div>
             
             <form onSubmit={handleAddService} className="space-y-4">
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Service Name</label>
                 <input 
                   required
                   type="text" 
                   value={newService.name}
                   onChange={(e) => setNewService({...newService, name: (e.target as HTMLInputElement).value})}
                   placeholder="e.g. Full Grooming"
                   className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                 />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1">Duration</label>
                   <input 
                     required
                     type="text" 
                     value={newService.duration}
                     onChange={(e) => setNewService({...newService, duration: (e.target as HTMLInputElement).value})}
                     placeholder="e.g. 60-90 min"
                     className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1">Price ($)</label>
                   <input 
                     required
                     type="number" 
                     value={newService.price}
                     onChange={(e) => setNewService({...newService, price: (e.target as HTMLInputElement).value})}
                     placeholder="e.g. 50"
                     className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                   />
                 </div>
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
                   className="flex-1 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200"
                 >
                   Add Service
                 </button>
               </div>
             </form>
           </div>
         </div>
       )}
     </div>
  );
}
