import React, { useState } from 'react';

const Amenities = ({ selectedAmenities = [], onAmenitiesChange, maxSelectable }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Common amenities list
 const amenities = [
  { id: "wifi", name: "Free WiFi", icon: "📶" },
  { id: "pool", name: "Swimming Pool", icon: "🏊" },
  { id: "spa", name: "Spa", icon: "💆" },
  { id: "restaurant", name: "Restaurant", icon: "🍽️" },
  { id: "bar", name: "Bar", icon: "🍹" },
  { id: "gym", name: "Gym", icon: "💪" },
  { id: "parking", name: "Free Parking", icon: "🅿️" },
  { id: "heating", name: "Heating", icon: "🔥" },
  { id: "ac", name: "Air Conditioning", icon: "❄️" },
  { id: "breakfast", name: "Breakfast Included", icon: "🍳" },
  { id: "meals", name: "All Meals", icon: "🍲" },
  { id: "garden", name: "Garden", icon: "🌳" },
  { id: "view", name: "Mountain View", icon: "🏔️" },
  { id: "cultural", name: "Cultural Activities", icon: "🎭" },
  { id: "yoga", name: "Yoga Classes", icon: "🧘" },
];

  // Filter amenities based on search term
  const filteredAmenities = allAmenities.filter(amenity =>
    amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle amenity selection
  const handleAmenityToggle = (amenityId) => {
    if (selectedAmenities.includes(amenityId)) {
      // Remove amenity if already selected
      onAmenitiesChange(selectedAmenities.filter(id => id !== amenityId));
    } else {
      // Check if maximum selectable limit reached
      if (maxSelectable && selectedAmenities.length >= maxSelectable) {
        alert(`Maximum ${maxSelectable} amenities can be selected`);
        return;
      }
      // Add amenity if not selected
      onAmenitiesChange([...selectedAmenities, amenityId]);
    }
  };

  return (
    <div className="amenities-selector">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search amenities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="selected-count">
        {selectedAmenities.length} {maxSelectable ? `of ${maxSelectable}` : ''} selected
      </div>
      
      <div className="amenities-grid">
        {filteredAmenities.map(amenity => (
          <div
            key={amenity.id}
            className={`amenity-item ${selectedAmenities.includes(amenity.id) ? 'selected' : ''}`}
            onClick={() => handleAmenityToggle(amenity.id)}
          >
            <span className="amenity-icon">{amenity.icon}</span>
            <span className="amenity-name">{amenity.name}</span>
          </div>
        ))}
      </div>
      
      {filteredAmenities.length === 0 && (
        <div className="no-results">No amenities found matching "{searchTerm}"</div>
      )}
    </div>
  );
};

export default Amenities;