
import React, { useState } from 'react';
import { Address, Package, Quote } from '../types';
import { getRates, createShipment } from '../api/shippingClient';

const initialAddress: Address = { name: '', address1: '', city: '', state: '', postalCode: '', countryCode: 'US', phone: '' };
const initialPackage: Package = { 
  weight: { value: 1, unit: 'LB' }, 
  dimensions: { length: 1, width: 1, height: 1, unit: 'IN' }, 
  declaredValue: { amount: 0, currency: 'USD' } 
};

const Shipping: React.FC = () => {
  const [shipper, setShipper] = useState<Address>(initialAddress);
  const [recipient, setRecipient] = useState<Address>(initialAddress);
  const [packages, setPackages] = useState<Package[]>([initialPackage]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [shipmentResult, setShipmentResult] = useState<any>(null);

  const handleGetRates = async () => {
    setLoading(true);
    setError(null);
    setQuotes([]);
    setSelectedQuote(null);
    try {
      const results = await getRates('AUTO', shipper, recipient, packages);
      setQuotes(results);
    } catch (err) {
      console.error(err);
      setError('Error fetching carrier rates. Please check addresses and ensure the logistics backend is online.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShipment = async () => {
    if (!selectedQuote) return;
    setLoading(true);
    setError(null);
    try {
      const result = await createShipment({
        carrier: selectedQuote.carrier,
        selected_service_code: selectedQuote.service_code,
        shipper,
        recipient,
        packages
      });
      setShipmentResult(result);
    } catch (err) {
      console.error(err);
      setError('Failed to generate shipping label. Please double-check address formatting or API credentials.');
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = (type: 'shipper' | 'recipient', field: keyof Address, value: string) => {
    const setter = type === 'shipper' ? setShipper : setRecipient;
    setter(prev => ({ ...prev, [field]: value }));
  };

  const addPackage = () => setPackages([...packages, { ...initialPackage }]);
  const removePackage = (index: number) => setPackages(packages.filter((_, i) => i !== index));
  const updatePackage = (index: number, updates: Partial<Package>) => {
    const newPackages = [...packages];
    newPackages[index] = { ...newPackages[index], ...updates };
    setPackages(newPackages);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="text-[52px] font-bold text-[#b3b3b3] mb-2 leading-none tracking-tight uppercase">Logistics Portal</h1>
          <p className="text-[#b3b3b3] text-[18px] font-medium uppercase tracking-widest">Global Asset Forwarding & Priority Label Generation</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Section 1: Address Parameters */}
          <div className="xl:col-span-2 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Shipper Block */}
              <div className="bg-white border-t-8 border-black p-8 shadow-sm">
                <h2 className="text-sm font-black uppercase tracking-widest text-[#111111] mb-6 flex items-center">
                  <i className="fas fa-warehouse mr-3 text-[#FFCC00]"></i> 01. Origin Address
                </h2>
                <div className="space-y-4">
                  <input className="w-full border-gray-200 p-3 text-sm focus:border-[#FFCC00] outline-none font-bold" placeholder="Company/Sender Name" value={shipper.name} onChange={e => updateAddress('shipper', 'name', e.target.value)} />
                  <input className="w-full border-gray-200 p-3 text-sm focus:border-[#FFCC00] outline-none" placeholder="Street Address" value={shipper.address1} onChange={e => updateAddress('shipper', 'address1', e.target.value)} />
                  <div className="grid grid-cols-2 gap-4">
                    <input className="w-full border-gray-200 p-3 text-sm focus:border-[#FFCC00] outline-none" placeholder="City" value={shipper.city} onChange={e => updateAddress('shipper', 'city', e.target.value)} />
                    <input className="w-full border-gray-200 p-3 text-sm focus:border-[#FFCC00] outline-none" placeholder="State/Prov" value={shipper.state} onChange={e => updateAddress('shipper', 'state', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input className="w-full border-gray-200 p-3 text-sm focus:border-[#FFCC00] outline-none" placeholder="ZIP/Postal" value={shipper.postalCode} onChange={e => updateAddress('shipper', 'postalCode', e.target.value)} />
                    <input className="w-full border-gray-200 p-3 text-sm focus:border-[#FFCC00] outline-none" placeholder="ISO Country Code" value={shipper.countryCode} onChange={e => updateAddress('shipper', 'countryCode', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Recipient Block */}
              <div className="bg-white border-t-8 border-black p-8 shadow-sm">
                <h2 className="text-sm font-black uppercase tracking-widest text-[#111111] mb-6 flex items-center">
                  <i className="fas fa-truck-ramp-box mr-3 text-[#FFCC00]"></i> 02. Consignee Address
                </h2>
                <div className="space-y-4">
                  <input className="w-full border-gray-200 p-3 text-sm focus:border-[#FFCC00] outline-none font-bold" placeholder="Recipient Name" value={recipient.name} onChange={e => updateAddress('recipient', 'name', e.target.value)} />
                  <input className="w-full border-gray-200 p-3 text-sm focus:border-[#FFCC00] outline-none" placeholder="Street Address" value={recipient.address1} onChange={e => updateAddress('recipient', 'address1', e.target.value)} />
                  <div className="grid grid-cols-2 gap-4">
                    <input className="w-full border-gray-200 p-3 text-sm focus:border-[#FFCC00] outline-none" placeholder="City" value={recipient.city} onChange={e => updateAddress('recipient', 'city', e.target.value)} />
                    <input className="w-full border-gray-200 p-3 text-sm focus:border-[#FFCC00] outline-none" placeholder="State/Prov" value={recipient.state} onChange={e => updateAddress('recipient', 'state', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input className="w-full border-gray-200 p-3 text-sm focus:border-[#FFCC00] outline-none" placeholder="ZIP/Postal" value={recipient.postalCode} onChange={e => updateAddress('recipient', 'postalCode', e.target.value)} />
                    <input className="w-full border-gray-200 p-3 text-sm focus:border-[#FFCC00] outline-none" placeholder="ISO Country Code" value={recipient.countryCode} onChange={e => updateAddress('recipient', 'countryCode', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Package Inventory Management */}
            <div className="bg-gray-50 p-8 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-[#111111]">
                  <i className="fas fa-boxes-stacked mr-3 text-[#FFCC00]"></i> 03. Package Inventory
                </h2>
                <button onClick={addPackage} className="text-[10px] font-black uppercase bg-[#111111] text-white px-4 py-2 hover:bg-[#FFCC00] hover:text-[#111111] transition-all">
                  + Add Package
                </button>
              </div>
              <div className="space-y-4">
                {packages.map((pkg, idx) => (
                  <div key={idx} className="bg-white p-6 border border-gray-200 flex flex-wrap lg:flex-nowrap items-end gap-6 shadow-sm">
                    <div className="w-full lg:w-32">
                      <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Weight ({pkg.weight.unit})</label>
                      <input type="number" className="w-full border-gray-100 p-2 text-sm" value={pkg.weight.value} onChange={e => updatePackage(idx, { weight: { ...pkg.weight, value: Number(e.target.value) } })} />
                    </div>
                    <div className="flex gap-2 w-full lg:w-auto">
                      <div>
                        <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Length</label>
                        <input type="number" className="w-20 border-gray-100 p-2 text-sm" value={pkg.dimensions.length} onChange={e => updatePackage(idx, { dimensions: { ...pkg.dimensions, length: Number(e.target.value) } })} />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Width</label>
                        <input type="number" className="w-20 border-gray-100 p-2 text-sm" value={pkg.dimensions.width} onChange={e => updatePackage(idx, { dimensions: { ...pkg.dimensions, width: Number(e.target.value) } })} />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Height</label>
                        <input type="number" className="w-20 border-gray-100 p-2 text-sm" value={pkg.dimensions.height} onChange={e => updatePackage(idx, { dimensions: { ...pkg.dimensions, height: Number(e.target.value) } })} />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Declared Value (USD)</label>
                      <input type="number" className="w-full border-gray-100 p-2 text-sm" value={pkg.declaredValue.amount} onChange={e => updatePackage(idx, { declaredValue: { ...pkg.declaredValue, amount: Number(e.target.value) } })} />
                    </div>
                    {packages.length > 1 && (
                      <button onClick={() => removePackage(idx)} className="text-red-400 hover:text-red-600 mb-2">
                        <i className="fas fa-trash-can"></i>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Carrier Rates & Results */}
          <div className="space-y-8">
            <div className="bg-[#111111] p-8 text-white shadow-xl border-b-8 border-[#FFCC00]">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-[#FFCC00]">Logistics Execution</h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-900/50 text-red-300 text-xs font-bold border-l-4 border-red-500">
                  {error}
                </div>
              )}

              <button 
                onClick={handleGetRates} 
                disabled={loading || !shipper.postalCode || !recipient.postalCode}
                className="w-full bg-[#FFCC00] text-[#111111] py-5 font-black uppercase text-xs tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50"
              >
                {loading ? 'Consulting Carrier APIs...' : 'Fetch Live Quotes'}
              </button>

              {quotes.length > 0 && (
                <div className="mt-10 space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-gray-500 mb-4 tracking-widest">Available Service Levels</h3>
                  {quotes.map((q, i) => (
                    <div 
                      key={i} 
                      className={`p-5 border cursor-pointer transition-all flex justify-between items-center group ${selectedQuote === q ? 'border-[#FFCC00] bg-[#1a1a1a]' : 'border-gray-800 hover:border-gray-600'}`}
                      onClick={() => setSelectedQuote(q)}
                    >
                      <div>
                        <div className="flex items-center">
                          <span className={`text-[10px] font-black px-2 py-0.5 mr-3 rounded-sm ${q.carrier === 'UPS' ? 'bg-yellow-800 text-yellow-100' : 'bg-red-800 text-red-100'}`}>
                            {q.carrier}
                          </span>
                          <span className="text-sm font-bold uppercase tracking-tighter">{q.service_name}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase">Estimated Transit: {q.eta_days} Days</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-[#FFCC00]">${q.total_cost.toFixed(2)}</div>
                        <div className="text-[9px] text-gray-600 font-bold uppercase">{q.currency}</div>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={handleCreateShipment}
                    disabled={!selectedQuote || loading}
                    className="mt-8 w-full bg-white text-[#111111] py-4 font-black uppercase text-xs tracking-widest hover:bg-[#FFCC00] transition-all"
                  >
                    Purchase Transport Label
                  </button>
                </div>
              )}
            </div>

            {/* Successful Shipment Result Display */}
            {shipmentResult && (
              <div className="bg-white border-4 border-black p-8 shadow-2xl animate-fade-in">
                <div className="flex items-center text-green-600 mb-6">
                  <i className="fas fa-circle-check text-2xl mr-3"></i>
                  <h3 className="text-lg font-black uppercase tracking-tighter">Manifest Generated</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Carrier Network</label>
                    <p className="text-sm font-bold uppercase">{shipmentResult.carrier} {shipmentResult.service_name}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Global Tracking #</label>
                    <p className="text-lg font-black font-mono tracking-widest text-[#111111]">{shipmentResult.tracking_number}</p>
                  </div>
                  <hr className="border-gray-100" />
                  <a 
                    href={shipmentResult.label.signed_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between bg-black text-white p-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#FFCC00] hover:text-[#111111] transition-all"
                  >
                    <span>Download {shipmentResult.label.format} Label</span>
                    <i className="fas fa-print"></i>
                  </a>
                  <p className="text-[9px] text-gray-400 font-bold uppercase text-center leading-relaxed">
                    Label link expires in 15 minutes.<br/>Standard American Iron export terms apply.
                  </p>
                </div>
              </div>
            )}

            {!quotes.length && !loading && !shipmentResult && (
              <div className="bg-gray-50 p-12 text-center border-2 border-dashed border-gray-200">
                <i className="fas fa-truck-fast text-4xl text-gray-200 mb-4"></i>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Enter parameters to consult global carrier networks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
