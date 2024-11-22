import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <nav className="bg-gray-900/50 backdrop-blur-md border-b border-cyan-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold">CyberShield</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-cyan-500 transition-colors">Home</Link>
            <Link to="/services" className="hover:text-cyan-500 transition-colors">Services</Link>
            <Link to="/solutions" className="hover:text-cyan-500 transition-colors">Solutions</Link>
            <Link to="/contact" className="hover:text-cyan-500 transition-colors">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
            <Link to="/" className="block px-3 py-2 hover:bg-gray-700 rounded-md">Home</Link>
            <Link to="/services" className="block px-3 py-2 hover:bg-gray-700 rounded-md">Services</Link>
            <Link to="/solutions" className="block px-3 py-2 hover:bg-gray-700 rounded-md">Solutions</Link>
            <Link to="/contact" className="block px-3 py-2 hover:bg-gray-700 rounded-md">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;