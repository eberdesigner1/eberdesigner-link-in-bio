import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MessageSquare, Globe } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

// Client Data with 9 artwork placeholders each
const clientsData = [
  {
    id: 1,
    name: 'Vortex Tech',
    description: 'Design de carrosséis estratégicos de posicionamento e criativos de tráfego pago para o lançamento de uma plataforma de Inteligência Artificial no mercado SaaS.',
    gradient: 'linear-gradient(135deg, rgba(17, 17, 17, 0.6) 0%, rgba(34, 18, 0, 0.4) 100%)',
    accentColor: '#FF6B00',
    arts: Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      title: `Criativo SaaS #${i + 1}`,
      subtitle: 'Vortex Intelligence',
      bgColor: '#160a00'
    }))
  },
  {
    id: 2,
    name: 'Mastery Fitness',
    description: 'Linha editorial de alta performance para redes sociais, incluindo infográficos de rotinas de treino, criativos motivacionais de alta conversão e posts institucionais.',
    gradient: 'linear-gradient(135deg, rgba(17, 17, 17, 0.6) 0%, rgba(13, 26, 13, 0.4) 100%)',
    accentColor: '#00cc66',
    arts: Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      title: `Fitness Post #${i + 1}`,
      subtitle: 'Mastery Academy',
      bgColor: '#001a08'
    }))
  },
  {
    id: 3,
    name: 'Aero Corporate',
    description: 'Identidade visual para postagens no LinkedIn e Instagram de consultoria empresarial. Design limpo, sóbrio e minimalista com foco em B2B e captação de clientes corporativos.',
    gradient: 'linear-gradient(135deg, rgba(17, 17, 17, 0.6) 0%, rgba(0, 18, 26, 0.4) 100%)',
    accentColor: '#0099ff',
    arts: Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      title: `Corporate B2B #${i + 1}`,
      subtitle: 'Aero Executive',
      bgColor: '#000f1a'
    }))
  }
];

function ThreeDCarousel({ arts, accentColor }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % arts.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + arts.length) % arts.length);
  };

  return (
    <div className="carousel-3d-wrapper">
      {/* Carousel Window Track */}
      <div className="carousel-3d-track">
        {arts.map((art, idx) => {
          let position = 'hidden'; // 'prev', 'active', 'next', 'hidden'
          const length = arts.length;
          
          if (idx === activeIndex) {
            position = 'active';
          } else if (idx === (activeIndex - 1 + length) % length) {
            position = 'prev';
          } else if (idx === (activeIndex + 1) % length) {
            position = 'next';
          }

          // Generate inline 3D styles based on active positioning
          const isMobile = window.innerWidth <= 768;
          const translateValue = isMobile ? 120 : 200;

          const styleMap = {
            active: {
              transform: 'translateX(0px) scale(1) rotateY(0deg)',
              opacity: 1,
              zIndex: 10,
              pointerEvents: 'auto'
            },
            prev: {
              transform: `translateX(-${translateValue}px) scale(0.8) rotateY(35deg)`,
              opacity: 0.4,
              zIndex: 5,
              pointerEvents: 'none'
            },
            next: {
              transform: `translateX(${translateValue}px) scale(0.8) rotateY(-35deg)`,
              opacity: 0.4,
              zIndex: 5,
              pointerEvents: 'none'
            },
            hidden: {
              transform: 'translateX(0px) scale(0.5) rotateY(0deg)',
              opacity: 0,
              zIndex: 0,
              pointerEvents: 'none',
              display: 'none'
            }
          };

          const currentStyle = styleMap[position];

          return (
            <div
              key={art.id}
              className={`carousel-card-3d ${position}`}
              style={{
                ...currentStyle,
                borderColor: position === 'active' ? accentColor : 'rgba(255, 255, 255, 0.08)',
                boxShadow: position === 'active' ? `0 12px 32px ${accentColor}18` : 'none'
              }}
              onClick={() => {
                if (position === 'prev') handlePrev();
                if (position === 'next') handleNext();
              }}
            >
              {/* Post Artwork Placeholder Mockup */}
              <div className="art-post-mockup" style={{ backgroundColor: art.bgColor }}>
                <div className="mockup-header">
                  <span className="dot" />
                  <span className="dot" style={{ backgroundColor: accentColor }} />
                  <span className="dot" />
                </div>
                <div className="mockup-body">
                  <span className="art-number" style={{ color: accentColor }}>
                    POST {art.id.toString().padStart(2, '0')}
                  </span>
                  <h4 className="art-title">{art.title}</h4>
                  <p className="art-brand">{art.subtitle}</p>
                </div>
                <div className="mockup-footer">
                  <span className="footer-line" />
                  <span className="footer-circle" style={{ borderColor: accentColor }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button className="nav-arrow prev" onClick={handlePrev} aria-label="Anterior">
        <ArrowLeft size={18} />
      </button>
      <button className="nav-arrow next" onClick={handleNext} aria-label="Próximo">
        <ArrowRight size={18} />
      </button>

      {/* Bullet Indicators */}
      <div className="carousel-bullets">
        {arts.map((_, idx) => (
          <button
            key={idx}
            className={`bullet-dot ${idx === activeIndex ? 'active' : ''}`}
            style={{
              backgroundColor: idx === activeIndex ? accentColor : 'rgba(255, 255, 255, 0.15)'
            }}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Ir para arte ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const navigate = useNavigate();

  return (
    <div className="portfolio-page-layout">
      {/* Horizontal Header Menu */}
      <header className="portfolio-nav-header">
        <div className="nav-header-content">
          {/* Left - Horizontal Logo */}
          <Link to="/" className="horizontal-logo-link">
            <img src={logoImg} alt="Eber Designer" className="horizontal-logo-img" />
            <span className="horizontal-logo-text">Eber Designer</span>
          </Link>

          {/* Right - Menu Items */}
          <nav className="header-nav-menu">
            <a href="https://wa.me/5521993340264" target="_blank" rel="noopener noreferrer" className="nav-menu-item">
              <MessageSquare size={16} />
              <span>Contato</span>
            </a>
            <a href="https://www.instagram.com/eber.dsgn/" target="_blank" rel="noopener noreferrer" className="nav-menu-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
            <button onClick={() => navigate('/')} className="nav-menu-item return-links-btn">
              <Globe size={16} />
              <span>Página de Links</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Portfolio Content Body */}
      <div className="portfolio-body-content">
        <div className="portfolio-title-section">
          <h1 className="portfolio-main-title text-glow gradient-text">Portfólio de Social Media</h1>
          <p className="portfolio-main-subtitle">Criativos estratégicos desenhados para elevar o posicionamento de marcas.</p>
        </div>

        {/* Client List */}
        <div className="clients-list-container">
          {clientsData.map((client) => (
            <section key={client.id} className="client-section-row" style={{ background: client.gradient }}>
              <div className="client-info-sidebar">
                <div className="client-accent-badge" style={{ backgroundColor: client.accentColor }} />
                <h2 className="client-name-title">{client.name}</h2>
                <p className="client-description-text">{client.description}</p>
              </div>
              
              <div className="client-carousel-wrapper">
                <ThreeDCarousel arts={client.arts} accentColor={client.accentColor} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
