
import React from 'react';
import { useData } from '../DataContext';
import { Link, useLocation } from 'react-router-dom';

const EquipmentList: React.FC = () => {
  const { equipment, categories } = useData();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') || 'All Categories';

  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState(categoryParam);
  
  const filtered = equipment.filter(e => {
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

  const uniqueCategories = ['All Categories', ...categories.map(c => c.name)];

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
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-sm p-2 text-sm text-gray-700 bg-white focus:outline-none h-[42px] cursor-pointer font-bold shadow-sm"
              >
                {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="relative w-full md:w-[400px]">
              <input 
                type="text" 
                placeholder="Search equipment ID, make, model, year, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none placeholder-gray-300 h-[42px] font-medium"
              />
            </div>
          </div>
          
          <div className="text-gray-500 font-bold text-[14px] mb-2">
            Showing <span className="text-black font-black">{filtered.length}</span> results
          </div>
        </div>

        {/* High-Fidelity Data Grid */}
        <div className="overflow-x-auto bg-white border border-[#cccccc] rounded-sm">
          <table className="min-w-full border-collapse">
            <thead className="bg-white">
              <tr className="text-gray-400 text-[14px] font-bold">
                <th className="px-6 py-4 text-left border-r border-b border-[#dddddd] last:border-r-0">ID</th>
                <th className="px-6 py-4 text-left border-r border-b border-[#dddddd] last:border-r-0">Make</th>
                <th className="px-6 py-4 text-left border-r border-b border-[#dddddd] last:border-r-0">Model</th>
                <th className="px-6 py-4 text-left border-r border-b border-[#dddddd] last:border-r-0">Year</th>
                <th className="px-6 py-4 text-left border-r border-b border-[#dddddd] last:border-r-0">Meter</th>
                <th className="px-6 py-4 text-left border-r border-b border-[#dddddd] last:border-r-0">Price</th>
                <th className="px-6 py-4 text-left border-r border-b border-[#dddddd] last:border-r-0">City</th>
                <th className="px-6 py-4 text-left border-r border-b border-[#dddddd] last:border-r-0">State</th>
                <th className="px-6 py-4 text-center border-b border-[#dddddd]"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] font-bold text-black border-r border-b border-[#dddddd] last:border-r-0">
                    {item.id}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] text-gray-700 border-r border-b border-[#dddddd] last:border-r-0">
                    {item.make}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] text-black font-bold border-r border-b border-[#dddddd] last:border-r-0">
                    {item.model}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] text-gray-700 border-r border-b border-[#dddddd] last:border-r-0">
                    {item.year === 0 ? '' : item.year}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] text-gray-700 border-r border-b border-[#dddddd] last:border-r-0">
                    {item.meter}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] border-r border-b border-[#dddddd] last:border-r-0">
                    {item.price === 'SOLD' ? (
                      <span className="text-red-600 font-black uppercase">SOLD</span>
                    ) : (
                      <span className="text-black font-bold">{item.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] text-gray-700 border-r border-b border-[#dddddd] last:border-r-0">
                    {item.city}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] text-gray-700 border-r border-b border-[#dddddd] last:border-r-0">
                    {item.state}
                  </td>
                  <td className="px-6 py-5 text-center border-b border-[#dddddd]">
                    <Link 
                      to={`/equipment/${item.id}`} 
                      className="inline-block border border-[#FFCC00] text-black font-bold px-8 py-3 rounded-[10px] text-[14px] hover:bg-[#FFCC00] transition-all"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquipmentList;
