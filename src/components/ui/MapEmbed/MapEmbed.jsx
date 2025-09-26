import React, { useState, useRef, useEffect } from 'react';
import './MapEmbed.css';

const MapEmbed = () => {
  const [selectedLocation, setSelectedLocation] = useState('gangtok');
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const [currentZoom, setCurrentZoom] = useState(10);
  const mapRef = useRef(null);

  const sikkimLocations = {
    gangtok: {
      name: 'Gangtok',
      coords: '27.3389° N, 88.6065° E',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56808.13983512629!2d88.594635!3d27.338936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a56a5800e0c7%3A0xbb2f5ef6c1e73db8!2sGangtok%2C%20Sikkim!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      description: 'Capital city of Sikkim, known for its monasteries and stunning views of Kanchenjunga'
    },
    pelling: {
      name: 'Pelling',
      coords: '27.3219° N, 88.2386° E',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56838.13983512629!2d88.2386!3d27.3219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a1a1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sPelling%2C%20Sikkim!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      description: 'Famous for breathtaking views of Kanchenjunga and ancient monasteries'
    },
    tsomgo: {
      name: 'Tsomgo Lake',
      coords: '27.3750° N, 88.7630° E',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56818.13983512629!2d88.7630!3d27.3750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a1a1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sTsomgo%20Lake%2C%20Sikkim!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      description: 'Sacred glacial lake at 12,400 feet, surrounded by mountains'
    },
    nathula: {
      name: 'Nathula Pass',
      coords: '27.3910° N, 88.7650° E',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56828.13983512629!2d88.7650!3d27.3910!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a1a1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sNathula%20Pass%2C%20Sikkim!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      description: 'Historic mountain pass on the Indo-China border at 14,140 feet'
    },
    yumthang: {
      name: 'Yumthang Valley',
      coords: '27.5833° N, 88.6333° E',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56848.13983512629!2d88.6333!3d27.5833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a1a1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sYumthang%20Valley%2C%20Sikkim!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      description: 'Valley of Flowers with hot springs and rhododendron forests'
    }
  };

  const handleLocationChange = (locationKey) => {
    setSelectedLocation(locationKey);
    setCurrentZoom(10); // Reset zoom on location change
  };

  const toggleView = () => {
    setIsSatelliteView(!isSatelliteView);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const zoomIn = () => {
    setCurrentZoom(prev => Math.min(prev + 2, 20));
  };

  const zoomOut = () => {
    setCurrentZoom(prev => Math.max(prev - 2, 5));
  };

  const getMapUrl = () => {
    const baseUrl = sikkimLocations[selectedLocation].embedUrl;
    const params = new URLSearchParams();
    
    if (isSatelliteView) {
      params.set('maptype', 'satellite');
    }
    params.set('zoom', currentZoom.toString());
    
    if (showMarkers) {
      params.set('markers', `color:red|${sikkimLocations[selectedLocation].coords}`);
    }

    return `${baseUrl.split('?')[0]}?${params.toString()}`;
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className={`map-container ${isFullscreen ? 'map-container--fullscreen' : ''}`}>
      <div className="map-header">
        <h3>Explore Sikkim</h3>
        <div className="map-controls">
          <button 
            className="map-control-btn"
            onClick={toggleView}
            title={isSatelliteView ? 'Switch to Map View' : 'Switch to Satellite View'}
          >
            {isSatelliteView ? '🗺️ Map' : '🛰️ Satellite'}
          </button>
          <button 
            className="map-control-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? '📱 Exit' : '🖥️ Fullscreen'}
          </button>
          <button 
            className="map-control-btn"
            onClick={() => setShowMarkers(!showMarkers)}
            title={showMarkers ? 'Hide Markers' : 'Show Markers'}
          >
            {showMarkers ? '📍 Hide' : '📍 Show'}
          </button>
          <div className="zoom-controls">
            <button onClick={zoomIn} title="Zoom In" className="zoom-btn">+</button>
            <span className="zoom-level">{currentZoom}x</span>
            <button onClick={zoomOut} title="Zoom Out" className="zoom-btn">-</button>
          </div>
        </div>
      </div>

      <div className="map-content" ref={mapRef}>
        <div className="map-sidebar">
          <h4>Popular Destinations</h4>
          <div className="location-list">
            {Object.entries(sikkimLocations).map(([key, location]) => (
              <button
                key={key}
                className={`location-btn ${selectedLocation === key ? 'location-btn--active' : ''}`}
                onClick={() => handleLocationChange(key)}
              >
                <span className="location-name">{location.name}</span>
                <span className="location-coords">{location.coords}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="map-embed">
          <iframe
            src={getMapUrl()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-iframe"
            title="Sikkim Interactive Map"
            allowFullScreen
          />
          <div className="map-overlay-info">
            <div className="location-info">
              <h4>{sikkimLocations[selectedLocation].name}</h4>
              <p>{sikkimLocations[selectedLocation].description}</p>
              <span className="coordinates">{sikkimLocations[selectedLocation].coords}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="map-footer">
        <div className="map-stats">
          <span>📍 {sikkimLocations[selectedLocation].name}</span>
          <span>🔍 {currentZoom}x</span>
          <span>{isSatelliteView ? '🛰️ Satellite' : '🗺️ Map'}</span>
        </div>
        <div className="map-actions">
          <button className="action-btn" onClick={() => window.print()}>
            🖨️ Print
          </button>
          <button 
            className="action-btn"
            onClick={() => {
              const url = `https://www.google.com/maps?q=${sikkimLocations[selectedLocation].name},Sikkim`;
              window.open(url, '_blank');
            }}
          >
            🔗 Open in Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapEmbed;