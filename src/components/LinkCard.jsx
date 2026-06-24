import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

export default function LinkCard({ title, description, iconName, url, delay }) {
  const cardRef = useRef(null);

  // Capture mouse coordinates relative to the card for the shiny overlay effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);
  };

  // Resolve Lucide icon dynamically
  const IconComponent = LucideIcons[iconName] || LucideIcons.HelpCircle;

  return (
    <motion.a
      ref={cardRef}
      href={url}
      target={url === '#' ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="link-card"
      onMouseMove={handleMouseMove}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Light sheen layer following mouse */}
      <div className="card-shine" />

      {/* Main card layout */}
      <div className="card-content">
        <div className="card-left">
          <div className="icon-wrapper">
            <IconComponent className="card-icon" size={20} />
          </div>
          <div className="text-wrapper">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
          </div>
        </div>
        
        <div className="card-right">
          <LucideIcons.ArrowUpRight className="arrow-icon" size={18} />
        </div>
      </div>
    </motion.a>
  );
}
