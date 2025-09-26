import React, { useState } from 'react';

const Routes = ({ 
  routes: initialRoutes = [], 
  onRouteSelect, 
  selectedRouteId,
  showFilters = true 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterTransport, setFilterTransport] = useState('all');
  
  // Default routes data if none provided
  const defaultRoutes = [
    { id: '1', name: 'Central Park Loop', transport: 'walking', distance: '6.1 km', duration: '1h 15m', difficulty: 'Easy', rating: 4.7, favorite: true },
    { id: '2', name: 'Brooklyn Bridge', transport: 'walking', distance: '3.2 km', duration: '40m', difficulty: 'Easy', rating: 4.8, favorite: false },
    { id: '3', name: 'Manhattan Waterfront', transport: 'cycling', distance: '21 km', duration: '1h 45m', difficulty: 'Moderate', rating: 4.5, favorite: true },
    { id: '4', name: 'High Line to Vessel', transport: 'walking', distance: '2.8 km', duration: '35m', difficulty: 'Easy', rating: 4.3, favorite: false },
    { id: '5', name: 'Prospect Park Trail', transport: 'cycling', distance: '5.6 km', duration: '25m', difficulty: 'Easy', rating: 4.6, favorite: false },
    { id: '6', name: 'Staten Island Greenway', transport: 'cycling', distance: '18 km', duration: '1h 30m', difficulty: 'Moderate', rating: 4.2, favorite: true },
    { id: '7', name: 'Queens Cultural Trail', transport: 'walking', distance: '8.3 km', duration: '1h 45m', difficulty: 'Moderate', rating: 4.4, favorite: false },
    { id: '8', name: 'Riverdale Route', transport: 'driving', distance: '14 km', duration: '25m', difficulty: 'Easy', rating: 4.1, favorite: false },
  ];

  const routes = initialRoutes.length > 0 ? initialRoutes : defaultRoutes;
  
  // Filter routes based on search term and transport filter
  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.distance.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTransport = filterTransport === 'all' || route.transport === filterTransport;
    
    return matchesSearch && matchesTransport;
  });

  // Sort routes based on selected criteria
  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (sortBy === 'duration') {
      return a.duration.localeCompare(b.duration);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  // Toggle favorite status
  const toggleFavorite = (routeId) => {
    const updatedRoutes = routes.map(route => 
      route.id === routeId ? { ...route, favorite: !route.favorite } : route
    );
    // In a real app, you would likely update state or make an API call here
    console.log("Toggle favorite for route:", routeId);
  };

  // Get transport icon
  const getTransportIcon = (transport) => {
    switch(transport) {
      case 'walking': return '🚶';
      case 'cycling': return '🚴';
      case 'driving': return '🚗';
      case 'public': return '🚆';
      default: return '📍';
    }
  };

  // Get difficulty class
  const getDifficultyClass = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'difficulty-easy';
      case 'moderate': return 'difficulty-moderate';
      case 'hard': return 'difficulty-hard';
      default: return '';
    }
  };

  return (
    <div className="routes-container">
      <div className="routes-header">
        <h2>Explore Routes</h2>
        <p>Discover the best paths and journeys around the city</p>
      </div>

      {showFilters && (
        <div className="routes-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search routes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name</option>
                <option value="distance">Distance</option>
                <option value="duration">Duration</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Transport:</label>
              <select value={filterTransport} onChange={(e) => setFilterTransport(e.target.value)}>
                <option value="all">All Types</option>
                <option value="walking">Walking</option>
                <option value="cycling">Cycling</option>
                <option value="driving">Driving</option>
                <option value="public">Public Transport</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="routes-list">
        {sortedRoutes.length > 0 ? (
          sortedRoutes.map(route => (
            <div 
              key={route.id} 
              className={`route-card ${selectedRouteId === route.id ? 'selected' : ''}`}
              onClick={() => onRouteSelect && onRouteSelect(route)}
            >
              <div className="route-header">
                <h3 className="route-name">{route.name}</h3>
                <button 
                  className={`favorite-btn ${route.favorite ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(route.id);
                  }}
                  aria-label={route.favorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {route.favorite ? '★' : '☆'}
                </button>
              </div>
              
              <div className="route-transport">
                <span className="transport-icon">{getTransportIcon(route.transport)}</span>
                <span className="transport-type">{route.transport}</span>
              </div>
              
              <div className="route-details">
                <div className="route-metric">
                  <span className="metric-value">{route.distance}</span>
                  <span className="metric-label">Distance</span>
                </div>
                
                <div className="route-metric">
                  <span className="metric-value">{route.duration}</span>
                  <span className="metric-label">Duration</span>
                </div>
                
                <div className="route-metric">
                  <span className={`metric-value ${getDifficultyClass(route.difficulty)}`}>
                    {route.difficulty}
                  </span>
                  <span className="metric-label">Difficulty</span>
                </div>
              </div>
              
              <div className="route-footer">
                <div className="route-rating">
                  <span className="rating-stars">{"★".repeat(Math.floor(route.rating))}</span>
                  <span className="rating-value">{route.rating.toFixed(1)}</span>
                </div>
                
                {onRouteSelect && (
                  <button 
                    className="select-route-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRouteSelect(route);
                    }}
                  >
                    View Route
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-routes">
            <p>No routes found matching your criteria.</p>
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setSearchTerm('');
                setFilterTransport('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Routes;