
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { generateEquipmentVisual, editEquipmentImage, animateEquipmentImage } from '../services/geminiService';

type Mode = 'generate' | 'edit' | 'animate';

const AiVisualizer: React.FC = () => {
  const [mode, setMode] = useState<Mode>('generate');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [imageSize, setImageSize] = useState('1K');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [resultMedia, setResultMedia] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Updated to supported ratios per coding guidelines
  const ratios = ['1:1', '3:4', '4:3', '9:16', '16:9'];
  const videoRatios = ['16:9', '9:16'];
  const sizes = ['1K', '2K', '4K'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const ensureApiKey = async () => {
    const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio?.openSelectKey();
    }
  };

  const handleAction = async () => {
    setLoading(true);
    setError(null);
    setResultMedia(null);
    setIsVideo(false);

    try {
      if (mode === 'generate') {
        if (!prompt) throw new Error("A detailed visual prompt is required.");
        await ensureApiKey();
        const { imageUrl } = await generateEquipmentVisual(prompt, aspectRatio, imageSize);
        setResultMedia(imageUrl);
      } else if (mode === 'edit') {
        if (!uploadedImage) throw new Error("A source image must be uploaded for editing.");
        if (!prompt) throw new Error("An editing instruction is required.");
        const { imageUrl } = await editEquipmentImage(uploadedImage, prompt);
        setResultMedia(imageUrl);
      } else if (mode === 'animate') {
        if (!uploadedImage) throw new Error("A source image must be uploaded for animation.");
        await ensureApiKey(); // Veo requires paid key
        const videoUrl = await animateEquipmentImage(uploadedImage, aspectRatio);
        setResultMedia(videoUrl);
        setIsVideo(true);
      }
    } catch (err: any) {
      console.error("AI Visualizer Error:", err);
      let userMessage = "An unexpected error occurred during asset generation. Please check the console for details.";
      if (err.message) {
          const lowerMessage = err.message.toLowerCase();
          if (lowerMessage.includes("api key") || lowerMessage.includes("not found") || lowerMessage.includes("permission denied")) {
              userMessage = "Operation failed due to an API key issue. Premium features like Generate and Animate require a valid key from a paid GCP project. Please select a key to continue.";
              try {
                  await (window as any).aistudio?.openSelectKey();
              } catch (e) { console.error("Key selection dialog failed", e); }
          } else if (lowerMessage.includes("prompt")) {
              userMessage = "The provided prompt was blocked for safety reasons. Please revise your text and try again.";
          } else {
              userMessage = `Operation failed: ${err.message}`;
          }
      }
      setError(userMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-12">
        <Link to="/" className="text-[10px] font-black uppercase text-gray-400 hover:text-black mb-4 inline-block tracking-[0.2em]">← Return to Home</Link>
        <h1 className="text-5xl font-black uppercase tracking-tighter text-[#111111]">AI Media Studio</h1>
        <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-sm">Create, Edit, and Animate Industrial Assets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white border-t-8 border-[#FFCC00] p-8 shadow-xl">
            
            {/* Mode Selector */}
            <div className="flex space-x-1 bg-gray-100 p-1 mb-8 rounded-sm">
                {(['generate', 'edit', 'animate'] as Mode[]).map(m => (
                    <button
                        key={m}
                        onClick={() => { setMode(m); setUploadedImage(null); setResultMedia(null); }}
                        className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-[#111111] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        {m}
                    </button>
                ))}
            </div>

            {/* Controls */}
            <div className="space-y-6">
                {(mode === 'edit' || mode === 'animate') && (
                    <div>
                        <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Source Image</label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-200 p-6 text-center cursor-pointer hover:border-[#FFCC00] transition-colors relative h-32 flex items-center justify-center overflow-hidden"
                        >
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="Upload" className="w-full h-full object-cover opacity-50" />
                            ) : (
                                <div className="text-gray-300">
                                    <i className="fas fa-upload text-xl mb-2"></i>
                                    <div className="text-[9px] font-bold uppercase">Click to Upload</div>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                        </div>
                    </div>
                )}

                {(mode === 'generate' || mode === 'edit') && (
                    <div>
                        <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">
                            {mode === 'generate' ? 'Visual Prompt' : 'Edit Instruction'}
                        </label>
                        <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={mode === 'generate' ? "e.g., 'CAT D11 Dozer working in a dark coal mine...'" : "e.g., 'Add a retro filter', 'Remove background person'..."}
                        className="w-full border-gray-200 p-4 font-bold text-sm h-24 focus:ring-[#FFCC00] focus:border-[#FFCC00] outline-none"
                        />
                    </div>
                )}

                {(mode === 'generate' || mode === 'animate') && (
                    <div>
                        <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Aspect Ratio</label>
                        <div className="grid grid-cols-4 gap-2">
                        {(mode === 'animate' ? videoRatios : ratios).map(r => (
                            <button 
                            key={r}
                            onClick={() => setAspectRatio(r)}
                            className={`py-2 text-[9px] font-black border transition-all ${aspectRatio === r ? 'bg-[#FFCC00] border-[#FFCC00] text-[#111111]' : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'}`}
                            >
                            {r}
                            </button>
                        ))}
                        </div>
                    </div>
                )}

                {mode === 'generate' && (
                    <div>
                        <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Resolution</label>
                        <div className="flex space-x-2">
                            {sizes.map(s => (
                                <button 
                                key={s}
                                onClick={() => setImageSize(s)}
                                className={`flex-1 py-2 text-[9px] font-black border transition-all ${imageSize === s ? 'bg-[#111111] border-[#111111] text-white' : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'}`}
                                >
                                {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <button 
                onClick={handleAction}
                disabled={loading}
                className="w-full bg-[#111111] text-white py-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-[#FFCC00] hover:text-[#111111] transition-all disabled:opacity-50 mt-4"
                >
                {loading ? 'Processing...' : mode === 'generate' ? 'Generate Visual' : mode === 'edit' ? 'Apply Edits' : 'Render Video'}
                </button>
                
                <p className="text-[8px] text-gray-400 font-bold text-center uppercase">
                    Model: {mode === 'generate' ? 'Gemini 3 Pro' : mode === 'edit' ? 'Gemini 2.5 Flash' : 'Veo 3.1'}
                </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 h-full min-h-[500px] flex items-center justify-center relative overflow-hidden">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCC00] mx-auto mb-4"></div>
                <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Processing High-Fidelity Asset...</p>
                {mode === 'animate' && <p className="text-[9px] text-gray-400 mt-2">Video rendering may take a few minutes</p>}
              </div>
            ) : resultMedia ? (
              isVideo ? (
                  <video src={resultMedia} controls autoPlay loop className="max-w-full max-h-[600px] shadow-2xl animate-fade-in" />
              ) : (
                  <img src={resultMedia} alt="Generated Asset" className="max-w-full max-h-[600px] shadow-2xl animate-fade-in" />
              )
            ) : error ? (
              <div className="text-center p-8 max-w-md">
                <i className="fas fa-triangle-exclamation text-4xl text-red-500 mb-4"></i>
                <p className="text-sm font-bold text-red-600 uppercase mb-4">{error}</p>
                <button onClick={handleAction} className="text-[10px] font-black uppercase text-gray-500 underline">Retry Operation</button>
              </div>
            ) : (
              <div className="text-center text-gray-300">
                <i className="fas fa-layer-group text-6xl mb-4"></i>
                <p className="text-xs font-black uppercase tracking-[0.3em]">Canvas Ready</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiVisualizer;
