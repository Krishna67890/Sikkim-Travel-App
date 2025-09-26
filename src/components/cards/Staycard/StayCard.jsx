
// StayCard.jsx
import React, { useState } from 'react';
import './StayCard.css';

const StayCard = ({ 
  stay, 
  onBookNow, 
  onViewDetails, 
  className = '',
  variant = 'default'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const {
    id,
    name,
    imageUrl,
    type,
    price,
    rating,
    reviewCount,
    distance,
    amenities = [],
    description,
    available,
    discount,
    tags = []
  } = stay;

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
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    onBookNow?.(stay);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    onViewDetails?.(stay);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'var(--rating-excellent)';
    if (rating >= 4.0) return 'var(--rating-great)';
    if (rating >= 3.5) return 'var(--rating-good)';
    return 'var(--rating-average)';
  };

  const getStayTypeIcon = (type) => {
    switch(type) {
      case 'hotel': return '🏨';
      case 'guesthouse': return '🏠';
      case 'homestay': return '👨‍👩‍👧‍👦';
      case 'monastery stay': return '🛐';
      case 'eco lodge': return '🌿';
      default: return '🏨';
    }
  };

  const getPriceLevel = (price) => {
    if (price < 1000) return '₹';
    if (price < 2500) return '₹₹';
    if (price < 5000) return '₹₹₹';
    return '₹₹₹₹';
  };

  const displayedAmenities = showAllAmenities ? amenities : amenities.slice(0, 4);

  return (
    <div className={`stay-card ${variant} ${className}`}>
      {/* Image Section */}
      <div className="stay-card__image-container">
        {!imageLoaded && !imageError && (
          <div className="stay-card__skeleton-image"></div>
        )}
        
        {imageError ? (
          <div className="stay-card__image-error">
            <div className="error-icon">🏨</div>
            <span>Image not available</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={name}
            className="stay-card__image"
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        )}

        {/* Overlay Badges */}
        <div className="stay-card__badges">
          <div className="stay-card__type-badge">
            {getStayTypeIcon(type)} {type}
          </div>
          
          {discount > 0 && (
            <div className="stay-card__discount-badge">
              -{discount}%
            </div>
          )}
          
          {!available && (
            <div className="stay-card__availability-badge">
              Sold Out
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          className={`stay-card__favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span className="favorite-icon">
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

      {/* Content Section */}
      <div className="stay-card__content">
        {/* Header */}
        <div className="stay-card__header">
          <h3 className="stay-card__title">{name}</h3>
          
          <div className="stay-card__price-section">
            <div className="stay-card__price">
              ₹{price}
              <span className="stay-card__price-period">/night</span>
            </div>
            <div className="stay-card__price-level">
              {getPriceLevel(price)}
            </div>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="stay-card__rating-section">
          <div 
            className="stay-card__rating"
            style={{ '--rating-color': getRatingColor(rating) }}
          >
            <span className="rating-icon">⭐</span>
            <span className="rating-value">{rating}</span>
            <span className="review-count">({reviewCount} reviews)</span>
          </div>
          
          {distance && (
            <div className="stay-card__distance">
              <span className="distance-icon">📍</span>
              {distance} from monastery
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <div className="stay-card__description">
            <p>{description}</p>
          </div>
        )}

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="stay-card__amenities">
            <h4 className="amenities-title">Amenities:</h4>
            <div className="amenities-list">
              {displayedAmenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">
                  {amenity}
                </span>
              ))}
            </div>
            {amenities.length > 4 && (
              <button
                className="amenities-toggle"
                onClick={() => setShowAllAmenities(!showAllAmenities)}
              >
                {showAllAmenities ? 'Show less' : `+${amenities.length - 4} more`}
              </button>
            )}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="stay-card__tags">
            {tags.map((tag, index) => (
              <span key={index} className="stay-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="stay-card__actions">
          <button
            className="stay-card__action-btn secondary"
            onClick={handleViewDetails}
            disabled={!available}
          >
            View Details
          </button>
          
          <button
            className="stay-card__action-btn primary"
            onClick={handleBookNow}
            disabled={!available}
          >
            {available ? 'Book Now' : 'Not Available'}
          </button>
        </div>
      </div>

      {/* Hover Effect Layer */}
      <div className="stay-card__hover-layer"></div>
    </div>
  );
};

export default StayCard;