import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../DataContext';
import { DetailedEquipmentListing } from '../constants';
import { generateEquipmentVisual } from '../services/geminiService';

const Admin: React.FC = () => {
  const { 
    equipment, categories, parts, copy, 
    addEquipment, deleteEquipment,
    deletePart, updateCopy 
  } = useData();

  const [activeTab, setActiveTab] = useState<'equipment' | 'parts' | 'copy'>('equipment');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Equipment Form State
  const [newEq, setNewEq] = useState<Partial<DetailedEquipmentListing>>({
    id: '', make: '', model: '', year: 2024, price: '', city: '', state: '', category: 'EXCAVATORS', meter: '0 Hours', img: ''
  });
  const [eqImagePrompt, setEqImagePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Login check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Invalid Access Code');
  };

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEq.id || !newEq.make) return;
    addEquipment({
      ...newEq,
      img: newEq.img || 'https://via.placeholder.com/800x600?text=No+Image',
      title: `${newEq.year} ${newEq.make} ${newEq.model}`,
      description: 'Factory certified unit ready for deployment.',
      specs: [],
      features: ['Ready to Work']
    } as DetailedEquipmentListing);
    setNewEq({ id: '', make: '', model: '', year: 2024, price: '', city: '', state: '', category: 'EXCAVATORS', meter: '0 Hours', img: '' });
    alert('Asset added to fleet.');
  };

  const generateImage = async () => {
    if (!eqImagePrompt) return;
    setIsGenerating(true);
    try {
      const { imageUrl } = await generateEquipmentVisual(eqImagePrompt, '16:9');
      setNewEq({ ...newEq, img: imageUrl });
    } catch (e) {
      console.error(e);
      alert('AI Generation Failed');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4">
        <div className="bg-white p-8 max-w-md w-full border-t-8 border-[#FFCC00]">
          <h1 className="text-2xl font-black uppercase mb-6 text-center">Secure Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Access Code" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 p-4 font-bold focus:border-[#FFCC00] outline-none"
            />
            <button className="w-full bg-[#111111] text-white py-4 font-black uppercase tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all">
              Authenticate
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">Hint: admin123</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tight">Fleet Command Center</h1>
        <button onClick={() => setIsAuthenticated(false)} className="text-xs font-bold uppercase text-red-600 hover:underline">Log Out</button>
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 mb-8 rounded-sm overflow-x-auto">
        {(['equipment', 'parts', 'copy'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-6 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#111111] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab} Management
          </button>
        ))}
      </div>

      {activeTab === 'equipment' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Form */}
          <div className="lg:col-span-1 bg-white p-6 shadow-xl border-t-4 border-[#FFCC00]">
            <h2 className="text-lg font-black uppercase mb-6">Add New Asset</h2>
            <form onSubmit={handleAddEquipment} className="space-y-4">
              <input 
                className="w-full border border-gray-200 p-3 text-sm font-bold" 
                placeholder="Stock ID (e.g. E-2024-X)" 
                value={newEq.id}
                onChange={e => setNewEq({...newEq, id: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  className="w-full border border-gray-200 p-3 text-sm font-bold" 
                  placeholder="Make" 
                  value={newEq.make}
                  onChange={e => setNewEq({...newEq, make: e.target.value})}
                />
                <input 
                  className="w-full border border-gray-200 p-3 text-sm font-bold" 
                  placeholder="Model" 
                  value={newEq.model}
                  onChange={e => setNewEq({...newEq, model: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <input 
                  className="w-full border border-gray-200 p-3 text-sm font-bold" 
                  placeholder="Year" 
                  type="number"
                  value={newEq.year}
                  onChange={e => setNewEq({...newEq, year: parseInt(e.target.value)})}
                />
                <input 
                  className="w-full border border-gray-200 p-3 text-sm font-bold" 
                  placeholder="Price" 
                  value={newEq.price}
                  onChange={e => setNewEq({...newEq, price: e.target.value})}
                />
              </div>
              <select 
                className="w-full border border-gray-200 p-3 text-sm font-bold uppercase"
                value={newEq.category}
                onChange={e => setNewEq({...newEq, category: e.target.value})}
              >
                {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>

              {/* AI Image Generation */}
              <div className="bg-gray-50 p-4 border border-gray-200 mt-4">
                <label className="text-[9px] font-black uppercase text-gray-400 block mb-2">AI Image Generator</label>
                <div className="flex gap-2 mb-2">
                  <input 
                    className="w-full border border-gray-200 p-2 text-xs" 
                    placeholder="Describe asset visual..."
                    value={eqImagePrompt}
                    onChange={e => setEqImagePrompt(e.target.value)}
                  />
                  <button 
                    type="button" 
                    onClick={generateImage}
                    disabled={isGenerating}
                    className="bg-[#111111] text-white px-3 py-2 text-[9px] font-black uppercase hover:bg-[#FFCC00] hover:text-black transition-all"
                  >
                    {isGenerating ? '...' : 'Gen'}
                  </button>
                </div>
                {newEq.img && (
                  <img src={newEq.img} alt="Generated" className="w-full h-32 object-cover border border-gray-200" />
                )}
              </div>

              <button className="w-full bg-[#FFCC00] text-[#111111] py-4 font-black uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all text-xs">
                Add to Fleet
              </button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 bg-white p-6 shadow-sm border border-gray-200 overflow-hidden">
             <h2 className="text-lg font-black uppercase mb-6">Current Inventory ({equipment.length})</h2>
             <div className="overflow-y-auto max-h-[600px] space-y-2">
               {equipment.map(item => (
                 <div key={item.id} className="flex items-center justify-between p-4 border border-gray-100 hover:border-[#FFCC00] transition-colors group">
                   <div className="flex items-center space-x-4">
                      <img src={item.img} alt={item.model} className="w-12 h-12 object-cover bg-gray-100" />
                      <div>
                        <div className="font-black text-sm uppercase">{item.year} {item.make} {item.model}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{item.id}</div>
                      </div>
                   </div>
                   <button 
                    onClick={() => { if(window.confirm('Delete asset?')) deleteEquipment(item.id); }}
                    className="text-gray-300 hover:text-red-600 transition-colors"
                   >
                     <i className="fas fa-trash"></i>
                   </button>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}

      {activeTab === 'parts' && (
         <div className="bg-white p-8 shadow-sm">
            <h2 className="text-xl font-black uppercase mb-4">Parts Inventory Control</h2>
            <p className="text-gray-500 mb-8">Management of {parts.length} SKU items.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {parts.slice(0, 12).map((p, i) => (
                    <div key={i} className="border p-4 flex justify-between items-center">
                        <span className="font-bold text-sm">{p.part_number}</span>
                        <button onClick={() => deletePart(p.part_number)} className="text-red-500 hover:text-red-700 text-xs uppercase font-bold">Delete</button>
                    </div>
                ))}
            </div>
            <div className="mt-8 p-4 bg-gray-50 text-center text-xs text-gray-500 font-mono">
                Showing first 12 items. Full database management available in enterprise dashboard.
            </div>
         </div>
      )}

      {activeTab === 'copy' && (
        <div className="max-w-2xl bg-white p-8 shadow-xl border-t-4 border-black">
          <h2 className="text-xl font-black uppercase mb-6">Site Content Management</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Hero Title</label>
              <textarea 
                className="w-full border border-gray-200 p-4 text-lg font-black" 
                rows={2}
                value={copy.homeHeroTitle}
                onChange={(e) => updateCopy({ homeHeroTitle: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Hero Subtitle</label>
              <textarea 
                className="w-full border border-gray-200 p-4 font-medium" 
                rows={3}
                value={copy.homeHeroSubtitle}
                onChange={(e) => updateCopy({ homeHeroSubtitle: e.target.value })}
              />
            </div>
             <div className="p-4 bg-green-50 text-green-800 text-xs font-bold uppercase border border-green-200 flex items-center">
                <i className="fas fa-check-circle mr-2"></i> Changes autosaved to local storage
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;