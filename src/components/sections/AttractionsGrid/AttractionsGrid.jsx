// src/components/sections/AttractionsGrid/AttractionsGrid.jsx
import React, { useState, useEffect } from 'react';
import './AttractionsGrid.css';

// Mock data - in a real app, this would come from an API or data file
const mockAttractions = [
  {
    id: 1,
    name: 'Tsomgo Lake',
    image: 'https://images.unsplash.com/photo-1580135390424-701bd6cce890?w=400&h=300&fit=crop',
    description: 'A glacial lake at 12,400 ft surrounded by mountains',
    district: 'East Sikkim'
  },
  {
    id: 2,
    name: 'Nathula Pass',
    image: 'https://images.unsplash.com/photo-1580135390424-701bd6cce890?w=400&h=300&fit=crop',
    description: 'Historic mountain pass on the Indo-China border',
    district: 'East Sikkim'
  },
  {
    id: 3,
    name: 'Pelling',
    image: 'https://images.unsplash.com/photo-1580135390424-701bd6cce890?w=400&h=300&fit=crop',
    description: 'Picturesque town with stunning views of Kanchenjunga',
    district: 'West Sikkim'
  },
  {
    id: 4,
    name: 'Yumthang Valley',
    image: 'https://images.unsplash.com/photo-1580135390424-701bd6cce890?w=400&h=300&fit=crop',
    description: 'Valley of Flowers with hot springs and rhododendrons',
    district: 'North Sikkim'
  },
  {
    id: 5,
    name: 'Rumtek Monastery',
    image: 'https://images.unsplash.com/photo-1580135390424-701bd6cce890?w=400&h=300&fit=crop',
    description: 'One of the largest and most important monasteries',
    district: 'East Sikkim'
  },
  {
    id: 6,
    name: 'Ravangla',
    image: 'https://images.unsplash.com/photo-1580135390424-701bd6cce890?w=400&h=300&fit=crop',
    description: 'Scenic town with Buddha Park and panoramic views',
    district: 'South Sikkim'
  }
];

const AttractionsGrid = () => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAttractions(mockAttractions);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <section className="attractions">
        <div className="container">
          <h2>Top Attractions in Sikkim</h2>
          <div className="loading">Loading attractions...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="attractions">
      <div className="container">
        <h2>Top Attractions in Sikkim</h2>
        <div className="attractions-grid">
          {attractions.map(attraction => (
            <div key={attraction.id} className="attraction-card">
              <div className="card-image">
                <img 
                  src={attraction.image} 
                  alt={attraction.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
                <div className="district-badge">{attraction.district}</div>
              </div>
              <div className="card-content">
                <h3>{attraction.name}</h3>
                <p>{attraction.description}</p>
                <button className="card-btn">Explore</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AttractionsGrid;