import React, { useState, useEffect } from 'react';
import MapEmbed from '../../components/ui/MapEmbed/MapEmbed';
import CostBadge from '../../components/ui/CostBadge/CostBadge';
import SearchBar from '../../components/ui/SearchBar/SearchBar';
import './Transportation.css';
import transportationData from '../../data/mockData/transportationData';

const Transportation = () => {
  const [filteredTransport, setFilteredTransport] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [filters, setFilters] = useState({
    transportType: 'all',
    priceRange: [0, 10000],
    searchQuery: ''
  });

  // Normalize and compute a flat list of transport options
  useEffect(() => {
    const normalized = [];
    transportationData.forEach((item) => {
      if (item.routes && Array.isArray(item.routes)) {
        item.routes.forEach((r, idx) => {
          normalized.push({
            id: `${item.id}-${idx + 1}`,
            type: item.type.toLowerCase(),
            provider: item.provider,
            contact: item.contact,
            from: r.from,
            to: r.to,
            durationText: r.duration,
            cost: item.price?.perPerson || item.price?.min || item.pricePerKm || item.pricePerDay || 0,
            meta: item
          });
        });
      } else {
        normalized.push({
          id: item.id,
          type: item.type.toLowerCase(),
          provider: item.provider,
          contact: item.contact,
          from: 'Varies',
          to: 'Varies',
          durationText: item.duration || '-',
          cost: item.pricePerKm || item.pricePerDay || item.price?.min || 0,
          meta: item
        });
      }
    });

    let results = normalized;

    if (filters.transportType !== 'all') {
      results = results.filter((i) => i.type === filters.transportType);
    }

    results = results.filter((i) => i.cost >= filters.priceRange[0] && i.cost <= filters.priceRange[1]);

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      results = results.filter((i) =>
        i.from.toLowerCase().includes(q) || i.to.toLowerCase().includes(q) || i.type.toLowerCase().includes(q) || i.provider.toLowerCase().includes(q)
      );
    }

    setFilteredTransport(results);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const transportTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'taxi', label: 'Taxi' },
    { value: 'bus', label: 'Bus' },
    { value: 'shared jeep', label: 'Shared Jeep' },
    { value: 'helicopter', label: 'Helicopter' },
    { value: 'rental car', label: 'Rental Car' }
  ];

  return (
    <div className="transportation-page">
      <div className="transportation-container">
        <div className="transportation-intro">
          <h2>Transportation in Sikkim</h2>
          <p>Plan your journey across the beautiful landscapes of Sikkim</p>
        </div>

        <div className="transportation-content">
          <aside className="filters-sidebar transportation-filters">
            <div className="filters-section">
              <h3>Filters</h3>
              <SearchBar 
                placeholder="Search routes, providers..."
                onSearch={(payload) => {
                  const q = typeof payload === 'string' ? payload : payload?.query || '';
                  handleFilterChange({ searchQuery: q });
                }}
              />
              <div className="filter-row">
                <div>
                  <label>Transport Type</label>
                  <select value={filters.transportType} onChange={(e) => handleFilterChange({ transportType: e.target.value })}>
                    {transportTypes.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Max Price (₹)</label>
                  <input
                    type="range"
                    min={0}
                    max={10000}
                    step={100}
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange({ priceRange: [0, parseInt(e.target.value)] })}
                  />
                  <div>Up to ₹{filters.priceRange[1]}</div>
                </div>
              </div>
            </div>

            {selectedRoute && (
              <div className="route-details-panel">
                <h3>Selected Option</h3>
                <div className="detail-item"><span className="label">Provider:</span><span className="value">{selectedRoute.provider}</span></div>
                <div className="detail-item"><span className="label">Type:</span><span className="value">{selectedRoute.type}</span></div>
                <div className="detail-item"><span className="label">From:</span><span className="value">{selectedRoute.from}</span></div>
                <div className="detail-item"><span className="label">To:</span><span className="value">{selectedRoute.to}</span></div>
                <div className="detail-item"><span className="label">Duration:</span><span className="value">{selectedRoute.durationText}</span></div>
                <div className="detail-item"><span className="label">Contact:</span><span className="value">{selectedRoute.contact}</span></div>
                <div className="detail-item"><span className="label">Cost:</span><span className="value"><CostBadge cost={selectedRoute.cost} /></span></div>
                <button className="book-button">Book This Option</button>
              </div>
            )}
          </aside>

          <main className="transportation-main">
            <div className="transportation-map">
              <h3>Transportation Map</h3>
              <MapEmbed routes={filteredTransport} onRouteSelect={handleRouteSelect} selectedRoute={selectedRoute} />
            </div>

            <div className="routes-section">
              <div className="section-header">
                <h3>Available Options ({filteredTransport.length})</h3>
                <div className="sort-options">
                  <span>Sort by:</span>
                  <select onChange={(e) => handleFilterChange({ sortBy: e.target.value })}>
                    <option value="cost">Price</option>
                    <option value="type">Type</option>
                    <option value="provider">Provider</option>
                  </select>
                </div>
              </div>

              <div className="routes-grid">
                {filteredTransport.length > 0 ? (
                  filteredTransport.map((route) => (
                    <div 
                      key={route.id} 
                      className={`route-card ${selectedRoute?.id === route.id ? 'selected' : ''}`}
                      onClick={() => handleRouteSelect(route)}
                    >
                      <div className="route-header">
                        <h4>{route.from} → {route.to}</h4>
                        <CostBadge cost={route.cost} />
                      </div>
                      <div className="route-details">
                        <div className="detail">
                          <span className="icon">⏱️</span>
                          <span>{route.durationText}</span>
                        </div>
                        <div className="detail">
                          <span className="icon">🚗</span>
                          <span>{route.type}</span>
                        </div>
                        <div className="detail">
                          <span className="icon">📞</span>
                          <span>{route.contact}</span>
                        </div>
                      </div>
                      <div className="route-actions">
                        <button className="action-btn">View Details</button>
                        <button className="action-btn primary">Book Now</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <h4>No transportation options found</h4>
                    <p>Try adjusting your filters to see more results</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        <div className="transportation-info">
          <h3>Travel Tips for Sikkim</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>🛂 Permits Required</h4>
              <p>Foreign nationals need Protected Area Permit (PAP) to visit Sikkim. Indian nationals need Inner Line Permit (ILP) for certain areas.</p>
            </div>
            <div className="tip-card">
              <h4>⏰ Best Travel Times</h4>
              <p>March to June and September to December are the best months to visit. Monsoon (July-August) can cause road disruptions.</p>
            </div>
            <div className="tip-card">
              <h4>💰 Cost Saving Tips</h4>
              <p>Shared jeeps are cheaper than private taxis. Book in advance during peak season for better rates.</p>
            </div>
            <div className="tip-card">
              <h4>🚗 Road Conditions</h4>
              <p>Mountain roads can be narrow and winding. Travel during daylight hours for safety.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transportation;