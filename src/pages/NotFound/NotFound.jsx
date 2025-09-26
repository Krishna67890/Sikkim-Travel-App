// src/pages/NotFound/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-image">
          <div className="mountain-silhouette"></div>
          <div className="prayer-flags"></div>
        </div>
        
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Path Not Found</h2>
        
        <p className="not-found-description">
          It seems you've wandered off the trail in the beautiful mountains of Sikkim. 
          Don't worry, even the best travelers sometimes take wrong turns.
        </p>
        
        <div className="not-found-actions">
          <Link to="/" className="not-found-button primary">
            Return to Home
          </Link>
          <Link to="/monasteries" className="not-found-button secondary">
            Explore Monasteries
          </Link>
        </div>
        
        <div className="not-found-tip">
          <p className="tip-title">Travel Tip:</p>
          <p>Always carry a map when exploring the Himalayan trails!</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;