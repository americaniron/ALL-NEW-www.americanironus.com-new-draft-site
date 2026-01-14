
import React from 'react';
import { useData } from '../DataContext';
import { Link } from 'react-router-dom';
import { getPartsRecommendation } from '../services/geminiService';

const PartsList: React.FC = () => {
  const { parts } = useData();
  const [search, setSearch] = React.useState('');
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiResponse, setAiResponse] = React.useState<string | null>(null);
  
  const filtered = React.useMemo(() => {
    if (!search) return parts.slice(0, 50);
    const searchLower = search.toLowerCase();
    return parts.filter(p => 
      p.part_number.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower)
    ).slice(0, 50);
  }, [parts, search]);

  const handleAiSearch = async () => {
    if (!search) return;
    setAiLoading(true);
    setAiResponse(null);
    const result = await getPartsRecommendation(search);
    setAiResponse(result);
    setAiLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-12">
        <Link to="/parts" className="text-[10px] font-black uppercase text-gray-400 hover:text-black mb-4 inline-block tracking-[0.2em]">← Back to Categories Index</Link>
        <h1 className="text-5xl font-black uppercase tracking-tighter text-[#111111]">Parts Inventory Matrix</h1>
        <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-sm">Searching {parts.length.toLocaleString()} individual line items</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12 items-start">
        <div className="flex-grow w-full">
            <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Enter Part Number or Component Name (e.g., 2B-9498)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-200 p-6 focus:border-[#FFCC00] focus:bg-white outline-none font-black uppercase text-lg transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
                    <button 
                        onClick={handleAiSearch}
                        disabled={aiLoading}
                        className="bg-[#111111] text-white px-6 py-2 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all disabled:opacity-50"
                    >
                        {aiLoading ? 'Analyzing...' : '✨ AI Lookup'}
                    </button>
                </div>
            </div>
        </div>
      </div>

      {aiResponse && (
        <div className="mb-12 p-8 bg-gray-900 text-white rounded-sm border-l-8 border-[#FFCC00] shadow-2xl animate-fade-in relative">
            <button onClick={() => setAiResponse(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                <i className="fas fa-times"></i>
            </button>
            <h4 className="text-[10px] font-black uppercase text-[#FFCC00] tracking-[0.3em] mb-4">AI Intelligence Result</h4>
            <p className="text-sm leading-relaxed font-medium">{aiResponse}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((part) => (
            <div key={part.part_number} className="bg-white border border-gray-200 hover:border-[#FFCC00] p-0 flex flex-col transition-all group overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    <img src={part.image} alt={part.description} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase">Ref: {part.part_number.slice(0,2)}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">{part.category}</span>
                        <h3 className="text-xl font-black tracking-tighter text-black uppercase">{part.description}</h3>
                        <p className="text-[#FFCC00] font-black font-mono text-lg">{part.part_number}</p>
                    </div>
                    
                    <div className="space-y-1 mb-6 flex-grow">
                        {Object.entries(part.attributes).slice(0, 3).map(([k, v]) => (
                            <div key={k} className="flex justify-between text-[10px] border-b border-gray-50 py-1">
                                <span className="font-bold text-gray-400 uppercase">{k}</span>
                                <span className="font-black text-gray-700 uppercase">{v}</span>
                            </div>
                        ))}
                    </div>

                    <Link 
                        to="/quote" 
                        className="w-full text-center bg-gray-100 text-[#111111] py-3 font-black uppercase text-[11px] tracking-widest hover:bg-[#FFCC00] transition-all"
                    >
                        Request Component Quote
                    </Link>
                </div>
            </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-32 text-center bg-gray-50 border-2 border-dashed border-gray-200">
            <i className="fas fa-search text-5xl text-gray-200 mb-6"></i>
            <h3 className="text-xl font-black uppercase text-gray-400">Not found in inventory</h3>
            <p className="text-sm text-gray-400 mt-2 font-bold uppercase tracking-widest">Try a broader search term or contact our procurement team</p>
        </div>
      )}
      
      <div className="mt-12 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
        End of Visible Data Matrix
      </div>
    </div>
  );
};

export default PartsList;
