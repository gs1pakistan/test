import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-md border-t border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-cyan-500" />
              <span className="text-lg font-bold">CyberShield</span>
            </div>
            <p className="text-gray-300">
              Protecting your digital assets with next-generation cybersecurity solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Threat Detection</li>
              <li>Network Security</li>
              <li>Cloud Protection</li>
              <li>Identity Management</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>contact@cybershield.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Security Street</li>
              <li>Cyber City, CS 12345</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 CyberShield. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;