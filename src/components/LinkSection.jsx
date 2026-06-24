import React from 'react';
import LinkCard from './LinkCard';

const linksData = [
  {
    id: 1,
    title: 'Solicitar Orçamento',
    description: 'Vamos conversar sobre seu projeto.',
    iconName: 'ArrowUpRight',
    url: 'https://wa.me/5521993340264',
  },
  {
    id: 2,
    title: 'Meu Site / Portfólio',
    description: 'Conheça meus trabalhos.',
    iconName: 'Globe',
    url: '#', // Easily editable field
  },
  {
    id: 3,
    title: 'Instagram',
    description: 'Veja meus projetos e conteúdos.',
    iconName: 'Instagram',
    url: 'https://www.instagram.com/eber.dsgn/',
  }
];

export default function LinkSection() {
  return (
    <div className="link-section-container">
      {/* Animated glowing vertical line in the background */}
      <div className="connecting-line-container">
        <div className="connecting-line-pulse" />
      </div>

      {/* List of Link Cards */}
      <div className="links-wrapper">
        {linksData.map((link, idx) => (
          <LinkCard
            key={link.id}
            title={link.title}
            description={link.description}
            iconName={link.iconName}
            url={link.url}
            delay={0.7 + idx * 0.15} // Staggered entry animations
          />
        ))}
      </div>
    </div>
  );
}
