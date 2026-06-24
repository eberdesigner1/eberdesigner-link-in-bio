import React from 'react';
import { motion } from 'framer-motion';
import InteractiveBackground from './components/InteractiveBackground';
import Hero from './components/Hero';
import LinkSection from './components/LinkSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* High-performance Interactive background */}
      <InteractiveBackground />
      
      {/* Main Single Page Layout */}
      <main className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Header & Bio Section */}
          <Hero />
          
          {/* Main Links Section */}
          <LinkSection />
          
          {/* Footer Section */}
          <Footer />
        </motion.div>
      </main>
    </>
  );
}
