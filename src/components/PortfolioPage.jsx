import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Globe, ExternalLink, X } from 'lucide-react';
import logoImg from '../assets/logo-eber-header.svg';

// Import Petshop 3x3 Grid WebP images
import pet1 from '../assets/petshop/arte-petshop-1.webp';
import pet2 from '../assets/petshop/arte-petshop-2.webp';
import pet3 from '../assets/petshop/arte-petshop-3.webp';
import pet4 from '../assets/petshop/arte-petshop-4.webp';
import pet5 from '../assets/petshop/arte-petshop-5.webp';
import pet6 from '../assets/petshop/arte-petshop-6.webp';
import pet7 from '../assets/petshop/arte-petshop-7.webp';
import pet8 from '../assets/petshop/arte-petshop-8.webp';
import pet9 from '../assets/petshop/arte-petshop-9.webp';

// Import Mountain Bike 3x3 Grid WebP images
import mtb1 from '../assets/mountain-bike/arte-mountainbike-1.webp';
import mtb2 from '../assets/mountain-bike/arte-mountainbike-2.webp';
import mtb3 from '../assets/mountain-bike/arte-mountainbike-3.webp';
import mtb4 from '../assets/mountain-bike/arte-mountainbike-4.webp';
import mtb5 from '../assets/mountain-bike/arte-mountainbike-5.webp';
import mtb6 from '../assets/mountain-bike/arte-mountainbike-6.webp';
import mtb7 from '../assets/mountain-bike/arte-mountainbike-7.webp';
import mtb8 from '../assets/mountain-bike/arte-mountainbike-8.webp';
import mtb9 from '../assets/mountain-bike/arte-mountainbike-9.webp';
import mtbCover from '../assets/mountain-bike/capa-projeto-mountainbike.webp';
import mtbCoverMobile from '../assets/mountain-bike/capa-projeto-mountainbike-mobile.webp';

// Import Agronegócio 3x3 Grid and Cover images
import agro1 from '../assets/agronegocio/arte-agronegócio-1.webp';
import agro2 from '../assets/agronegocio/arte-agronegócio-2.webp';
import agro3 from '../assets/agronegocio/arte-agronegócio-3.webp';
import agro4 from '../assets/agronegocio/arte-agronegócio-4.webp';
import agro5 from '../assets/agronegocio/arte-agronegócio-5.webp';
import agro6 from '../assets/agronegocio/arte-agronegócio-6.webp';
import agro7 from '../assets/agronegocio/arte-agronegócio-7.webp';
import agro8 from '../assets/agronegocio/arte-agronegócio-8.webp';
import agro9 from '../assets/agronegocio/arte-agronegócio-9.webp';
import agroCover from '../assets/agronegocio/capa-agronegócio.webp';
import agroCoverMobile from '../assets/agronegocio/capa-agronegócio-mobile.webp';

