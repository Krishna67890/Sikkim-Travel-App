// RouteCard.jsx
import React, { useState } from 'react';
import './RouteCard.css';

const RouteCard = ({ 
  route, 
  onSelectRoute, 
  className = '',
  variant = 'default'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const {
    id,
    from,
    to,
    distance,
    duration,
    transportation,
    cost,
    difficulty,
    sceneryRating,
    description,
    highlights = [],
    tips = []
  } = route;

  const handleSelectRoute = () => {
    setIsSelected(!isSelected);
    onSelectRoute?.(route, !isSelected);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getTransportIcon = (transport) => {
    switch(transport) {
      case 'walking': return '🚶';
      case 'driving': return '🚗';
      case 'cycling': return '🚴';
      case 'bus': return '🚌';
      default: return '📍';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'var(--difficulty-easy)';
      case 'moderate': return 'var(--difficulty-moderate)';
      case 'hard': return 'var(--difficulty-hard)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className={`route-card ${variant} ${className} ${isSelected ? 'selected' : ''}`}>
      <div className="route-card__header">
        <div className="route-card__transport">
          <span className="route-card__transport-icon">
            {getTransportIcon(transportation)}
          </span>
          <span className="route-card__transport-type">{transportation}</span>
        </div>
        
        <div className="route-card__route-info">
          <h3 className="route-card__title">{from} → {to}</h3>
          <div className="route-card__meta">
            <span className="route-card__distance">{distance} km</span>
            <span className="route-card__duration">{duration}</span>
          </div>
        </div>

        <button 
          className="route-card__expand-btn"
          onClick={toggleExpand}
          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>

      <div className="route-card__content">
        <div className="route-card__stats">
          <div className="route-card__stat">
            <span className="route-card__stat-label">Cost</span>
            <span className="route-card__stat-value">₹{cost}</span>
          </div>
          
          <div className="route-card__stat">
            <span className="route-card__stat-label">Difficulty</span>
            <span 
              className="route-card__stat-value"
              style={{ color: getDifficultyColor(difficulty) }}
            >
              {difficulty}
            </span>
          </div>
          
          <div className="route-card__stat">
            <span className="route-card__stat-label">Scenery</span>
            <span className="route-card__stat-value">
              {'★'.repeat(sceneryRating)}{'☆'.repeat(5 - sceneryRating)}
            </span>
          </div>
        </div>

        {isExpanded && (
          <div className="route-card__details">
            {description && (
              <p className="route-card__description">{description}</p>
            )}
            
            {highlights.length > 0 && (
              <div className="route-card__highlights">
                <h4>Route Highlights</h4>
                <ul>
                  {highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {tips.length > 0 && (
              <div className="route-card__tips">
                <h4>Travel Tips</h4>
                <ul>
                  {tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="route-card__actions">
        <button 
          className={`route-card__select-btn ${isSelected ? 'selected' : ''}`}
          onClick={handleSelectRoute}
        >
          {isSelected ? 'Selected' : 'Select Route'}
        </button>
        
        <button className="route-card__navigate-btn">
          Navigate 🗺️
        </button>
      </div>

      <div className="route-card__hover-layer"></div>
    </div>
  );
};

export default RouteCard;