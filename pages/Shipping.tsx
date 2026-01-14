
import React from 'react';
import { getShippingQuoteSimulation } from '../services/geminiService';

const Shipping: React.FC = () => {
  const [origin, setOrigin] = React.useState('');
  const [dest, setDest] = React.useState('');
  const [weight, setWeight] = React.useState(0);
  const [quotes, setQuotes] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const handleGetQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!origin || !dest || !weight) return;
    setLoading(true);
    const result = await getShippingQuoteSimulation(origin, dest, weight);
    try {
        setQuotes(JSON.parse(result));
    } catch (e) {
        setQuotes({ error: "Failed to parse simulated API response." });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold uppercase mb-4">Real-Time Logistics Portal</h1>
        <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Phase 4 Implementation: UPS & DHL Integrated Quoting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="bg-white p-8 border-t-8 border-black shadow-lg">
          <h2 className="text-xl font-extrabold uppercase mb-6">Quote Parameters</h2>
          <form onSubmit={handleGetQuote} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Origin City/Country</label>
                    <input required value={origin} onChange={e => setOrigin(e.target.value)} type="text" className="w-full border-gray-200 focus:border-[#FFCC00] focus:ring-0 p-3" placeholder="Tampa, FL" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Destination</label>
                    <input required value={dest} onChange={e => setDest(e.target.value)} type="text" className="w-full border-gray-200 focus:border-[#FFCC00] focus:ring-0 p-3" placeholder="Panama City" />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Estimated Weight (KG)</label>
                <input required value={weight} onChange={e => setWeight(Number(e.target.value))} type="number" className="w-full border-gray-200 focus:border-[#FFCC00] focus:ring-0 p-3" />
            </div>
            <button disabled={loading} className="w-full bg-[#FFCC00] text-black py-4 font-extrabold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                {loading ? 'Consulting Carriers...' : 'Fetch Live Quotes'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
            <h2 className="text-xl font-extrabold uppercase">Live Carriers</h2>
            {!quotes && !loading && (
                <div className="h-64 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300">
                    <i className="fas fa-ship text-4xl mb-4"></i>
                    <p className="uppercase font-bold text-xs">Awaiting Entry Parameters</p>
                </div>
            )}
            {loading && (
                <div className="space-y-4 animate-pulse">
                    <div className="h-32 bg-gray-100 w-full"></div>
                    <div className="h-32 bg-gray-100 w-full"></div>
                </div>
            )}
            {quotes && !loading && (
                <div className="space-y-4">
                    <div className="bg-white border-l-4 border-[#FFCC00] p-6 shadow-md flex justify-between items-center">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase">UPS Logistics</span>
                            <h3 className="text-lg font-extrabold">Standard Ground / Air</h3>
                            <p className="text-sm text-gray-500">Est. 5-7 Business Days</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black">$452.12</div>
                            <button className="text-[10px] uppercase font-bold tracking-widest text-[#FFCC00]">Select</button>
                        </div>
                    </div>
                    <div className="bg-white border-l-4 border-red-600 p-6 shadow-md flex justify-between items-center">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase">DHL Express</span>
                            <h3 className="text-lg font-extrabold">Priority Freight</h3>
                            <p className="text-sm text-gray-500">Est. 3-4 Business Days</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black">$788.50</div>
                            <button className="text-[10px] uppercase font-bold tracking-widest text-red-600">Select</button>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase text-center mt-4">* Simulated rates based on current logistics data. Final quote may vary.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Shipping;
