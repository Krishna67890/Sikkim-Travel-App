import React, { useState } from 'react';
import "./MonasteryCard.css";

const MonasteryCard = ({ 
  monastery, 
  onQuickView, 
  onAddToItinerary, 
  className = '',
  variant = 'default'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const {
    id,
    name,
    imageUrl,
    district,
    rating,
    entryFee,
    bestTime,
    description,
    timings,
    distance,
    duration,
    categories = [],
    highlights = []
  } = monastery;

  const truncatedDescription = description.length > 120 
    ? `${description.substring(0, 120)}...` 
    : description;

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality with backend
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView?.(monastery);
  };

  const handleAddToItinerary = (e) => {
    e.stopPropagation();
    onAddToItinerary?.(monastery);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'var(--rating-excellent)';
    if (rating >= 4.0) return 'var(--rating-great)';
    if (rating >= 3.5) return 'var(--rating-good)';
    return 'var(--rating-average)';
  };

  const getPriceLevel = (fee) => {
    if (fee === 0) return 'Free';
    if (fee < 50) return '₹';
    if (fee < 100) return '₹₹';
    return '₹₹₹';
  };

  return (
    <div className={`monastery-card ${variant} ${className}`}>
      {/* Image Section */}
      <div className="monastery-card__image-container">
        {!imageLoaded && !imageError && (
          <div className="monastery-card__skeleton-image"></div>
        )}
        
        {imageError ? (
          <div className="monastery-card__image-error">
            <div className="error-icon">🏔️</div>
            <span>Image not available</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={name}
            className="monastery-card__image"
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        )}

        {/* Overlay Badges */}
        <div className="monastery-card__badges">
          <div 
            className="monastery-card__rating"
            style={{ '--rating-color': getRatingColor(rating) }}
          >
            <span className="rating-icon">⭐</span>
            <span className="rating-value">{rating}</span>
          </div>
          
          <div className="monastery-card__price-badge">
            {getPriceLevel(entryFee)}
          </div>

          {bestTime && (
            <div className="monastery-card__time-badge">
              🕒 {bestTime}
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          className={`monastery-card__favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span className="favorite-icon">
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>

        {/* Quick Actions Overlay */}
        <div className="monastery-card__quick-actions">
          <button
            className="monastery-card__quick-view-btn"
            onClick={handleQuickView}
            aria-label="Quick view"
          >
            👁️
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="monastery-card__content">
        {/* Header */}
        <div className="monastery-card__header">
          <h3 className="monastery-card__title">{name}</h3>
          <span className="monastery-card__district">{district}</span>
        </div>

        {/* Description */}
        <div className="monastery-card__description">
          <p>
            {showFullDescription ? description : truncatedDescription}
            {description.length > 120 && (
              <button
                className="monastery-card__read-more"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? ' Read less' : ' Read more'}
              </button>
            )}
          </p>
        </div>

        {/* Meta Information */}
        <div className="monastery-card__meta">
          {timings && (
            <div className="monastery-card__meta-item">
              <span className="meta-icon">🕒</span>
              <span>{timings}</span>
            </div>
          )}
          
          {duration && (
            <div className="monastery-card__meta-item">
              <span className="meta-icon">⏱️</span>
              <span>{duration}</span>
            </div>
          )}
          
          {distance && (
            <div className="monastery-card__meta-item">
              <span className="meta-icon">📍</span>
              <span>{distance} from center</span>
            </div>
          )}
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="monastery-card__categories">
            {categories.slice(0, 3).map((category, index) => (
              <span key={index} className="monastery-card__category-tag">
                {category}
              </span>
            ))}
            {categories.length > 3 && (
              <span className="monastery-card__category-more">
                +{categories.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="monastery-card__highlights">
            <h4>Highlights:</h4>
            <ul>
              {highlights.slice(0, 2).map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="monastery-card__actions">
          <button
            className="monastery-card__action-btn secondary"
            onClick={handleQuickView}
          >
            <span className="btn-icon">👁️</span>
            Quick View
          </button>
          
          <button
            className="monastery-card__action-btn primary"
            onClick={handleAddToItinerary}
          >
            <span className="btn-icon">➕</span>
            Add to Trip
          </button>
        </div>

        {/* Footer */}
        <div className="monastery-card__footer">
          <div className="monastery-card__entry-fee">
            {entryFee === 0 ? 'Free Entry' : `Entry: ₹${entryFee}`}
          </div>
          
          <div className="monastery-card__reviews">
            <span className="reviews-count">142 reviews</span>
            {/* TODO: Connect with actual reviews data */}
          </div>
        </div>
      </div>

      {/* Hover Effect Layer */}
      <div className="monastery-card__hover-layer"></div>
    </div>
  );
};

export default MonasteryCard;