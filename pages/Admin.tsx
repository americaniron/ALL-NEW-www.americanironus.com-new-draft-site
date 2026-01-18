
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../DataContext';
import { DetailedEquipmentListing } from '../constants';
import { generateEquipmentVisual } from '../services/geminiService';
import { PartListing } from '../types';

/**
 * Admin component for managing equipment, parts, categories, and site copy.
 */
const Admin: React.FC = () => {
  const { 
    equipment, categories, parts, copy, 
    addEquipment, updateEquipment, deleteEquipment,
    addPart, updatePart, deletePart,
    updateCategory, updateCopy 
  } = useData();

  const [activeTab, setActiveTab] = useState<'equipment' | 'parts' | 'categories' | 'copy'>('equipment');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Form States for adding new items
  const [newEq, setNewEq] = useState<Partial<DetailedEquipmentListing>>({
    id: '', make: 'CAT', model: '', year: new Date().getFullYear(), price: '', city: '', state: '', category: 'EXCAVATORS', meter: '0 Hours', img: ''
  });
  const [eqImagePrompt, setEqImagePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [newPart, setNewPart] = useState<Partial<PartListing>>({
    part_number: '', description: '', category: 'ENGINE COMPONENTS', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=200', attributes: {}
  });

  // Handle administrator authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '019700') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Access Code');
    }
  };

  // Helper to update image URLs for various data types
  const handleUpdateImage = (type: 'eq' | 'part' | 'cat', id: string, currentImg: string) => {
    const newUrl = window.prompt("Enter new Image URL:", currentImg);
    if (newUrl === null) return;
    
    if (type === 'eq') updateEquipment(id, { img: newUrl });
    else if (type === 'part') updatePart(id, { image: newUrl });
    else if (type === 'cat') updateCategory(id, { img: newUrl });
  };

  // Handle adding new equipment to the global inventory
  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEq.id || !newEq.make || !newEq.model) {
      alert('Please provide ID, Make, and Model.');
      return;
    }
    addEquipment({
      ...newEq,
      img: newEq.img || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800',
      title: `${newEq.year} ${newEq.make} ${newEq.model}`,
      description: 'Asset verified and ready for deployment.',
      specs: [{ label: 'Stock #', value: newEq.id || '' }, { label: 'Year', value: String(newEq.year) }, { label: 'Hours', value: newEq.meter || '0' }],
      features: ['Verified History', 'Fleet Maintained']
    } as DetailedEquipmentListing);
    setNewEq({ id: '', make: 'CAT', model: '', year: new Date().getFullYear(), price: '', city: '', state: '', category: 'EXCAVATORS', meter: '0 Hours', img: '' });
    alert('Asset added.');
  };

  // Use AI to generate a professional industrial image for new equipment
  const generateImage = async () => {
    if (!newEq.model) return alert("Enter model for AI Gen");
    setIsGenerating(true);
    try {
      // Prompt user to select API key if not already done (Required for Gemini 3 Pro Image)
      const hasKey = await (window as any).aistudio?.hasSelectedApiKey?.();
      if (!hasKey) {
        await (window as any).aistudio?.openSelectKey?.();
      }

      const { imageUrl } = await generateEquipmentVisual(eqImagePrompt || `${newEq.year} ${newEq.make} ${newEq.model} industrial photo`, '4:3');
      setNewEq({ ...newEq, img: imageUrl });
    } catch (e) {
      console.error("Image Gen Error:", e);
      alert('AI Generation Failed. Ensure a valid paid API key is selected.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Rendering logic for unauthorized access
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4">
        <div className="bg-white p-8 max-w-md w-full border-t-8 border-[#FFCC00]">
          <h1 className="text-2xl font-black uppercase mb-6 text-center tracking-tighter">Secure Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Authorization Code" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 p-4 font-bold focus:border-[#FFCC00] outline-none"
            />
            <button className="w-full bg-[#111111] text-white py-4 font-black uppercase tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all shadow-lg">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
            <h1 className="text-4xl font-black uppercase tracking-tight">Fleet Command Center</h1>
            <p className="text-[10px] font-black text-[#FFCC00] uppercase tracking-[0.3em] mt-2">Industrial Content Management System</p>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="bg-red-600 text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Terminate Session</button>
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 mb-10 rounded-sm overflow-x-auto shadow-inner">
        {(['equipment', 'parts', 'categories', 'copy'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 px-6 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#111111] text-white shadow-xl scale-[1.02]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab} Management
          </button>
        ))}
      </div>

      {activeTab === 'equipment' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Add New Asset Form */}
          <div className="lg:col-span-4 bg-white p-8 shadow-xl border-t-4 border-[#FFCC00]">
            <h2 className="text-xl font-black uppercase mb-8 tracking-tight">Onboard New Asset</h2>
            <form onSubmit={handleAddEquipment} className="space-y-4">
              <input className="w-full border-2 border-gray-100 p-3 text-sm font-bold focus:border-black outline-none" placeholder="Stock ID" value={newEq.id} onChange={e => setNewEq({...newEq, id: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input className="w-full border-2 border-gray-100 p-3 text-sm font-bold focus:border-black outline-none" placeholder="Make" value={newEq.make} onChange={e => setNewEq({...newEq, make: e.target.value})} />
                <input className="w-full border-2 border-gray-100 p-3 text-sm font-bold focus:border-black outline-none" placeholder="Model" value={newEq.model} onChange={e => setNewEq({...newEq, model: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" className="w-full border-2 border-gray-100 p-3 text-sm font-bold focus:border-black outline-none" placeholder="Year" value={newEq.year} onChange={e => setNewEq({...newEq, year: parseInt(e.target.value)})} />
                <input className="w-full border-2 border-gray-100 p-3 text-sm font-bold focus:border-black outline-none" placeholder="Price" value={newEq.price} onChange={e => setNewEq({...newEq, price: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input className="w-full border-2 border-gray-100 p-3 text-sm font-bold focus:border-black outline-none" placeholder="City" value={newEq.city} onChange={e => setNewEq({...newEq, city: e.target.value})} />
                <input className="w-full border-2 border-gray-100 p-3 text-sm font-bold focus:border-black outline-none" placeholder="State" value={newEq.state} onChange={e => setNewEq({...newEq, state: e.target.value})} />
              </div>
              <select 
                className="w-full border-2 border-gray-100 p-3 text-sm font-bold focus:border-black outline-none uppercase"
                value={newEq.category}
                onChange={e => setNewEq({...newEq, category: e.target.value})}
              >
                {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>

              <div className="bg-gray-50 p-4 border border-gray-200">
                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Inventory Image</label>
                <div className="flex gap-2 mb-4">
                    <input 
                        className="flex-grow border-2 border-gray-100 p-2 text-xs font-bold focus:border-black outline-none" 
                        placeholder="Image URL or AI prompt..."
                        value={newEq.img || eqImagePrompt}
                        onChange={e => {
                            if (newEq.img) setNewEq({...newEq, img: e.target.value});
                            else setEqImagePrompt(e.target.value);
                        }}
                    />
                    <button 
                        type="button" 
                        onClick={generateImage}
                        disabled={isGenerating}
                        className="bg-[#111111] text-[#FFCC00] px-4 py-2 text-[10px] font-black uppercase hover:bg-[#FFCC00] hover:text-[#111111] transition-all disabled:opacity-50"
                    >
                        {isGenerating ? 'GEN...' : 'AI GEN'}
                    </button>
                </div>
                {newEq.img && (
                    <div className="relative group">
                        <img src={newEq.img} alt="Preview" className="w-full h-32 object-cover border border-gray-200" />
                        <button 
                            type="button" 
                            onClick={() => setNewEq({...newEq, img: ''})}
                            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                )}
              </div>
              <button type="submit" className="w-full bg-[#111111] text-white py-4 font-black uppercase tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all shadow-lg text-xs">
                Authorize & Add Asset
              </button>
            </form>
          </div>

          {/* Active Inventory List */}
          <div className="lg:col-span-8 bg-white p-8 border border-gray-200 shadow-sm overflow-hidden">
             <h2 className="text-xl font-black uppercase mb-8 tracking-tight">Active Fleet Management ({equipment.length})</h2>
             <div className="overflow-y-auto max-h-[800px] space-y-4">
               {equipment.map(item => (
                 <div key={item.id} className="flex items-center justify-between p-6 border border-gray-100 hover:border-[#FFCC00] transition-colors group bg-gray-50/30">
                   <div className="flex items-center space-x-6">
                      <div className="relative cursor-pointer" onClick={() => handleUpdateImage('eq', item.id, item.img)}>
                        <img src={item.img} alt={item.model} className="w-16 h-16 object-cover border border-gray-200" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <i className="fas fa-camera text-white text-xs"></i>
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-sm uppercase tracking-tight">{item.year} {item.make} {item.model}</div>
                        <div className="flex space-x-4 mt-1">
                            <span className="text-[10px] text-gray-400 font-mono uppercase">ID: {item.id}</span>
                            <span className="text-[10px] text-[#FFCC00] font-black uppercase">{item.category}</span>
                        </div>
                      </div>
                   </div>
                   <div className="flex items-center space-x-4">
                      <div className="text-right mr-4">
                        <div className="text-xs font-black">{item.price}</div>
                        <div className="text-[9px] text-gray-400 font-bold uppercase">{item.city}, {item.state}</div>
                      </div>
                      <button 
                        onClick={() => { if(window.confirm('IRREVERSIBLE: Delete this asset from global inventory?')) deleteEquipment(item.id); }}
                        className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-red-600 hover:bg-red-50 transition-all rounded-full"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}

      {activeTab === 'parts' && (
         <div className="bg-white p-10 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-black uppercase mb-8 tracking-tight">Parts Matrix Control</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {parts.map((p, i) => (
                    <div key={i} className="border border-gray-100 p-6 flex justify-between items-center hover:shadow-md transition-shadow bg-gray-50/50">
                        <div className="flex items-center space-x-4">
                            <img 
                                src={p.image} 
                                alt={p.part_number} 
                                className="w-10 h-10 object-contain bg-white border cursor-pointer" 
                                onClick={() => handleUpdateImage('part', p.part_number, p.image)}
                            />
                            <div>
                                <div className="font-black text-xs">{p.part_number}</div>
                                <div className="text-[9px] text-gray-400 uppercase font-bold truncate max-w-[150px]">{p.description}</div>
                            </div>
                        </div>
                        <button 
                            onClick={() => { if(window.confirm('Delete part SKU?')) deletePart(p.part_number); }} 
                            className="text-gray-300 hover:text-red-600 transition-colors p-2"
                        >
                            <i className="fas fa-trash-can text-sm"></i>
                        </button>
                    </div>
                ))}
            </div>
         </div>
      )}

      {activeTab === 'categories' && (
          <div className="bg-white p-10 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-black uppercase mb-8 tracking-tight">Machine Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                    <div key={i} className="border border-gray-100 overflow-hidden group">
                        <div className="aspect-video relative overflow-hidden bg-gray-50 p-4">
                            <img src={cat.img} alt={cat.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                            <button 
                                onClick={() => handleUpdateImage('cat', cat.name, cat.img)}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-black uppercase tracking-widest transition-opacity"
                            >
                                Update Visual
                            </button>
                        </div>
                        <div className="p-4 bg-gray-50">
                            <div className="font-black text-xs uppercase text-[#111111]">{cat.name}</div>
                            <div className="text-[9px] text-gray-400 font-bold uppercase mt-1">{cat.primaryApplication}</div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      )}

      {activeTab === 'copy' && (
        <div className="max-w-4xl bg-white p-12 shadow-2xl border-t-8 border-black">
          <h2 className="text-2xl font-black uppercase mb-10 tracking-tight">Enterprise Content Command</h2>
          <div className="space-y-10">
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-4 tracking-[0.2em]">Home Hero Headline</label>
              <textarea 
                className="w-full border-2 border-gray-100 p-6 text-2xl font-black uppercase tracking-tight focus:border-[#FFCC00] outline-none transition-colors" 
                rows={2}
                value={copy.homeHeroTitle}
                onChange={(e) => updateCopy({ homeHeroTitle: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-4 tracking-[0.2em]">Home Hero Description</label>
              <textarea 
                className="w-full border-2 border-gray-100 p-6 text-lg font-medium leading-relaxed text-gray-600 focus:border-[#FFCC00] outline-none transition-colors" 
                rows={4}
                value={copy.homeHeroSubtitle}
                onChange={(e) => updateCopy({ homeHeroSubtitle: e.target.value })}
              />
            </div>
             <div className="p-6 bg-[#fffbeb] text-[#92400e] text-[10px] font-black uppercase border-l-8 border-[#f59e0b] tracking-widest flex items-center shadow-sm">
                <i className="fas fa-info-circle mr-4 text-lg"></i> SYSTEM NOTE: Changes are persisted to local deployment storage.
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
