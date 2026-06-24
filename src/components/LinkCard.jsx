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

  // Render custom icons or resolve Lucide icon dynamically
  const renderIcon = () => {
    if (iconName === 'WhatsApp') {
      return (
        <svg viewBox="0 0 24 24" className="card-icon custom-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          <path d="M17 14c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.5-1.6-1-1-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4-.1-.6-.1-.2-.7-1.7-.9-2.2-.2-.6-.5-.5-.7-.5h-.7c-.2 0-.6.1-.9.4C7 6.4 6.2 7.2 6.2 8.7c0 1.5 1.1 3 1.2 3.2.1.2 2.2 3.4 5.4 4.8.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z" fill="currentColor" stroke="none" />
        </svg>
      );
    }
    
    if (iconName === 'Instagram') {
      return (
        <svg viewBox="0 0 24 24" className="card-icon custom-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    }

    const IconComponent = LucideIcons[iconName] || LucideIcons.HelpCircle;
    return <IconComponent className="card-icon" size={20} />;
  };

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
            {renderIcon()}
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
