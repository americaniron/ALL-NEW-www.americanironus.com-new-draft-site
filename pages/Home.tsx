
import React from 'react';
import { Link } from 'react-router-dom';
import { getFastRecommendation, getStrategicAnalysis, searchIndustryTrends, findLocalService } from '../services/geminiService';
import { useData } from '../DataContext';

type AiMode = 'fast' | 'think' | 'search' | 'local';

const Home: React.FC = () => {
  const { copy } = useData();
  const [showAiModal, setShowAiModal] = React.useState(false);
  const [aiPrompt, setAiPrompt] = React.useState('');
  const [aiResult, setAiResult] = React.useState('');
  const [searchSources, setSearchSources] = React.useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = React.useState(false);
  const [mode, setMode] = React.useState<AiMode>('fast');

  const handleAiInquiry = async () => {
    if (!aiPrompt) return;
    setIsAiLoading(true);
    setAiResult('');
    setSearchSources([]);
    
    try {
      if (mode === 'think') {
        const result = await getStrategicAnalysis(aiPrompt);
        setAiResult(result);
      } else if (mode === 'search') {
        const { text, sources } = await searchIndustryTrends(aiPrompt);
        setAiResult(text);
        setSearchSources(sources);
      } else if (mode === 'local') {
        let lat, lng;
        let locationWarning = "";
        try {
          const pos = await new Promise<GeolocationPosition>((res, rej) => 
            navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 })
          );
          lat = pos.coords.latitude;
          lng = pos.coords.longitude;
        } catch (e) {
          console.warn("Location permission denied or timed out for AI concierge.");
          locationWarning = "Could not get your location. For best results, enable location services. Searching without it.\n\n";
        }
        const { text, sources } = await findLocalService(aiPrompt, lat, lng);
        setAiResult(locationWarning + text);
        setSearchSources(sources);
      }
      else {
        const result = await getFastRecommendation(aiPrompt);
        setAiResult(result);
      }
    } catch (err) {
      setAiResult("System overload. Please retry.");
    } finally {
      setIsAiLoading(false);
    }
  };
  
  const placeholders: Record<AiMode, string> = {
    fast: "Ask for a quick recommendation, e.g., 'Best dozer for soft soil?'",
    think: "Describe a complex fleet or maintenance challenge...",
    search: "Search current heavy equipment market trends...",
    local: "Find nearby services, e.g., 'CAT dealers near me' or 'Hydraulic repair in Houston'"
  };


  return (
    <div className="bg-white">
      {/* Hero Section - Enterprise Industrial Aesthetic */}
      <section 
        className="relative h-[750px] flex items-center overflow-hidden"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute z-0 w-full h-full object-cover"
          poster="/assets/banner_main.jpg"
        >
            <source src="/assets/construction_loop.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/70 to-transparent z-10"></div>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center bg-[#FFCC00] text-[#111111] px-5 py-1.5 font-black uppercase text-[11px] tracking-[0.3em] mb-10 shadow-lg">
              GLOBAL FLEET DOMINANCE
            </div>
            <h1 className="text-8xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.85] mb-10 drop-shadow-2xl">
              COMMAND<br/>
              <span className="text-[#FFCC00]">YOUR HORIZON.</span>
            </h1>
            <p className="text-2xl text-gray-100 font-bold leading-relaxed max-w-2xl mb-12 drop-shadow-md">
              Architecting the world's most resilient industrial supply chains. We deliver mission-critical heavy assets with unprecedented velocity and logistical precision.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/equipment" className="bg-[#FFCC00] text-[#111111] px-14 py-5 font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl text-sm border-2 border-[#FFCC00]">
                ACCESS GLOBAL FLEET
              </Link>
              <button 
                  onClick={() => setShowAiModal(true)}
                  className="bg-transparent border-2 border-white text-white px-12 py-5 font-black uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-all flex items-center text-sm"
              >
                <i className="fas fa-microchip mr-3 text-[#FFCC00]"></i> AI CONCIERGE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Tiles - Holt Style Drop-ins */}
      <section className="bg-white py-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 -mt-16 relative z-10 shadow-2xl border-b-8 border-[#FFCC00]">
            {/* Card 1 */}
            <Link to="/equipment" className="bg-[#111111] p-12 group hover:bg-[#FFCC00] transition-all duration-300 flex flex-col items-center text-center border-r border-gray-800">
              <div className="text-[#FFCC00] text-5xl mb-8 group-hover:text-[#111111] transition-colors"><i className="fas fa-truck-monster"></i></div>
              <h3 className="text-xl font-black uppercase text-white mb-4 tracking-tight group-hover:text-[#111111]">ACQUIRE ASSETS</h3>
              <p className="text-gray-500 font-bold text-xs mb-8 leading-relaxed uppercase group-hover:text-[#111111]/70">Access the Global Fleet</p>
              <span className="text-[#FFCC00] font-black uppercase text-[10px] tracking-widest group-hover:text-[#111111] border-b-2 border-[#FFCC00] group-hover:border-[#111111]">EXPLORE NOW</span>
            </Link>
            
            {/* Card 2 */}
            <Link to="/parts-list" className="bg-[#222222] p-12 group hover:bg-[#FFCC00] transition-all duration-300 flex flex-col items-center text-center border-r border-gray-800">
              <div className="text-[#FFCC00] text-5xl mb-8 group-hover:text-[#111111] transition-colors"><i className="fas fa-gears"></i></div>
              <h3 className="text-xl font-black uppercase text-white mb-4 tracking-tight group-hover:text-[#111111]">SOURCE PARTS</h3>
              <p className="text-gray-500 font-bold text-xs mb-8 leading-relaxed uppercase group-hover:text-[#111111]/70">Source Mission-Critical Parts</p>
              <span className="text-[#FFCC00] font-black uppercase text-[10px] tracking-widest group-hover:text-[#111111] border-b-2 border-[#FFCC00] group-hover:border-[#111111]">FIND PARTS</span>
            </Link>

            {/* Card 3 */}
            <Link to="/services" className="bg-[#111111] p-12 group hover:bg-[#FFCC00] transition-all duration-300 flex flex-col items-center text-center border-r border-gray-800">
              <div className="text-[#FFCC00] text-5xl mb-8 group-hover:text-[#111111] transition-colors"><i className="fas fa-screwdriver-wrench"></i></div>
              <h3 className="text-xl font-black uppercase text-white mb-4 tracking-tight group-hover:text-[#111111]">MAINTAIN FLEET</h3>
              <p className="text-gray-500 font-bold text-xs mb-8 leading-relaxed uppercase group-hover:text-[#111111]/70">Maximize Fleet Uptime</p>
              <span className="text-[#FFCC00] font-black uppercase text-[10px] tracking-widest group-hover:text-[#111111] border-b-2 border-[#FFCC00] group-hover:border-[#111111]">VIEW SERVICES</span>
            </Link>

            {/* Card 4 */}
            <Link to="/shipping" className="bg-[#222222] p-12 group hover:bg-[#FFCC00] transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-[#FFCC00] text-5xl mb-8 group-hover:text-[#111111] transition-colors"><i className="fas fa-globe-americas"></i></div>
              <h3 className="text-xl font-black uppercase text-white mb-4 tracking-tight group-hover:text-[#111111]">DEPLOY ASSETS</h3>
              <p className="text-gray-500 font-bold text-xs mb-8 leading-relaxed uppercase group-hover:text-[#111111]/70">Command Global Logistics</p>
              <span className="text-[#FFCC00] font-black uppercase text-[10px] tracking-widest group-hover:text-[#111111] border-b-2 border-[#FFCC00] group-hover:border-[#111111]">CALCULATE</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Corporate Value Prop */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="text-[#FFCC00] font-black text-xs tracking-[0.4em] uppercase mb-4">ESTABLISHED 2015</div>
              <h2 className="text-5xl md:text-6xl font-black uppercase text-[#111111] mb-10 leading-none tracking-tighter">
                RELIABILITY IS OUR<br/><span className="text-[#FFCC00]">CORE CURRENCY.</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed mb-12">
                American Iron is the strategic fulcrum for global industry leaders. We convert surplus capital assets into operational velocity, circumventing OEM production queues to deliver mission-critical equipment on your timeline.
              </p>
              
              <div className="grid grid-cols-2 gap-10">
                <div className="border-l-4 border-[#FFCC00] pl-6">
                    <div className="text-4xl font-black text-[#111111] mb-1">13</div>
                    <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Nations Exported</div>
                </div>
                <div className="border-l-4 border-[#FFCC00] pl-6">
                    <div className="text-4xl font-black text-[#111111] mb-1">24/7</div>
                    <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Global Support</div>
                </div>
              </div>

              <div className="mt-16">
                <Link to="/about" className="inline-block bg-[#111111] text-white px-12 py-5 font-black uppercase text-xs tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all">
                  COMPANY PROFILE
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-[#FFCC00] -z-10"></div>
              <img src="/assets/site_fleet.jpg" className="w-full shadow-2xl border-8 border-white" alt="Industrial Operations" />
              <div className="absolute -bottom-10 -right-10 bg-[#111111] p-10 text-white shadow-2xl hidden xl:block border-t-8 border-[#FFCC00]">
                  <div className="text-3xl font-black mb-2 uppercase">Verified</div>
                  <div className="text-xs font-bold text-[#FFCC00] uppercase tracking-widest">Tier-1 Fleet Assets</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Modal - Refined for Enterprise Branding */}
      {showAiModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111111]/95 backdrop-blur-md">
          <div className="bg-white w-full max-w-3xl p-0 rounded-sm border-t-[12px] border-[#FFCC00] relative overflow-hidden shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowAiModal(false)} className="absolute top-6 right-6 z-10 text-gray-400 hover:text-[#111111] transition-colors">
                <i className="fas fa-times text-3xl"></i>
            </button>
            
            <div className="bg-[#111111] p-10 border-b border-gray-800">
              <h3 className="text-4xl font-black uppercase tracking-tight text-[#FFCC00]">INTELLIGENCE HUB</h3>
              <p className="text-[11px] text-gray-500 mt-2 uppercase tracking-[0.4em] font-black">AI-POWERED FLEET STRATEGY</p>
            </div>

            <div className="p-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 bg-gray-100 p-1.5 mb-10 rounded-sm">
                <button 
                  onClick={() => setMode('fast')}
                  className={`flex-grow py-4 text-xs font-black uppercase tracking-widest transition-all ${mode === 'fast' ? 'bg-[#111111] text-white shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Fast
                </button>
                <button 
                  onClick={() => setMode('think')}
                  className={`flex-grow py-4 text-xs font-black uppercase tracking-widest transition-all ${mode === 'think' ? 'bg-[#111111] text-white shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Deep
                </button>
                <button 
                  onClick={() => setMode('search')}
                  className={`flex-grow py-4 text-xs font-black uppercase tracking-widest transition-all ${mode === 'search' ? 'bg-[#111111] text-white shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Market
                </button>
                 <button 
                  onClick={() => setMode('local')}
                  className={`flex-grow py-4 text-xs font-black uppercase tracking-widest transition-all ${mode === 'local' ? 'bg-[#111111] text-white shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Local
                </button>
              </div>

              <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder={placeholders[mode]}
                className="w-full border-4 border-gray-100 p-6 font-bold text-lg h-44 focus:border-[#FFCC00] outline-none mb-10 transition-colors bg-gray-50"
              />

              <button 
                onClick={handleAiInquiry}
                disabled={!aiPrompt || isAiLoading}
                className="w-full bg-[#111111] text-white py-6 font-black uppercase tracking-[0.3em] text-sm hover:bg-[#FFCC00] hover:text-[#111111] transition-all disabled:opacity-50 shadow-xl"
              >
                {isAiLoading ? <i className="fas fa-cog fa-spin mr-3"></i> : <i className="fas fa-shield-halved mr-3"></i>}
                {isAiLoading ? 'EXECUTING ANALYSIS...' : 'INITIALIZE SYSTEM'}
              </button>

              {aiResult && (
                <div className="mt-12 bg-gray-50 p-10 border-l-[10px] border-[#FFCC00] animate-fade-in">
                  <h4 className="text-xs font-black uppercase text-gray-400 mb-6 tracking-[0.2em]">INTELLIGENCE REPORT</h4>
                  <div className="prose prose-lg max-w-none text-[#111111] font-bold leading-relaxed whitespace-pre-wrap">
                    {aiResult}
                  </div>
                  
                  {searchSources.length > 0 && (
                    <div className="mt-10 pt-10 border-t border-gray-200">
                      <h5 className="text-[11px] font-black uppercase text-gray-400 mb-6 tracking-widest">VERIFIED SOURCES</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {searchSources.map((source, idx) => {
                           const link = source.web?.uri || source.maps?.uri;
                           const title = source.web?.title || source.maps?.title;
                           const icon = source.web ? 'fa-link' : 'fa-map-location-dot';
                           
                           if (!link || !title) return null;

                           return (
                            <a key={idx} href={link} target="_blank" rel="noreferrer" className="block bg-white p-4 border border-gray-200 hover:border-[#FFCC00] transition-all group shadow-sm">
                              <div className="text-[#111111] group-hover:text-[#FFCC00] text-xs font-black flex items-center uppercase tracking-tight">
                                <i className={`fas ${icon} mr-2 text-[10px]`}></i>
                                {title}
                              </div>
                            </a>
                           )
                        })}
                      </div>
                    </div>
                  )}
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
        