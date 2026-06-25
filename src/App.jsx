import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveBackground from './components/InteractiveBackground';
import Hero from './components/Hero';
import LinkSection from './components/LinkSection';
import Footer from './components/Footer';
import PortfolioPage from './components/PortfolioPage';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Home view wrapper with narrow constraint (580px max-width)
function HomeView() {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="links-layout"
    >
      {/* Header & Bio Section */}
      <Hero />
      
      {/* Main Links Section */}
      <LinkSection onNavigate={(url) => navigate(url)} />
      
      {/* Footer Section */}
      <Footer />
    </motion.div>
  );
}

// Portfolio view wrapper with wider constraint (1100px max-width)
function PortfolioView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="portfolio-layout"
    >
      <PortfolioPage />
      <Footer />
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      {/* High-performance Interactive background */}
      <InteractiveBackground />
      
      {/* Main Routing Container */}
      <main className="container">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/portfolio" element={<PortfolioView />} />
        </Routes>
      </main>

      {/* Global Floating WhatsApp button */}
      <FloatingWhatsApp />
    </Router>
  );
}
