
import React from 'react';
import { useData } from '../DataContext';
import { Link } from 'react-router-dom';

const PartsList: React.FC = () => {
  const { parts } = useData();
  const [search, setSearch] = React.useState('');
  
  const filtered = parts.filter(p => 
    p.pn.toLowerCase().includes(search.toLowerCase()) || 
    p.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8 flex justify-between items-end">
        <div>
            <Link to="/parts" className="text-xs font-bold uppercase text-gray-400 hover:text-black mb-2 inline-block">← Back to Categories</Link>
            <h1 className="text-3xl font-extrabold uppercase">Components Database</h1>
        </div>
        <div className="w-80">
            <input 
              type="text" 
              placeholder="Search Part Number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-b-2 border-gray-900 py-2 focus:border-[#FFCC00] outline-none font-bold uppercase text-sm"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((part) => (
            <div key={part.pn} className="bg-white border-2 border-gray-100 hover:border-[#FFCC00] p-6 flex justify-between items-center transition-all">
                <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-gray-400">
                        <i className="fas fa-box-open"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-extrabold tracking-tighter text-black uppercase">{part.pn}</h3>
                        <p className="text-sm text-gray-500">{part.desc}</p>
                    </div>
                </div>
                <Link to="/quote" className="bg-black text-white px-6 py-2 font-bold uppercase text-xs tracking-widest hover:bg-[#FFCC00] hover:text-black transition-all">
                    Quote
                </Link>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PartsList;
