// MonasteriesList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MonasteryCard from '../../../components/cards/MonasteryCard/MonasteryCard';
import SearchBar from '../../../components/ui/SearchBar/SearchBar';
import Loader from '../../../components/common/Loader/Loader';
import { monasteriesData } from '../../../data/mockData/monasteriesData';
import { districts } from '../../../data/constants/districts';
import './MonasteriesList.css';

const MonasteriesList = () => {
  const [monasteries, setMonasteries] = useState([]);
  const [filteredMonasteries, setFilteredMonasteries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    district: 'all',
    bestTime: 'all',
    architecturalStyle: 'all',
    entryFee: 'all'
  });

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setMonasteries(monasteriesData);
      setFilteredMonasteries(monasteriesData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterMonasteries();
  }, [searchQuery, filters, monasteries]);

  const handleSearch = (payload) => {
    const value = typeof payload === 'string' ? payload : payload?.query || '';
    setSearchQuery(value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filterMonasteries = () => {
    let results = monasteries;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(monastery => 
        monastery.name.toLowerCase().includes(query) ||
        monastery.location.toLowerCase().includes(query) ||
        monastery.description.toLowerCase().includes(query)
      );
    }

    // Apply other filters
    if (filters.district !== 'all') {
      results = results.filter(monastery => monastery.district === filters.district);
    }

    if (filters.bestTime !== 'all') {
      results = results.filter(monastery => monastery.bestTime.includes(filters.bestTime));
    }

    if (filters.architecturalStyle !== 'all') {
      results = results.filter(monastery => monastery.architecturalStyle === filters.architecturalStyle);
    }

    if (filters.entryFee !== 'all') {
      if (filters.entryFee === 'free') {
        results = results.filter(monastery => monastery.entryFee === 0);
      } else if (filters.entryFee === 'paid') {
        results = results.filter(monastery => monastery.entryFee > 0);
      }
    }

    setFilteredMonasteries(results);
  };

  const clearFilters = () => {
    setFilters({
      district: 'all',
      bestTime: 'all',
      architecturalStyle: 'all',
      entryFee: 'all'
    });
    setSearchQuery('');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="monasteries-list-container">
      <div className="monasteries-hero">
        <div className="monasteries-hero-content">
          <h1>Sacred Monasteries of Sikkim</h1>
          <p>Discover the spiritual heart of the Himalayas through these ancient monasteries</p>
        </div>
      </div>

      <div className="monasteries-content">
        <div className="container">
          <div className="monasteries-header">
            <div className="monasteries-intro">
              <h2>Explore Buddhist Heritage</h2>
              <p>Sikkim is home to over 200 monasteries, each with its unique history, architecture, and spiritual significance. These sacred sites offer a glimpse into the rich Buddhist culture that thrives in the Himalayas.</p>
            </div>
            
            <div className="search-container">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Search monasteries by name, location..." 
              />
            </div>
          </div>

          <div className="monasteries-layout">
            <aside className="filters-sidebar">
              <div className="filters-card">
                <h3>Filter Monasteries</h3>
                <div className="filter-group">
                  <label>District</label>
                  <select
                    value={filters.district}
                    onChange={(e) => handleFilterChange('district', e.target.value)}
                  >
                    <option value="all">All Districts</option>
                    {districts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="filter-group">
                  <label>Best Time to Visit</label>
                  <select
                    value={filters.bestTime}
                    onChange={(e) => handleFilterChange('bestTime', e.target.value)}
                  >
                    <option value="all">Any Time</option>
                    <option value="spring">Spring (Mar-May)</option>
                    <option value="summer">Summer (Jun-Aug)</option>
                    <option value="autumn">Autumn (Sep-Nov)</option>
                    <option value="winter">Winter (Dec-Feb)</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Architectural Style</label>
                  <select
                    value={filters.architecturalStyle}
                    onChange={(e) => handleFilterChange('architecturalStyle', e.target.value)}
                  >
                    <option value="all">All Styles</option>
                    <option value="tibetan">Tibetan</option>
                    <option value="bhutia">Bhutia</option>
                    <option value="nepalese">Nepalese</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Entry Fee</label>
                  <select
                    value={filters.entryFee}
                    onChange={(e) => handleFilterChange('entryFee', e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="free">Free Entry</option>
                    <option value="paid">Paid Entry</option>
                  </select>
                </div>
                <button onClick={clearFilters} className="clear-filters-btn">Clear All Filters</button>
              </div>
            </aside>

            <main className="monasteries-main">
              <div className="results-header">
                <h3>
                  {filteredMonasteries.length} Monastery{filteredMonasteries.length !== 1 ? 's' : ''} Found
                  {filters.district !== 'all' && ` in ${filters.district}`}
                </h3>
                
                <div className="sort-options">
                  <label>Sort by:</label>
                  <select>
                    <option value="popularity">Popularity</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="altitude">Altitude (High to Low)</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              {filteredMonasteries.length > 0 ? (
                <div className="monasteries-grid">
                  {filteredMonasteries.map(monastery => (
                    <Link key={monastery.id} to={`/monasteries/${monastery.id}`} className="monastery-link" aria-label={`View details for ${monastery.name}`}>
                      <MonasteryCard 
                        monastery={monastery}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <div className="no-results-content">
                    <h3>No monasteries found</h3>
                    <p>Try adjusting your search or filters to find what you're looking for.</p>
                    <button onClick={clearFilters} className="clear-filters-btn">
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonasteriesList;