
import React, { useState } from 'react';
import { useData } from '../DataContext';
import { DetailedEquipmentListing } from '../constants';

const Admin: React.FC = () => {
  const { 
    equipment, categories, parts, copy, 
    addEquipment, updateEquipment, deleteEquipment,
    addCategory, deleteCategory,
    addPart, deletePart,
    updateCopy 
  } = useData();

  const [activeTab, setActiveTab] = useState<'inventory' | 'categories' | 'copy' | 'parts'>('inventory');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States
  const [eqForm, setEqForm] = useState<Partial<DetailedEquipmentListing>>({});
  const [catForm, setCatForm] = useState({ name: '', img: '' });
  const [partForm, setPartForm] = useState({ pn: '', desc: '' });

  // Validation Error States
  const [eqErrors, setEqErrors] = useState<Record<string, string>>({});
  const [catErrors, setCatErrors] = useState<Record<string, string>>({});
  const [partErrors, setPartErrors] = useState<Record<string, string>>({});

  const validateEq = (): boolean => {
    const errors: Record<string, string> = {};
    if (!eqForm.title || eqForm.title.length < 3) errors.title = "Title must be at least 3 characters";
    if (!eqForm.make) errors.make = "Make is required";
    if (!eqForm.model) errors.model = "Model is required";
    if (!eqForm.category) errors.category = "Category is required";
    if (!eqForm.price) errors.price = "Price or 'CALL' is required";
    
    if (eqForm.year) {
      const currentYear = new Date().getFullYear();
      if (eqForm.year < 1900 || eqForm.year > currentYear + 1) {
        errors.year = `Year must be between 1900 and ${currentYear + 1}`;
      }
    }

    setEqErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCat = (): boolean => {
    const errors: Record<string, string> = {};
    if (!catForm.name || catForm.name.length < 3) errors.name = "Category name must be at least 3 characters";
    if (!catForm.img) errors.img = "Image URL is required";
    else if (!catForm.img.startsWith('http')) errors.img = "Must be a valid URL (starting with http)";

    setCatErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePart = (): boolean => {
    const errors: Record<string, string> = {};
    if (!partForm.pn) errors.pn = "Part number is required";
    if (!partForm.desc || partForm.desc.length < 5) errors.desc = "Description must be at least 5 characters";

    setPartErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEq()) return;

    if (editingId) {
      updateEquipment(editingId, eqForm);
      setEditingId(null);
    } else {
      const newItem = {
        ...eqForm,
        id: eqForm.id || Math.random().toString(36).substr(2, 9),
        img: eqForm.img || 'https://images.unsplash.com/photo-1579361655073-45f8f972b9a7?q=80&w=800&auto=format&fit=crop',
        specs: eqForm.specs || [],
        features: eqForm.features || []
      } as DetailedEquipmentListing;
      addEquipment(newItem);
    }
    setEqForm({});
    setEqErrors({});
  };

  const handleCatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCat()) return;
    addCategory(catForm);
    setCatForm({ name: '', img: '' });
    setCatErrors({});
  };

  const handlePartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePart()) return;
    addPart(partForm);
    setPartForm({ pn: '', desc: '' });
    setPartErrors({});
  };

  const InputError = ({ msg }: { msg?: string }) => msg ? <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{msg}</p> : null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#111111] text-white p-6 hidden md:block border-r-8 border-[#FFCC00]">
        <h1 className="text-xl font-black mb-10 tracking-tighter uppercase">Admin <span className="text-[#FFCC00]">Portal</span></h1>
        <nav className="space-y-4">
          <button onClick={() => { setActiveTab('inventory'); setEditingId(null); setEqForm({}); setEqErrors({}); }} className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-[#FFCC00] text-[#111111]' : 'hover:bg-[#1a1a1a]'}`}>
            <i className="fas fa-truck-monster mr-3"></i> Inventory
          </button>
          <button onClick={() => { setActiveTab('parts'); setPartErrors({}); }} className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'parts' ? 'bg-[#FFCC00] text-[#111111]' : 'hover:bg-[#1a1a1a]'}`}>
            <i className="fas fa-gears mr-3"></i> Parts
          </button>
          <button onClick={() => { setActiveTab('categories'); setCatErrors({}); }} className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'categories' ? 'bg-[#FFCC00] text-[#111111]' : 'hover:bg-[#1a1a1a]'}`}>
            <i className="fas fa-list mr-3"></i> Categories
          </button>
          <button onClick={() => setActiveTab('copy')} className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'copy' ? 'bg-[#FFCC00] text-[#111111]' : 'hover:bg-[#1a1a1a]'}`}>
            <i className="fas fa-edit mr-3"></i> Site Copy
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#111111]">{activeTab} Management</h2>
          <div className="flex items-center space-x-4">
            <span className="text-xs font-bold text-gray-400 uppercase">Live Preview Active</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </header>

        {activeTab === 'inventory' && (
          <div className="space-y-10">
            {/* Equipment Editor Form */}
            <form onSubmit={handleEqSubmit} className="bg-white p-8 shadow-xl border-t-4 border-[#FFCC00] grid grid-cols-1 md:grid-cols-3 gap-6">
              <h3 className="md:col-span-3 text-lg font-black uppercase mb-2 text-[#111111]">{editingId ? 'Edit Machine' : 'Add New Machine'}</h3>
              
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Machine Name</label>
                <input value={eqForm.title || ''} onChange={e => setEqForm({...eqForm, title: e.target.value})} placeholder="e.g. CAT D6T" className={`w-full border p-3 text-sm focus:ring-[#FFCC00] outline-none ${eqErrors.title ? 'border-red-500' : ''}`} />
                <InputError msg={eqErrors.title} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Make</label>
                <input value={eqForm.make || ''} onChange={e => setEqForm({...eqForm, make: e.target.value.toUpperCase()})} placeholder="CAT, KOMATSU..." className={`w-full border p-3 text-sm ${eqErrors.make ? 'border-red-500' : ''}`} />
                <InputError msg={eqErrors.make} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Model</label>
                <input value={eqForm.model || ''} onChange={e => setEqForm({...eqForm, model: e.target.value.toUpperCase()})} placeholder="e.g. D6T" className={`w-full border p-3 text-sm ${eqErrors.model ? 'border-red-500' : ''}`} />
                <InputError msg={eqErrors.model} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Year (Optional)</label>
                <input value={eqForm.year || ''} onChange={e => setEqForm({...eqForm, year: Number(e.target.value)})} placeholder="YYYY" type="number" className={`w-full border p-3 text-sm ${eqErrors.year ? 'border-red-500' : ''}`} />
                <InputError msg={eqErrors.year} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Price</label>
                <input value={eqForm.price || ''} onChange={e => setEqForm({...eqForm, price: e.target.value})} placeholder="e.g. $45,000 or CALL" className={`w-full border p-3 text-sm ${eqErrors.price ? 'border-red-500' : ''}`} />
                <InputError msg={eqErrors.price} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Category</label>
                <select value={eqForm.category || ''} onChange={e => setEqForm({...eqForm, category: e.target.value})} className={`w-full border p-3 text-sm ${eqErrors.category ? 'border-red-500' : ''}`}>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
                <InputError msg={eqErrors.category} />
              </div>

              <div className="md:col-span-3">
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Description</label>
                <textarea value={eqForm.description || ''} onChange={e => setEqForm({...eqForm, description: e.target.value})} placeholder="Technical details, condition, etc." className="w-full border p-3 text-sm h-24 focus:ring-[#FFCC00] outline-none" />
              </div>

              <div className="md:col-span-3 flex gap-4">
                <button type="submit" className="bg-[#111111] text-white px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all">
                  {editingId ? 'Save Changes' : 'Publish to Site'}
                </button>
                {editingId && <button type="button" onClick={() => {setEditingId(null); setEqForm({}); setEqErrors({});}} className="border px-8 py-3 text-xs font-bold uppercase text-[#111111]">Cancel</button>}
              </div>
            </form>

            {/* Equipment List */}
            <div className="bg-white shadow-xl overflow-hidden border">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-xs font-bold uppercase text-gray-400">
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Machine</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {equipment.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => updateEquipment(item.id, { price: item.price === 'SOLD' ? 'CALL' : 'SOLD' })}
                          className={`px-2 py-1 text-[10px] font-black uppercase rounded ${item.price === 'SOLD' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                        >
                          {item.price === 'SOLD' ? 'SOLD' : 'AVAILABLE'}
                        </button>
                      </td>
                      <td className="px-6 py-4 font-bold text-sm uppercase text-[#111111]">{item.title}</td>
                      <td className="px-6 py-4 text-sm font-mono text-[#111111]">{item.price}</td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-400">{item.category}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => {setEditingId(item.id); setEqForm(item); setEqErrors({}); }} className="text-blue-500 hover:underline text-xs font-bold uppercase">Edit</button>
                        <button onClick={() => deleteEquipment(item.id)} className="text-red-500 hover:underline text-xs font-bold uppercase">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-8">
            <form onSubmit={handleCatSubmit} className="bg-white p-8 shadow-xl border-t-4 border-[#FFCC00] grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div className="md:col-span-2">
                 <h3 className="text-lg font-black uppercase mb-2 text-[#111111]">Register New Category</h3>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Category Name</label>
                <input value={catForm.name} onChange={e => setCatForm({...catForm, name: e.target.value.toUpperCase()})} placeholder="e.g. COMPRESSORS" className={`w-full border p-3 text-sm ${catErrors.name ? 'border-red-500' : ''}`} />
                <InputError msg={catErrors.name} />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Icon/Image URL</label>
                <input value={catForm.img} onChange={e => setCatForm({...catForm, img: e.target.value})} placeholder="https://..." className={`w-full border p-3 text-sm ${catErrors.img ? 'border-red-500' : ''}`} />
                <InputError msg={catErrors.img} />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-[#111111] text-white px-8 py-3.5 font-bold uppercase text-xs tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all">Add Category</button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(cat => (
                <div key={cat.name} className="bg-white p-6 shadow border flex justify-between items-center group">
                  <div className="flex items-center space-x-4">
                    <img src={cat.img} className="w-12 h-12 object-cover rounded bg-gray-100" />
                    <span className="font-black uppercase tracking-tighter text-[#111111]">{cat.name}</span>
                  </div>
                  <button onClick={() => { if(window.confirm(`Delete ${cat.name}?`)) deleteCategory(cat.name); }} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'parts' && (
          <div className="space-y-8">
            <form onSubmit={handlePartSubmit} className="bg-white p-8 shadow-xl border-t-4 border-[#FFCC00] grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div className="md:col-span-2">
                 <h3 className="text-lg font-black uppercase mb-2 text-[#111111]">Inventory Parts Registry</h3>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 text-[#111111]">Part Number</label>
                <input value={partForm.pn} onChange={e => setPartForm({...partForm, pn: e.target.value.toUpperCase()})} placeholder="e.g. 1R-1808" className={`w-full border p-3 text-sm ${partErrors.pn ? 'border-red-500' : ''}`} />
                <InputError msg={partErrors.pn} />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 text-[#111111]">Description</label>
                <input value={partForm.desc} onChange={e => setPartForm({...partForm, desc: e.target.value})} placeholder="Component description..." className={`w-full border p-3 text-sm ${partErrors.desc ? 'border-red-500' : ''}`} />
                <InputError msg={partErrors.desc} />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-[#111111] text-white px-8 py-3.5 font-bold uppercase text-xs tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all">Register Part</button>
              </div>
            </form>

            <div className="bg-white shadow border overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b">
                    <tr className="text-xs font-bold uppercase text-gray-400">
                      <th className="px-6 py-4">Part #</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {parts.map(part => (
                      <tr key={part.pn} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono font-bold text-sm text-[#111111]">{part.pn}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{part.desc}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => { if(window.confirm(`Remove ${part.pn}?`)) deletePart(part.pn); }} className="text-red-500 hover:underline text-xs font-bold uppercase">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'copy' && (
          <div className="bg-white p-8 shadow-xl border-t-4 border-[#FFCC00] space-y-10">
            <div>
              <h3 className="text-lg font-black uppercase mb-6 flex items-center text-[#111111]">
                <i className="fas fa-home mr-3 text-[#FFCC00]"></i> Homepage Hero
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Main Headline</label>
                  <input value={copy.homeHeroTitle} onChange={e => updateCopy({ homeHeroTitle: e.target.value })} className="w-full border p-4 font-extrabold text-xl text-[#111111] focus:ring-[#FFCC00] outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Hero Subtext</label>
                  <textarea value={copy.homeHeroSubtitle} onChange={e => updateCopy({ homeHeroSubtitle: e.target.value })} rows={3} className="w-full border p-4 text-gray-600 focus:ring-[#FFCC00] outline-none" />
                </div>
              </div>
            </div>

            <hr />

            <div>
              <h3 className="text-lg font-black uppercase mb-6 flex items-center text-[#111111]">
                <i className="fas fa-info-circle mr-3 text-[#FFCC00]"></i> About Us Page
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Our Mission Paragraph</label>
                  <textarea value={copy.aboutMission} onChange={e => updateCopy({ aboutMission: e.target.value })} rows={4} className="w-full border p-4 text-gray-600 focus:ring-[#FFCC00] outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Our History Paragraph</label>
                  <textarea value={copy.aboutHistory} onChange={e => updateCopy({ aboutHistory: e.target.value })} rows={4} className="w-full border p-4 text-gray-600 focus:ring-[#FFCC00] outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 border border-green-100 flex items-center text-green-700 text-xs font-bold uppercase tracking-widest">
              <i className="fas fa-check-circle mr-3"></i> Changes are saved instantly to the live database
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
