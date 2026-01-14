
import React, { useState } from 'react';
// Added missing Link import
import { Link } from 'react-router-dom';
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
  const [partForm, setPartForm] = useState({ part_number: '', description: '', category: '' });

  // Validation Error States
  const [eqErrors, setEqErrors] = useState<Record<string, string>>({});
  const [catErrors, setCatErrors] = useState<Record<string, string>>({});
  const [partErrors, setPartErrors] = useState<Record<string, string>>({});

  const validateEq = (): boolean => {
    const errors: Record<string, string> = {};
    if (!eqForm.title || eqForm.title.length < 3) errors.title = "Title required";
    if (!eqForm.make) errors.make = "Make required";
    if (!eqForm.model) errors.model = "Model required";
    if (!eqForm.category) errors.category = "Category required";
    if (!eqForm.price) errors.price = "Price required";
    setEqErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCat = (): boolean => {
    const errors: Record<string, string> = {};
    if (!catForm.name) errors.name = "Name required";
    if (!catForm.img) errors.img = "Image URL required";
    setCatErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePart = (): boolean => {
    const errors: Record<string, string> = {};
    if (!partForm.part_number) errors.part_number = "PN required";
    if (!partForm.description) errors.description = "Description required";
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
        img: eqForm.img || 'https://images.unsplash.com/photo-1579361655073-45f8f972b9a7?q=80&w=800',
        specs: eqForm.specs || [],
        features: eqForm.features || []
      } as DetailedEquipmentListing;
      addEquipment(newItem);
    }
    setEqForm({});
  };

  const handleCatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCat()) return;
    addCategory(catForm);
    setCatForm({ name: '', img: '' });
  };

  const handlePartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePart()) return;
    addPart({
        ...partForm,
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=200',
        detail_page: '',
        attributes: {}
    });
    setPartForm({ part_number: '', description: '', category: '' });
  };

  const InputError = ({ msg }: { msg?: string }) => msg ? <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{msg}</p> : null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#111111] text-white p-6 hidden md:block border-r-8 border-[#FFCC00]">
        <h1 className="text-xl font-black mb-10 tracking-tighter uppercase">Admin <span className="text-[#FFCC00]">Portal</span></h1>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab('inventory')} className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-[#FFCC00] text-[#111111]' : 'hover:bg-[#1a1a1a]'}`}>
            <i className="fas fa-truck-monster mr-3"></i> Inventory
          </button>
          <button onClick={() => setActiveTab('parts')} className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'parts' ? 'bg-[#FFCC00] text-[#111111]' : 'hover:bg-[#1a1a1a]'}`}>
            <i className="fas fa-gears mr-3"></i> Parts
          </button>
          <button onClick={() => setActiveTab('categories')} className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'categories' ? 'bg-[#FFCC00] text-[#111111]' : 'hover:bg-[#1a1a1a]'}`}>
            <i className="fas fa-list mr-3"></i> Categories
          </button>
          <button onClick={() => setActiveTab('copy')} className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'copy' ? 'bg-[#FFCC00] text-[#111111]' : 'hover:bg-[#1a1a1a]'}`}>
            <i className="fas fa-edit mr-3"></i> Site Copy
          </button>
          <div className="pt-20">
             {/* Fix: Use imported Link for site navigation */}
             <Link to="/" className="text-gray-500 hover:text-white text-xs font-black uppercase tracking-widest">← Return to Site</Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#111111]">{activeTab} Management</h2>
        </header>

        {activeTab === 'inventory' && (
          <div className="space-y-10">
            <form onSubmit={handleEqSubmit} className="bg-white p-8 shadow-xl border-t-4 border-[#FFCC00] grid grid-cols-1 md:grid-cols-3 gap-6">
              <h3 className="md:col-span-3 text-lg font-black uppercase mb-2 text-[#111111]">{editingId ? 'Edit Machine' : 'Add New Machine'}</h3>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Machine Name</label>
                <input value={eqForm.title || ''} onChange={e => setEqForm({...eqForm, title: e.target.value})} className="w-full border p-3 text-sm outline-none" />
                <InputError msg={eqErrors.title} />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Price</label>
                <input value={eqForm.price || ''} onChange={e => setEqForm({...eqForm, price: e.target.value})} className="w-full border p-3 text-sm outline-none" />
                <InputError msg={eqErrors.price} />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Category</label>
                <select value={eqForm.category || ''} onChange={e => setEqForm({...eqForm, category: e.target.value})} className="w-full border p-3 text-sm outline-none">
                  <option value="">Select...</option>
                  {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
                <InputError msg={eqErrors.category} />
              </div>
              <div className="md:col-span-3">
                <button type="submit" className="bg-[#111111] text-white px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all">
                  Publish to Site
                </button>
              </div>
            </form>

            <div className="bg-white shadow-xl overflow-hidden border">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-xs font-bold uppercase text-gray-400">
                    <th className="px-6 py-4">Machine</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {equipment.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-sm uppercase text-[#111111]">{item.title}</td>
                      <td className="px-6 py-4 text-sm font-mono text-[#111111]">{item.price}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => deleteEquipment(item.id)} className="text-red-500 hover:underline text-xs font-bold uppercase tracking-widest">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'parts' && (
          <div className="space-y-8">
            <form onSubmit={handlePartSubmit} className="bg-white p-8 shadow-xl border-t-4 border-[#FFCC00] grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <h3 className="md:col-span-2 text-lg font-black uppercase mb-2 text-[#111111]">Register New Component</h3>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Part Number</label>
                <input value={partForm.part_number} onChange={e => setPartForm({...partForm, part_number: e.target.value.toUpperCase()})} className="w-full border p-3 text-sm" />
                <InputError msg={partErrors.part_number} />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Description</label>
                <input value={partForm.description} onChange={e => setPartForm({...partForm, description: e.target.value})} className="w-full border p-3 text-sm" />
                <InputError msg={partErrors.description} />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-[#111111] text-white px-8 py-3.5 font-bold uppercase text-xs tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all">Submit Entry</button>
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
                    {parts.slice(0, 100).map(part => (
                      <tr key={part.part_number} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono font-bold text-sm text-[#111111]">{part.part_number}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 uppercase">{part.description}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => deletePart(part.part_number)} className="text-red-500 hover:underline text-xs font-bold uppercase">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
               <div className="p-4 bg-gray-50 text-[10px] font-black uppercase text-center text-gray-400 tracking-widest">Showing Top 100 Registry Entries</div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-8">
            <form onSubmit={handleCatSubmit} className="bg-white p-8 shadow-xl border-t-4 border-[#FFCC00] grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div className="md:col-span-2">
                 <h3 className="text-lg font-black uppercase mb-2 text-[#111111]">Fleet Classification</h3>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Name</label>
                <input value={catForm.name} onChange={e => setCatForm({...catForm, name: e.target.value.toUpperCase()})} className="w-full border p-3 text-sm" />
                <InputError msg={catErrors.name} />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-[#111111] text-white px-8 py-3.5 font-bold uppercase text-xs tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all">Add Category</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'copy' && (
          <div className="bg-white p-8 shadow-xl border-t-4 border-[#FFCC00] space-y-10">
            <div>
              <h3 className="text-lg font-black uppercase mb-6 flex items-center text-[#111111]">
                <i className="fas fa-home mr-3 text-[#FFCC00]"></i> Global Messaging
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Main Headline</label>
                  <input value={copy.homeHeroTitle} onChange={e => updateCopy({ homeHeroTitle: e.target.value })} className="w-full border p-4 font-extrabold text-xl text-[#111111] focus:ring-[#FFCC00] outline-none" />
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 border border-green-100 flex items-center text-green-700 text-xs font-bold uppercase tracking-widest">
              <i className="fas fa-check-circle mr-3"></i> Synchronized with main environment
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
