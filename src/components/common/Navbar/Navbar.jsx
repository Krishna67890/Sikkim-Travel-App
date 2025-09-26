import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/destinations', label: 'Destinations', icon: '🗺️' },
    { path: '/itineraries', label: 'Itineraries', icon: '📅' },
    { path: '/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/monasteries', label: 'Monasteries', icon: '🛕' },
    { path: '/transportation', label: 'Transportation', icon: '🚗' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📞' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            🌄 Sikkim Explorer
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="navbar-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Additional Navigation Items */}
        <div className="navbar-actions">
          <button className="navbar-action-btn" aria-label="Search">
            🔍
          </button>
          <button className="navbar-action-btn" aria-label="Language">
            🌐
          </button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div className="navbar-overlay" onClick={closeMenu}></div>
      )}
    </nav>
  );
};

export default Navbar;