// Unified 6 Projects Data (3 Social Media, 3 Web Design)
const projectsData = [
  // 3 PROJECTS - SOCIAL MEDIA
  {
    id: 1,
    name: 'Social Media Petshop',
    type: 'social',
    category: 'Social Media Petshop',
    niche: 'petshop',
    nicheColor: '#FFB300',
    shortDescription: 'Criativos estratégicos para petshop.',
    accentColor: '#FF6B00',
    gradient: 'linear-gradient(135deg, rgba(255, 107, 0, 0.45) 0%, rgba(15, 15, 15, 0.95) 100%)',
    link: 'https://wa.me/5521993340264?text=Olá! Gostei do Projeto Social Media Petshop e gostaria de saber mais.',
    longDescription: 'Desenvolvimento de uma linha editorial voltada para fortalecer a presença digital do petshop, combinando conteúdos institucionais, promocionais e informativos. O projeto teve como objetivo aumentar o engajamento, valorizar os serviços da marca e criar uma comunicação visual consistente por meio de criativos estratégicos e carrosséis de alto impacto.',
    gridColors: ['#FF6B00', '#FF8C42', '#1a0d00', '#FF6B00', '#111111', '#FF8C42', '#1a0d00', '#FF6B00', '#FF8C42'],
    gridImages: [pet1, pet2, pet3, pet4, pet5, pet6, pet7, pet8, pet9],
    coverImage: '/capa-projeto-petshop.webp',
    coverImageMobile: '/capa-projeto-petshop-mobile.webp',
    artId: 1
  },
  {
    id: 2,
    name: 'Social Media Mountain Bike',
    type: 'social',
    category: 'Social Media Mountain Bike',
    niche: 'mountain bike',
    nicheColor: '#0099ff',
    shortDescription: 'Criativos estratégicos para mountain bike.',
    accentColor: '#FF5722',
    gradient: 'linear-gradient(135deg, rgba(255, 87, 34, 0.45) 0%, rgba(15, 15, 15, 0.95) 100%)',
    link: 'https://wa.me/5521993340264?text=Olá! Gostei do Projeto Social Media Mountain Bike e gostaria de saber mais.',
    longDescription: 'Desenvolvimento de uma linha editorial voltada para o universo do mountain bike, com foco em fortalecer a identidade da marca e engajar a comunidade de ciclistas. O projeto reuniu criativos estratégicos e carrosséis para destacar produtos, eventos, desempenho e estilo de vida, transmitindo energia, credibilidade e conexão com o público-alvo.',
    gridColors: ['#FF5722', '#FF8A65', '#2E0F05', '#FF5722', '#111111', '#FF8A65', '#2E0F05', '#FF5722', '#FF8A65'],
    gridImages: [mtb1, mtb2, mtb3, mtb4, mtb5, mtb6, mtb7, mtb8, mtb9],
    coverImage: mtbCover,
    coverImageMobile: mtbCoverMobile,
    artId: 2
  },
  {
    id: 3,
    name: 'Social Media Agronegócio',
    type: 'social',
    category: 'Social Media Agronegócio',
    niche: 'agronegócio',
    nicheColor: '#4CAF50',
    shortDescription: 'Criativos estratégicos para o agronegócio.',
    accentColor: '#2E7D32',
    gradient: 'linear-gradient(135deg, rgba(46, 125, 50, 0.45) 0%, rgba(15, 15, 15, 0.95) 100%)',
    link: 'https://wa.me/5521993340264?text=Olá! Gostei do Projeto Social Media Agronegócio e gostaria de saber mais.',
    longDescription: 'Desenvolvimento de uma linha editorial voltada para o agronegócio, com foco em fortalecer o posicionamento da marca e comunicar seus produtos e soluções com clareza e autoridade. O projeto reuniu criativos estratégicos e carrosséis institucionais para gerar credibilidade, aproximar a empresa do produtor rural e reforçar sua presença no mercado.',
    gridColors: ['#2E7D32', '#4CAF50', '#1B5E20', '#2E7D32', '#111111', '#4CAF50', '#1B5E20', '#2E7D32', '#4CAF50'],
    gridImages: [agro1, agro2, agro3, agro4, agro5, agro6, agro7, agro8, agro9],
    coverImage: agroCover,
    coverImageMobile: agroCoverMobile,
    artId: 3
  },
  // 3 PROJECTS - WEBSITES
  {
    id: 4,
    name: 'Site Institucional Dra. Ana Barbosa',
    type: 'web',
    category: 'Site Institucional Dra. Ana Barbosa',
    niche: 'Saúde • Médica',
    nicheColor: '#FF6B00',
    shortDescription: 'Landing Page para área da saúde.',
    accentColor: '#FF6B00',
    gradient: 'linear-gradient(135deg, rgba(255, 107, 0, 0.4) 0%, rgba(20, 10, 0, 0.95) 100%)',
    link: '#',
    longDescription: 'Desenvolvimento de uma landing page estratégica para profissionais da área da saúde, com foco em transmitir credibilidade, facilitar o agendamento de consultas e converter visitantes em pacientes. O projeto priorizou uma experiência intuitiva, design moderno e uma comunicação clara, reforçando a confiança e a autoridade da marca.'
  },
  {
    id: 5,
    name: 'Sem informação',
    type: 'web',
    category: 'Sem informação',
    niche: null,
    nicheColor: null,
    shortDescription: 'Sem informação',
    accentColor: '#00cc66',
    gradient: 'linear-gradient(135deg, rgba(0, 204, 102, 0.35) 0%, rgba(0, 20, 8, 0.95) 100%)',
    link: '#',
    longDescription: 'Sem informação.'
  },
  {
    id: 6,
    name: 'Sem informação',
    type: 'web',
    category: 'Sem informação',
    niche: null,
    nicheColor: null,
    shortDescription: 'Sem informação',
    accentColor: '#0099ff',
    gradient: 'linear-gradient(135deg, rgba(0, 153, 255, 0.35) 0%, rgba(0, 15, 26, 0.95) 100%)',
    link: '#',
    longDescription: 'Sem informação.'
  }
];

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom = {}) => {
    const index = custom?.index ?? 0;
    const isMobile = custom?.isMobile ?? false;
    return {
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
        delay: isMobile ? 0 : (index % 2) * 0.12
      }
    };
  }
};

