
import React, { useState, useRef, useEffect } from 'react';
import { createChatSession } from '../services/geminiService';
import { GenerateContentResponse } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to American Iron Intelligence. How can I assist with your fleet or procurement needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session once
  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response: GenerateContentResponse = await chatSessionRef.current.sendMessage({ message: userMsg });
      const text = response.text || "Transmission error. Please re-verify query.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Secure connection interrupted. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`bg-white w-[350px] sm:w-[400px] shadow-2xl border border-gray-200 rounded-sm overflow-hidden mb-4 transition-all duration-300 origin-bottom-right pointer-events-auto ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 h-0'
        }`}
      >
        {/* Header */}
        <div className="bg-[#111111] p-4 flex justify-between items-center border-b-4 border-[#FFCC00]">
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs">American Iron</h3>
            <p className="text-[#FFCC00] text-[10px] font-bold uppercase tracking-[0.2em]">Concierge AI</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 bg-gray-50 flex flex-col space-y-4">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`max-w-[85%] p-3 rounded-sm text-xs font-medium leading-relaxed ${
                msg.role === 'user' 
                  ? 'self-end bg-[#111111] text-white border-l-2 border-transparent' 
                  : 'self-start bg-white text-gray-800 border-l-2 border-[#FFCC00] shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="self-start bg-white p-3 border-l-2 border-[#FFCC00] shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#FFCC00] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#FFCC00] rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-[#FFCC00] rounded-full animate-bounce delay-150"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about inventory, parts, or logistics..."
              className="flex-grow bg-gray-100 border-none px-4 py-3 text-xs font-bold focus:ring-1 focus:ring-[#FFCC00] outline-none rounded-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-[#111111] text-[#FFCC00] p-3 rounded-sm hover:bg-[#FFCC00] hover:text-[#111111] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-[#111111] text-[#FFCC00] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-2 border-[#FFCC00] group"
      >
        <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-robot'} text-xl group-hover:rotate-12 transition-transform`}></i>
      </button>
    </div>
  );
};

export default ChatBot;
