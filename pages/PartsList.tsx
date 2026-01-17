
import React, { useEffect } from 'react';
import { useData } from '../DataContext';
import { Link, useLocation } from 'react-router-dom';
import { getPartsRecommendation } from '../services/geminiService';
import { PARTS_CATEGORIES } from '../constants';

const PartsList: React.FC = () => {
  const { parts } = useData();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'All Categories';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = React.useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiResponse, setAiResponse] = React.useState<string | null>(null);
  
  // Sync state with URL params on navigation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get('search') || '');
    setSelectedCategory(params.get('category') || 'All Categories');
  }, [location.search]);

  const filtered = React.useMemo(() => {
    let results = parts;

    // Filter by Category (Basic string matching since data categories are specific)
    if (selectedCategory !== 'All Categories') {
      const catLower = selectedCategory.toLowerCase();
      // Simple mapping logic: if user selects 'ENGINE', we look for 'engine' in the data's category field
      results = results.filter(p => p.category.toLowerCase().includes(catLower));
    }

    // Filter by Search
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(p => 
        p.part_number.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      );
    }

    return results.slice(0, 50); // Pagination limit
  }, [parts, search, selectedCategory]);

  const handleAiSearch = async () => {
    if (!search) return;
    setAiLoading(true);
    setAiResponse(null);
    const result = await getPartsRecommendation(search);
    setAiResponse(result);
    setAiLoading(false);
  };

  const categoryOptions = ['All Categories', ...PARTS_CATEGORIES.map(c => c.name)];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        <Link to="/parts" className="text-[10px] font-black uppercase text-gray-400 hover:text-black mb-4 inline-block tracking-[0.2em] transition-colors">← Back to Categories Index</Link>
        <h1 className="text-5xl font-black uppercase tracking-tighter text-[#111111]">Parts Inventory Matrix</h1>
        <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-sm">Searching {parts.length.toLocaleString()} individual line items</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-8 mb-12">
        <div className="flex flex-col lg:flex-row gap-8 items-end">
            
            {/* Category Filter */}
            <div className="w-full lg:w-1/4">
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Filter System</label>
                <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-[60px] px-4 bg-white border-2 border-gray-200 focus:border-[#FFCC00] outline-none font-bold uppercase text-sm cursor-pointer"
                >
                    {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>

            {/* Search Bar */}
            <div className="flex-grow w-full">
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Part Identification</label>
                <div className="relative group">
                    <input 
                    type="text" 
                    placeholder="Enter Part Number (e.g., 2B-9498) or Keyword..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-[60px] bg-white border-2 border-gray-200 px-6 focus:border-[#FFCC00] outline-none font-black uppercase text-lg transition-all"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <button 
                            onClick={handleAiSearch}
                            disabled={aiLoading}
                            className="bg-[#111111] text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all disabled:opacity-50"
                        >
                            {aiLoading ? 'Scanning...' : 'AI Lookup'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {aiResponse && (
        <div className="mb-12 p-8 bg-[#111111] text-white border-l-8 border-[#FFCC00] shadow-2xl animate-fade-in relative">
            <button onClick={() => setAiResponse(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                <i className="fas fa-times"></i>
            </button>
            <h4 className="text-[10px] font-black uppercase text-[#FFCC00] tracking-[0.3em] mb-4">
                <i className="fas fa-microchip mr-2"></i>AI Technical Analysis
            </h4>
            <p className="text-sm leading-relaxed font-medium text-gray-300">{aiResponse}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map((part) => (
            <div key={part.part_number} className="bg-white border border-gray-200 hover:border-[#FFCC00] flex flex-col transition-all group overflow-hidden hover:shadow-2xl">
                <div className="h-64 bg-gray-100 flex items-center justify-center relative overflow-hidden p-8">
                    {/* Industrial Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)]"></div>
                    
                    <img src={part.image} alt={part.description} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-[#111111] text-[#FFCC00] px-3 py-1 text-[9px] font-black uppercase tracking-widest shadow-lg">
                        PN: {part.part_number}
                    </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">{part.category}</span>
                        <h3 className="text-xl font-black tracking-tighter text-[#111111] uppercase leading-tight">{part.description}</h3>
                    </div>
                    
                    <div className="space-y-2 mb-8 flex-grow">
                        {Object.entries(part.attributes).slice(0, 3).map(([k, v]) => (
                            <div key={k} className="flex justify-between text-[10px] border-b border-gray-100 py-2">
                                <span className="font-bold text-gray-500 uppercase">{k}</span>
                                <span className="font-black text-[#111111] uppercase text-right">{v}</span>
                            </div>
                        ))}
                    </div>

                    <Link 
                        to="/quote" 
                        className="w-full flex items-center justify-center bg-gray-50 text-[#111111] py-4 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#FFCC00] transition-all border border-gray-100 group-hover:border-[#FFCC00]"
                    >
                        Request Price
                        <i className="fas fa-chevron-right ml-2 text-[8px]"></i>
                    </Link>
                </div>
            </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-32 text-center bg-gray-50 border-2 border-dashed border-gray-200">
            <i className="fas fa-magnifying-glass text-5xl text-gray-300 mb-6"></i>
            <h3 className="text-2xl font-black uppercase text-gray-400 tracking-tight">No Matching Components</h3>
            <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">Adjust filters or consult our global database via AI</p>
        </div>
      )}
      
      <div className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-300 text-[9px] font-black uppercase tracking-[0.4em]">
        End of Data Stream
      </div>
    </div>
  );
};

export default PartsList;
