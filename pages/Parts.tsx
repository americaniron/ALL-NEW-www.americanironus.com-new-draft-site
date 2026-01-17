
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PARTS_CATEGORIES } from '../constants';

const LazyPartImage = ({ src, alt, className }: { src: string, alt: string, className: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`relative bg-gray-100 transition-all duration-700 overflow-hidden ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={className} 
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-20">
          <i className="fas fa-circle-notch fa-spin text-[#FFCC00]"></i>
        </div>
      )}
    </div>
  );
};

const Parts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/parts-list?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/parts-list');
    }
  };

  return (
    <div className="bg-white">
      {/* Parts Hero with Integrated Search */}
      <section 
        className="relative h-[550px] bg-cover bg-center flex items-center justify-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1600')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 to-black/70"></div>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-white text-center w-full">
            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                CRITICAL<br/><span className="text-[#FFCC00]">COMPONENTS.</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-2xl leading-relaxed mx-auto mb-12">
                Global sourcing network for OEM and certified aftermarket parts. Keep your fleet operational with our rapid-deployment logistics.
            </p>
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm p-4 border border-white/20 flex items-center shadow-2xl">
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Part #, Keyword, or Component Name..."
                  className="flex-grow bg-transparent text-white placeholder-gray-400 border-none focus:ring-0 outline-none text-lg font-bold px-4 py-2"
                />
                <button type="submit" className="bg-[#FFCC00] text-[#111111] px-10 py-4 font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg text-sm">
                    Search
                </button>
            </form>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-8">
            <div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-[#111111] mb-2">Or Browse by System</h2>
                <p className="text-gray-500 font-medium text-sm">Select a category to explore specialized components.</p>
            </div>
            <div className="text-right hidden md:block">
                <div className="text-3xl font-black text-[#111111]">{PARTS_CATEGORIES.length}</div>
                <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Core Systems</div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {PARTS_CATEGORIES.map((cat, idx) => (
                <Link 
                    to={`/parts-list?category=${encodeURIComponent(cat.name)}`} 
                    key={idx} 
                    className="group relative flex flex-col bg-white border border-gray-200 hover:border-[#FFCC00] hover:shadow-xl transition-all duration-300"
                >
                    <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                        <LazyPartImage 
                            src={cat.img} 
                            alt={cat.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white font-black uppercase text-xs tracking-widest border-b-2 border-[#FFCC00] pb-1">View Items</span>
                        </div>
                    </div>
                    
                    <div className="p-6 flex items-center justify-between bg-white border-t border-gray-100">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-tighter text-[#111111] group-hover:text-[#FFCC00] transition-colors">{cat.name}</h3>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Component Group</p>
                        </div>
                        <i className={`fas ${cat.icon} text-gray-300 group-hover:text-[#111111] transition-colors`}></i>
                    </div>
                </Link>
            ))}
        </div>

        <div className="mt-32 bg-[#111111] text-white p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-full bg-[#FFCC00] opacity-10 skew-x-12 transform translate-x-20"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
                <div>
                    <h3 className="text-3xl font-black uppercase mb-6 tracking-tight text-white">Hard-to-Find Procurement</h3>
                    <p className="text-gray-400 leading-relaxed font-medium mb-8">
                        Our procurement division maintains direct lines to dismantling yards and surplus depots globally. If a part exists, we can source it, verify its condition, and ship it to your job site.
                    </p>
                    <ul className="space-y-4 text-sm font-bold uppercase text-gray-500 mb-8">
                        <li className="flex items-center"><i className="fas fa-check text-[#FFCC00] mr-3"></i> Obsolete Component Sourcing</li>
                        <li className="flex items-center"><i className="fas fa-check text-[#FFCC00] mr-3"></i> Core Exchange Program</li>
                        <li className="flex items-center"><i className="fas fa-check text-[#FFCC00] mr-3"></i> Remanufactured Options</li>
                    </ul>
                    <Link to="/quote" className="inline-block bg-white text-[#111111] px-10 py-4 font-black uppercase tracking-widest hover:bg-[#FFCC00] transition-all">
                        Submit Sourcing Request
                    </Link>
                </div>
                <div className="hidden lg:block relative">
                    <img src="https://images.unsplash.com/photo-1626270636284-a1df88720dfd?q=80&w=800" className="shadow-2xl border-4 border-[#333] grayscale hover:grayscale-0 transition-all duration-700" alt="Engine Block" />
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Parts;
