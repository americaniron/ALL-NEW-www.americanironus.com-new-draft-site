
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../DataContext';

type CategorySortField = 'name' | 'count';
type SortDirection = 'asc' | 'desc';

const LazyCategoryImage = ({ src, alt, className }: { src: string, alt: string, className: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(!src);
  
  // Placeholder state for broken or missing images
  if (hasError) {
    return (
      <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center border border-gray-100/50 rounded-sm">
        <i className="fas fa-industry text-gray-200 text-5xl mb-3"></i>
        <div className="text-[7px] font-black uppercase text-gray-400 tracking-[0.4em] text-center px-4">
          Asset Image Unmapped
        </div>
        <div className="absolute bottom-2 right-2 text-[6px] font-mono text-gray-300">ERR_IMG_NULL</div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={className} 
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <i className="fas fa-industry text-gray-200 text-3xl"></i>
        </div>
      )}
    </div>
  );
};

const Equipment: React.FC = () => {
  const { categories, equipment } = useData();
  const [sortField, setSortField] = useState<CategorySortField>('name');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  // Aggregate asset counts for each category to provide real-time inventory depth
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    equipment.forEach(item => {
      stats[item.category] = (stats[item.category] || 0) + 1;
    });
    return stats;
  }, [equipment]);

  // Handle sorting logic for categories
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      let valA: string | number;
      let valB: string | number;

      if (sortField === 'name') {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else {
        valA = categoryStats[a.name] || 0;
        valB = categoryStats[b.name] || 0;
      }

      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [categories, sortField, sortDir, categoryStats]);

  const toggleSort = (field: CategorySortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const getSortLabel = () => {
    const field = sortField === 'name' ? 'Alphabetical' : 'Asset Count';
    const direction = sortDir === 'asc' ? 'Ascending' : 'Descending';
    return `${field} (${direction})`;
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-14">
          <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">
            <Link to="/" className="hover:text-[#111111] transition-colors">Home</Link>
            <span className="text-gray-200">/</span>
            <span className="text-[#111111]">Equipment Classifications</span>
          </div>
          
          <h1 className="text-[52px] font-bold text-[#b3b3b3] mb-4 leading-none tracking-tight uppercase">Equipment</h1>
          <p className="text-[#b3b3b3] text-[18px] font-medium mb-10 max-w-2xl leading-relaxed">
            Browse our comprehensive inventory of production-class machinery. American Iron LLC maintains a globally distributed fleet of high-performance industrial assets.
          </p>
          
          <Link 
            to="/equipment-list" 
            className="inline-flex items-center bg-[#111111] text-white px-8 py-4 text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#FFCC00] hover:text-[#111111] transition-all shadow-lg"
          >
            <i className="fas fa-th-list mr-3"></i>
            Access Full Inventory Matrix
          </Link>
        </div>

        {/* Section Metadata Header & Sorting Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-gray-100 pb-8 gap-6">
          <div className="flex-grow">
            <h2 className="text-[28px] font-black text-[#111111] uppercase tracking-tighter leading-none">Category Index</h2>
            <div className="flex items-center mt-4">
              <div className="h-1 w-24 bg-[#FFCC00]"></div>
              <div className="ml-4 text-[9px] font-black uppercase text-gray-400 tracking-widest bg-gray-50 px-3 py-1 border border-gray-100 rounded-full">
                Sorting by: <span className="text-[#111111]">{getSortLabel()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-end gap-6 w-full md:w-auto">
            {/* Enhanced Sorting Controls */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Inventory Arrangement</span>
              <div className="flex bg-gray-50 p-1 rounded-sm border border-gray-100">
                <button 
                  onClick={() => toggleSort('name')}
                  aria-label={`Sort by Name ${sortDir === 'asc' ? 'descending' : 'ascending'}`}
                  className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all flex items-center rounded-sm ${sortField === 'name' ? 'bg-white shadow-md text-[#111111]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <i className="fas fa-arrow-down-a-z mr-2 opacity-40"></i>
                  Name
                  {sortField === 'name' && (
                    <i className={`fas fa-chevron-${sortDir === 'asc' ? 'up' : 'down'} ml-3 text-[#FFCC00]`}></i>
                  )}
                </button>
                <button 
                  onClick={() => toggleSort('count')}
                  aria-label={`Sort by Count ${sortDir === 'asc' ? 'descending' : 'ascending'}`}
                  className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all flex items-center rounded-sm ${sortField === 'count' ? 'bg-white shadow-md text-[#111111]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <i className="fas fa-database mr-2 opacity-40"></i>
                  Depth
                  {sortField === 'count' && (
                    <i className={`fas fa-chevron-${sortDir === 'asc' ? 'up' : 'down'} ml-3 text-[#FFCC00]`}></i>
                  )}
                </button>
              </div>
            </div>

            <div className="text-right hidden sm:block border-l border-gray-100 pl-6">
              <span className="text-[32px] font-black text-[#111111] leading-none tracking-tighter">{categories.length}</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mt-1">Global Sectors</span>
            </div>
          </div>
        </div>

        {/* Equipment Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {sortedCategories.map((cat, idx) => {
            const assetCount = categoryStats[cat.name] || 0;
            
            return (
              <Link 
                to={`/equipment-list?category=${encodeURIComponent(cat.name)}`} 
                key={cat.name} 
                className="group flex flex-col bg-white border border-gray-200 rounded-sm hover:border-[#FFCC00] hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out overflow-hidden"
              >
                {/* 4:3 Aspect Ratio Image Container */}
                <div className="w-full relative aspect-[4/3] bg-gray-50 flex items-center justify-center p-8 overflow-hidden">
                  {/* Subtle Background Markings */}
                  <div className="absolute top-2 left-2 text-[8px] font-black text-gray-200 select-none">AI-INDEX-{idx + 100}</div>
                  
                  {/* Asset Count Indicator */}
                  <div className="absolute top-4 right-4 z-10 bg-[#111111] text-[#FFCC00] px-3 py-1 text-[9px] font-black uppercase tracking-widest shadow-xl border-b-2 border-[#FFCC00]">
                    {assetCount} Units
                  </div>

                  <LazyCategoryImage 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                  />
                  
                  {/* Hover Overlay Shade */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-[0.03] transition-opacity"></div>
                </div>
                
                {/* Information Block */}
                <div className="p-8 flex-grow flex flex-col bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-black uppercase text-[#111111] text-[17px] tracking-tighter leading-tight group-hover:text-[#FFCC00] transition-colors">
                      {cat.name}
                    </h3>
                    {cat.icon && (
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-[#FFCC00] transition-colors group-hover:border-[#FFCC00]">
                        <i className={`fas ${cat.icon} text-gray-300 group-hover:text-[#111111] transition-colors text-xs`}></i>
                      </div>
                    )}
                  </div>
                  
                  <div className="h-[72px]"> {/* Fixed height for text consistency across rows */}
                    <p className="text-[12px] text-gray-500 font-semibold leading-relaxed line-clamp-3">
                      {cat.description || 'Enterprise-grade machinery solutions designed for high-availability performance in professional industrial environments.'}
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-[#111111]">
                      <span>Explore Assets</span>
                      <i className="fas fa-arrow-right-long ml-3 group-hover:translate-x-2 transition-transform duration-300 text-[#FFCC00]"></i>
                    </div>
                    <div className="text-[14px] font-black text-gray-100 group-hover:text-gray-200 transition-colors select-none font-mono">
                      #{cat.name.slice(0, 3)}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Support Call-to-Action */}
        <div className="mt-32 bg-[#111111] rounded-sm p-16 flex flex-col items-center text-center relative overflow-hidden group border-b-8 border-[#FFCC00]">
            {/* Visual Industrial Flourish */}
            <div className="absolute top-0 left-0 w-2 h-full bg-[#FFCC00]"></div>
            
            <div className="max-w-2xl relative z-10">
                <i className="fas fa-magnifying-glass-location text-4xl text-[#FFCC00] mb-8"></i>
                <h3 className="text-[36px] font-bold text-white uppercase mb-6 tracking-tight">Custom Procurement Request</h3>
                <p className="text-gray-400 font-medium uppercase tracking-tight text-[14px] leading-relaxed mb-10">
                    Cannot find the specific asset required for your project? Our enterprise sourcing team can perform targeted inspections and logistics for off-market machinery.
                </p>
                <Link to="/quote" className="inline-flex items-center bg-[#FFCC00] text-[#111111] px-12 py-5 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all shadow-2xl">
                  Contact Sourcing Division
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
