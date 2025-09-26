import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="loader-animation">
          <div className="mountain-range">
            <div className="mountain mountain-1"></div>
            <div className="mountain mountain-2"></div>
            <div className="mountain mountain-3"></div>
            <div className="mountain mountain-4"></div>
          </div>
          <div className="sun"></div>
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
        </div>
        <h2 className="loader-title">Discover Sikkim</h2>
        <p className="loader-subtitle">The Land of Mystical Beauty</p>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;