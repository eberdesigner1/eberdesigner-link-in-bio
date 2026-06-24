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
        <svg viewBox="0 0 24 24" className="card-icon custom-icon" width="20" height="20" fill="currentColor">
          <path d="M12.004 0C5.378 0 0 5.378 0 12.004c0 2.116.552 4.103 1.513 5.845L0 24l6.326-1.66c1.7.925 3.633 1.458 5.68 1.458 6.625 0 12.004-5.379 12.004-12.004C24.01 5.378 18.63 0 12.004 0zm6.812 17.29c-.279.782-1.383 1.433-2.222 1.637-.568.136-1.309.245-3.805-.785-3.193-1.317-5.263-4.577-5.424-4.793-.162-.216-1.3-1.722-1.3-3.284 0-1.562.817-2.327 1.11-2.637.293-.31.638-.387.85-.387.214 0 .43.003.619.01.196.008.46-.073.717.553.265.643.905 2.213.985 2.378.08.163.134.354.025.57-.107.216-.162.352-.325.541-.162.19-.34.426-.485.572-.162.16-.33.336-.142.661.187.323.834 1.378 1.785 2.228 1.229 1.097 2.263 1.438 2.585 1.599.322.161.51.135.7-.08.19-.215.818-.95.104-1.272-.358-.16-.71-.322-1.07-.483zm0 0" />
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
