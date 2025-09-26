import React, { useState } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ onFilterChange, isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    categories: [],
    difficulty: '',
    duration: '',
    rating: 0,
    location: ''
  });

  const categories = [
    'Trekking',
    'Cultural',
    'Wildlife',
    'Pilgrimage',
    'Adventure',
    'Photography'
  ];

  const difficultyLevels = ['Easy', 'Moderate', 'Difficult', 'Challenging'];
  const durations = ['1-3 days', '4-7 days', '8+ days'];
  const locations = [
    'Gangtok',
    'Pelling',
    'Lachung',
    'Yumthang',
    'Tsomgo Lake',
    'Nathula Pass',
    'Ravangla',
    'Zuluk'
  ];

  const handleCategoryToggle = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(cat => cat !== category)
      : [...filters.categories, category];
    
    const newFilters = { ...filters, categories: updatedCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (min, max) => {
    const newFilters = { ...filters, priceRange: [min, max] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleInputChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      priceRange: [0, 10000],
      categories: [],
      difficulty: '',
      duration: '',
      rating: 0,
      location: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className={`filter-panel ${isOpen ? 'filter-panel--open' : ''}`}>
      <div className="filter-panel__header">
        <h3>Filter Tours</h3>
        <button className="filter-panel__close" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="filter-panel__content">
        {/* Price Range Filter */}
        <div className="filter-section">
          <h4>Price Range (₹)</h4>
          <div className="price-range">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(filters.priceRange[0], parseInt(e.target.value))}
            className="price-slider"
          />
        </div>

        {/* Categories Filter */}
        <div className="filter-section">
          <h4>Tour Categories</h4>
          <div className="category-chips">
            {categories.map(category => (
              <button
                key={category}
                className={`category-chip ${filters.categories.includes(category) ? 'category-chip--active' : ''}`}
                onClick={() => handleCategoryToggle(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="filter-section">
          <h4>Difficulty Level</h4>
          <div className="radio-group">
            {difficultyLevels.map(level => (
              <label key={level} className="radio-label">
                <input
                  type="radio"
                  name="difficulty"
                  value={level}
                  checked={filters.difficulty === level}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="filter-section">
          <h4>Duration</h4>
          <select
            value={filters.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            className="filter-select"
          >
            <option value="">Any Duration</option>
            {durations.map(duration => (
              <option key={duration} value={duration}>{duration}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="filter-section">
          <h4>Location</h4>
          <select
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="filter-select"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="filter-section">
          <h4>Minimum Rating</h4>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                className={`rating-star ${filters.rating >= star ? 'rating-star--active' : ''}`}
                onClick={() => handleInputChange('rating', star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="filter-actions">
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;