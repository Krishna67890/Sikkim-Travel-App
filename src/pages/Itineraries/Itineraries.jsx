import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Itineraries.css';
import SearchBar from '../../components/ui/SearchBar/SearchBar';
import Loader from '../../components/common/Loader/Loader';

const sampleItineraries = [
  {
    id: 1,
    title: 'Classic Gangtok Cultural Escape',
    days: 3,
    budget: 'mid',
    rating: 4.6,
    reviews: 128,
    cover: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1200',
    season: ['Mar-Jun', 'Sep-Nov'],
    difficulty: 'Easy',
    locations: ['Gangtok', 'Tsomgo Lake', 'Baba Mandir'],
    highlights: ['MG Marg Shopping', 'Tsomgo Lake', 'Ropeway Cable Car', 'Enchey Monastery'],
    description: 'Perfect introduction to Sikkim with cultural immersion and scenic beauty.',
    includes: ['Accommodation', 'Breakfast', 'Transport', 'Guide'],
    price: 12500,
    customizationOptions: {
      accommodation: ['3 Star', '4 Star', 'Heritage'],
      transport: ['Shared', 'Private'],
      activities: ['Yak Ride', 'Cultural Show', 'Spa Treatment']
    }
  },
  {
    id: 2,
    title: 'North Sikkim Alpine Adventure',
    days: 5,
    budget: 'premium',
    rating: 4.8,
    reviews: 95,
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200',
    season: ['Apr-Nov'],
    difficulty: 'Moderate',
    locations: ['Lachen', 'Gurudongmar Lake', 'Lachung', 'Yumthang Valley', 'Zero Point'],
    highlights: ['Gurudongmar Lake', 'Yumthang Valley', 'Hot Springs', 'Snow Points'],
    description: 'High-altitude adventure exploring the frozen wonders of North Sikkim.',
    includes: ['Premium Stay', 'All Meals', '4WD Transport', 'Oxygen', 'Permits'],
    price: 28900,
    customizationOptions: {
      accommodation: ['Premium Homestay', '3 Star', '4 Star'],
      transport: ['Bolero', 'Innova', 'Tempo Traveller'],
      activities: ['Photography Tour', 'Trekking', 'Cultural Dinner']
    }
  },
  {
    id: 3,
    title: 'West Sikkim Heritage Trail',
    days: 4,
    budget: 'budget',
    rating: 4.4,
    reviews: 76,
    cover: 'https://images.unsplash.com/photo-1503372712204-094d3f99e7a6?w=1200',
    season: ['Year Round'],
    difficulty: 'Easy',
    locations: ['Pelling', 'Yuksom', 'Rimbi', 'Khecheopalri Lake'],
    highlights: ['Pemayangtse Monastery', 'Khecheopalri Lake', 'Rabdentse Ruins', 'Sky Walk'],
    description: 'Spiritual journey through ancient monasteries and sacred lakes.',
    includes: ['Basic Stay', 'Breakfast', 'Transport', 'Entry Fees'],
    price: 8900,
    customizationOptions: {
      accommodation: ['Homestay', '2 Star', '3 Star'],
      transport: ['Shared', 'Private'],
      activities: ['Monastery Meditation', 'Local Cooking Class']
    }
  },
  {
    id: 4,
    title: 'Sikkim Complete Circuit',
    days: 7,
    budget: 'premium',
    rating: 4.9,
    reviews: 64,
    cover: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
    season: ['Oct-May'],
    difficulty: 'Moderate',
    locations: ['Gangtok', 'North Sikkim', 'Pelling', 'Ravangla'],
    highlights: ['Complete Sikkim', 'Multiple Valleys', 'All Major Attractions'],
    description: 'Comprehensive tour covering all regions of Sikkim in one epic journey.',
    includes: ['Luxury Stay', 'All Meals', 'Private Transport', 'Expert Guide'],
    price: 45200,
    customizationOptions: {
      accommodation: ['4 Star', '5 Star', 'Luxury Resort'],
      transport: ['Innova', 'SUV', 'Luxury Coach'],
      activities: ['Helicopter Ride', 'Private Photography', 'Spa Package']
    }
  }
];

const difficultyColors = {
  'Easy': '#10b981',
  'Moderate': '#f59e0b',
  'Difficult': '#ef4444'
};

const budgetColors = {
  'budget': '#10b981',
  'mid': '#f59e0b',
  'premium': '#ef4444'
};

