import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import VideoBackground from './components/VideoBackground';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen text-white relative">
        <VideoBackground />
        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;