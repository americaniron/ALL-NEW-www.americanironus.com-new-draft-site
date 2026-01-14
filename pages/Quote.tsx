
import React from 'react';

const Quote: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold uppercase mb-2">Request Procurement Quote</h1>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">A dedicated specialist will respond within 4 hours</p>
      </div>

      <form className="bg-white p-8 md:p-12 shadow-2xl border-t-8 border-[#FFCC00] space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Request Transmitted.'); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400">Full Name</label>
                <input required type="text" className="w-full border-gray-200 focus:border-[#FFCC00] focus:ring-0 p-4 font-bold" />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400">Company Email</label>
                <input required type="email" className="w-full border-gray-200 focus:border-[#FFCC00] focus:ring-0 p-4 font-bold" />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400">Inventory Type</label>
            <select className="w-full border-gray-200 focus:border-[#FFCC00] focus:ring-0 p-4 font-bold uppercase text-sm">
                <option>Select Option...</option>
                <option>Critical Part / Component</option>
                <option>Full Machine Inventory</option>
                <option>Logistics / Freight Service</option>
                <option>Dismantling Inquiry</option>
            </select>
        </div>

        <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400">Request Details (Part #s, Model, Serial #)</label>
            <textarea required rows={6} className="w-full border-gray-200 focus:border-[#FFCC00] focus:ring-0 p-4 font-bold" placeholder="Please provide specific identifiers..."></textarea>
        </div>

        <button className="w-full bg-black text-white py-5 font-black uppercase tracking-widest hover:bg-[#FFCC00] hover:text-black transition-all shadow-lg">
            Transmit Procurement Request
        </button>
      </form>
    </div>
  );
};

export default Quote;
