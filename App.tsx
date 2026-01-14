
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
import { DataProvider } from './DataContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Parts', path: '/parts' },
    { name: 'Services', path: '/services' },
    { name: 'Equipment', path: '/equipment' },
    { name: 'Request Quote', path: '/quote' },
    { name: 'Contact Us', path: '/contact' }
  ];

  // Hide header on Admin
  if (location.pathname === '/admin') return null;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-[#FFCC00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-extrabold tracking-tighter uppercase text-[#111111]">
              AMERICAN<span className="text-[#FFCC00]">IRON</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[11px] font-black uppercase tracking-[0.15em] hover:text-[#FFCC00] transition-colors ${
                  location.pathname === link.path || (link.path === '/equipment' && location.pathname.startsWith('/equipment')) ? 'text-[#FFCC00]' : 'text-[#111111]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
             <div className="hidden lg:flex space-x-3 items-center">
                <a href="#" className="text-gray-400 hover:text-[#111111]"><i className="fab fa-facebook-f text-sm"></i></a>
                <a href="#" className="text-gray-400 hover:text-[#111111]"><i className="fab fa-linkedin-in text-sm"></i></a>
                <Link to="/admin" className="text-[9px] font-black uppercase tracking-widest text-gray-300 hover:text-[#111111] border border-gray-100 px-2 py-1 rounded">Portal</Link>
             </div>
             <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-[#111111] focus:outline-none"
             >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-bold text-[#111111] hover:bg-[#FFCC00] hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-xs font-black uppercase text-gray-400">Admin Portal</Link>
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
    <footer className="bg-[#111111] text-white pt-16 pb-8 border-t-8 border-[#FFCC00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h4 className="text-[#FFCC00] font-black uppercase tracking-widest text-xs border-b border-gray-800 pb-2 inline-block">Contact HQ</h4>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter">American Iron LLC</p>
            <p className="text-sm text-gray-400">13930 N Dale Mabry Hwy Suite 5<br/>Tampa, FL 33618</p>
            <p className="text-sm text-gray-400">P: (850) 777-3797</p>
            <p className="text-sm text-gray-400">E: info@americanironus.com</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[#FFCC00] font-black uppercase tracking-widest text-xs border-b border-gray-800 pb-2 inline-block">Asset Navigation</h4>
            <ul className="space-y-2 text-xs font-bold uppercase text-gray-400 tracking-wider">
              <li><Link to="/about" className="hover:text-white">Our Mission</Link></li>
              <li><Link to="/parts" className="hover:text-white">Components</Link></li>
              <li><Link to="/equipment-list" className="hover:text-white">Machinery</Link></li>
              <li><Link to="/contact" className="hover:text-white">Consultation</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[#FFCC00] font-black uppercase tracking-widest text-xs border-b border-gray-800 pb-2 inline-block">Core Capabilities</h4>
            <ul className="space-y-2 text-xs font-bold uppercase text-gray-400 tracking-wider">
              <li><Link to="/services" className="hover:text-white">Asset Recovery</Link></li>
              <li><Link to="/services" className="hover:text-white">Logistics & Export</Link></li>
              <li><Link to="/services" className="hover:text-white">Technical Inspections</Link></li>
              <li><Link to="/shipping" className="hover:text-white">Live Freight Quotes</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[#FFCC00] font-black uppercase tracking-widest text-xs border-b border-gray-800 pb-2 inline-block">Fleet Intelligence</h4>
            <p className="text-xs text-gray-400 uppercase leading-relaxed font-bold">Sign up for inventory liquidation alerts and exclusive arrivals.</p>
            <div className="flex flex-col space-y-2">
              <input type="email" placeholder="ENTER WORK EMAIL" className="bg-[#1a1a1a] border-none text-white px-4 py-3 w-full focus:ring-1 focus:ring-[#FFCC00] text-xs font-black" />
              <button className="bg-[#FFCC00] text-[#111111] px-4 py-3 font-black uppercase text-xs tracking-widest hover:bg-white transition-all">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-[9px] text-gray-600 uppercase tracking-[0.4em] font-black">
          &copy; {new Date().getFullYear()} American Iron LLC. All Rights Reserved. Heavy Equipment & Global Logistics.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <DataProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
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
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </DataProvider>
  );
}
