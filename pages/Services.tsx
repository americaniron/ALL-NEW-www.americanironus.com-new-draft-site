
import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Services Hero */}
      <section className="bg-[#111111] text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?q=80&w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-4">Customer Solutions</h1>
            <p className="text-xl text-gray-300 font-medium max-w-2xl">Lifecycle asset management and global logistics support designed for the enterprise.</p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">
        
        {/* Service Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
                <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-[#FFCC00] -z-10"></div>
                <img src="https://picsum.photos/id/111/800/600" className="shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full" alt="Asset Recovery" />
            </div>
            <div>
                <div className="text-[#FFCC00] font-black uppercase text-sm tracking-widest mb-2">Sustainable Operations</div>
                <h2 className="text-4xl font-black uppercase mb-6 text-[#111111] leading-none">Decommissioning & Reclamation</h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8 font-medium">
                    We execute industrial-scale dismantling operations designed to maximize return on retired assets. Our technicians perform surgical component harvesting—reclaiming engines, transmissions, final drives, and hydraulics—ensuring they are recertified for the global supply chain.
                </p>
                <ul className="space-y-4 text-sm font-bold uppercase text-gray-500">
                    <li className="flex items-center"><i className="fas fa-circle text-[#FFCC00] text-[8px] mr-3"></i> Precision component harvesting</li>
                    <li className="flex items-center"><i className="fas fa-circle text-[#FFCC00] text-[8px] mr-3"></i> Environmentally compliant salvage</li>
                    <li className="flex items-center"><i className="fas fa-circle text-[#FFCC00] text-[8px] mr-3"></i> On-site fleet liquidation support</li>
                </ul>
            </div>
        </div>

        {/* Service Block 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
                <div className="text-[#FFCC00] font-black uppercase text-sm tracking-widest mb-2">Global Logistics</div>
                <h2 className="text-4xl font-black uppercase mb-6 text-[#111111] leading-none">Intercontinental Freight Command</h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8 font-medium">
                    Acquisition is only the first step. Our logistics division manages the entire friction-filled process of heavy haul transportation, port drayage, and export compliance (AES/SED filing). We guarantee regulatory adherence and streamlined delivery to your operational theater.
                </p>
                <Link to="/shipping" className="inline-block border-b-2 border-[#111111] pb-1 text-[#111111] font-black uppercase text-xs tracking-widest hover:text-[#FFCC00] hover:border-[#FFCC00] transition-all">
                    View Shipping Capabilities
                </Link>
            </div>
            <div className="relative order-1 lg:order-2">
                <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-[#111111] -z-10"></div>
                <img src="https://picsum.photos/id/123/800/600" className="shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full" alt="Logistics" />
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-black uppercase text-[#111111] mb-6">Ready to optimize your fleet?</h2>
            <Link to="/contact" className="inline-block bg-[#FFCC00] text-[#111111] px-10 py-4 font-black uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all shadow-lg">
                Contact a Solution Specialist
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
