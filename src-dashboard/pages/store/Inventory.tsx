import React, { useState } from 'react';
import { mockData } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Search, Edit2, Plus, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export function Inventory() {
  const [inventory, setInventory] = useState(mockData.store.inventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Food',
    price: '',
    stock: '',
    reorder: '',
  });
  const { toast } = useToast();

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `SKU-${(inventory.length + 1).toString().padStart(3, '0')}`;
    setInventory([...inventory, { 
      ...newProduct, 
      id, 
      price: Number(newProduct.price), 
      stock: Number(newProduct.stock), 
      reorder: Number(newProduct.reorder) 
    }]);
    setIsModalOpen(false);
    setNewProduct({ name: '', category: 'Food', price: '', stock: '', reorder: '' });
    toast('Product added to inventory successfully!', 'success');
  };

  const filtered = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inventory Management</h1>
          <p className="text-slate-500">Track stock levels and reorder thresholds.</p>
        </div>
        
        <div className="flex w-full sm:w-auto gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium whitespace-nowrap"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">SKU</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Product Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Price</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Stock Level</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item: any) => {
                const isLowStock = item.stock <= item.reorder;
                return (
                  <tr key={item.id} className={`transition-colors ${isLowStock ? 'bg-rose-50/30' : 'hover:bg-slate-50/50'}`}>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{item.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700 text-right">${item.price.toFixed(2)}</td>
                    <td className={`px-6 py-4 text-sm font-bold text-right ${isLowStock ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {item.stock}
                    </td>
                    <td className="px-6 py-4">
                      {isLowStock ? (
                        <Badge variant="error" >Low Stock (Reorder: {item.reorder})</Badge>
                      ) : (
                        <Badge variant="success">In Stock</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          {/* ... Modal content ... */}
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Product Name</label>
                <input 
                  required
                  type="text" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: (e.target as HTMLInputElement).value})}
                  placeholder="e.g. Premium Kibble"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: (e.target as HTMLSelectElement).value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                  >
                    <option value="Food">Food</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Accessory">Accessory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Price ($)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: (e.target as HTMLInputElement).value})}
                    placeholder="e.g. 29.99"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Initial Stock</label>
                  <input 
                    required
                    type="number" 
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: (e.target as HTMLInputElement).value})}
                    placeholder="e.g. 50"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Reorder Level</label>
                  <input 
                    required
                    type="number" 
                    value={newProduct.reorder}
                    onChange={(e) => setNewProduct({...newProduct, reorder: (e.target as HTMLInputElement).value})}
                    placeholder="e.g. 10"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
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
                  className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
