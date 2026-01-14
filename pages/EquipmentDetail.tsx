
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { EQUIPMENT_LISTINGS } from '../constants';

const EquipmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const item = EQUIPMENT_LISTINGS.find(e => e.id === id);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold uppercase mb-4">Equipment Not Found</h2>
        <Link to="/equipment-list" className="bg-black text-white px-8 py-3 font-bold uppercase text-xs">Return to Inventory</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-bold uppercase tracking-widest flex space-x-2 text-gray-500">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link to="/equipment-list" className="hover:text-black">Inventory</Link>
          <span>/</span>
          <span className="text-black">{item.id}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery Area */}
          <div className="space-y-4">
            <div className="aspect-w-4 aspect-h-3 overflow-hidden border-4 border-black">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2">
                {[1,2,3,4].map(i => (
                    <div key={i} className="aspect-w-1 aspect-h-1 bg-gray-100 border border-gray-200">
                        <img src={`https://picsum.photos/id/${10+i+parseInt(item.id.slice(-1))}/200/200`} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity cursor-pointer" alt="thumbnail" />
                    </div>
                ))}
            </div>
          </div>

          {/* Core Info */}
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-[#FFCC00] text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2">
                {item.category}
              </div>
              <h1 className="text-4xl font-extrabold uppercase tracking-tight text-black">{item.title}</h1>
              <p className="text-gray-400 font-mono text-sm uppercase mt-1">Listing ID: {item.id}</p>
            </div>

            <div className="bg-black text-white p-8 grid grid-cols-2 gap-8 border-b-8 border-[#FFCC00]">
                <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Pricing</span>
                    <div className="text-3xl font-black text-[#FFCC00]">{item.price}</div>
                </div>
                <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Meter</span>
                    {/* Fixed: Use 'meter' instead of 'hours' to match EquipmentListing interface */}
                    <div className="text-3xl font-black">{item.meter}</div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-extrabold uppercase border-b-2 border-gray-100 pb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Link to="/quote" className="bg-[#FFCC00] text-black text-center py-4 font-black uppercase tracking-widest hover:bg-black hover:text-[#FFCC00] transition-all shadow-lg">
                    Request Quote
                </Link>
                <a href={`tel:8507773797`} className="border-2 border-black text-black text-center py-4 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                    Call Sales
                </a>
            </div>
          </div>
        </div>

        {/* Extended Details */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12 border-t-2 border-gray-100 pt-16">
            <div className="lg:col-span-2">
                <h3 className="text-2xl font-extrabold uppercase mb-8">Technical Specifications</h3>
                <div className="overflow-hidden border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-100">
                            {item.specs.map((s, i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="px-6 py-4 text-xs font-black uppercase text-gray-400 w-1/3">{s.label}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-black">{s.value}</td>
                                </tr>
                            ))}
                            <tr className="bg-white">
                                <td className="px-6 py-4 text-xs font-black uppercase text-gray-400">Location</td>
                                {/* Fixed: Use 'city' and 'state' to match EquipmentListing interface instead of 'loc' */}
                                <td className="px-6 py-4 text-sm font-bold text-black uppercase">
                                  {item.city}{item.city && item.state ? ', ' : ''}{item.state}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-extrabold uppercase mb-8">Key Features</h3>
                <ul className="space-y-4">
                    {item.features.map((f, i) => (
                        <li key={i} className="flex items-center space-x-3 text-sm font-bold uppercase text-gray-600">
                            <i className="fas fa-check-circle text-[#FFCC00]"></i>
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;
