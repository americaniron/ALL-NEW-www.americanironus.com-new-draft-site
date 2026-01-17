
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { EQUIPMENT_LISTINGS } from '../constants';

const EquipmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const item = EQUIPMENT_LISTINGS.find(e => e.id === id);
  const [activeImage, setActiveImage] = useState(item?.img);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black uppercase mb-4 tracking-tighter">Asset Not Located</h2>
        <Link to="/equipment-list" className="bg-[#111111] text-white px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all">Return to Inventory</Link>
      </div>
    );
  }

  // Generate some mock thumbnails based on the ID for visual variety
  const thumbnails = [
    item.img,
    `https://picsum.photos/id/${(parseInt(item.id.slice(-2)) + 10) % 200}/800/600`,
    `https://picsum.photos/id/${(parseInt(item.id.slice(-2)) + 15) % 200}/800/600`,
    `https://picsum.photos/id/${(parseInt(item.id.slice(-2)) + 20) % 200}/800/600`,
  ];

  return (
    <div className="bg-[#f4f4f4] min-h-screen pb-20">
      {/* Industrial Header Strip */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center space-x-2 mb-2 md:mb-0">
            <Link to="/" className="hover:text-[#111111]">Home</Link>
            <span className="text-[#FFCC00]">/</span>
            <Link to="/equipment-list" className="hover:text-[#111111]">Inventory</Link>
            <span className="text-[#FFCC00]">/</span>
            <span className="text-[#111111]">{item.id}</span>
          </div>
          <div className="flex items-center space-x-4">
             <span className="px-3 py-1 bg-green-100 text-green-800 text-[9px] font-black uppercase tracking-widest border border-green-200">
                <i className="fas fa-check-circle mr-1"></i> Ready for Transport
             </span>
             <span className="text-[10px] font-black uppercase text-gray-400">
                Stock #: <span className="text-[#111111] font-mono">{item.id}</span>
             </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN - Visuals & Technical Data (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Main Gallery */}
            <div className="bg-white p-2 shadow-xl border-t-4 border-[#FFCC00]">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 group">
                    <img 
                        src={activeImage || item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute bottom-0 left-0 bg-[#111111] text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest opacity-90">
                        Visual Inspection
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                    {thumbnails.map((thumb, i) => (
                        <button 
                            key={i} 
                            onClick={() => setActiveImage(thumb)}
                            className={`aspect-[4/3] overflow-hidden border-2 transition-all ${activeImage === thumb ? 'border-[#FFCC00] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <img src={thumb} alt={`View ${i+1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Description Card */}
            <div className="bg-white p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-black uppercase tracking-tight text-[#111111] mb-6 flex items-center">
                    <i className="fas fa-file-signature text-[#FFCC00] mr-3"></i> Asset Narrative
                </h3>
                <div className="prose prose-sm max-w-none text-gray-600 font-medium leading-relaxed">
                    <p>{item.description}</p>
                    <p className="mt-4">
                        This unit has undergone a 140-point inspection process. Fluids have been sampled and analyzed. Undercarriage/Tire life is estimated at 75%+. 
                        Full maintenance records are available upon request for qualified buyers.
                    </p>
                </div>
            </div>

            {/* Technical Specs Table */}
            <div className="bg-white shadow-sm border border-gray-200">
                <div className="bg-[#111111] text-white px-8 py-4 flex justify-between items-center">
                    <h3 className="text-sm font-black uppercase tracking-widest">Technical Specifications</h3>
                    <i className="fas fa-cogs text-[#FFCC00]"></i>
                </div>
                <div className="divide-y divide-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {item.specs.map((s, i) => (
                            <div key={i} className="flex border-b border-r border-gray-100 last:border-b-0">
                                <div className="w-1/3 bg-gray-50 px-6 py-4 text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center">
                                    {s.label}
                                </div>
                                <div className="w-2/3 px-6 py-4 text-sm font-bold text-[#111111] uppercase flex items-center">
                                    {s.value}
                                </div>
                            </div>
                        ))}
                        {/* Add Location Row manually if not in specs */}
                        <div className="flex border-b border-r border-gray-100 last:border-b-0">
                            <div className="w-1/3 bg-gray-50 px-6 py-4 text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center">
                                Location
                            </div>
                            <div className="w-2/3 px-6 py-4 text-sm font-bold text-[#111111] uppercase flex items-center">
                                {item.city}, {item.state}
                            </div>
                        </div>
                         <div className="flex border-b border-r border-gray-100 last:border-b-0">
                            <div className="w-1/3 bg-gray-50 px-6 py-4 text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center">
                                Category
                            </div>
                            <div className="w-2/3 px-6 py-4 text-sm font-bold text-[#111111] uppercase flex items-center">
                                {item.category}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>

          {/* RIGHT COLUMN - Sticky Action Console (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Primary Action Card */}
            <div className="bg-white shadow-2xl border-t-8 border-[#111111] sticky top-36 p-8">
                <div className="mb-6 border-b border-gray-100 pb-6">
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-[#111111] leading-none mb-2">
                        {item.make} {item.model}
                    </h1>
                    <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                        {item.year} Production Model
                    </div>
                </div>

                <div className="mb-8">
                    <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Acquisition Price</div>
                    {item.price === 'SOLD' ? (
                         <div className="text-4xl font-black text-red-600 tracking-tight">SOLD</div>
                    ) : (
                        <div className="text-4xl font-black text-[#111111] tracking-tight">
                            {item.price.toUpperCase() === 'CALL' ? 'Inquire' : item.price}
                        </div>
                    )}
                    <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase">
                        *Excludes Taxes & Freight
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 border border-gray-100 text-center">
                        <div className="text-[#FFCC00] text-lg mb-1"><i className="fas fa-tachometer-alt"></i></div>
                        <div className="text-xl font-black text-[#111111] leading-none">{item.meter}</div>
                        <div className="text-[8px] font-black uppercase text-gray-400 mt-1 tracking-widest">Hours</div>
                    </div>
                    <div className="bg-gray-50 p-4 border border-gray-100 text-center">
                        <div className="text-[#FFCC00] text-lg mb-1"><i className="fas fa-map-pin"></i></div>
                        <div className="text-xl font-black text-[#111111] leading-none">{item.state}</div>
                        <div className="text-[8px] font-black uppercase text-gray-400 mt-1 tracking-widest">{item.city}</div>
                    </div>
                </div>

                <div className="space-y-3">
                    <Link to="/quote" className="block w-full bg-[#FFCC00] text-[#111111] py-4 text-center font-black uppercase text-xs tracking-[0.2em] hover:bg-[#111111] hover:text-white transition-all shadow-lg">
                        Request Quote
                    </Link>
                    <a href="tel:8507773797" className="block w-full border-2 border-[#111111] text-[#111111] py-4 text-center font-black uppercase text-xs tracking-[0.2em] hover:bg-[#111111] hover:text-white transition-all">
                        <i className="fas fa-phone-alt mr-2"></i> Speak to Agent
                    </a>
                    <button className="block w-full bg-gray-100 text-gray-600 py-3 text-center font-bold uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all">
                        <i className="fas fa-file-pdf mr-2"></i> Download Spec Sheet
                    </button>
                </div>

                {/* Features List */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">Operational Validation</h4>
                    <ul className="space-y-3">
                        {item.features.map((f, i) => (
                            <li key={i} className="flex items-center text-xs font-bold text-gray-700 uppercase">
                                <i className="fas fa-check-square text-[#FFCC00] mr-3"></i>
                                {f}
                            </li>
                        ))}
                        <li className="flex items-center text-xs font-bold text-gray-700 uppercase">
                            <i className="fas fa-check-square text-[#FFCC00] mr-3"></i>
                            Clean Title Guarantee
                        </li>
                    </ul>
                </div>
            </div>

            {/* Secondary: Logistics Promo */}
            <div className="bg-[#111111] p-6 text-white text-center border-b-4 border-[#FFCC00]">
                <i className="fas fa-truck-fast text-3xl text-[#FFCC00] mb-3"></i>
                <h4 className="text-sm font-black uppercase tracking-widest mb-2">Need Logistics?</h4>
                <p className="text-xs text-gray-400 mb-4 font-medium">We ship worldwide. Get an instant freight estimate for this unit.</p>
                <Link to="/shipping" className="text-[10px] font-black uppercase border-b border-[#FFCC00] text-[#FFCC00] pb-1 hover:text-white hover:border-white transition-all">
                    Calculate Shipping
                </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;
