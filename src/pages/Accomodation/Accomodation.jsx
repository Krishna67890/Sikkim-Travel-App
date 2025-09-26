import React, { useState } from 'react';
import './Accomodation.css'; 

const Accomodation = () => {
  const [activeTab, setActiveTab] = useState('hotels');

  // Sample accommodation data
  const accommodations = {
    hotels: [
      {
        id: 1,
        name: "Mayfair Spa Resort",
        location: "Gangtok",
        price: 8500,
        rating: 4.8,
        amenities: ["Free WiFi", "Spa", "Swimming Pool", "Restaurant"],
        description: "Luxury resort with spa facilities and mountain views"
      },
      {
        id: 2,
        name: "Elgin Mount Pandim",
        location: "Pelling",
        price: 5500,
        rating: 4.6,
        amenities: ["Free WiFi", "Restaurant", "Garden", "Parking"],
        description: "Heritage hotel with stunning views of Mount Pandim"
      },
      {
        id: 3,
        name: "Summit Golden Crescent",
        location: "Gangtok",
        price: 4200,
        rating: 4.4,
        amenities: ["Free WiFi", "Restaurant", "Bar", "Parking"],
        description: "Modern hotel with panoramic views of Gangtok"
      }
    ],
    homestays: [
      {
        id: 1,
        name: "Traditional Lepcha Homestay",
        location: "Ravangla",
        price: 1500,
        rating: 4.7,
        amenities: ["Traditional Meals", "Cultural Experience", "Mountain View"],
        description: "Authentic local experience with traditional Lepcha family"
      },
      {
        id: 2,
        name: "Bhutia Family Homestay",
        location: "Lachung",
        price: 1800,
        rating: 4.5,
        amenities: ["Home-cooked Meals", "Cultural Activities", "Heating"],
        description: "Warm hospitality in the beautiful Lachung valley"
      }
    ],
    resorts: [
      {
        id: 1,
        name: "Chumbi Mountain Retreat",
        location: "Ravangla",
        price: 6800,
        rating: 4.7,
        amenities: ["Spa", "Yoga", "Restaurant", "Mountain View"],
        description: "Peaceful retreat with mountain and valley views"
      },
      {
        id: 2,
        name: "Yumthang Valley Resort",
        location: "Yumthang",
        price: 4800,
        rating: 4.3,
        amenities: ["Free WiFi", "Restaurant", "Heating", "Garden"],
        description: "Beautiful resort in the valley of flowers"
      }
    ]
  };

  const handleBookNow = (accommodation) => {
    alert(`Booking ${accommodation.name} for your Sikkim adventure!\nPrice: ₹${accommodation.price}/night`);
  };

  return (
    <div className="accommodation-page">
      <div className="container">
        {/* Header Section */}
        <div className="accommodation-header">
          <h1>🏨 Accommodation in Sikkim</h1>
          <p>Find your perfect stay amidst the Himalayas</p>
        </div>

        {/* Tab Navigation */}
        <div className="accommodation-tabs">
          <button 
            className={activeTab === 'hotels' ? 'active' : ''}
            onClick={() => setActiveTab('hotels')}
          >
            🏨 Hotels
          </button>
          <button 
            className={activeTab === 'homestays' ? 'active' : ''}
            onClick={() => setActiveTab('homestays')}
          >
            🏡 Homestays
          </button>
          <button 
            className={activeTab === 'resorts' ? 'active' : ''}
            onClick={() => setActiveTab('resorts')}
          >
            🌄 Resorts
          </button>
        </div>

        {/* Main Content */}
        <div className="accommodation-content">
          {/* Accommodation List */}
          <div className="accommodation-list">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} in Sikkim</h2>
            <div className="accommodation-grid">
              {accommodations[activeTab].map((item) => (
                <div key={item.id} className="accommodation-card">
                  <div className="card-header">
                    <h3>{item.name}</h3>
                    <span className="rating">⭐ {item.rating}</span>
                  </div>
                  <div className="card-body">
                    <p className="location">📍 {item.location}</p>
                    <p className="description">{item.description}</p>
                    <div className="amenities">
                      <h4>Amenities:</h4>
                      <div className="amenities-list">
                        {item.amenities.map((amenity, index) => (
                          <span key={index} className="amenity-tag">{amenity}</span>
                        ))}
                      </div>
                    </div>
                    <div className="price-section">
                      <span className="price">₹{item.price} / night</span>
                      <button 
                        className="book-btn"
                        onClick={() => handleBookNow(item)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar with Filters */}
          <div className="accommodation-sidebar">
            <div className="filter-section">
              <h3>🔍 Filters</h3>
              
              <div className="filter-group">
                <label>Price Range (₹)</label>
                <div className="price-range">
                  <span>500</span>
                  <input 
                    type="range" 
                    min="500" 
                    max="15000" 
                    step="500" 
                    defaultValue="10000"
                  />
                  <span>15,000</span>
                </div>
              </div>

              <div className="filter-group">
                <label>Minimum Rating</label>
                <select>
                  <option>Any Rating</option>
                  <option>4+ Stars</option>
                  <option>3+ Stars</option>
                  <option>2+ Stars</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Location</label>
                <select>
                  <option>All Locations</option>
                  <option>Gangtok</option>
                  <option>Pelling</option>
                  <option>Ravangla</option>
                  <option>Lachung</option>
                  <option>Yumthang</option>
                </select>
              </div>

              <button className="apply-filters-btn">Apply Filters</button>
            </div>

            <div className="booking-tips">
              <h3>💡 Booking Tips</h3>
              <ul>
                <li>📅 Book 2-3 months in advance for peak season (Mar-Jun, Sep-Dec)</li>
                <li>💰 Prices increase during festivals and holidays</li>
                <li>🏔️ Mountain view rooms cost 20-30% more</li>
                <li>🚗 Check parking availability if traveling by car</li>
                <li>🌡️ Heating is essential in winter months</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="accommodation-info">
          <h2>Types of Accommodation in Sikkim</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>🏨 Hotels</h3>
              <p>Range from budget to luxury establishments with modern amenities. Most hotels in Gangtok offer stunning mountain views and easy access to local attractions.</p>
            </div>
            <div className="info-card">
              <h3>🏡 Homestays</h3>
              <p>Experience authentic Sikkimese culture by staying with local families. Includes traditional home-cooked meals and opportunities to participate in local activities.</p>
            </div>
            <div className="info-card">
              <h3>🌄 Resorts</h3>
              <p>Luxury accommodations often located in scenic areas with spa facilities, fine dining restaurants, and panoramic views of the Himalayas.</p>
            </div>
            <div className="info-card">
              <h3>⛺ Eco-Lodges</h3>
              <p>Environmentally friendly accommodations focused on sustainability and community engagement, often located in remote natural settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accomodation;