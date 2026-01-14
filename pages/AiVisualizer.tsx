
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateEquipmentVisual } from '../services/geminiService';

const AiVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ratios = ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'];

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Check for API key access for Pro models
      const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio?.openSelectKey();
      }

      const { imageUrl } = await generateEquipmentVisual(prompt, aspectRatio);
      setResult(imageUrl);
    } catch (err: any) {
      setError(err.message || "Generation failed. Ensure a valid paid API key is selected.");
      if (err.message?.includes("entity was not found")) {
        await (window as any).aistudio?.openSelectKey();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-12">
        <Link to="/" className="text-[10px] font-black uppercase text-gray-400 hover:text-black mb-4 inline-block tracking-[0.2em]">← Return to Home</Link>
        <h1 className="text-5xl font-black uppercase tracking-tighter text-[#111111]">AI Equipment Visualizer</h1>
        <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-sm">Generate Custom Project Renderings & Asset Visualizations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white border-t-8 border-[#FFCC00] p-8 shadow-xl">
            <label className="block text-xs font-black uppercase text-gray-400 mb-4 tracking-widest">Visual Prompt</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'CAT D11 Dozer working in a dark coal mine with high-contrast floodlights...'"
              className="w-full border-gray-200 p-4 font-bold text-sm h-32 focus:ring-[#FFCC00] focus:border-[#FFCC00] outline-none mb-6"
            />

            <label className="block text-xs font-black uppercase text-gray-400 mb-4 tracking-widest">Aspect Ratio</label>
            <div className="grid grid-cols-4 gap-2 mb-8">
              {ratios.map(r => (
                <button 
                  key={r}
                  onClick={() => setAspectRatio(r)}
                  className={`py-2 text-[10px] font-black border transition-all ${aspectRatio === r ? 'bg-[#FFCC00] border-[#FFCC00] text-[#111111]' : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-[#111111] text-white py-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-[#FFCC00] hover:text-[#111111] transition-all disabled:opacity-50"
            >
              {loading ? 'Synthesizing Image...' : 'Generate Industrial Visual'}
            </button>
            <p className="mt-4 text-[9px] text-gray-400 font-bold text-center uppercase">Powered by Gemini 3 Pro Image</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 h-full min-h-[500px] flex items-center justify-center relative overflow-hidden">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCC00] mx-auto mb-4"></div>
                <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Processing High-Resolution Data...</p>
              </div>
            ) : result ? (
              <img src={result} alt="Generated Asset" className="max-w-full h-auto shadow-2xl animate-fade-in" />
            ) : error ? (
              <div className="text-center p-8">
                <i className="fas fa-triangle-exclamation text-4xl text-red-500 mb-4"></i>
                <p className="text-sm font-bold text-red-600 uppercase mb-4">{error}</p>
                <button onClick={() => window.location.reload()} className="text-[10px] font-black uppercase text-gray-400 underline">Retry Session</button>
              </div>
            ) : (
              <div className="text-center text-gray-300">
                <i className="fas fa-image text-6xl mb-4"></i>
                <p className="text-xs font-black uppercase tracking-[0.3em]">Canvas Ready for Generation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiVisualizer;
