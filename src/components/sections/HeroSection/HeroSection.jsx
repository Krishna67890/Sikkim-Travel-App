// HeroSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFact, setActiveFact] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // High-quality Sikkim landscape images
  const sikkimImages = [
    'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
  ];

  // Interactive facts about Sikkim
  const sikkimFacts = [
    { 
      icon: '🏔️', 
      fact: 'Home to Kanchenjunga - 3rd Highest Peak',
      detail: '8,586 meters above sea level'
    },
    { 
      icon: '🌿', 
      fact: '100% Organic Farming State',
      detail: 'First organic state in the world'
    },
    { 
      icon: '🌸', 
      fact: 'Land of Rare Orchids & Rhododendrons',
      detail: 'Over 600 species of orchids'
    },
    { 
      icon: '🕌', 
      fact: 'Harmonious Multi-Cultural Heritage',
      detail: 'Buddhism, Hinduism, and indigenous traditions'
    }
  ];

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Background image slideshow
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sikkimImages.length);
    }, 5000);

    // Facts carousel for mobile
    const factInterval = setInterval(() => {
      setActiveFact((prev) => (prev + 1) % sikkimFacts.length);
    }, 3000);

    // Mouse move effect for desktop
    const handleMouseMove = (e) => {
      if (heroRef.current && !isMobile) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      clearInterval(imageInterval);
      clearInterval(factInterval);
    };
  }, [isMobile]);

  const handlePlanTrip = () => {
    navigate('/transportation');
  };

  const handleExploreHighlights = () => {
    navigate('/gallery');
  };

  const handleImageIndicatorClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleFactClick = (index) => {
    setActiveFact(index);
  };

  return (
    <section 
      ref={heroRef}
      className={`hero ${isLoaded ? 'loaded' : ''} ${isMobile ? 'mobile' : 'desktop'}`}
      style={{ 
        '--scroll-position': `${scrollPosition * 0.5}px`,
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
        '--bg-image': `url(${sikkimImages[currentImageIndex]})`
      }}
    >
      {/* Enhanced background with multiple layers */}
      <div className="hero-background">
        <div 
          className="background-image" 
          style={{ backgroundImage: `url(${sikkimImages[currentImageIndex]})` }}
        ></div>
        <div className="gradient-overlay"></div>
        <div className="noise-texture"></div>
      </div>

      {/* Animated geometric shapes */}
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      <div className="hero-content">
        {/* Text Content Section */}
        <div className="hero-text">
          {/* Animated main title */}
          <div className="title-container">
            <h1 className="hero-title">
              <span className="title-line">
                <span className="title-word">Discover</span>
                <span className="title-word">the</span>
              </span>
              <span className="title-line">
                <span className="highlight-wrapper">
                  <span className="highlight">Magic of Sikkim</span>
                </span>
              </span>
              <span className="title-line">
                <span className="title-word">The Hidden</span>
                <span className="title-word">Paradise</span>
              </span>
            </h1>
            
            {/* Animated subtitle */}
            <p className="hero-subtitle">
              Experience breathtaking Himalayan landscapes, rich Buddhist culture, 
              and pristine natural beauty in India's organic state.
            </p>
          </div>

          {/* Responsive facts section */}
          <div className="facts-section">
            {isMobile ? (
              // Mobile: Carousel style
              <div className="facts-carousel">
                <div className="carousel-track" style={{ transform: `translateX(-${activeFact * 100}%)` }}>
                  {sikkimFacts.map((item, index) => (
                    <div key={index} className="carousel-slide">
                      <div className="fact-item-mobile">
                        <span className="fact-icon">{item.icon}</span>
                        <div className="fact-content">
                          <span className="fact-text">{item.fact}</span>
                          <span className="fact-detail">{item.detail}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="carousel-indicators">
                  {sikkimFacts.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === activeFact ? 'active' : ''}`}
                      onClick={() => handleFactClick(index)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Desktop: Grid layout
              <div className="facts-grid">
                {sikkimFacts.map((item, index) => (
                  <div 
                    key={index} 
                    className={`fact-item ${index === activeFact ? 'active' : ''}`}
                    onMouseEnter={() => setActiveFact(index)}
                    onClick={() => handleFactClick(index)}
                  >
                    <span className="fact-icon">{item.icon}</span>
                    <div className="fact-content">
                      <span className="fact-text">{item.fact}</span>
                      <span className="fact-detail">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="hero-cta">
            <button onClick={handlePlanTrip} className="cta-btn primary">
              <span className="btn-content">
                <span className="btn-icon">🗓️</span>
                <span className="btn-text">Plan Your Trip</span>
                <span className="btn-arrow">→</span>
              </span>
              <span className="btn-glow"></span>
            </button>
            
            <button onClick={handleExploreHighlights} className="cta-btn secondary">
              <span className="btn-content">
                <span className="btn-icon">📸</span>
                <span className="btn-text">Explore Highlights</span>
                <span className="btn-arrow">→</span>
              </span>
            </button>
          </div>

          {/* Travel stats - Hidden on mobile for space */}
          {!isMobile && (
            <div className="travel-stats">
              <div className="stat">
                <div className="stat-number" data-count="5000">5,000+</div>
                <div className="stat-label">Happy Travelers</div>
              </div>
              <div className="stat">
                <div className="stat-number" data-count="50">50+</div>
                <div className="stat-label">Sacred Sites</div>
              </div>
              <div className="stat">
                <div className="stat-number">12°C</div>
                <div className="stat-label">Avg. Temperature</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Visual Content Section - Hidden on mobile */}
        {!isMobile && (
          <div className="hero-visual">
            {/* Floating destination cards with enhanced animations */}
            <div className="floating-card card-1">
              <div className="card-content">
                <img 
                  src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                  alt="Gangtok"
                  className="card-image"
                />
                <div className="card-overlay">
                  <h3>Gangtok</h3>
                  <p>Capital City</p>
                  <span className="card-badge">Popular</span>
                </div>
              </div>
            </div>
            
            <div className="floating-card card-2">
              <div className="card-content">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                  alt="Tsomgo Lake"
                  className="card-image"
                />
                <div className="card-overlay">
                  <h3>Tsomgo Lake</h3>
                  <p>Sacred Lake</p>
                  <span className="card-badge">Must See</span>
                </div>
              </div>
            </div>
            
            <div className="floating-card card-3">
              <div className="card-content">
                <img 
                  src="https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                  alt="Nathula Pass"
                  className="card-image"
                />
                <div className="card-overlay">
                  <h3>Nathula Pass</h3>
                  <p>Historic Border</p>
                  <span className="card-badge">Adventure</span>
                </div>
              </div>
            </div>
            
            {/* Interactive globe */}
            <div className="main-visual">
              <div className="rotating-globe">
                <div className="globe-texture"></div>
                <div className="globe-highlight"></div>
                <div className="globe-pin pin-1"></div>
                <div className="globe-pin pin-2"></div>
                <div className="globe-pin pin-3"></div>
              </div>
              <div className="visual-stats">
                <div className="visual-stat">
                  <span className="stat-icon">📅</span>
                  Best Time: Mar-Jun
                </div>
                <div className="visual-stat">
                  <span className="stat-icon">⛰️</span>
                  Altitude: 1,650m
                </div>
                <div className="visual-stat">
                  <span className="stat-icon">💬</span>
                  Language: Nepali
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="scroll-indicator">
        <span>Explore Sikkim's Wonders</span>
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
      </div>

      {/* Background image indicators */}
      <div className="image-indicators">
        {sikkimImages.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => handleImageIndicatorClick(index)}
            aria-label={`Show image ${index + 1}`}
          >
            <span className="indicator-progress"></span>
          </button>
        ))}
      </div>

      {/* Mobile quick stats bar */}
      {isMobile && (
        <div className="mobile-stats-bar">
          <div className="mobile-stat">
            <div className="stat-number">5K+</div>
            <div className="stat-label">Travelers</div>
          </div>
          <div className="mobile-stat">
            <div className="stat-number">50+</div>
            <div className="stat-label">Sites</div>
          </div>
          <div className="mobile-stat">
            <div className="stat-number">12°C</div>
            <div className="stat-label">Temp</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
