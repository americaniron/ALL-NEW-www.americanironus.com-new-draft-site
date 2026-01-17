
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* About Hero */}
      <section 
        className="relative h-[500px] bg-cover bg-center flex items-center" 
        style={{ backgroundImage: "url('https://picsum.photos/id/116/1600/400')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-none mb-6">
                Our Heritage of<br/><span className="text-[#FFCC00]">Performance.</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-xl">
                For nearly a decade, American Iron has been the silent engine behind major infrastructure projects across 13 nations.
            </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black uppercase mb-8 text-[#111111]">The Enterprise Mandate</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium mb-12">
                American Iron LLC functions not merely as a vendor, but as an extension of your procurement division. We bridge the critical gap between OEM production schedules and immediate field requirements, providing liquidity to the heavy equipment market.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-12">
                <div>
                    <div className="text-5xl font-black text-[#FFCC00] mb-2">2015</div>
                    <div className="text-xs font-bold uppercase text-[#111111] tracking-widest">Established</div>
                </div>
                <div>
                    <div className="text-5xl font-black text-[#FFCC00] mb-2">2,500+</div>
                    <div className="text-xs font-bold uppercase text-[#111111] tracking-widest">Assets Mobilized</div>
                </div>
                <div>
                    <div className="text-5xl font-black text-[#FFCC00] mb-2">13</div>
                    <div className="text-xs font-bold uppercase text-[#111111] tracking-widest">Nations Served</div>
                </div>
            </div>
        </div>
      </section>

      {/* Leadership/Values Section */}
      <section className="bg-[#111111] text-white py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <h3 className="text-2xl font-black uppercase text-[#FFCC00] mb-6">Our Core Values</h3>
                    <ul className="space-y-8">
                        <li>
                            <h4 className="text-xl font-bold uppercase mb-2">Safety First</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">We operate with an uncompromising commitment to the safety of our team, our partners, and the environments in which we work.</p>
                        </li>
                        <li>
                            <h4 className="text-xl font-bold uppercase mb-2">Operational Velocity</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">Time is capital. We are engineered to execute transactions and logistics faster than the competition.</p>
                        </li>
                        <li>
                            <h4 className="text-xl font-bold uppercase mb-2">Integrity</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">We provide transparent inspection reports and honest assessments. Our reputation is our most valuable asset.</p>
                        </li>
                    </ul>
                </div>
                <div className="bg-[#222] p-12 border-l-8 border-[#FFCC00]">
                    <h3 className="text-3xl font-black uppercase mb-6 leading-none">Join the Network</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Whether you are liquidating an entire fleet or sourcing a single critical dozer, we are ready to deploy resources.
                    </p>
                    <Link to="/contact" className="inline-block bg-white text-[#111111] px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-[#FFCC00] transition-all">
                        Connect with Corporate
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;
