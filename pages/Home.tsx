
import React from 'react';
import { Link } from 'react-router-dom';
import { getFastRecommendation, getStrategicAnalysis } from '../services/geminiService';
import { useData } from '../DataContext';

const Home: React.FC = () => {
  const { copy } = useData();
  const [showAiModal, setShowAiModal] = React.useState(false);
  const [aiPrompt, setAiPrompt] = React.useState('');
  const [aiResult, setAiResult] = React.useState('');
  const [isAiLoading, setIsAiLoading] = React.useState(false);
  const [mode, setMode] = React.useState<'fast' | 'think'>('fast');

  const handleAiInquiry = async () => {
    if (!aiPrompt) return;
    setIsAiLoading(true);
    setAiResult('');
    
    try {
      if (mode === 'think') {
        const result = await getStrategicAnalysis(aiPrompt);
        setAiResult(result);
      } else {
        const result = await getFastRecommendation(aiPrompt);
        setAiResult(result);
      }
    } catch (err) {
      setAiResult("System overload. Please retry.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section 
        className="relative h-[650px] bg-cover bg-center flex items-center overflow-hidden" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888941295-184a621d4693?q=80&w=1600&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111cc] to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-[0.9]">
              {copy.homeHeroTitle.split('.')[0]}.<br/>
              <span className="text-[#FFCC00]">{copy.homeHeroTitle.split('.')[1] || ''}</span>
            </h1>
            <p className="mt-8 text-xl max-w-2xl font-light text-gray-300 leading-relaxed">
              {copy.homeHeroSubtitle}
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link to="/equipment-list" className="bg-[#FFCC00] text-[#111111] px-10 py-4 font-black uppercase tracking-widest hover:bg-white transition-colors shadow-2xl">
                Inventory
              </Link>
              <button 
                  onClick={() => setShowAiModal(true)}
                  className="bg-white text-[#111111] px-10 py-4 font-black uppercase tracking-widest hover:bg-[#FFCC00] transition-all flex items-center"
              >
                <i className="fas fa-robot mr-3"></i> AI Concierge
              </button>
              <Link to="/ai-visualizer" className="border-2 border-white text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-all">
                ✨ Visualizer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-1 shadow-2xl">
        <Link to="/dealer-search" className="bg-[#111111] p-10 text-white flex justify-between items-center group border-b-4 border-[#FFCC00]">
          <div>
            <div className="text-[10px] font-black text-[#FFCC00] uppercase tracking-[0.3em] mb-2">Service Network</div>
            <div className="text-xl font-extrabold uppercase group-hover:translate-x-2 transition-transform">Dealer Locator</div>
          </div>
          <i className="fas fa-location-dot text-2xl opacity-20 group-hover:opacity-100 transition-opacity"></i>
        </Link>
        <Link to="/shipping" className="bg-[#1a1a1a] p-10 text-white flex justify-between items-center group border-b-4 border-white">
          <div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Global Forwarding</div>
            <div className="text-xl font-extrabold uppercase group-hover:translate-x-2 transition-transform">Logistics Portal</div>
          </div>
          <i className="fas fa-ship text-2xl opacity-20 group-hover:opacity-100 transition-opacity"></i>
        </Link>
        <Link to="/parts-list" className="bg-[#222222] p-10 text-white flex justify-between items-center group border-b-4 border-gray-600">
          <div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Technical Registry</div>
            <div className="text-xl font-extrabold uppercase group-hover:translate-x-2 transition-transform">Parts Catalog</div>
          </div>
          <i className="fas fa-gears text-2xl opacity-20 group-hover:opacity-100 transition-opacity"></i>
        </Link>
      </div>

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
                <h2 className="text-[40px] font-black uppercase mb-8 border-l-8 border-[#FFCC00] pl-6 text-[#111111] leading-none">The Iron Strategy</h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8 font-medium">
                    American Iron LLC is the strategic partner for fleet managers and contractors who demand reliability. In an industry where downtime destroys margins, we provide a robust supply chain solution for heavy equipment and critical components.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-4xl font-black text-[#111111] mb-2">45+</div>
                    <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Countries Exported</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-[#111111] mb-2">24/7</div>
                    <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Procurement Support</div>
                  </div>
                </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#FFCC00] opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800" className="relative shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" alt="Industrial" />
            </div>
        </div>
      </section>

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111111] bg-opacity-90 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl p-0 rounded-sm border-t-8 border-[#FFCC00] relative overflow-hidden shadow-2xl">
            <button onClick={() => setShowAiModal(false)} className="absolute top-4 right-4 z-10 text-gray-400 hover:text-[#111111] transition-colors">
                <i className="fas fa-times text-2xl"></i>
            </button>
            
            <div className="bg-gray-50 p-8 border-b border-gray-100">
              <h3 className="text-3xl font-black uppercase tracking-tight text-[#111111]">✨ Intelligence Hub</h3>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-[0.3em] font-black">AI-Powered Fleet Consulting</p>
            </div>

            <div className="p-8">
              <div className="flex bg-gray-100 p-1 mb-6 rounded-sm">
                <button 
                  onClick={() => setMode('fast')}
                  className={`flex-grow py-3 text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'fast' ? 'bg-[#111111] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <i className="fas fa-bolt mr-2"></i> Fast Analysis
                </button>
                <button 
                  onClick={() => setMode('think')}
                  className={`flex-grow py-3 text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'think' ? 'bg-[#111111] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <i className="fas fa-brain mr-2"></i> Strategic Deep Think
                </button>
              </div>

              <textarea 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={4} 
                  className="w-full border-2 border-gray-100 focus:border-[#FFCC00] focus:ring-0 p-6 text-gray-800 font-bold text-lg mb-6 outline-none transition-colors"
                  placeholder={mode === 'fast' ? "Quick question about specs or parts..." : "Describe a complex strategic challenge or multi-unit maintenance roadmap..."}
              />
              
              <button 
                  onClick={handleAiInquiry}
                  disabled={isAiLoading}
                  className="w-full bg-[#FFCC00] text-[#111111] py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-[#111111] hover:text-white transition-all disabled:opacity-50 shadow-xl"
              >
                {isAiLoading ? 'Synthesizing Response...' : mode === 'fast' ? 'Execute Fast Query' : 'Begin Deep Strategic Analysis'}
              </button>

              {aiResult && (
                  <div className={`mt-10 p-8 border-l-8 border-[#FFCC00] text-sm leading-relaxed text-gray-700 animate-fade-in ${mode === 'think' ? 'bg-[#111111] text-white' : 'bg-gray-50'}`}>
                    <div className="text-[9px] font-black uppercase tracking-[0.4em] mb-4 text-[#FFCC00]">
                      {mode === 'think' ? 'Deep Strategic Analysis Result' : 'Operational Insight'}
                    </div>
                    <div className="whitespace-pre-wrap font-medium">
                      {aiResult}
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
