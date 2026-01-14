
import React, { useState } from 'react';
import { findLocalService } from '../services/geminiService';

const DealerSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResults(null);
    setSources([]);

    // Get geolocation if possible
    let lat, lng;
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) => 
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 })
      );
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
    } catch (e) {
      console.warn("Location permission denied or timed out.");
    }

    const { text, sources: groundingSources } = await findLocalService(query, lat, lng);
    setResults(text);
    setSources(groundingSources);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-[#111111]">Global Service Locator</h1>
        <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-sm">Powered by Real-Time Google Maps Intelligence</p>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex bg-white shadow-2xl border-t-8 border-[#FFCC00]">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for 'CAT dealers in Florida' or 'Excavator repair near me'..."
            className="flex-grow p-6 text-lg font-bold border-none focus:ring-0 outline-none"
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-[#111111] text-white px-10 font-black uppercase tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all disabled:opacity-50"
          >
            {loading ? 'Locating...' : 'Search'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <i className="fas fa-location-dot text-4xl text-[#FFCC00] mb-4"></i>
            <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Consulting Global Logistics Database...</p>
          </div>
        </div>
      )}

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-10 shadow-xl border border-gray-100">
            <h3 className="text-xs font-black uppercase text-[#FFCC00] tracking-widest mb-6">Grounding Analysis</h3>
            <div className="prose prose-sm max-w-none text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
              {results}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">Verified Sources</h3>
            {sources.length > 0 ? sources.map((s, i) => {
              const link = s.maps?.uri || s.web?.uri;
              const title = s.maps?.title || s.web?.title || "Reference Site";
              if (!link) return null;
              return (
                <a 
                  key={i} 
                  href={link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block bg-gray-50 p-4 border-l-4 border-black hover:bg-white hover:border-[#FFCC00] transition-all shadow-sm group"
                >
                  <div className="text-[10px] font-black text-gray-400 group-hover:text-[#FFCC00] uppercase mb-1">Source {i+1}</div>
                  <div className="text-sm font-bold text-[#111111] truncate uppercase">{title}</div>
                  <div className="text-[9px] text-gray-400 font-mono mt-2 truncate">{link}</div>
                </a>
              );
            }) : (
              <p className="text-[10px] font-black text-gray-300 uppercase italic">No direct links available for this query.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DealerSearch;
