import React, { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Search destinations, activities, hotels..." }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef(null);

  // Sample search data for Sikkim
  const searchData = {
    destinations: [
      'Gangtok', 'Pelling', 'Lachung', 'Yumthang Valley', 'Tsomgo Lake',
      'Nathula Pass', 'Ravangla', 'Zuluk', 'Namchi', 'Yuksom'
    ],
    activities: [
      'Trekking to Goecha La', 'Yak Safari', 'River Rafting Teesta',
      'Cable Car Ride', 'Monastery Tour', 'Wildlife Safari',
      'Hot Spring Bath', 'Paragliding', 'Mountain Biking'
    ],
    hotels: [
      'Mayfair Spa Resort', 'Elgin Mount Pandim', 'Lemon Tree Hotel',
      'Summit Golden Crescent', 'Hotel Tashi Delek', 'The Chumbi Resort'
    ],
    monasteries: [
      'Rumtek Monastery', 'Pemayangtse Monastery', 'Tashiding Monastery',
      'Enchey Monastery', 'Phodong Monastery', 'Ralang Monastery'
    ]
  };

  const categories = [
    { id: 'all', label: 'All', icon: '🌄' },
    { id: 'destinations', label: 'Destinations', icon: '📍' },
    { id: 'activities', label: 'Activities', icon: '🚶' },
    { id: 'hotels', label: 'Hotels', icon: '🏨' },
    { id: 'monasteries', label: 'Monasteries', icon: '🛕' }
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = JSON.parse(localStorage.getItem('sikkimRecentSearches') || '[]');
    setRecentSearches(savedSearches);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSuggestions = (searchTerm) => {
    if (!searchTerm.trim()) {
      return recentSearches.slice(0, 5);
    }

    const results = [];
    const searchTermLower = searchTerm.toLowerCase();

    if (selectedCategory === 'all' || selectedCategory === 'destinations') {
      searchData.destinations.forEach(item => {
        if (item.toLowerCase().includes(searchTermLower)) {
          results.push({ type: 'destination', text: item, icon: '📍' });
        }
      });
    }

    if (selectedCategory === 'all' || selectedCategory === 'activities') {
      searchData.activities.forEach(item => {
        if (item.toLowerCase().includes(searchTermLower)) {
          results.push({ type: 'activity', text: item, icon: '🚶' });
        }
      });
    }

    if (selectedCategory === 'all' || selectedCategory === 'hotels') {
      searchData.hotels.forEach(item => {
        if (item.toLowerCase().includes(searchTermLower)) {
          results.push({ type: 'hotel', text: item, icon: '🏨' });
        }
      });
    }

    if (selectedCategory === 'all' || selectedCategory === 'monasteries') {
      searchData.monasteries.forEach(item => {
        if (item.toLowerCase().includes(searchTermLower)) {
          results.push({ type: 'monastery', text: item, icon: '🛕' });
        }
      });
    }

    return results.slice(0, 8);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 1) {
      setSuggestions(getSuggestions(value));
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    const searchResult = {
      query: searchQuery,
      category: selectedCategory,
      timestamp: new Date().toISOString()
    };

    // Save to recent searches
    const updatedSearches = [
      searchResult,
      ...recentSearches.filter(s => s.query !== searchQuery)
    ].slice(0, 10);

    setRecentSearches(updatedSearches);
    localStorage.setItem('sikkimRecentSearches', JSON.stringify(updatedSearches));

    onSearch(searchResult);
    setQuery('');
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (query.length > 1) {
      setSuggestions(getSuggestions(query));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('sikkimRecentSearches');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  return (
    <div className="search-bar-container" ref={searchRef}>
      <div className={`search-bar ${isFocused ? 'search-bar--focused' : ''}`}>
        <div className="search-input-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="search-input"
            aria-label="Search"
          />
          {query && (
            <button
              className="clear-button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle filters"
          >
            ⚙️
          </button>
          <button
            className="search-button"
            onClick={() => handleSearch()}
            disabled={!query.trim()}
            aria-label="Search"
          >
            Search
          </button>
        </div>

        {showFilters && (
          <div className="search-filters">
            <div className="filter-categories">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-category ${selectedCategory === category.id ? 'filter-category--active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {isFocused && (suggestions.length > 0 || recentSearches.length > 0) && (
        <div className="suggestions-dropdown">
          {suggestions.length > 0 ? (
            <>
              <div className="suggestions-header">
                <span>Suggestions</span>
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="suggestion-icon">{suggestion.icon}</span>
                  <span className="suggestion-text">{suggestion.text}</span>
                  <span className="suggestion-type">{suggestion.type}</span>
                </button>
              ))}
            </>
          ) : recentSearches.length > 0 && (
            <>
              <div className="suggestions-header">
                <span>Recent Searches</span>
                <button
                  className="clear-recent"
                  onClick={clearRecentSearches}
                  aria-label="Clear recent searches"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="suggestion-item recent-search"
                  onClick={() => handleSuggestionClick({ text: search.query })}
                >
                  <span className="suggestion-icon">🕒</span>
                  <span className="suggestion-text">{search.query}</span>
                  <span className="search-category">{search.category}</span>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {isFocused && query.length > 2 && suggestions.length === 0 && (
        <div className="suggestions-dropdown">
          <div className="no-results">
            <span>No results found for "{query}"</span>
            <p>Try searching for destinations, activities, or hotels</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;