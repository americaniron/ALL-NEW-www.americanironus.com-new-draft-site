
import React from 'react';
import { useData } from '../DataContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type SortField = 'id' | 'make' | 'model' | 'year' | 'meter' | 'price';
type SortDir = 'asc' | 'desc';

const EquipmentList: React.FC = () => {
  const { equipment, categories } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') || 'All Categories';

  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState(categoryParam);
  const [sortField, setSortField] = React.useState<SortField>('id');
  const [sortDir, setSortDir] = React.useState<SortDir>('asc');
  
  // Selection State
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const parsePrice = (priceStr: string) => {
    if (priceStr.toUpperCase() === 'CALL' || priceStr.toUpperCase() === 'SOLD') return 0;
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  };

  const filteredAndSorted = React.useMemo(() => {
    let results = equipment.filter(e => {
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        e.id.toLowerCase().includes(searchLower) || 
        e.make.toLowerCase().includes(searchLower) ||
        e.model.toLowerCase().includes(searchLower) ||
        e.city.toLowerCase().includes(searchLower) ||
        e.state.toLowerCase().includes(searchLower);
      
      const matchesCategory = category === 'All Categories' || e.category === category;
      
      return matchesSearch && matchesCategory;
    });

    results.sort((a, b) => {
      let valA: any = a[sortField as keyof typeof a];
      let valB: any = b[sortField as keyof typeof b];

      if (sortField === 'price') {
        valA = parsePrice(a.price);
        valB = parsePrice(b.price);
      } else if (sortField === 'meter') {
        valA = parseInt(a.meter.replace(/[^0-9]/g, '')) || 0;
        valB = parseInt(b.meter.replace(/[^0-9]/g, '')) || 0;
      }

      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return results;
  }, [equipment, search, category, sortField, sortDir]);

  const uniqueCategories = ['All Categories', ...categories.map(c => c.name)];

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <i className="fas fa-sort ml-2 text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"></i>;
    return <i className={`fas fa-sort-${sortDir === 'asc' ? 'up' : 'down'} ml-2 text-[#FFCC00]`}></i>;
  };

  // Selection Logic
  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    const allSelected = filteredAndSorted.length > 0 && filteredAndSorted.every(i => selectedIds.has(i.id));
    const next = new Set(selectedIds);
    
    if (allSelected) {
      filteredAndSorted.forEach(i => next.delete(i.id));
    } else {
      filteredAndSorted.forEach(i => next.add(i.id));
    }
    setSelectedIds(next);
  };

  const executeBulkAction = (action: 'quote' | 'download') => {
    if (action === 'quote') {
       const selectedItems = Array.from(selectedIds);
       navigate('/quote', { state: { selectedItems } });
    } else {
       // Generate CSV for download
       const selectedItems = equipment.filter(e => selectedIds.has(e.id));
       const header = ["Stock #", "Make", "Model", "Year", "Meter", "Price", "Location"];
       const rows = selectedItems.map(e => 
         [e.id, e.make, e.model, e.year, `"${e.meter}"`, `"${e.price}"`, `"${e.city}, ${e.state}"`].join(",")
       );
       const csvContent = "data:text/csv;charset=utf-8," + [header.join(","), ...rows].join("\n");
       
       const encodedUri = encodeURI(csvContent);
       const link = document.createElement("a");
       link.setAttribute("href", encodedUri);
       link.setAttribute("download", `american_iron_manifest_${new Date().toISOString().split('T')[0]}.csv`);
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-[#333333]">
      {/* Breadcrumb Strip */}
      <div className="bg-[#f2f2f2] py-3 border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">
            <Link to="/" className="hover:text-[#FFCC00]">Home</Link>
            <span>/</span>
            <Link to="/equipment" className="hover:text-[#FFCC00]">Equipment</Link>
            <span>/</span>
            <span className="text-[#111111]">Inventory</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#111111] uppercase tracking-tight mb-4">
            Equipment Inventory
          </h1>
          <p className="text-gray-600 font-medium text-sm md:text-base max-w-4xl leading-relaxed">
            Real-time access to our global fleet. Use the filters below to narrow by category, or search by specific make, model, or serial identification.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 bg-gray-50 p-4 border border-gray-200 rounded-sm">
          <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto items-end">
            <div className="w-full md:w-64">
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-sm p-2 text-xs font-bold text-[#111111] bg-white focus:outline-none focus:border-[#FFCC00] h-[40px] shadow-sm uppercase"
              >
                {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="relative w-full md:w-[400px]">
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Keyword Search</label>
              <input 
                type="text" 
                placeholder="ID, Make, Model, Location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-sm p-2 text-xs font-bold text-[#111111] focus:outline-none focus:border-[#FFCC00] h-[40px] shadow-sm uppercase placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
            Showing <span className="text-[#111111] font-black">{filteredAndSorted.length}</span> results
          </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-sm">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#f9f9f9] border-b border-gray-200">
              <tr className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                <th className="w-10 px-6 py-4 text-left border-r border-gray-200">
                  <input 
                    type="checkbox" 
                    checked={filteredAndSorted.length > 0 && filteredAndSorted.every(i => selectedIds.has(i.id))}
                    onChange={toggleSelectAll}
                    className="accent-[#FFCC00] w-4 h-4 cursor-pointer"
                  />
                </th>
                <th onClick={() => handleSort('id')} className="group px-6 py-4 text-left border-r border-gray-200 cursor-pointer hover:bg-white hover:text-[#111111] transition-colors">
                  Stock # <SortIcon field="id" />
                </th>
                <th onClick={() => handleSort('make')} className="group px-6 py-4 text-left border-r border-gray-200 cursor-pointer hover:bg-white hover:text-[#111111] transition-colors">
                  Make <SortIcon field="make" />
                </th>
                <th onClick={() => handleSort('model')} className="group px-6 py-4 text-left border-r border-gray-200 cursor-pointer hover:bg-white hover:text-[#111111] transition-colors">
                  Model <SortIcon field="model" />
                </th>
                <th onClick={() => handleSort('year')} className="group px-6 py-4 text-left border-r border-gray-200 cursor-pointer hover:bg-white hover:text-[#111111] transition-colors">
                  Year <SortIcon field="year" />
                </th>
                <th onClick={() => handleSort('meter')} className="group px-6 py-4 text-left border-r border-gray-200 cursor-pointer hover:bg-white hover:text-[#111111] transition-colors">
                  Meter <SortIcon field="meter" />
                </th>
                <th onClick={() => handleSort('price')} className="group px-6 py-4 text-left border-r border-gray-200 cursor-pointer hover:bg-white hover:text-[#111111] transition-colors">
                  Price <SortIcon field="price" />
                </th>
                <th className="px-6 py-4 text-left border-r border-gray-200">Location</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredAndSorted.map((item) => (
                <tr key={item.id} className={`hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${selectedIds.has(item.id) ? 'bg-[#fffbeb]' : ''}`}>
                  <td className="px-6 py-4 border-r border-gray-100">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(item.id)}
                      onChange={() => toggleSelection(item.id)}
                      className="accent-[#FFCC00] w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-[#111111] border-r border-gray-100">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-600 border-r border-gray-100">
                    {item.make}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-black text-[#111111] border-r border-gray-100 uppercase">
                    {item.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-600 border-r border-gray-100">
                    {item.year === 0 ? '--' : item.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-600 border-r border-gray-100">
                    {item.meter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs border-r border-gray-100">
                    {item.price === 'SOLD' ? (
                      <span className="text-red-600 font-black uppercase tracking-tight">SOLD</span>
                    ) : item.price.toUpperCase() === 'CALL' ? (
                      <span className="text-[#111111] font-black uppercase tracking-tight">Inquire</span>
                    ) : (
                      <span className="text-[#111111] font-black tracking-tight">{item.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-600 border-r border-gray-100 uppercase">
                    {item.city ? `${item.city}, ${item.state}` : item.state}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link 
                      to={`/equipment/${item.id}`} 
                      className="inline-block text-[10px] font-black uppercase tracking-widest text-[#111111] border-b-2 border-gray-200 hover:border-[#FFCC00] hover:text-[#FFCC00] transition-colors pb-0.5"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredAndSorted.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <i className="fas fa-search text-gray-200 text-3xl mb-3"></i>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">No assets match your criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bulk Action Sticky Toolbar */}
        {selectedIds.size > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#111111] text-white p-6 z-50 border-t-4 border-[#FFCC00] shadow-2xl animate-[slideUp_0.3s_ease-out]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 bg-[#FFCC00] text-[#111111] flex items-center justify-center font-black text-lg rounded-full">
                  {selectedIds.size}
                </div>
                <div>
                  <div className="text-white font-black uppercase text-sm tracking-tight">Assets Selected</div>
                  <div className="text-[#FFCC00] text-[9px] font-bold uppercase tracking-[0.2em]">Bulk Operation Console</div>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => executeBulkAction('quote')} 
                  className="bg-[#FFCC00] text-[#111111] px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-md flex items-center"
                >
                  <i className="fas fa-file-invoice-dollar mr-2"></i> Request Quote
                </button>
                <button 
                  onClick={() => executeBulkAction('download')} 
                  className="bg-white text-[#111111] px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center"
                >
                  <i className="fas fa-file-csv mr-2"></i> Export CSV
                </button>
                <button 
                  onClick={() => setSelectedIds(new Set())} 
                  className="text-gray-400 px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentList;
