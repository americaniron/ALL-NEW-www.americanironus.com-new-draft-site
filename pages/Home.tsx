
import React from 'react';
import { Link } from 'react-router-dom';
import { getEquipmentRecommendation } from '../services/geminiService';
import { useData } from '../DataContext';

const Home: React.FC = () => {
  const { copy } = useData();
  const [showAiModal, setShowAiModal] = React.useState(false);
  const [aiPrompt, setAiPrompt] = React.useState('');
  const [aiResult, setAiResult] = React.useState('');
  const [isAiLoading, setIsAiLoading] = React.useState(false);

  const handleAiInquiry = async () => {
    if (!aiPrompt) return;
    setIsAiLoading(true);
    setAiResult('');
    const recommendation = await getEquipmentRecommendation(aiPrompt);
    setAiResult(recommendation);
    setIsAiLoading(false);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] bg-cover bg-center flex items-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888941295-184a621d4693?q=80&w=1600&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-[#111111] bg-opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-tight">
            {copy.homeHeroTitle.split('.')[0]}.<br/>
            <span className="text-[#FFCC00]">{copy.homeHeroTitle.split('.')[1] || ''}</span>
          </h1>
          <p className="mt-6 text-xl max-w-2xl font-light text-gray-300">
            {copy.homeHeroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/equipment-list" className="bg-[#FFCC00] text-[#111111] px-8 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Machinery Inventory
            </Link>
            <Link to="/quote" className="bg-white text-[#111111] px-8 py-3 font-bold uppercase tracking-widest hover:bg-[#FFCC00] transition-colors">
              Procurement Quote
            </Link>
            <button 
                onClick={() => setShowAiModal(true)}
                className="border-2 border-[#FFCC00] text-[#FFCC00] px-8 py-3 font-bold uppercase tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all"
            >
              ✨ AI Concierge
            </button>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl font-extrabold uppercase mb-6 border-l-4 border-[#FFCC00] pl-4 text-[#111111]">The Strategic Advantage</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                    American Iron LLC is the strategic partner for fleet managers and contractors who demand reliability. In an industry where downtime destroys margins, we provide a robust supply chain solution for heavy equipment and critical components.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Based in Tampa with a global reach, we connect enterprise-level buyers with high-quality machinery, ensuring your projects stay on schedule and your iron stays moving.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 border-t-4 border-[#FFCC00]">
                    <i className="fas fa-helmet-safety text-3xl mb-4 text-[#111111]"></i>
                    <h3 className="font-bold uppercase mb-2 text-[#111111]">Asset Recovery</h3>
                    <p className="text-sm text-gray-500">Turning aging assets into critical supply inventory through precision dismantling.</p>
                </div>
                <div className="bg-gray-50 p-6 border-t-4 border-[#FFCC00]">
                    <i className="fas fa-globe text-3xl mb-4 text-[#111111]"></i>
                    <h3 className="font-bold uppercase mb-2 text-[#111111]">Global Export</h3>
                    <p className="text-sm text-gray-500">Executing seamless delivery to any job site on the map, across any border.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold uppercase mb-12 text-center text-[#111111]">Core Industrial Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: 'Dismantling', icon: 'fa-industry', desc: 'Expert harvest of key components including engines and hydraulics.' },
                    { title: 'Inspections', icon: 'fa-clipboard-check', desc: 'Data-driven condition reports and high-definition documentation.' },
                    { title: 'Heavy Haul', icon: 'fa-truck', desc: 'Domestic pickup and port drayage coordination for oversize units.' },
                    { title: 'Forwarding', icon: 'fa-ship', desc: 'Complex international logistics and export documentation management.' }
                ].map((s, idx) => (
                    <div key={idx} className="bg-white p-8 text-center shadow-sm hover:shadow-lg transition-shadow group">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#FFCC00] transition-colors">
                            <i className={`fas ${s.icon} text-2xl text-[#111111]`}></i>
                        </div>
                        <h3 className="font-extrabold uppercase mb-4 tracking-tighter text-[#111111]">{s.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111111] bg-opacity-80">
          <div className="bg-white w-full max-w-xl p-8 rounded-lg border-t-8 border-[#FFCC00] relative">
            <button onClick={() => setShowAiModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-[#111111]">
                <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-2xl font-extrabold uppercase mb-4 text-[#111111]">✨ AI Equipment Concierge</h3>
            <p className="text-sm text-gray-500 mb-6 uppercase tracking-widest font-bold">Describe your project requirements</p>
            <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={4} 
                className="w-full border-gray-200 focus:ring-[#FFCC00] focus:border-[#FFCC00] rounded-md p-4 text-gray-800"
                placeholder="e.g., 'I need to dig a 500ft utility trench in rocky terrain in Arizona...'"
            />
            <button 
                onClick={handleAiInquiry}
                disabled={isAiLoading}
                className="w-full mt-4 bg-[#111111] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all disabled:bg-gray-400"
            >
              {isAiLoading ? 'Analyzing Fleet...' : 'Generate Recommendation'}
            </button>
            {aiResult && (
                <div className="mt-8 p-6 bg-gray-50 border-l-4 border-[#FFCC00] text-sm leading-relaxed text-gray-700 animate-fade-in">
                    {aiResult}
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
