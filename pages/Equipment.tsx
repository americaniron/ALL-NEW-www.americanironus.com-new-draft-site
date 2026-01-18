
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../DataContext';
import { getStrategicAnalysis } from '../services/geminiService';

type CategorySortField = 'name' | 'count';
type SortDirection = 'asc' | 'desc';

const LazyCategoryImage = ({ src, alt, className }: { src: string, alt: string, className: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(!src);
  
  if (hasError) {
    return (
      <div className="w-full h-full bg-white flex flex-col items-center justify-center">
        <i className="fas fa-camera text-gray-200 text-3xl mb-2"></i>
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={className} 
      />
    </div>
  );
};

const Equipment: React.FC = () => {
  const { categories, equipment } = useData();
  const [sortField, setSortField] = useState<CategorySortField>('name');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');
  
  // AI State
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Aggregate asset counts
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    equipment.forEach(item => {
      stats[item.category] = (stats[item.category] || 0) + 1;
    });
    return stats;
  }, [equipment]);

  // Sort Logic
  const sortedCategories = useMemo(() => {
    const sorted = [...categories];
    sorted.sort((a, b) => {
      if (sortField === 'name') {
        const result = a.name.localeCompare(b.name);
        return sortDir === 'asc' ? result : -result;
      } else {
        const countA = categoryStats[a.name] || 0;
        const countB = categoryStats[b.name] || 0;
        if (countA !== countB) return sortDir === 'asc' ? countA - countB : countB - countA;
        return a.name.localeCompare(b.name);
      }
    });
    return sorted;
  }, [categories, sortField, sortDir, categoryStats]);

  const toggleSort = (field: CategorySortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir(field === 'count' ? 'desc' : 'asc');
    }
  };

  const generateFleetInsight = async () => {
    setIsAiLoading(true);
    setAiInsight(null);
    try {
      const inventorySummary = categories.map(c => `${c.name}: ${categoryStats[c.name] || 0}`).join(', ');
      const prompt = `Executive Fleet Analysis: Review this inventory distribution by category for American Iron LLC. Data: ${inventorySummary}. Provide 3 brief, high-level strategic insights.`;
      const result = await getStrategicAnalysis(prompt);
      setAiInsight(result);
    } catch (e) {
      setAiInsight("Analysis temporarily unavailable.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-[#333333]">
      {/* Breadcrumb Strip - Corporate Style */}
      <div className="bg-[#f2f2f2] py-3 border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <Link to="/" className="hover:text-[#FFCC00]">Home</Link>
            <span>/</span>
            <Link to="/equipment" className="hover:text-[#FFCC00]">Products</Link>
            <span>/</span>
            <span className="text-[#111111]">Cat® Machines</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Page Header */}
        <div className="mb-16 border-b-2 border-gray-100 pb-10">
          <h1 className="text-4xl md:text-6xl font-black text-[#111111] uppercase tracking-tighter mb-6 leading-none">
            CAT® MACHINES
          </h1>
          <p className="text-gray-500 font-bold text-lg max-w-4xl leading-relaxed uppercase tracking-tight">
            Select a machine category to view available high-fidelity models, technical specifications, and current industrial inventory.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 border border-gray-200 p-6 mb-16 gap-6 rounded-sm">
          <div className="flex items-center">
             <button 
              onClick={generateFleetInsight}
              className="text-[11px] font-black uppercase tracking-widest bg-[#111111] text-white hover:bg-[#FFCC00] hover:text-[#111111] flex items-center transition-all px-8 py-3.5 shadow-md"
              disabled={isAiLoading}
            >
              {isAiLoading ? <i className="fas fa-sync fa-spin mr-2"></i> : <i className="fas fa-bolt mr-2"></i>}
              {isAiLoading ? 'ANALYZING FLEET...' : 'FLEET INTELLIGENCE'}
            </button>
          </div>

          <div className="flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest text-gray-500">
            <span className="text-gray-300">SORT BY:</span>
            <button onClick={() => toggleSort('name')} className={`hover:text-[#111111] flex items-center transition-colors ${sortField === 'name' ? 'text-[#111111]' : ''}`}>
              MACHINE GROUP <i className={`fas ${sortDir === 'asc' ? 'fa-caret-up' : 'fa-caret-down'} ml-2`}></i>
            </button>
          </div>
        </div>

        {/* AI Result */}
        {aiInsight && (
          <div className="mb-16 bg-[#111111] p-10 border-l-[12px] border-[#FFCC00] shadow-2xl animate-fade-in relative">
             <div className="flex justify-between items-start mb-6">
                <h3 className="font-black text-xs uppercase tracking-[0.3em] text-[#FFCC00]">STRATEGIC FLEET ANALYSIS</h3>
                <button onClick={() => setAiInsight(null)} className="text-gray-500 hover:text-white transition-colors"><i className="fas fa-times text-xl"></i></button>
             </div>
             <p className="text-lg text-gray-100 font-bold leading-relaxed whitespace-pre-wrap">{aiInsight}</p>
          </div>
        )}

        {/* Product Grid - Precise 4-Column Corporate Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedCategories.map((cat) => {
            return (
              <Link 
                to={`/equipment-list?category=${encodeURIComponent(cat.name)}`} 
                key={cat.name} 
                className="group flex flex-col h-full bg-white border border-gray-200 hover:border-[#111111] transition-all duration-300 p-0 shadow-sm hover:shadow-2xl"
              >
                {/* Image Area - Clean with industrial focus */}
                <div className="w-full aspect-[4/3] bg-white flex items-center justify-center p-8 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <LazyCategoryImage 
                      src={cat.img} 
                      alt={cat.name} 
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 z-10"
                   />
                </div>

                {/* Info Area */}
                <div className="p-8 border-t border-gray-100 flex-grow flex flex-col bg-white">
                  <div className="flex justify-between items-start mb-4">
                    {cat.icon && (
                        <i className={`fas ${cat.icon} text-2xl text-[#FFCC00]`}></i>
                    )}
                    <span className="bg-[#111111] text-white text-[8px] font-black uppercase px-2 py-1 tracking-widest rounded-sm">
                        {categoryStats[cat.name] || 0} UNITS
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black text-[#111111] uppercase tracking-tighter mb-2 group-hover:text-[#FFCC00] transition-colors leading-none">
                    {cat.name}
                  </h3>

                  {/* Enhanced Context: Primary Application Tag */}
                  {cat.primaryApplication && (
                    <div className="mb-4">
                        <span className="text-[9px] font-black uppercase text-[#FFCC00] bg-gray-50 border border-gray-100 px-2 py-0.5 tracking-wider">
                            {cat.primaryApplication}
                        </span>
                    </div>
                  )}
                  
                  <p className="text-[12px] text-gray-500 font-bold leading-relaxed mb-8 flex-grow uppercase tracking-tight">
                    {cat.description}
                  </p>

                  <div className="mt-auto border-t-2 border-gray-50 pt-6">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#111111] inline-flex items-center group-hover:text-[#FFCC00] transition-all">
                      VIEW MODELS <i className="fas fa-chevron-right ml-3 text-[10px]"></i>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Industrial Support Section */}
        <div className="mt-32 bg-[#f9f9f9] border-t-8 border-[#111111] p-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h3 className="text-4xl font-black uppercase text-[#111111] mb-6 tracking-tighter">UNMATCHED FLEET SUPPORT</h3>
            <p className="text-gray-600 font-bold text-lg mb-10 leading-relaxed uppercase tracking-tight">
              At American Iron, we don't just sell machines. We architect lifecycle solutions. Our procurement networks and logistics command center ensure your project remains on schedule, anywhere on the planet.
            </p>
            <div className="flex flex-wrap gap-6">
               <Link to="/contact" className="bg-[#111111] text-white px-12 py-5 text-xs font-black uppercase tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all rounded-sm shadow-lg">
                  CONNECT WITH A SPECIALIST
               </Link>
               <Link to="/quote" className="border-4 border-[#111111] text-[#111111] px-12 py-5 text-xs font-black uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all rounded-sm">
                  REQUEST QUOTE
               </Link>
            </div>
          </div>
          <div className="bg-[#111111] p-12 border-t-[12px] border-[#FFCC00] shadow-2xl">
             <h4 className="text-white text-lg font-black uppercase mb-6 tracking-widest">EXPORT COMMAND</h4>
             <p className="text-xs text-gray-400 font-bold mb-10 uppercase tracking-widest leading-relaxed">
                We handle AES filings, intercontinental port drayage, and heavy-haul compliance for the global distribution of all assets.
             </p>
             <Link to="/shipping" className="text-[11px] font-black uppercase text-[#FFCC00] border-b-2 border-[#FFCC00] pb-1.5 hover:text-white hover:border-white transition-all">
                LEARN ABOUT LOGISTICS <i className="fas fa-arrow-right ml-2"></i>
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Equipment;
