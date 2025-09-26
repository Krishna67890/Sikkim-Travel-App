import React, { useMemo, useState } from 'react';
import './Itineraries.css';
import SearchBar from '../../components/ui/SearchBar/SearchBar';
import Loader from '../../components/common/Loader/Loader';

const sampleItineraries = [
  {
    id: 1,
    title: 'Classic Gangtok 3D2N',
    days: 3,
    budget: 'mid',
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1200',
    locations: ['Gangtok', 'Tsomgo Lake'],
    highlights: ['MG Marg', 'Tsomgo Lake', 'Cable Car'],
    description: 'A perfect weekend getaway covering the highlights of Gangtok.'
  },
  {
    id: 2,
    title: 'North Sikkim Adventure 5D4N',
    days: 5,
    budget: 'premium',
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200',
    locations: ['Lachen', 'Gurudongmar', 'Lachung', 'Yumthang'],
    highlights: ['Gurudongmar Lake', 'Yumthang Valley'],
    description: 'High-altitude adventure with surreal lakes and valleys.'
  },
  {
    id: 3,
    title: 'West Sikkim Heritage 4D3N',
    days: 4,
    budget: 'budget',
    rating: 4.4,
    cover: 'https://images.unsplash.com/photo-1503372712204-094d3f99e7a6?w=1200',
    locations: ['Pelling', 'Yuksom', 'Rimbi'],
    highlights: ['Pemayangtse', 'Khecheopalri Lake'],
    description: 'Heritage monasteries and serene lakes in the west.'
  }
];

const Itineraries = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ days: 'all', budget: 'all', minRating: 0 });

  const filtered = useMemo(() => {
    let list = [...sampleItineraries];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(i => i.title.toLowerCase().includes(q) || i.locations.join(' ').toLowerCase().includes(q));
    }
    if (filters.days !== 'all') {
      const d = parseInt(filters.days, 10);
      list = list.filter(i => i.days <= d);
    }
    if (filters.budget !== 'all') {
      list = list.filter(i => i.budget === filters.budget);
    }
    if (filters.minRating > 0) {
      list = list.filter(i => i.rating >= filters.minRating);
    }
    return list;
  }, [query, filters]);

  return (
    <div className="itineraries-page">
      <div className="itineraries-hero">
        <div className="hero-content">
          <h1>Curated Sikkim Itineraries</h1>
          <p>Pick a plan or customize your perfect Himalayan escape</p>
        </div>
      </div>

      <div className="itineraries-container">
        <div className="toolbar">
          <SearchBar onSearch={(payload) => setQuery(typeof payload === 'string' ? payload : payload?.query || '')} placeholder="Search itineraries..." />
          <div className="filters">
            <div>
              <label>Max Days</label>
              <select value={filters.days} onChange={(e) => setFilters(f => ({ ...f, days: e.target.value }))}>
                <option value="all">Any</option>
                <option value="3">Up to 3</option>
                <option value="5">Up to 5</option>
                <option value="7">Up to 7</option>
              </select>
            </div>
            <div>
              <label>Budget</label>
              <select value={filters.budget} onChange={(e) => setFilters(f => ({ ...f, budget: e.target.value }))}>
                <option value="all">All</option>
                <option value="budget">Budget</option>
                <option value="mid">Mid</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div>
              <label>Min Rating</label>
              <div className="rating-select">
                {[0, 3, 4, 4.5].map(r => (
                  <button key={r} className={`rating-chip ${filters.minRating === r ? 'active' : ''}`} onClick={() => setFilters(f => ({ ...f, minRating: r }))}>
                    {r === 0 ? 'Any' : `${r}+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="itineraries-grid">
          {filtered.map((it) => (
            <div key={it.id} className="itinerary-card">
              <div className="card-image">
                <img src={it.cover} alt={it.title} />
                <div className="badge">{it.days} days</div>
              </div>
              <div className="card-content">
                <h3>{it.title}</h3>
                <p className="desc">{it.description}</p>
                <div className="meta">
                  <span>Budget: {it.budget}</span>
                  <span>⭐ {it.rating}</span>
                </div>
                <div className="chips">
                  {it.highlights.slice(0, 3).map((h, i) => (
                    <span key={i} className="chip">{h}</span>
                  ))}
                </div>
                <div className="actions">
                  <button className="secondary">View Details</button>
                  <button className="primary">Customize</button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="no-results">
              <h3>No itineraries found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Itineraries;
