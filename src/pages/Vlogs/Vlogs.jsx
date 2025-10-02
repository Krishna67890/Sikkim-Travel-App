// src/pages/Vlogs/Vlogs.jsx
import React, { useState } from 'react';
import VideoCard from '../../components/cards/VideoCard/VideoCard';
import SearchBar from '../../components/ui/SearchBar/SearchBar';
import FilterPanel from '../../components/ui/FilterPanel/FilterPanel';
import './Vlogs.css';

const Vlogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  // Mock data for vlogs
  const vlogsData = [
    {
      id: 1,
      title: 'Gangtok - The Capital of Clouds',
      description: 'Join me as I explore the beautiful capital city of Sikkim, with its stunning monasteries, bustling markets, and incredible views of the Himalayas.',
      duration: '15:42',
      views: '125K',
      uploadDate: '2 weeks ago',
      category: 'city',
      thumbnail: '/images/vlogs/gangtok-vlog.jpg',
      videoUrl: 'https://www.youtube.com/embed/sample1',
      creator: 'Travel With Ankit',
      creatorAvatar: '/images/creators/ankit.jpg',
    },
    {
      id: 2,
      title: 'Nathula Pass - Journey to the Indo-China Border',
      description: 'An incredible journey to one of the highest motorable roads in the world, with breathtaking views and an unforgettable experience.',
      duration: '22:18',
      views: '98K',
      uploadDate: '1 month ago',
      category: 'adventure',
      thumbnail: '/images/vlogs/nathula-pass.jpg',
      videoUrl: 'https://www.youtube.com/embed/sample2',
      creator: 'Mountain Trekkers',
      creatorAvatar: '/images/creators/mountain-trekkers.jpg',
    },
    {
      id: 3,
      title: 'Pelling - Sunrise at Kanchenjunga',
      description: 'Witnessing the first rays of sun hitting the world\'s third highest mountain is an experience that will stay with me forever.',
      duration: '12:05',
      views: '156K',
      uploadDate: '3 weeks ago',
      category: 'nature',
      thumbnail: '/images/vlogs/pelling-sunrise.jpg',
      videoUrl: 'https://www.youtube.com/embed/sample3',
      creator: 'Explore With Priya',
      creatorAvatar: '/images/creators/priya.jpg',
    },
    {
      id: 4,
      title: 'Rumtek Monastery - Spiritual Journey',
      description: 'Exploring one of the most important monasteries in Sikkim, learning about Buddhist culture and experiencing the peaceful atmosphere.',
      duration: '18:32',
      views: '87K',
      uploadDate: '2 months ago',
      category: 'culture',
      thumbnail: '/images/vlogs/rumtek-monastery.jpg',
      videoUrl: 'https://www.youtube.com/embed/sample4',
      creator: 'Spiritual Journeys',
      creatorAvatar: '/images/creators/spiritual-journeys.jpg',
    },
    {
      id: 5,
      title: 'Sikkim Food Tour - Momos, Thukpa and More',
      description: 'Join me on a culinary adventure through the streets of Sikkim, trying local delicacies and authentic Himalayan cuisine.',
      duration: '24:15',
      views: '210K',
      uploadDate: '5 days ago',
      category: 'food',
      thumbnail: '/images/vlogs/sikkim-food.jpg',
      videoUrl: 'https://www.youtube.com/embed/sample5',
      creator: 'Foodie Traveller',
      creatorAvatar: '/images/creators/foodie-traveller.jpg',
    },
    {
      id: 6,
      title: 'Yumthang Valley - Valley of Flowers',
      description: 'A breathtaking journey to the valley of flowers, with stunning landscapes, hot springs, and vibrant rhododendron forests.',
      duration: '20:47',
      views: '143K',
      uploadDate: '1 week ago',
      category: 'nature',
      thumbnail: '/images/vlogs/yumthang-valley.jpg',
      videoUrl: 'https://www.youtube.com/embed/sample6',
      creator: 'Nature Diaries',
      creatorAvatar: '/images/creators/nature-diaries.jpg',
    },
    {
      id: 7,
      title: 'Adventure Sports in Sikkim - Paragliding & River Rafting',
      description: 'Getting my adrenaline fix with paragliding over lush valleys and white water rafting in the Teesta River.',
      duration: '16:23',
      views: '112K',
      uploadDate: '3 months ago',
      category: 'adventure',
      thumbnail: '/images/vlogs/adventure-sports.jpg',
      videoUrl: 'https://www.youtube.com/embed/sample7',
      creator: 'Adventure Seekers',
      creatorAvatar: '/images/creators/adventure-seekers.jpg',
    },
    {
      id: 8,
      title: 'Lachung - A Village in the Clouds',
      description: 'Experiencing rural life in the beautiful village of Lachung, interacting with locals, and staying in a traditional homestay.',
      duration: '19:54',
      views: '95K',
      uploadDate: '2 weeks ago',
      category: 'culture',
      thumbnail: '/images/vlogs/lachung-village.jpg',
      videoUrl: 'https://www.youtube.com/embed/sample8',
      creator: 'Village Experiences',
      creatorAvatar: '/images/creators/village-experiences.jpg',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'nature', label: 'Nature' },
    { id: 'culture', label: 'Culture' },
    { id: 'food', label: 'Food' },
    { id: 'city', label: 'City Life' },
  ];

  const durations = [
    { id: 'all', label: 'Any Duration' },
    { id: 'short', label: 'Short (<10 min)' },
    { id: 'medium', label: 'Medium (10-20 min)' },
    { id: 'long', label: 'Long (>20 min)' },
  ];

  const filterVlogs = (vlog) => {
    // Filter by search query
    const matchesSearch = 
      searchQuery === '' ||
      vlog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vlog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vlog.creator.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = 
      selectedCategory === 'all' || 
      vlog.category === selectedCategory;
    
    // Filter by duration
    let matchesDuration = true;
    if (selectedDuration === 'short') {
      const mins = parseInt(vlog.duration.split(':')[0]);
      matchesDuration = mins < 10;
    } else if (selectedDuration === 'medium') {
      const mins = parseInt(vlog.duration.split(':')[0]);
      matchesDuration = mins >= 10 && mins <= 20;
    } else if (selectedDuration === 'long') {
      const mins = parseInt(vlog.duration.split(':')[0]);
      matchesDuration = mins > 20;
    }
    
    return matchesSearch && matchesCategory && matchesDuration;
  };

  const filteredVlogs = vlogsData.filter(filterVlogs);

  return (
    <div className="vlogs-page">
      <div className="vlogs-hero">
        <div className="vlogs-hero-content">
          <h1>Sikkim Travel Vlogs</h1>
          <p>Experience the beauty of Sikkim through these amazing travel videos</p>
        </div>
      </div>

      <div className="vlogs-container">
        <div className="vlogs-content">
          <div className="vlogs-intro">
            <h2>Discover Sikkim Through Videos</h2>
            <p>
              Watch these handpicked travel vlogs to get a glimpse of what awaits you in Sikkim. 
              From adventure to culture, food to nature - find inspiration for your own journey.
            </p>
          </div>

          <div className="vlogs-filters">
            <SearchBar 
              placeholder="Search vlogs, creators..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <div className="filter-row">
              <FilterPanel
                title="Category"
                options={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                type="pill"
              />
              
              <FilterPanel
                title="Duration"
                options={durations}
                selected={selectedDuration}
                onSelect={setSelectedDuration}
                type="pill"
              />
            </div>
          </div>

          <div className="vlogs-grid-section">
            <h3>Featured Vlogs <span>({filteredVlogs.length})</span></h3>
            
            {filteredVlogs.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">📹</div>
                <p>No vlogs match your filters. Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="vlogs-grid">
                {filteredVlogs.map(vlog => (
                  <VideoCard key={vlog.id} vlog={vlog} />
                ))}
              </div>
            )}
          </div>

          <div className="featured-creators">
            <h3>Popular Creators</h3>
            <div className="creators-grid">
              <div className="creator-card">
                <div className="creator-avatar">
                  <img src="/images/creators/ankit.jpg" alt="Travel With Ankit" />
                </div>
                <h4>Travel With Ankit</h4>
                <p>Adventure & Nature</p>
                <span className="vlogs-count">24 vlogs</span>
              </div>
              
              <div className="creator-card">
                <div className="creator-avatar">
                  <img src="/images/creators/priya.jpg" alt="Explore With Priya" />
                </div>
                <h4>Explore With Priya</h4>
                <p>Culture & Food</p>
                <span className="vlogs-count">18 vlogs</span>
              </div>
              
              <div className="creator-card">
                <div className="creator-avatar">
                  <img src="/images/creators/adventure-seekers.jpg" alt="Adventure Seekers" />
                </div>
                <h4>Adventure Seekers</h4>
                <p>Extreme Sports</p>
                <span className="vlogs-count">15 vlogs</span>
              </div>
              
              <div className="creator-card">
                <div className="creator-avatar">
                  <img src="/images/creators/foodie-traveller.jpg" alt="Foodie Traveller" />
                </div>
                <h4>Foodie Traveller</h4>
                <p>Local Cuisine</p>
                <span className="vlogs-count">22 vlogs</span>
              </div>
            </div>
          </div>

          <div className="vlogs-cta">
            <div className="cta-content">
              <h3>Share Your Sikkim Experience</h3>
              <p>Have you visited Sikkim? Share your travel vlogs with our community and inspire other travelers!</p>
              <button className="cta-button">Submit Your Vlog</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vlogs;
