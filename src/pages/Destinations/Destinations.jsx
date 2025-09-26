import React, { useState } from 'react';
import './Destinations.css';

const Destinations = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [activeDestination, setActiveDestination] = useState(null);

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'east', name: 'East Sikkim' },
    { id: 'west', name: 'West Sikkim' },
    { id: 'north', name: 'North Sikkim' },
    { id: 'south', name: 'South Sikkim' }
  ];

  const destinations = [
    {
      id: 1,
      name: 'Tsomgo Lake',
      region: 'east',
      image: 'https://images.unsplash.com/photo-1580502304784-8985b7eb7260?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'A glacial lake at 12,400 ft surrounded by steep mountains',
      bestTime: 'Mar-May, Oct-Dec',
      altitude: '3,780 m',
      highlights: ['Sacred Lake', 'Yak Rides', 'Snow Views'],
      difficulty: 'Easy'
    },
    {
      id: 2,
      name: 'Nathula Pass',
      region: 'east',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Historic mountain pass on the Indo-China border',
      bestTime: 'May-Nov',
      altitude: '4,310 m',
      highlights: ['Border Crossing', 'Historic Significance', 'Panoramic Views'],
      difficulty: 'Moderate'
    },
    {
      id: 3,
      name: 'Gurudongmar Lake',
      region: 'north',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'One of the highest lakes in the world at 17,800 ft',
      bestTime: 'Apr-Jun, Oct-Dec',
      altitude: '5,430 m',
      highlights: ['Sacred Waters', 'Alpine Scenery', 'High Altitude'],
      difficulty: 'Challenging'
    },
    {
      id: 4,
      name: 'Yumthang Valley',
      region: 'north',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Valley of Flowers with hot springs and stunning rhododendron blooms',
      bestTime: 'Feb-Jun',
      altitude: '3,564 m',
      highlights: ['Flower Meadows', 'Hot Springs', 'Shingba Rhododendron Sanctuary'],
      difficulty: 'Moderate'
    },
    {
      id: 5,
      name: 'Pelling',
      region: 'west',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Picturesque town with breathtaking views of Kanchenjunga',
      bestTime: 'Sep-May',
      altitude: '2,150 m',
      highlights: ['Kanchenjunga Views', 'Ancient Monasteries', 'Waterfalls'],
      difficulty: 'Easy'
    },
    {
      id: 6,
      name: 'Ravangla',
      region: 'south',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Scenic town with Buddha Park and stunning Himalayan vistas',
      bestTime: 'Mar-May, Sep-Nov',
      altitude: '2,200 m',
      highlights: ['Buddha Park', 'Tea Gardens', 'Bird Watching'],
      difficulty: 'Easy'
    },
    {
      id: 7,
      name: 'Zuluk',
      region: 'east',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Quaint village on the ancient Silk Route with hairpin bends',
      bestTime: 'Mar-Jun, Sep-Nov',
      altitude: '2,900 m',
      highlights: ['Silk Route', 'Hairpin Bends', 'Sunrise Views'],
      difficulty: 'Moderate'
    },
    {
      id: 8,
      name: 'Lachung',
      region: 'north',
      image: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Picturesque village known as the "most beautiful place in Sikkim"',
      bestTime: 'Oct-Jun',
      altitude: '2,700 m',
      highlights: ['Lachung Monastery', 'Waterfalls', 'Apple Orchards'],
      difficulty: 'Moderate'
    }
  ];

  const filteredDestinations = selectedRegion === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.region === selectedRegion);

  const openDetailView = (destination) => {
    setActiveDestination(destination);
  };

  const closeDetailView = () => {
    setActiveDestination(null);
  };

  return (
    <div className="destinations-page">
      <div className="destinations-hero">
        <div className="hero-content">
          <h1>Discover Sikkim's Wonders</h1>
          <p>Explore the breathtaking landscapes, serene lakes, and cultural treasures of the Eastern Himalayas</p>
        </div>
      </div>

      <div className="destinations-container">
        <div className="filter-section">
          <h2>Explore by Region</h2>
          <div className="region-filters">
            {regions.map(region => (
              <button
                key={region.id}
                className={`region-filter ${selectedRegion === region.id ? 'active' : ''}`}
                onClick={() => setSelectedRegion(region.id)}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>

        <div className="destinations-grid">
          {filteredDestinations.map(destination => (
            <div 
              key={destination.id} 
              className="destination-card"
              onClick={() => openDetailView(destination)}
            >
              <div className="card-image">
                <img src={destination.image} alt={destination.name} />
                <div className="card-overlay">
                  <span className="difficulty-badge">{destination.difficulty}</span>
                </div>
              </div>
              <div className="card-content">
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <div className="destination-meta">
                  <span className="altitude">🏔️ {destination.altitude}</span>
                  <span className="best-time">📅 {destination.bestTime}</span>
                </div>
                <div className="highlights">
                  {destination.highlights.slice(0, 2).map((highlight, index) => (
                    <span key={index} className="highlight-tag">{highlight}</span>
                  ))}
                  {destination.highlights.length > 2 && (
                    <span className="highlight-tag">+{destination.highlights.length - 2} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeDestination && (
        <div className="destination-detail-overlay">
          <div className="destination-detail">
            <button className="close-detail" onClick={closeDetailView}>×</button>
            <div className="detail-header">
              <img src={activeDestination.image} alt={activeDestination.name} />
              <div className="detail-title">
                <h2>{activeDestination.name}</h2>
                <p>{activeDestination.description}</p>
              </div>
            </div>
            <div className="detail-content">
              <div className="detail-section">
                <h3>Overview</h3>
                <div className="detail-stats">
                  <div className="stat">
                    <span className="stat-label">Altitude</span>
                    <span className="stat-value">{activeDestination.altitude}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Best Time to Visit</span>
                    <span className="stat-value">{activeDestination.bestTime}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Difficulty</span>
                    <span className="stat-value">{activeDestination.difficulty}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Highlights</h3>
                <div className="highlight-list">
                  {activeDestination.highlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">
                      <span className="highlight-icon">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h3>Travel Tips</h3>
                <ul>
                  <li>Carry warm clothing regardless of the season</li>
                  <li>Acclimatize properly to avoid altitude sickness</li>
                  <li>Obtain necessary permits in advance for restricted areas</li>
                  <li>Respect local customs and environment</li>
                </ul>
              </div>

              <div className="action-buttons">
                <button className="btn-primary">Add to Itinerary</button>
                <button className="btn-secondary">Share Destination</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;