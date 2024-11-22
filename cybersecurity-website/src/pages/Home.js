import React from 'react';
import { Shield, Lock, Server } from 'lucide-react';

const Home = () => {
    return (
      <div className="min-h-screen">{/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Secure Your Digital Future
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Advanced cybersecurity solutions for the modern enterprise
            </p>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
        
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,200,255,0.1),transparent)]" />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors">
            <Shield className="h-12 w-12 text-cyan-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Advanced Protection</h3>
            <p className="text-gray-300">State-of-the-art security measures to protect your assets</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors">
            <Lock className="h-12 w-12 text-cyan-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure Access</h3>
            <p className="text-gray-300">Multi-factor authentication and access control</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors">
            <Server className="h-12 w-12 text-cyan-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Cloud Security</h3>
            <p className="text-gray-300">Comprehensive cloud infrastructure protection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;