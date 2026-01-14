
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../DataContext';

const Equipment: React.FC = () => {
  const { categories } = useData();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Identical Enterprise Header - Exact Replication of PDF Style */}
        <div className="mb-14">
          <h1 className="text-[52px] font-bold text-[#b3b3b3] mb-4 leading-none tracking-tight">Equipment</h1>
          <p className="text-[#b3b3b3] text-[18px] font-medium mb-10">Browse categories or search the full inventory table.</p>
          
          <Link 
            to="/equipment-list" 
            className="inline-flex items-center border border-gray-300 rounded-lg px-7 py-3.5 text-[14px] font-bold text-[#111111] hover:bg-gray-50 transition-all shadow-sm"
          >
            <i className="fas fa-th-large mr-3"></i>
            Full Inventory Table
          </Link>
        </div>

        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="text-[24px] font-black text-[#111111] uppercase tracking-tighter">Equipment Categories</h2>
        </div>

        {/* Category Grid - Exact Replication of Grid Spacing and Card Aesthetic */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {categories.map((cat, idx) => (
            <Link 
              to={`/equipment-list?category=${encodeURIComponent(cat.name)}`} 
              key={idx} 
              className="group block"
            >
              {/* Card Image Container */}
              <div className="aspect-w-4 aspect-h-3 bg-white border border-gray-100 rounded-sm overflow-hidden mb-5 shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              {/* Card Content */}
              <div className="space-y-1">
                <h3 className="font-extrabold uppercase text-[#111111] text-[15px] tracking-tighter leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[13px] text-gray-500 font-medium">
                  View listings
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Sourcing Section */}
        <div className="mt-28 bg-[#fafafa] border border-gray-100 p-14 flex flex-col items-center text-center">
            <div className="max-w-2xl">
                <h4 className="text-[#FFCC00] font-black uppercase text-[10px] tracking-[0.4em] mb-5">Global Logistics</h4>
                <h3 className="text-[32px] font-black text-[#111111] uppercase mb-7 tracking-tight">Asset Sourcing Excellence</h3>
                <p className="text-gray-500 font-bold uppercase tracking-tight text-[14px] leading-relaxed mb-10">
                    If your specific equipment requirement is not indexed in this portal, our enterprise procurement division can locate, inspect, and export any heavy asset within our 45-country logistics network.
                </p>
                <Link to="/quote" className="bg-[#111111] text-white px-14 py-4.5 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#FFCC00] hover:text-[#111111] transition-all shadow-xl">
                    Request Machine Quote
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
