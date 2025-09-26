import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleLinkHover = (link) => {
    setActiveLink(link);
  };

  const handleLinkLeave = () => {
    setActiveLink('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation data
  const quickLinks = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/destinations', label: 'Destinations', icon: 'destinations' },
    { path: '/itineraries', label: 'Tours', icon: 'tours' },
    { path: '/accommodations', label: 'Accommodations', icon: 'accommodations' },
    { path: '/travel-guides', label: 'Travel Guides', icon: 'travel-guides' }
  ];

  const destinationLinks = [
    { path: '/destinations/gangtok', label: 'Gangtok', icon: 'gangtok' },
    { path: '/destinations/pelling', label: 'Pelling', icon: 'pelling' },
    { path: '/destinations/lachung', label: 'Lachung', icon: 'lachung' },
    { path: '/destinations/yumthang-valley', label: 'Yumthang Valley', icon: 'yumthang' },
    { path: '/destinations/tsomgo-lake', label: 'Tsomgo Lake', icon: 'tsomgo' }
  ];

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="mountain-silhouette"></div>
        <div className="clouds"></div>
      </div>
      
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-section footer-about">
            <div className="footer-logo" onClick={scrollToTop}>
              <div className="logo-icon">
                <div className="mountain-icon"></div>
              </div>
              <h3>Sikkim Explorer</h3>
            </div>
            <p className="footer-description">
              Discover the mystical beauty of Sikkim - the land of majestic mountains, 
              serene monasteries, and vibrant culture. Your journey to paradise begins here.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" className="social-link" onMouseEnter={() => handleLinkHover('facebook')} onMouseLeave={handleLinkLeave}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" className="social-link" onMouseEnter={() => handleLinkHover('instagram')} onMouseLeave={handleLinkLeave}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" className="social-link" onMouseEnter={() => handleLinkHover('twitter')} onMouseLeave={handleLinkLeave}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://youtube.com" className="social-link" onMouseEnter={() => handleLinkHover('youtube')} onMouseLeave={handleLinkLeave}>
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-section footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={location.pathname === link.path ? 'active' : ''}
                    onMouseEnter={() => handleLinkHover(link.icon)} 
                    onMouseLeave={handleLinkLeave}
                    onClick={scrollToTop}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section footer-links">
            <h4>Destinations</h4>
            <ul>
              {destinationLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={location.pathname === link.path ? 'active' : ''}
                    onMouseEnter={() => handleLinkHover(link.icon)} 
                    onMouseLeave={handleLinkLeave}
                    onClick={scrollToTop}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for travel tips and exclusive offers</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-group">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="subscribe-btn">
                  <span>Subscribe</span>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
            {subscribed && (
              <div className="subscription-success">
                <i className="fas fa-check-circle"></i>
                Thank you for subscribing!
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 Sikkim Explorer. All rights reserved.</p>
            <div className="legal-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
              <Link to="/cookie-policy">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-to-top" onClick={scrollToTop}>
        <i className="fas fa-chevron-up"></i>
      </div>

      {/* Animated elements that appear on hover */}
      <div className={`hover-effect ${activeLink ? 'active' : ''}`}>
        {activeLink === 'home' && <div className="effect-icon">🏠</div>}
        {activeLink === 'destinations' && <div className="effect-icon">🗺️</div>}
        {activeLink === 'tours' && <div className="effect-icon">🚌</div>}
        {activeLink === 'accommodations' && <div className="effect-icon">🏨</div>}
        {activeLink === 'travel-guides' && <div className="effect-icon">📖</div>}
        {activeLink === 'gangtok' && <div className="effect-icon">🏞️</div>}
        {activeLink === 'pelling' && <div className="effect-icon">⛰️</div>}
        {activeLink === 'lachung' && <div className="effect-icon">❄️</div>}
        {activeLink === 'yumthang' && <div className="effect-icon">🌸</div>}
        {activeLink === 'tsomgo' && <div className="effect-icon">🏔️</div>}
        {activeLink === 'facebook' && <div className="effect-icon">👍</div>}
        {activeLink === 'instagram' && <div className="effect-icon">📸</div>}
        {activeLink === 'twitter' && <div className="effect-icon">🐦</div>}
        {activeLink === 'youtube' && <div className="effect-icon">🎥</div>}
      </div>
    </footer>
  );
};

export default Footer;
