
import React from 'react';

const Services: React.FC = () => {
  return (
    <div>
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase border-[#FFCC00] border-l-8 pl-6 mb-4">Enterprise Services</h1>
            <p className="text-gray-400 uppercase tracking-widest font-bold text-sm">Lifecycle Asset Management & Logistics</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <img src="https://picsum.photos/id/111/800/600" className="shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Asset Recovery" />
            <div>
                <h2 className="text-3xl font-extrabold uppercase mb-6 border-b-2 border-[#FFCC00] pb-2 inline-block">Asset Recovery & Dismantling</h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    Our specialized technicians provide industrial-scale dismantling designed to reclaim maximum value. We expertly harvest critical components—engines, transmissions, final drives, and hydraulic pumps—ensuring they are tested and preserved for re-entry into the supply chain.
                </p>
                <ul className="space-y-3 text-sm font-bold uppercase text-gray-500">
                    <li><i className="fas fa-check text-[#FFCC00] mr-2"></i> Precision component harvesting</li>
                    <li><i className="fas fa-check text-[#FFCC00] mr-2"></i> Environmentally compliant salvage</li>
                    <li><i className="fas fa-check text-[#FFCC00] mr-2"></i> On-site fleet liquidation support</li>
                </ul>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-extrabold uppercase mb-6 border-b-2 border-[#FFCC00] pb-2 inline-block">Heavy Freight & Export</h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    Sourcing the machine is only half the battle. Our logistics division handles the complexities of heavy haul transportation, port drayage, and export documentation (AES/SED filing). We ensure compliance and timely delivery to your operations base, wherever that may be.
                </p>
                <ul className="space-y-3 text-sm font-bold uppercase text-gray-500">
                    <li><i className="fas fa-check text-[#FFCC00] mr-2"></i> RORO / Containerized Loading</li>
                    <li><i className="fas fa-check text-[#FFCC00] mr-2"></i> Customs documentation management</li>
                    <li><i className="fas fa-check text-[#FFCC00] mr-2"></i> Multi-modal freight coordination</li>
                </ul>
            </div>
            <img src="https://picsum.photos/id/123/800/600" className="order-1 lg:order-2 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Logistics" />
        </div>
      </section>
    </div>
  );
};

export default Services;
