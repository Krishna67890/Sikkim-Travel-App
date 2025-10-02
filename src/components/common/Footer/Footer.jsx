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
    { path: '/travel-guides', label: 'Travel Guides', icon: 'travel-guides' },
    { path: '/about', label: 'About', icon: 'about' },
    { path: '/contact', label: 'Contact', icon: 'contact' }
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
        <div className="stars"></div>
      </div>
      
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-section footer-about">
            <div className="footer-logo" onClick={scrollToTop}>
              <div className="logo-icon">
                <div className="mountain-range">
                  <div className="mountain-peak"></div>
                  <div className="mountain-peak"></div>
                  <div className="mountain-peak"></div>
                </div>
              </div>
              <div className="logo-text">
                <h3>Sikkim Explorer</h3>
                <span className="logo-tagline">Discover the Himalayan Paradise</span>
              </div>
            </div>
            <p className="footer-description">
              Discover the mystical beauty of Sikkim - the land of majestic mountains, 
              serene monasteries, and vibrant culture. Your journey to paradise begins here.
            </p>
            <div className="social-links">
              <a 
                href="https://facebook.com" 
                className="social-link" 
                onMouseEnter={() => handleLinkHover('facebook')} 
                onMouseLeave={handleLinkLeave}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
                <span className="social-tooltip">Facebook</span>
              </a>
              <a 
                href="https://www.instagram.com/mr.krishna_patil_12/" 
                className="social-link" 
                onMouseEnter={() => handleLinkHover('instagram')} 
                onMouseLeave={handleLinkLeave}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
                <span className="social-tooltip">Instagram</span>
              </a>
              <a 
                href="https://twitter.com" 
                className="social-link" 
                onMouseEnter={() => handleLinkHover('twitter')} 
                onMouseLeave={handleLinkLeave}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
                <span className="social-tooltip">Twitter</span>
              </a>
              <a 
                href="https://www.youtube.com/@ATHARVA_GAMING_YT" 
                className="social-link" 
                onMouseEnter={() => handleLinkHover('youtube')} 
                onMouseLeave={handleLinkLeave}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i>
                <span className="social-tooltip">YouTube</span>
              </a>
              <a 
                href="https://github.com/Krishna67890" 
                className="social-link github-link" 
                onMouseEnter={() => handleLinkHover('github')} 
                onMouseLeave={handleLinkLeave}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
                <span className="social-tooltip">GitHub</span>
              </a>
            </div>
          </div>

          <div className="footer-section footer-links">
            <h4>Quick Links</h4>
            <div className="link-list">
              {quickLinks.map((link) => (
                <div key={link.path} className="link-item">
                  <Link 
                    to={link.path} 
                    className={`footer-link ${location.pathname === link.path ? 'active' : ''}`}
                    onMouseEnter={() => handleLinkHover(link.icon)} 
                    onMouseLeave={handleLinkLeave}
                    onClick={scrollToTop}
                  >
                    <span className="link-icon"></span>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-section footer-links">
            <h4>Destinations</h4>
            <div className="link-list">
              {destinationLinks.map((link) => (
                <div key={link.path} className="link-item">
                  <Link 
                    to={link.path} 
                    className={`footer-link ${location.pathname === link.path ? 'active' : ''}`}
                    onMouseEnter={() => handleLinkHover(link.icon)} 
                    onMouseLeave={handleLinkLeave}
                    onClick={scrollToTop}
                  >
                    <span className="link-icon"></span>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-section footer-github">
            <h4>Developer</h4>
            <div className="github-profile">
              <div className="github-avatar">
                <i className="fab fa-github"></i>
              </div>
              <div className="github-details">
                <span className="github-name">Krishna Patil</span>
                <span className="github-username">@Krishna67890</span>
                <a 
                  href="https://github.com/Krishna67890" 
                  className="github-profile-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => handleLinkHover('github-profile')}
                  onMouseLeave={handleLinkLeave}
                >
                  View GitHub Profile
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
            <div className="github-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Repositories</span>
              </div>
              <div className="stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">Contributions</span>
              </div>
            </div>
          </div>

          <div className="footer-section footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for travel tips and exclusive offers</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-group">
                <div className="input-wrapper">
                  <i className="fas fa-envelope input-icon"></i>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="newsletter-input"
                  />
                </div>
                <button type="submit" className="subscribe-btn">
                  <span>Subscribe</span>
                  <i className="fas fa-paper-plane"></i>
                  <div className="btn-shine"></div>
                </button>
              </div>
            </form>
            {subscribed && (
              <div className="subscription-success">
                <i className="fas fa-check-circle"></i>
                <span>Thank you for subscribing!</span>
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2025 Sikkim Explorer. All rights reserved.</p>
              <div className="tech-stack">
                <span>Built with</span>
                <i className="fab fa-react"></i>
                <i className="fab fa-js-square"></i>
                <i className="fab fa-css3-alt"></i>
              </div>
            </div>
            <div className="legal-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
              <Link to="/cookie-policy">Cookie Policy</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-to-top" onClick={scrollToTop}>
        <i className="fas fa-chevron-up"></i>
        <div className="scroll-tooltip">Back to Top</div>
      </div>

      {/* Animated elements that appear on hover */}
      <div className={`hover-effect ${activeLink ? 'active' : ''}`}>
        {activeLink === 'home' && <div className="effect-icon">🏠</div>}
        {activeLink === 'destinations' && <div className="effect-icon">🗺️</div>}
        {activeLink === 'tours' && <div className="effect-icon">🚌</div>}
        {activeLink === 'accommodations' && <div className="effect-icon">🏨</div>}
        {activeLink === 'travel-guides' && <div className="effect-icon">📖</div>}
        {activeLink === 'about' && <div className="effect-icon">👥</div>}
        {activeLink === 'contact' && <div className="effect-icon">📞</div>}
        {activeLink === 'gangtok' && <div className="effect-icon">🏞️</div>}
        {activeLink === 'pelling' && <div className="effect-icon">⛰️</div>}
        {activeLink === 'lachung' && <div className="effect-icon">❄️</div>}
        {activeLink === 'yumthang' && <div className="effect-icon">🌸</div>}
        {activeLink === 'tsomgo' && <div className="effect-icon">🏔️</div>}
        {activeLink === 'facebook' && <div className="effect-icon">👍</div>}
        {activeLink === 'instagram' && <div className="effect-icon">📸</div>}
        {activeLink === 'twitter' && <div className="effect-icon">🐦</div>}
        {activeLink === 'youtube' && <div className="effect-icon">🎥</div>}
        {activeLink === 'github' && <div className="effect-icon">💻</div>}
        {activeLink === 'github-profile' && <div className="effect-icon">👨‍💻</div>}
      </div>
    </footer>
  );
};

export default Footer;
