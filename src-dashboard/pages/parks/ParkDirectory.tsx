import React, { useState } from 'react';
import { MapPin, Star, MessageSquare, Plus, Search, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { mockData } from '../../data/mockData';

export function ParkDirectory() {
  const [directory, setDirectory] = useState(mockData.parks.directory);
  const { reviews } = mockData.parks;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPark, setNewPark] = useState({
    name: '',
    location: '',
    status: 'Open',
    type: 'Dog',
  });

  const { toast } = useToast();

  const handleAddPark = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (directory.length + 1).toString();
    // @ts-ignore
    setDirectory([...directory, { ...newPark, id, rating: 5.0 }]);
    setIsModalOpen(false);
    setNewPark({ name: '', location: '', status: 'Open', type: 'Dog' });
    toast('Park added successfully!', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Park Locations */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Park Directory</h1>
            <p className="text-slate-500">Manage facility locations and status.</p>
          </div>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
           >
            <Plus size={20} /> Add Park
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directory.map((park: any) => (
            <div key={park.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    park.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {park.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-1">{park.name}</h3>
                <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                  <MapPin size={14} />
                  <span>{park.location}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={16} fill="currentColor" />
                    <span>{park.rating}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">{park.type} Area</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Reviews */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">User Reviews</h2>
          <p className="text-slate-500">What pet owners are saying about your facilities.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-slate-50/50 transition-colors flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
                  {review.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-bold text-slate-800">{review.user}</h4>
                      <p className="text-xs text-emerald-600 font-medium">{review.park}</p>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-slate-200"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 italic">"{review.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
         <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
           <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold text-slate-800">Add New Park</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                 <X size={24} />
               </button>
             </div>
             
             <form onSubmit={handleAddPark} className="space-y-4">
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Park Name</label>
                 <input 
                   required
                   type="text" 
                   value={newPark.name}
                   onChange={(e) => setNewPark({...newPark, name: (e.target as HTMLInputElement).value})}
                   placeholder="e.g. Central Pet Plaza"
                   className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Location Address</label>
                 <input 
                   required
                   type="text" 
                   value={newPark.location}
                   onChange={(e) => setNewPark({...newPark, location: (e.target as HTMLInputElement).value})}
                   placeholder="e.g. 123 Bark Avenue"
                   className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                 />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
                   <select 
                     value={newPark.status}
                     onChange={(e) => setNewPark({...newPark, status: (e.target as HTMLSelectElement).value})}
                     className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                   >
                     <option value="Open">Open</option>
                     <option value="Closed">Closed</option>
                     <option value="Maintenance">Maintenance</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1">Type Area</label>
                   <select 
                     value={newPark.type}
                     onChange={(e) => setNewPark({...newPark, type: (e.target as HTMLSelectElement).value})}
                     className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                   >
                     <option value="Dog">Dog</option>
                     <option value="Cat">Cat</option>
                     <option value="Mixed">Mixed</option>
                   </select>
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
                   className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                 >
                   Add Park
                 </button>
               </div>
             </form>
           </div>
         </div>
       )}
    </div>
  );
}