const Itineraries = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ 
    days: 'all', 
    budget: 'all', 
    minRating: 0,
    difficulty: 'all',
    season: 'all'
  });
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [customization, setCustomization] = useState({});
  const [activeTab, setActiveTab] = useState('browse');

  const seasons = ['All', 'Mar-Jun', 'Sep-Nov', 'Apr-Nov', 'Year Round', 'Oct-May'];

  const filtered = useMemo(() => {
    let list = [...sampleItineraries];
    
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(i => 
        i.title.toLowerCase().includes(q) || 
        i.locations.join(' ').toLowerCase().includes(q) ||
        i.highlights.join(' ').toLowerCase().includes(q)
      );
    }
    
    if (filters.days !== 'all') {
      const d = parseInt(filters.days, 10);
      list = list.filter(i => i.days <= d);
    }
    
    if (filters.budget !== 'all') {
      list = list.filter(i => i.budget === filters.budget);
    }
    
    if (filters.difficulty !== 'all') {
      list = list.filter(i => i.difficulty === filters.difficulty);
    }
    
    if (filters.season !== 'all') {
      list = list.filter(i => i.season.includes(filters.season));
    }
    
    if (filters.minRating > 0) {
      list = list.filter(i => i.rating >= filters.minRating);
    }
    
    return list;
  }, [query, filters]);

  const handleCustomize = (itinerary) => {
    setSelectedItinerary(itinerary);
    setCustomization({
      accommodation: itinerary.customizationOptions.accommodation[0],
      transport: itinerary.customizationOptions.transport[0],
      activities: []
    });
    setActiveTab('customize');
  };

  const calculateCustomPrice = () => {
    if (!selectedItinerary) return 0;
    
    let basePrice = selectedItinerary.price;
    let multiplier = 1;
    
    // Accommodation upgrades
    if (customization.accommodation === '4 Star') multiplier *= 1.3;
    if (customization.accommodation === '5 Star') multiplier *= 1.6;
    if (customization.accommodation === 'Luxury Resort') multiplier *= 2;
    
    // Transport upgrades
    if (customization.transport === 'Private') multiplier *= 1.2;
    if (customization.transport === 'SUV') multiplier *= 1.5;
    
    // Activities
    if (customization.activities.includes('Helicopter Ride')) basePrice += 15000;
    if (customization.activities.includes('Spa Package')) basePrice += 5000;
    
    return Math.round(basePrice * multiplier);
  };

  const CustomizationPanel = () => (
    <div className="customization-panel">
      <div className="panel-header">
        <h2>Customize {selectedItinerary?.title}</h2>
        <button onClick={() => setActiveTab('browse')} className="back-btn">← Back to Browse</button>
      </div>
      
      <div className="customization-options">
        <div className="option-group">
          <h3>Accommodation Type</h3>
          <div className="option-buttons">
            {selectedItinerary?.customizationOptions.accommodation.map(opt => (
              <button
                key={opt}
                className={`option-btn ${customization.accommodation === opt ? 'active' : ''}`}
                onClick={() => setCustomization(c => ({ ...c, accommodation: opt }))}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="option-group">
          <h3>Transport Mode</h3>
          <div className="option-buttons">
            {selectedItinerary?.customizationOptions.transport.map(opt => (
              <button
                key={opt}
                className={`option-btn ${customization.transport === opt ? 'active' : ''}`}
                onClick={() => setCustomization(c => ({ ...c, transport: opt }))}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="option-group">
          <h3>Additional Activities</h3>
          <div className="option-checkboxes">
            {selectedItinerary?.customizationOptions.activities.map(opt => (
              <label key={opt} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={customization.activities.includes(opt)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCustomization(c => ({ 
                        ...c, 
                        activities: [...c.activities, opt] 
                      }));
                    } else {
                      setCustomization(c => ({ 
                        ...c, 
                        activities: c.activities.filter(a => a !== opt) 
                      }));
                    }
                  }}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="price-summary">
        <h3>Price Summary</h3>
        <div className="price-breakdown">
          <div className="price-item">
            <span>Base Price:</span>
            <span>₹{selectedItinerary?.price.toLocaleString()}</span>
          </div>
          <div className="price-item">
            <span>Customizations:</span>
            <span>+₹{(calculateCustomPrice() - selectedItinerary.price).toLocaleString()}</span>
          </div>
          <div className="price-total">
            <span>Total:</span>
            <span>₹{calculateCustomPrice().toLocaleString()}</span>
          </div>
        </div>
        <button className="book-now-btn" onClick={() => navigate('/booking', { state: { itinerary: selectedItinerary, customization } })}>
          Book Customized Package
        </button>
      </div>
    </div>
  );

  return (
    <div className="itineraries-page">
      <div className="itineraries-hero">
        <div className="hero-content">
          <h1>Curated Sikkim Experiences</h1>
          <p>Handcrafted itineraries for the perfect Himalayan adventure</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="number">50+</span>
              <span className="label">Destinations</span>
            </div>
            <div className="stat">
              <span className="number">4.8</span>
              <span className="label">Avg Rating</span>
            </div>
            <div className="stat">
              <span className="number">500+</span>
              <span className="label">Happy Travelers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="itineraries-container">
        <div className="view-tabs">
          <button 
            className={`tab ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse Itineraries
          </button>
          <button 
            className={`tab ${activeTab === 'customize' ? 'active' : ''}`}
            onClick={() => setActiveTab('customize')}
            disabled={!selectedItinerary}
          >
            Customize Package
          </button>
        </div>

        {activeTab === 'browse' ? (
          <>
            <div className="toolbar">
              <SearchBar 
                onSearch={(payload) => setQuery(typeof payload === 'string' ? payload : payload?.query || '')} 
                placeholder="Search itineraries, destinations, activities..." 
              />
              
              <div className="filters-grid">
                <div className="filter-group">
                  <label>Duration</label>
                  <select value={filters.days} onChange={(e) => setFilters(f => ({ ...f, days: e.target.value }))}>
                    <option value="all">Any Duration</option>
                    <option value="3">Up to 3 days</option>
                    <option value="5">Up to 5 days</option>
                    <option value="7">Up to 7 days</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Budget Range</label>
                  <select value={filters.budget} onChange={(e) => setFilters(f => ({ ...f, budget: e.target.value }))}>
                    <option value="all">All Budgets</option>
                    <option value="budget">Budget (Under ₹10k)</option>
                    <option value="mid">Mid-range (₹10k-25k)</option>
                    <option value="premium">Premium (₹25k+)</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Difficulty</label>
                  <select value={filters.difficulty} onChange={(e) => setFilters(f => ({ ...f, difficulty: e.target.value }))}>
                    <option value="all">Any Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Difficult">Difficult</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Best Season</label>
                  <select value={filters.season} onChange={(e) => setFilters(f => ({ ...f, season: e.target.value }))}>
                    <option value="all">All Seasons</option>
                    {seasons.filter(s => s !== 'All').map(season => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Minimum Rating</label>
                  <div className="rating-select">
                    {[0, 4, 4.5, 4.8].map(r => (
                      <button 
                        key={r} 
                        className={`rating-chip ${filters.minRating === r ? 'active' : ''}`} 
                        onClick={() => setFilters(f => ({ ...f, minRating: r }))}
                      >
                        {r === 0 ? 'Any' : `${r}+ ⭐`}
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
                    <div className="card-badges">
                      <span className="badge days">{it.days} Days</span>
                      <span className="badge difficulty" style={{backgroundColor: difficultyColors[it.difficulty]}}>
                        {it.difficulty}
                      </span>
                      <span className="badge season">{it.season[0]}</span>
                    </div>
                    <div className="card-overlay">
                      <div className="rating">
                        ⭐ {it.rating} <span>({it.reviews})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <div className="card-header">
                      <h3>{it.title}</h3>
                      <span className="price">₹{it.price.toLocaleString()}</span>
                    </div>
                    
                    <p className="desc">{it.description}</p>
                    
                    <div className="meta-info">
                      <div className="meta-item">
                        <span className="label">Budget:</span>
                        <span className="value" style={{color: budgetColors[it.budget]}}>
                          {it.budget.toUpperCase()}
                        </span>
                      </div>
                      <div className="meta-item">
                        <span className="label">Best Time:</span>
                        <span className="value">{it.season.join(', ')}</span>
                      </div>
                    </div>

                    <div className="locations">
                      <strong>Covers:</strong> {it.locations.join(' → ')}
                    </div>

                    <div className="highlights">
                      {it.highlights.slice(0, 4).map((h, i) => (
                        <span key={i} className="highlight-chip">✨ {h}</span>
                      ))}
                    </div>

                    <div className="includes">
                      <strong>Includes:</strong> {it.includes.join(' • ')}
                    </div>

                    <div className="card-actions">
                      <button className="btn-secondary" onClick={() => navigate(`/itinerary/${it.id}`)}>
                        View Details
                      </button>
                      <button className="btn-primary" onClick={() => handleCustomize(it)}>
                        Customize & Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filtered.length === 0 && (
                <div className="no-results">
                  <div className="no-results-icon">🏔️</div>
                  <h3>No itineraries found</h3>
                  <p>Try adjusting your search criteria or browse all packages</p>
                  <button onClick={() => setFilters({ days: 'all', budget: 'all', minRating: 0, difficulty: 'all', season: 'all' })}>
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <CustomizationPanel />
        )}
      </div>
    </div>
  );
};

export default Itineraries;
