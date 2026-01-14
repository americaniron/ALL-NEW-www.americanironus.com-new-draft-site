
import React from 'react';
import { Link } from 'react-router-dom';
import { PARTS_CATEGORIES } from '../constants';

const Parts: React.FC = () => {
  return (
    <div>
      <section 
        className="relative h-96 bg-cover bg-center flex items-center" 
        style={{ backgroundImage: "url('https://picsum.photos/id/119/1600/400')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-white text-center">
            <h1 className="text-5xl font-extrabold uppercase tracking-tight text-[#FFCC00]">Critical Components</h1>
            <p className="mt-4 text-xl font-light text-gray-300">Enterprise sourcing for major OEM brands.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-extrabold uppercase border-l-4 border-[#FFCC00] pl-4">Inventory Segments</h2>
            <Link to="/parts-list" className="bg-black text-white px-6 py-3 font-bold uppercase text-sm tracking-widest hover:bg-[#FFCC00] hover:text-black transition-all">
                Access Full Database
            </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PARTS_CATEGORIES.map((cat, idx) => (
                <Link to="/parts-list" key={idx} className="group relative overflow-hidden bg-gray-50 border border-gray-100 p-8 flex flex-col items-center text-center hover:border-[#FFCC00] transition-all">
                    <div className="mb-6 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#FFCC00] transition-colors">
                        <i className={`fas ${cat.icon} text-3xl text-black`}></i>
                    </div>
                    <h3 className="text-lg font-extrabold uppercase mb-2 tracking-tighter">{cat.name}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Explore Components</p>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-[#FFCC00] transition-colors"></div>
                </Link>
            ))}
        </div>

        <div className="mt-20 bg-gray-900 text-white p-12 rounded-sm grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h3 className="text-2xl font-extrabold uppercase mb-4 text-[#FFCC00]">Can't find a part?</h3>
                <p className="text-gray-400 leading-relaxed">
                    Our procurement team has access to a global network of salvage yards and OEM distributors. If it exists, we can source it and handle the export logistics.
                </p>
            </div>
            <div className="flex justify-end">
                <Link to="/quote" className="bg-white text-black px-10 py-4 font-bold uppercase tracking-widest hover:bg-[#FFCC00] transition-all inline-block">
                    Submit Parts Inquiry
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Parts;
