import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeLink, setActiveLink] = useState('');

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
              <a href="#" className="social-link" onMouseEnter={() => handleLinkHover('facebook')} onMouseLeave={handleLinkLeave}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" onMouseEnter={() => handleLinkHover('instagram')} onMouseLeave={handleLinkLeave}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" onMouseEnter={() => handleLinkHover('twitter')} onMouseLeave={handleLinkLeave}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" onMouseEnter={() => handleLinkHover('youtube')} onMouseLeave={handleLinkLeave}>
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-section footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#" onMouseEnter={() => handleLinkHover('home')} onMouseLeave={handleLinkLeave}>Home</a></li>
              <li><a href="#" onMouseEnter={() => handleLinkHover('destinations')} onMouseLeave={handleLinkLeave}>Destinations</a></li>
              <li><a href="#" onMouseEnter={() => handleLinkHover('tours')} onMouseLeave={handleLinkLeave}>Tours</a></li>
              <li><a href="#" onMouseEnter={() => handleLinkHover('accommodations')} onMouseLeave={handleLinkLeave}>Accommodations</a></li>
              <li><a href="#" onMouseEnter={() => handleLinkHover('travel-guides')} onMouseLeave={handleLinkLeave}>Travel Guides</a></li>
            </ul>
          </div>

          <div className="footer-section footer-links">
            <h4>Destinations</h4>
            <ul>
              <li><a href="#" onMouseEnter={() => handleLinkHover('gangtok')} onMouseLeave={handleLinkLeave}>Gangtok</a></li>
              <li><a href="#" onMouseEnter={() => handleLinkHover('pelling')} onMouseLeave={handleLinkLeave}>Pelling</a></li>
              <li><a href="#" onMouseEnter={() => handleLinkHover('lachung')} onMouseLeave={handleLinkLeave}>Lachung</a></li>
              <li><a href="#" onMouseEnter={() => handleLinkHover('yumthang')} onMouseLeave={handleLinkLeave}>Yumthang Valley</a></li>
              <li><a href="#" onMouseEnter={() => handleLinkHover('tsomgo')} onMouseLeave={handleLinkLeave}>Tsomgo Lake</a></li>
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
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
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