
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-extrabold uppercase mb-4">Initiate Procurement Partnership</h1>
                <p className="text-gray-600 leading-relaxed">
                    Streamlined communication channels for high-volume fleet managers. Direct access to decision-makers for immediate asset disposition and acquisition.
                </p>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-start space-x-4">
                    <div className="bg-[#FFCC00] p-3 rounded-sm"><i className="fas fa-map-marker-alt text-black"></i></div>
                    <div>
                        <h3 className="font-bold uppercase text-sm">Corporate Headquarters</h3>
                        <p className="text-gray-500 text-sm">13930 N Dale Mabry Hwy Suite 5<br/>Tampa, FL 33618</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="bg-[#FFCC00] p-3 rounded-sm"><i className="fas fa-phone text-black"></i></div>
                    <div>
                        <h3 className="font-bold uppercase text-sm">Main Office</h3>
                        <p className="text-gray-500 text-sm">(850) 777-3797</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="bg-[#FFCC00] p-3 rounded-sm"><i className="fas fa-envelope text-black"></i></div>
                    <div>
                        <h3 className="font-bold uppercase text-sm">Email</h3>
                        <p className="text-gray-500 text-sm">info@americanironus.com</p>
                    </div>
                </div>
            </div>

            <div className="h-64 bg-gray-200 border-4 border-gray-100 flex items-center justify-center text-gray-400 uppercase tracking-widest text-xs font-bold">
                [ Interactive Map Integration Point ]
            </div>
        </div>

        <div className="bg-gray-50 p-10 border-t-8 border-black shadow-lg">
            <h2 className="text-2xl font-extrabold uppercase mb-8">Consultation Request</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent.'); }}>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">Full Name</label>
                    <input required type="text" className="w-full border-gray-200 focus:border-[#FFCC00] focus:ring-0 p-3" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">Email</label>
                    <input required type="email" className="w-full border-gray-200 focus:border-[#FFCC00] focus:ring-0 p-3" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">Subject</label>
                    <input type="text" className="w-full border-gray-200 focus:border-[#FFCC00] focus:ring-0 p-3" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">Message</label>
                    <textarea rows={5} className="w-full border-gray-200 focus:border-[#FFCC00] focus:ring-0 p-3"></textarea>
                </div>
                <button className="w-full bg-black text-white py-4 font-extrabold uppercase tracking-widest hover:bg-[#FFCC00] hover:text-black transition-all">
                    Send Consultation Request
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
