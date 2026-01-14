
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Equipment', path: '/equipment' },
    { name: 'Parts', path: '/parts' },
    { name: 'Visualizer', path: '/ai-visualizer' },
    { name: 'Locate', path: '/dealer-search' },
    { name: 'Logistics', path: '/shipping' },
    { name: 'Quote', path: '/quote' }
  ];

  if (location.pathname === '/admin') return null;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b-4 border-[#FFCC00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-black tracking-tighter uppercase text-[#111111]">
              AMERICAN<span className="text-[#FFCC00]">IRON</span>
            </span>
          </Link>

          <nav className="hidden xl:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#FFCC00] transition-colors ${
                  location.pathname === link.path ? 'text-[#FFCC00]' : 'text-[#111111]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
             <div className="hidden lg:flex space-x-4 items-center">
                <Link to="/admin" className="text-[9px] font-black uppercase tracking-widest bg-gray-50 hover:bg-[#111111] hover:text-white px-3 py-2 border border-gray-100 transition-all">Admin Portal</Link>
             </div>
             <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden p-2 rounded-md text-[#111111] focus:outline-none"
             >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
             </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 pb-4">
          <div className="px-4 pt-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-4 text-sm font-black uppercase tracking-widest text-[#111111] border-b border-gray-50"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  const location = useLocation();
  if (location.pathname === '/admin') return null;
  
  return (
    <footer className="bg-[#111111] text-white pt-24 pb-12 border-t-8 border-[#FFCC00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-6">
            <h4 className="text-[#FFCC00] font-black uppercase tracking-[0.3em] text-[10px] mb-4">Operations HQ</h4>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter">American Iron LLC</p>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">13930 N Dale Mabry Hwy Suite 5<br/>Tampa, FL 33618</p>
            <p className="text-sm text-gray-400 font-bold">P: (850) 777-3797</p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[#FFCC00] font-black uppercase tracking-[0.3em] text-[10px] mb-4">Intelligence</h4>
            <ul className="space-y-3 text-xs font-black uppercase text-gray-500 tracking-widest">
              <li><Link to="/ai-visualizer" className="hover:text-white transition-colors">Visualizer</Link></li>
              <li><Link to="/dealer-search" className="hover:text-white transition-colors">Service Locator</Link></li>
              <li><Link to="/equipment-list" className="hover:text-white transition-colors">Asset Matrix</Link></li>
              <li><Link to="/parts-list" className="hover:text-white transition-colors">Part Registry</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[#FFCC00] font-black uppercase tracking-[0.3em] text-[10px] mb-4">Infrastructure</h4>
            <ul className="space-y-3 text-xs font-black uppercase text-gray-500 tracking-widest">
              <li><Link to="/services" className="hover:text-white transition-colors">Dismantling</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Logistics</Link></li>
              <li><Link to="/quote" className="hover:text-white transition-colors">Procurement</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[#FFCC00] font-black uppercase tracking-[0.3em] text-[10px] mb-4">Newsletter</h4>
            <p className="text-xs text-gray-500 uppercase leading-relaxed font-black">Fleet liquidation alerts & arrivals.</p>
            <div className="flex bg-[#1a1a1a] p-1 border border-gray-800">
              <input type="email" placeholder="EMAIL" className="bg-transparent border-none text-white px-4 py-2 w-full focus:ring-0 text-[10px] font-black" />
              <button className="bg-[#FFCC00] text-[#111111] px-4 py-2 font-black uppercase text-[10px] hover:bg-white transition-all">Submit</button>
            </div>
          </div>
        </div>
        <div className="mt-24 pt-12 border-t border-gray-900 text-center text-[9px] text-gray-700 uppercase tracking-[0.5em] font-black">
          &copy; {new Date().getFullYear()} American Iron LLC | Enterprise Logistics & Heavy Equipment
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <DataProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col font-['Inter']">
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
          <Footer />
        </div>
      </HashRouter>
    </DataProvider>
  );
}
