
import React from 'react';
import { useData } from '../DataContext';
import { Link, useLocation } from 'react-router-dom';

type SortField = 'id' | 'make' | 'model' | 'year' | 'meter' | 'price';
type SortDir = 'asc' | 'desc';

const EquipmentList: React.FC = () => {
  const { equipment, categories } = useData();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') || 'All Categories';

  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState(categoryParam);
  const [sortField, setSortField] = React.useState<SortField>('id');
  const [sortDir, setSortDir] = React.useState<SortDir>('asc');
  
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

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Identical Enterprise Header Architecture */}
        <div className="mb-16">
          <h1 className="text-[52px] font-bold text-[#b3b3b3] mb-4 leading-none">Equipment Inventory</h1>
          <p className="text-[#b3b3b3] text-[18px] font-medium">Filter by category and search by make/model/ID/location.</p>
        </div>

        {/* Precision Inventory Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto items-end">
            <div className="w-full md:w-64">
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Filter by Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-sm p-2 text-sm text-gray-700 bg-white focus:outline-none h-[42px] cursor-pointer font-bold shadow-sm"
              >
                {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="relative w-full md:w-[400px]">
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Search Assets</label>
              <input 
                type="text" 
                placeholder="ID, make, model, year, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none placeholder-gray-300 h-[42px] font-medium"
              />
            </div>
          </div>
          
          <div className="text-gray-500 font-bold text-[14px] mb-2 uppercase tracking-tighter">
            Showing <span className="text-black font-black">{filteredAndSorted.length}</span> assets
          </div>
        </div>

        {/* High-Fidelity Data Grid */}
        <div className="overflow-x-auto bg-white border border-[#cccccc] rounded-sm shadow-sm">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50 border-b border-[#dddddd]">
              <tr className="text-gray-400 text-[12px] font-black uppercase tracking-widest">
                <th onClick={() => handleSort('id')} className="group px-6 py-4 text-left border-r border-[#dddddd] cursor-pointer hover:bg-white transition-colors">
                  ID <SortIcon field="id" />
                </th>
                <th onClick={() => handleSort('make')} className="group px-6 py-4 text-left border-r border-[#dddddd] cursor-pointer hover:bg-white transition-colors">
                  Make <SortIcon field="make" />
                </th>
                <th onClick={() => handleSort('model')} className="group px-6 py-4 text-left border-r border-[#dddddd] cursor-pointer hover:bg-white transition-colors">
                  Model <SortIcon field="model" />
                </th>
                <th onClick={() => handleSort('year')} className="group px-6 py-4 text-left border-r border-[#dddddd] cursor-pointer hover:bg-white transition-colors">
                  Year <SortIcon field="year" />
                </th>
                <th onClick={() => handleSort('meter')} className="group px-6 py-4 text-left border-r border-[#dddddd] cursor-pointer hover:bg-white transition-colors">
                  Meter <SortIcon field="meter" />
                </th>
                <th onClick={() => handleSort('price')} className="group px-6 py-4 text-left border-r border-[#dddddd] cursor-pointer hover:bg-white transition-colors">
                  Price <SortIcon field="price" />
                </th>
                <th className="px-6 py-4 text-left border-r border-[#dddddd]">City</th>
                <th className="px-6 py-4 text-left border-r border-[#dddddd]">State</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredAndSorted.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] font-bold text-black border-r border-b border-[#dddddd] last:border-r-0">
                    {item.id}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] text-gray-700 border-r border-b border-[#dddddd] last:border-r-0">
                    {item.make}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] text-black font-bold border-r border-b border-[#dddddd] last:border-r-0 uppercase">
                    {item.model}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] text-gray-700 border-r border-b border-[#dddddd] last:border-r-0 font-mono">
                    {item.year === 0 ? '--' : item.year}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] text-gray-700 border-r border-b border-[#dddddd] last:border-r-0 font-mono">
                    {item.meter}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] border-r border-b border-[#dddddd] last:border-r-0">
                    {item.price === 'SOLD' ? (
                      <span className="text-red-600 font-black uppercase tracking-tighter">SOLD</span>
                    ) : item.price.toUpperCase() === 'CALL' ? (
                      <span className="text-blue-600 font-bold uppercase tracking-tighter underline">CALL FOR PRICE</span>
                    ) : (
                      <span className="text-black font-black font-mono">{item.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] text-gray-700 border-r border-b border-[#dddddd] last:border-r-0 uppercase">
                    {item.city || '--'}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] text-gray-700 border-r border-b border-[#dddddd] last:border-r-0 uppercase">
                    {item.state}
                  </td>
                  <td className="px-6 py-5 text-center border-b border-[#dddddd]">
                    <Link 
                      to={`/equipment/${item.id}`} 
                      className="inline-block border-2 border-[#111111] text-black font-black px-6 py-2 rounded-sm text-[12px] uppercase tracking-widest hover:bg-[#FFCC00] hover:border-[#FFCC00] transition-all"
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredAndSorted.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-20 text-center text-gray-400 uppercase font-bold tracking-widest">
                    No assets matching current criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquipmentList;
