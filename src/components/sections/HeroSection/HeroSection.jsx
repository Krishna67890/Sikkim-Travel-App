// HeroSection.jsx
import React, { useState, useEffect } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Component mount animation
    setIsLoaded(true);
    
    // Parallax effect handler
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className={`hero ${isLoaded ? 'loaded' : ''}`}
      style={{ '--scroll-position': `${scrollPosition * 0.5}px` }}
    >
      {/* Animated background elements */}
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-line">Discover the</span>
            <span className="title-line">
              <span className="highlight">Hidden Paradise</span>
            </span>
          </h1>
          <p className="hero-subtitle">
            Experience the breathtaking beauty and rich culture of Sikkim.
          </p>
          <div className="hero-cta">
            <a href="#plan" className="cta-btn primary">Plan Your Trip</a>
            <a href="#highlights" className="cta-btn secondary">Explore Highlights</a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-content">
              <div className="icon">🚀</div>
              <h3>Fast Performance</h3>
            </div>
          </div>
          
          <div className="floating-card card-2">
            <div className="card-content">
              <div className="icon">🎨</div>
              <h3>Beautiful Design</h3>
            </div>
          </div>
          
          <div className="floating-card card-3">
            <div className="card-content">
              <div className="icon">⚡</div>
              <h3>Optimized</h3>
            </div>
          </div>
          
          <div className="main-visual">
            <div className="gradient-orbit"></div>
            <div className="central-circle">
              <div className="inner-circle"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default HeroSection;