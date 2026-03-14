import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Clock, User, Plus, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { mockData } from '../../data/mockData';

export function TrainingClasses() {
  const [classes, setClasses] = useState(mockData.training.classes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    time: '',
    trainer: '',
  });

  const { toast } = useToast();

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (classes.length + 1).toString();
    setClasses([...classes, { ...newClass, id, status: 'Active' }]);
    setIsModalOpen(false);
    setNewClass({ name: '', time: '', trainer: '' });
    toast('Class created successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Training Classes</h1>
          <p className="text-slate-500">Schedule and manage obedience and skill-building sessions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
        >
          <Plus size={20} /> Create Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls: any) => (
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

       {isModalOpen && (
         <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
           <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold text-slate-800">Create New Class</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                 <X size={24} />
               </button>
             </div>
             
             <form onSubmit={handleCreateClass} className="space-y-4">
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Class Name</label>
                 <input 
                   required
                   type="text" 
                   value={newClass.name}
                   onChange={(e) => setNewClass({...newClass, name: (e.target as HTMLInputElement).value})}
                   placeholder="e.g. Advanced Obedience"
                   className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Time/Schedule</label>
                 <input 
                   required
                   type="text" 
                   value={newClass.time}
                   onChange={(e) => setNewClass({...newClass, time: (e.target as HTMLInputElement).value})}
                   placeholder="e.g. Weekends 10 AM"
                   className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Trainer</label>
                 <input 
                   required
                   type="text" 
                   value={newClass.trainer}
                   onChange={(e) => setNewClass({...newClass, trainer: (e.target as HTMLInputElement).value})}
                   placeholder="e.g. Dr. Sarah Bark"
                   className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
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
                   className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
                 >
                   Create Class
                 </button>
               </div>
             </form>
           </div>
         </div>
       )}
     </div>
  );
}
