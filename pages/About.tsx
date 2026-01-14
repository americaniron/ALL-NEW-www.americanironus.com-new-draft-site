
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="space-y-16 pb-20">
      <section 
        className="relative h-96 bg-cover bg-center flex items-center" 
        style={{ backgroundImage: "url('https://picsum.photos/id/116/1600/400')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-white">
            <h1 className="text-5xl font-extrabold uppercase tracking-tight leading-none mb-4">Industrial Capability.<br/><span className="text-[#FFCC00]">Partner-First Approach.</span></h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-extrabold uppercase mb-8 border-b-4 border-[#FFCC00] pb-2 inline-block">The American Iron Mission</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
            American Iron LLC was established to bring a higher standard of professionalism to the heavy equipment market. We recognized a gap between the needs of modern, large-scale fleets and the fragmented nature of parts sourcing.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
            We are not just a yard; we are a logistics and procurement engine. Our team combines decades of field experience with modern supply chain management to ensure your iron stays moving.
        </p>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { label: 'Founded', val: '2015', icon: 'fa-calendar' },
                { label: 'Equipment Sourced', val: '2,500+', icon: 'fa-box' },
                { label: 'Countries Reached', val: '45', icon: 'fa-globe' }
            ].map((stat, i) => (
                <div key={i} className="text-center">
                    <i className={`fas ${stat.icon} text-[#FFCC00] text-4xl mb-4`}></i>
                    <div className="text-4xl font-black mb-1">{stat.val}</div>
                    <div className="text-xs font-bold uppercase text-gray-400 tracking-widest">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default About;
