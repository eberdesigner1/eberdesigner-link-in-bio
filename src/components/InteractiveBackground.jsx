import React, { useEffect, useRef, useState } from 'react';

export default function InteractiveBackground() {
  const bgRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (bgRef.current) {
        const { clientX, clientY } = e;
        // Update CSS Variables directly on the wrapper element for 60fps performance
        bgRef.current.style.setProperty('--mouse-x', `${clientX}px`);
        bgRef.current.style.setProperty('--mouse-y', `${clientY}px`);
        
        // Calculate offset from center for the grid shift
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = clientX - centerX;
        const offsetY = clientY - centerY;
        bgRef.current.style.setProperty('--mouse-x-offset', `${offsetX}px`);
        bgRef.current.style.setProperty('--mouse-y-offset', `${offsetY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate background particles once on mount
  useEffect(() => {
    const particleCount = 12; // Subtle amount
    const generated = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1.5}px`, // Extremely subtle size
      delay: `${Math.random() * -10}s`, // Negative delay so they start immediately at different phases
      duration: `${Math.random() * 8 + 12}s`, // Speed range
      drift: `${Math.random() * 60 - 30}px`, // Horizontal drift
    }));
    setParticles(generated);
  }, []);

  return (
    <div ref={bgRef} className="bg-wrapper">
      {/* Interactive Grid */}
      <div className="grid-bg" />
      
      {/* Spotlight cursor effect */}
      <div className="spotlight" />
      
      {/* Floating Orange Ambient Orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      
      {/* Subtle Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            '--delay': p.delay,
            '--duration': p.duration,
            '--drift': p.drift,
          }}
        />
      ))}
    </div>
  );
}