export default function PortfolioPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'social' | 'web'
  const [selectedProject, setSelectedProject] = useState(null); // control modal visibility
  const [zoomedImage, setZoomedImage] = useState(null); // control zoomed art image
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width for staggered scroll delay optimization
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter projects dynamically
  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.type === activeFilter;
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <div className="portfolio-page-layout">
      {/* Horizontal Header Menu */}
      <header className="portfolio-nav-header">
        <div className="nav-header-content">
          {/* Left - Horizontal Logo */}
          <Link to="/" className="horizontal-logo-link">
            <img src={logoImg} alt="Eber Designer" className="horizontal-logo-img" width="195" height="36" />
          </Link>

          {/* Right - Menu Items */}
          <nav className="header-nav-menu">
            <a href="https://www.instagram.com/eber.dsgn/" target="_blank" rel="noopener noreferrer" className="nav-menu-item nav-instagram-link">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
            {/* Highlighted CTA contact button */}
            <a href="https://wa.me/5521993340264" target="_blank" rel="noopener noreferrer" className="nav-menu-item contact-highlight-btn">
              <MessageSquare size={16} />
              <span>Contato</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Portfolio Content Body */}
      <div className="portfolio-body-content">
        {/* Header Title Section */}
        <motion.div 
          className="portfolio-title-section"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
        >
          <h1 className="portfolio-main-title text-glow gradient-text">Portfólio</h1>
          <p className="portfolio-main-subtitle">Design para Redes Sociais e Desenvolvimento de Sites.</p>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <motion.div 
          className="portfolio-filter-container"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] } 
            }
          }}
        >
          <button 
            onClick={() => setActiveFilter('all')} 
            className={`filter-tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setActiveFilter('social')} 
            className={`filter-tab-btn ${activeFilter === 'social' ? 'active' : ''}`}
          >
            Social Media
          </button>
          <button 
            onClick={() => setActiveFilter('web')} 
            className={`filter-tab-btn ${activeFilter === 'web' ? 'active' : ''}`}
          >
            Site
          </button>
        </motion.div>

        {/* Projects Grid Container (Dribbble/Framer Style) */}
        <div className="portfolio-grid-container">
          <div className="portfolio-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div 
                  layout
                  key={project.id} 
                  className="project-grid-card"
                  onClick={() => setSelectedProject(project)}
                  initial="hidden"
                  whileInView="visible"
                  exit={{ opacity: 0, scale: 0.95, y: 15, transition: { duration: 0.25 } }}
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUpVariants}
                  custom={{ index, isMobile }}
                >
                  {/* Colored backdrop card for mockup (Huge Image Preview wrapper) */}
                  <div 
                    className={`project-preview-wrapper ${project.type}-card-wrapper`} 
                    style={{ background: project.gradient }}
                  >
                    {project.coverImage ? (
                      <picture className="project-card-cover-picture">
                        {project.coverImageMobile && (
                          <source media="(max-width: 820px)" srcSet={project.coverImageMobile} />
                        )}
                        <img 
                          src={project.coverImage} 
                          alt={project.name} 
                          className="project-card-cover-image"
                          loading={index === 0 ? "eager" : "lazy"}
                          fetchPriority={index === 0 ? "high" : "auto"}
                        />
                      </picture>
                    ) : (
                      <>
                        {project.type === 'social' && (
                          /* Social Media Centered Mockup */
                          <div className="mockup-flat-wrapper social-preview">
                            <div className="art-post-mockup-flat" style={{ backgroundColor: '#0d0d0d' }}>
                              <div className="mockup-header">
                                <span className="dot" />
                                <span className="dot" style={{ backgroundColor: project.accentColor }} />
                                <span className="dot" />
                              </div>
                              <div className="mockup-body">
                                <span className="art-number" style={{ color: project.accentColor }}>
                                  POST 0{project.artId}
                                </span>
                                <h4 className="art-title">Criativo Social</h4>
                                <p className="art-brand">Eber Designer</p>
                              </div>
                              <div className="mockup-footer">
                                <span className="footer-line" />
                                <span className="footer-circle" style={{ borderColor: project.accentColor }} />
                              </div>
                            </div>
                          </div>
                        )}

                        {project.type === 'web' && (
                          /* Web Design Centered Browser Mockup */
                          <div className="mockup-flat-wrapper web-preview">
                            <div className="website-browser-mockup-flat" style={{ backgroundColor: '#0d0d0d' }}>
                              <div className="browser-header">
                                <div className="browser-dots">
                                  <span className="b-dot red" />
                                  <span className="b-dot yellow" />
                                  <span className="b-dot green" />
                                </div>
                                <div className="browser-address-bar">
                                  <Globe size={10} className="address-icon" />
                                  <span>eberdesigner.com.br/{project.name.toLowerCase()}</span>
                                </div>
                              </div>
                              <div className="browser-body">
                                <div className="website-preview-content">
                                  <div className="preview-hero" style={{ '--accent': project.accentColor }}>
                                    <span className="preview-badge" style={{ backgroundColor: `${project.accentColor}18`, color: project.accentColor }}>
                                      {project.category}
                                    </span>
                                    <div className="preview-line-title" />
                                    <div className="preview-line-subtitle" />
                                    <div className="preview-grid-layout">
                                      <div className="grid-box" />
                                      <div className="grid-box" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Left-aligned details block under the card */}
                  <div className="project-details-block">
                    <h3 className="project-title-name">{project.name}</h3>
                    <p className="project-short-desc">{project.shortDescription}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Next Project CTA Section */}
        <motion.section 
          className="portfolio-cta-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUpVariants}
        >
          <div className="portfolio-cta-card">
            <span className="cta-subtitle">Tem uma ideia em mente?</span>
            <h2 className="cta-title gradient-text text-glow">O próximo projeto pode ser o seu</h2>
            <p className="cta-description">
              Materiais visuais e soluções digitais para ajudar sua empresa a se destacar e transmitir mais confiança.
            </p>
            <div className="cta-btn-wrapper">
              <a 
                href="https://wa.me/5521993340264?text=Olá! Gostaria de falar sobre o meu próximo projeto." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="portfolio-cta-btn premium-fill-btn"
              >
                <span className="btn-content-wrapper">
                  <span>Iniciar Projeto</span>
                  <MessageSquare size={16} />
                </span>
              </a>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Animated Lightbox/Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal-container"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()} // stop click bubbling
            >
              {/* Close Button */}
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedProject(null)}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>

              {selectedProject.type === 'social' ? (
                /* Modal Layout: SOCIAL MEDIA (3x3 grid of pure art color squares or webp images) */
                <div className="modal-social-layout">
                  {/* Grid 3x3 */}
                  <div className="social-grid-3x3">
                    {selectedProject.gridImages ? (
                      selectedProject.gridImages.map((imgSrc, index) => (
                        <img 
                          key={index} 
                          src={imgSrc}
                          alt={`Arte ${index + 1} de ${selectedProject.name}`}
                          className="grid-art-square clickable-art" 
                          onClick={() => setZoomedImage(imgSrc)}
                          loading="lazy"
                        />
                      ))
                    ) : (
                      selectedProject.gridColors.map((color, index) => (
                        <div 
                          key={index} 
                          className="grid-art-square" 
                          style={{ backgroundColor: color }}
                        />
                      ))
                    )}
                  </div>

                  {/* Text details below grid */}
                  <div className="modal-text-details">
                    <div className="modal-project-header-info">
                      <h2 className="modal-project-title-text">{selectedProject.category}</h2>
                      {selectedProject.niche && (
                        <div className="modal-project-niche-wrapper">
                          <span className="modal-project-niche-tag" style={{ 
                            borderColor: `${selectedProject.nicheColor || selectedProject.accentColor}35`, 
                            backgroundColor: `${selectedProject.nicheColor || selectedProject.accentColor}08`, 
                            color: selectedProject.nicheColor || selectedProject.accentColor 
                          }}>
                            {selectedProject.niche}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="modal-project-desc-text">{selectedProject.longDescription}</p>
                  </div>
                </div>
              ) : (
                /* Modal Layout: WEBSITE (full horizontal width color banner and browser print) */
                <div className="modal-web-layout">
                  {/* Branded Horizontal Banner */}
                  <div className="modal-web-banner-backdrop" style={{ backgroundColor: selectedProject.accentColor }}>
                    <div className="modal-browser-mockup-wrapper">
                      <div className="website-browser-mockup-flat" style={{ backgroundColor: '#0d0d0d' }}>
                        <div className="browser-header">
                          <div className="browser-dots">
                            <span className="b-dot red" />
                            <span className="b-dot yellow" />
                            <span className="b-dot green" />
                          </div>
                          <div className="browser-address-bar">
                            <Globe size={10} className="address-icon" />
                            <span>eberdesigner.com.br/{selectedProject.name.toLowerCase()}</span>
                          </div>
                        </div>
                        <div className="browser-body">
                          <div className="website-preview-content">
                            <div className="preview-hero" style={{ '--accent': selectedProject.accentColor }}>
                              <span className="preview-badge" style={{ backgroundColor: `${selectedProject.accentColor}18`, color: selectedProject.accentColor }}>
                                {selectedProject.category}
                              </span>
                              <div className="preview-line-title" />
                              <div className="preview-line-subtitle" />
                              <div className="preview-grid-layout">
                                <div className="grid-box" />
                                <div className="grid-box" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Block: Stacked details with Button below description */}
                  <div className="modal-text-details web-modal-stacked">
                    <div className="modal-project-header-info">
                      <h2 className="modal-project-title-text">{selectedProject.category}</h2>
                      {selectedProject.niche && (
                        <div className="modal-project-niche-wrapper">
                          <span className="modal-project-niche-tag" style={{ 
                            borderColor: `${selectedProject.accentColor}35`, 
                            backgroundColor: `${selectedProject.accentColor}08`, 
                            color: selectedProject.accentColor 
                          }}>
                            {selectedProject.niche}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="modal-project-desc-text">{selectedProject.longDescription}</p>
                    
                    <div className="web-modal-btn-wrapper">
                      <a 
                        href={selectedProject.link} 
                        target={selectedProject.link === '#' ? '_self' : '_blank'} 
                        rel="noopener noreferrer" 
                        className="modal-visit-site-cta-btn premium-fill-btn"
                        onClick={(e) => selectedProject.link === '#' && e.preventDefault()}
                      >
                        <span className="btn-content-wrapper">
                          <span>Visitar Site</span>
                          <ExternalLink size={16} />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoomed Image Lightbox Overlay */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            className="image-zoom-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
          >
            <button 
              className="zoom-close-btn" 
              onClick={() => setZoomedImage(null)}
              aria-label="Fechar Zoom"
            >
              <X size={24} />
            </button>
            
            <motion.img
              src={zoomedImage}
              alt="Arte ampliada"
              className="zoomed-image-display"
              loading="lazy"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()} // prevent close when clicking image
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
