import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.jpg';

const specialties = [
  'Social Media',
  'Carrosséis',
  'Criativos',
  'Landing Pages',
  'Sites Institucionais',
  'Web Design'
];

export default function Hero() {
  return (
    <div className="hero-container">
      {/* Logo Container with Pulsing Glow */}
      <motion.div 
        className="avatar-wrapper"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
      >
        <div className="avatar-glow" />
        <img src={logoImg} alt="Eber Designer Logo" className="avatar-img" fetchpriority="high" />
      </motion.div>

      {/* Name Title */}
      <motion.h1 
        className="hero-title text-glow gradient-text"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Eber Designer
      </motion.h1>

      {/* Subtitle */}
      <motion.h2 
        className="hero-subtitle"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Designer Gráfico & Web Designer
      </motion.h2>

      {/* Description */}
      <motion.p 
        className="hero-description"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Sites, landing pages e criativos para empresas que precisam transmitir confiança e gerar mais contatos.
      </motion.p>

      {/* Specialty Static List */}
      <motion.div 
        className="specialties-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {specialties.map((spec) => (
          <span key={spec} className="specialty-item">{spec}</span>
        ))}
      </motion.div>
    </div>
  );
}
