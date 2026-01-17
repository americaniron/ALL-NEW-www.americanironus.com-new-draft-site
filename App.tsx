
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Parts from './pages/Parts';
import Equipment from './pages/Equipment';
import EquipmentList from './pages/EquipmentList';
import EquipmentDetail from './pages/EquipmentDetail';
import PartsList from './pages/PartsList';
import Quote from './pages/Quote';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Shipping from './pages/Shipping';
import Admin from './pages/Admin';
import AiVisualizer from './pages/AiVisualizer';
import DealerSearch from './pages/DealerSearch';
import { DataProvider } from './DataContext';
import ChatBot from './components/ChatBot';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isTechOpen, setIsTechOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'EQUIPMENT', path: '/equipment' },
    { name: 'PARTS', path: '/parts' },
    { name: 'SERVICES', path: '/services' },
    { name: 'COMPANY', path: '/about' },
  ];
  
  const techLinks = [
      { name: 'AI Media Studio', path: '/ai-visualizer', icon: 'fa-camera-retro' },
      { name: 'Global Service Locator', path: '/dealer-search', icon: 'fa-map-location-dot' },
  ];

  if (location.pathname === '/admin') return null;

  return (
    <div className="flex flex-col sticky top-0 z-50">
      {/* Top Utility Bar - Exact Holt Style */}
      <div className="bg-[#111111] text-white text-[11px] font-black uppercase tracking-widest py-2.5 px-4 hidden md:block border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto flex justify-end items-center space-x-10">
          <Link to="/dealer-search" className="hover:text-[#FFCC00] transition-colors flex items-center">
            <i className="fas fa-map-marker-alt mr-2 text-[#FFCC00]"></i>FIND A BRANCH
          </Link>
          <a href="tel:8507773797" className="hover:text-[#FFCC00] transition-colors flex items-center">
            <i className="fas fa-phone mr-2 text-[#FFCC00]"></i>(850) 777-3797
          </a>
          <Link to="/admin" className="hover:text-[#FFCC00] transition-colors">EMPLOYEE PORTAL</Link>
        </div>
      </div>

      {/* Main Navigation - Heavy Industrial Branding */}
      <header className="bg-white shadow-lg border-b-4 border-[#FFCC00]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="w-14 h-14 bg-[#111111] flex items-center justify-center mr-4 rounded-sm group-hover:bg-[#FFCC00] transition-colors">
                <span className="text-[#FFCC00] font-black text-3xl group-hover:text-[#111111]">AI</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter uppercase text-[#111111] leading-none">
                  AMERICAN
                </span>
                <span className="text-xl font-black tracking-[0.2em] uppercase text-gray-400 leading-none mt-1">
                  IRON
                </span>
              </div>
            </Link>

            {/* Desktop Nav - Bold, High-Impact */}
            <nav className="hidden lg:flex space-x-12 h-full items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-black uppercase tracking-tight h-full flex items-center border-b-[6px] transition-all pt-1.5 ${
                    location.pathname.startsWith(link.path) 
                      ? 'border-[#111111] text-[#111111]' 
                      : 'border-transparent text-gray-500 hover:text-[#111111] hover:border-[#FFCC00]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {/* AI & Technology Dropdown */}
              <div 
                className="relative h-full" 
                onMouseEnter={() => setIsTechOpen(true)} 
                onMouseLeave={() => setIsTechOpen(false)}
              >
                  <div className={`text-sm font-black uppercase tracking-tight h-full flex items-center border-b-[6px] transition-all pt-1.5 cursor-pointer ${
                    techLinks.some(l => location.pathname.startsWith(l.path))
                    ? 'border-[#111111] text-[#111111]'
                    : 'border-transparent text-gray-500 hover:text-[#111111] hover:border-[#FFCC00]'
                  }`}>
                      AI & TECHNOLOGY
                  </div>
                  {isTechOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white shadow-2xl border border-gray-100 mt-0 py-4 animate-fade-in">
                          {techLinks.map(link => (
                              <Link 
                                  key={link.path}
                                  to={link.path}
                                  className="flex items-center px-6 py-4 text-gray-600 hover:bg-gray-50 hover:text-[#111111] transition-colors"
                              >
                                  <i className={`fas ${link.icon} text-[#FFCC00] w-8 text-center mr-4`}></i>
                                  <span className="text-xs font-black uppercase tracking-widest">{link.name}</span>
                              </Link>
                          ))}
                      </div>
                  )}
              </div>
            </nav>

            {/* CTA */}
            <div className="flex items-center space-x-6">
               <Link to="/quote" className="hidden xl:flex items-center bg-[#FFCC00] text-[#111111] px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#111111] hover:text-white transition-all shadow-md">
                  REQUEST QUOTE
               </Link>
               <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-3 text-[#111111] bg-gray-100 hover:bg-[#FFCC00] transition-colors"
               >
                  <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#111111] text-white absolute w-full left-0 shadow-2xl z-50">
            <div className="px-6 py-10 space-y-6">
              {[...navLinks, { name: 'AI & Technology', path: '/ai-visualizer' }].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-2xl font-black uppercase tracking-tight hover:text-[#FFCC00] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 border-t border-gray-800 flex flex-col gap-6">
                <Link to="/dealer-search" className="text-sm font-bold text-gray-400 uppercase tracking-widest">Find a Branch</Link>
                <Link to="/quote" className="w-full text-center bg-[#FFCC00] text-[#111111] py-5 font-black uppercase text-sm tracking-widest">
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

const Footer = () => {
  const location = useLocation();
  if (location.pathname === '/admin') return null;
  
  return (
    <footer className="bg-[#111111] text-white pt-24 pb-12 border-t-8 border-[#FFCC00]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-[#FFCC00] flex items-center justify-center mr-3">
                    <span className="text-[#111111] font-black text-xl">AI</span>
                </div>
                <h4 className="text-xl font-black uppercase tracking-tighter">American Iron</h4>
            </div>
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8">
              American Iron is a premier authorized dealer for heavy industrial machinery, providing lifecycle solutions for major construction projects worldwide.
            </p>
            <div className="flex space-x-5 text-xl text-[#FFCC00]">
                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-facebook"></i></a>
                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          {/* Quick Links Group 1 */}
          <div>
            <h4 className="text-[#FFCC00] font-black uppercase text-xs tracking-[0.2em] mb-8">Equipment Sales</h4>
            <ul className="space-y-5 text-sm text-gray-400 font-bold uppercase tracking-tight">
              <li><Link to="/equipment" className="hover:text-white transition-all">New Cat® Machines</Link></li>
              <li><Link to="/equipment" className="hover:text-white transition-all">Used Inventory</Link></li>
              <li><Link to="/equipment" className="hover:text-white transition-all">Power Systems</Link></li>
              <li><Link to="/equipment" className="hover:text-white transition-all">Work Tools</Link></li>
            </ul>
          </div>

          {/* Quick Links Group 2 */}
          <div>
            <h4 className="text-[#FFCC00] font-black uppercase text-xs tracking-[0.2em] mb-8">Support Solutions</h4>
            <ul className="space-y-5 text-sm text-gray-400 font-bold uppercase tracking-tight">
              <li><Link to="/parts" className="hover:text-white transition-all">Parts Portal</Link></li>
              <li><Link to="/services" className="hover:text-white transition-all">Service Operations</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-all">Logistics Command</Link></li>
              <li><Link to="/quote" className="hover:text-white transition-all">Financing</Link></li>
            </ul>
          </div>

          {/* Contact Region */}
          <div className="bg-[#1a1a1a] p-10 border border-gray-800">
            <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-6">Regional Support</h4>
            <p className="text-3xl font-black mb-1 text-[#FFCC00] tracking-tighter">(850) 777-3797</p>
            <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-8">Available 24/7 for Enterprise Clients</p>
            <Link to="/contact" className="block w-full text-center bg-white text-[#111111] py-4 font-black uppercase text-[10px] tracking-widest hover:bg-[#FFCC00] transition-all">
              CONTACT CORPORATE
            </Link>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
          <p>&copy; {new Date().getFullYear()} American Iron LLC. CAT, CATERPILLAR, their respective logos, "Caterpillar Yellow" are trademarks of Caterpillar Inc.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-[#FFCC00]">PRIVACY</a>
            <a href="#" className="hover:text-[#FFCC00]">LEGAL</a>
            <a href="#" className="hover:text-[#FFCC00]">SITEMAP</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <DataProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col font-['Inter'] bg-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/parts" element={<Parts />} />
              <Route path="/parts-list" element={<PartsList />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/equipment-list" element={<EquipmentList />} />
              <Route path="/equipment/:id" element={<EquipmentDetail />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/ai-visualizer" element={<AiVisualizer />} />
              <Route path="/dealer-search" element={<DealerSearch />} />
            </Routes>
          </main>
          <ChatBot />
          <Footer />
        </div>
      </HashRouter>
    </DataProvider>
  );
}
