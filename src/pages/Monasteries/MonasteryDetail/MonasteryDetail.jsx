// MonasteryDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CostBadge from '../../../components/ui/CostBadge/CostBadge';
import MapEmbed from '../../../components/ui/MapEmbed/MapEmbed';
import Loader from '../../../components/common/Loader/Loader';
import { monasteriesData } from '../../../data/mockData/monasteriesData';
import './MonasteryDetail.css';

const MonasteryDetail = () => {
  const { id } = useParams();
  const [monastery, setMonastery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [relatedMonasteries, setRelatedMonasteries] = useState([]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundMonastery = monasteriesData.find(m => m.id === parseInt(id));
      setMonastery(foundMonastery);
      
      if (foundMonastery) {
        // Find related monasteries (same district or similar style)
        const related = monasteriesData
          .filter(m => m.id !== foundMonastery.id && 
            (m.district === foundMonastery.district || 
             m.architecturalStyle === foundMonastery.architecturalStyle))
          .slice(0, 3);
        setRelatedMonasteries(related);
      }
      
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!monastery) {
    return (
      <div className="monastery-not-found">
        <div className="container">
          <h2>Monastery Not Found</h2>
          <p>The monastery you're looking for doesn't exist or has been moved.</p>
          <Link to="/monasteries" className="back-button">← Back to Monasteries</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="monastery-detail-container">
      {/* Hero Section */}
      <div className="monastery-hero">
        <div className="monastery-hero-image">
          <img src={monastery.image} alt={monastery.name} />
          <div className="image-overlay"></div>
        </div>
        <div className="monastery-hero-content">
          <div className="container">
            <Link to="/monasteries" className="back-button">← Back to Monasteries</Link>
            <h1>{monastery.name}</h1>
            <p className="monastery-location">{monastery.location}, {monastery.district} District</p>
            <div className="monastery-meta">
              <span className="altitude">Altitude: {monastery.altitude}</span>
              <span className="established">Established: {monastery.establishedYear}</span>
              <CostBadge cost={monastery.entryFee} label="Entry Fee" />
            </div>
          </div>
        </div>
      </div>

      <div className="monastery-detail-content">
        <div className="container">
          <div className="detail-layout">
            <main className="monastery-main">
              {/* Navigation Tabs */}
              <div className="detail-tabs">
                <button 
                  className={activeTab === 'overview' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={activeTab === 'history' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('history')}
                >
                  History
                </button>
                <button 
                  className={activeTab === 'architecture' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('architecture')}
                >
                  Architecture
                </button>
                <button 
                  className={activeTab === 'visit' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('visit')}
                >
                  Visit Info
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === 'overview' && (
                  <div className="tab-pane">
                    <h2>About {monastery.name}</h2>
                    <p>{monastery.description}</p>
                    
                    <div className="highlight-features">
                      <h3>Key Features</h3>
                      <div className="features-grid">
                        {monastery.features.map((feature, index) => (
                          <div key={index} className="feature-item">
                            <span className="feature-icon">✨</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="monastery-stats">
                      <h3>Quick Facts</h3>
                      <div className="stats-grid">
                        <div className="stat-item">
                          <span className="stat-value">{monastery.monks}</span>
                          <span className="stat-label">Resident Monks</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-value">{monastery.festivals.length}</span>
                          <span className="stat-label">Annual Festivals</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-value">{monastery.establishedYear}</span>
                          <span className="stat-label">Year Established</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-value">{monastery.altitude}</span>
                          <span className="stat-label">Altitude</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="tab-pane">
                    <h2>Historical Significance</h2>
                    <p>{monastery.history || `The ${monastery.name} has a rich history that dates back to its establishment in ${monastery.establishedYear}. It has played a significant role in preserving Buddhist teachings and culture in the Sikkim region.`}</p>
                    
                    <div className="historical-timeline">
                      <h3>Historical Timeline</h3>
                      <div className="timeline">
                        <div className="timeline-event">
                          <div className="timeline-year">{monastery.establishedYear}</div>
                          <div className="timeline-content">
                            <h4>Monastery Established</h4>
                            <p>The monastery was founded by renowned Buddhist masters.</p>
                          </div>
                        </div>
                        <div className="timeline-event">
                          <div className="timeline-year">1975</div>
                          <div className="timeline-content">
                            <h4>Major Renovation</h4>
                            <p>The monastery underwent significant restoration to preserve its heritage.</p>
                          </div>
                        </div>
                        <div className="timeline-event">
                          <div className="timeline-year">1990</div>
                          <div className="timeline-content">
                            <h4>Recognition</h4>
                            <p>Declared as a heritage site by the Sikkim government.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'architecture' && (
                  <div className="tab-pane">
                    <h2>Architectural Style</h2>
                    <p>{monastery.architectureDetails || `The ${monastery.name} showcases exquisite ${monastery.architecturalStyle} architecture, characterized by intricate murals, detailed woodwork, and traditional Buddhist symbolism.`}</p>
                    
                    <div className="architecture-features">
                      <h3>Architectural Highlights</h3>
                      <ul>
                        <li>Traditional prayer wheels lining the courtyard</li>
                        <li>Intricately painted murals depicting Buddhist teachings</li>
                        <li>Ornate golden statues of Buddha and Bodhisattvas</li>
                        <li>Colorful prayer flags surrounding the complex</li>
                        <li>Traditional Tibetan-style roof with dragon motifs</li>
                      </ul>
                    </div>

                    <div className="image-gallery">
                      <h3>Image Gallery</h3>
                      <div className="gallery-grid">
                        <div className="gallery-item">
                          <img src={monastery.image} alt="Main temple" />
                        </div>
                        <div className="gallery-item">
                          <img src="https://images.unsplash.com/photo-1598979341340-a470cf86f098?w=400" alt="Interior" />
                        </div>
                        <div className="gallery-item">
                          <img src="https://images.unsplash.com/photo-1542640247-259a400a0f3c?w=400" alt="Prayer wheels" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'visit' && (
                  <div className="tab-pane">
                    <h2>Visiting Information</h2>
                    
                    <div className="visit-details">
                      <div className="detail-column">
                        <h3>Best Time to Visit</h3>
                        <p>{monastery.bestTime.join(', ')}</p>
                        
                        <h3>Opening Hours</h3>
                        <p>6:00 AM - 6:00 PM daily</p>
                        
                        <h3>Contact Information</h3>
                        <p>Phone: +91 XXX XXX XXXX</p>
                        <p>Email: info@{monastery.name.toLowerCase().replace(/\s+/g, '')}.com</p>
                      </div>
                      
                      <div className="detail-column">
                        <h3>Visitor Guidelines</h3>
                        <ul>
                          <li>Dress modestly (shoulders and knees covered)</li>
                          <li>Remove shoes before entering prayer halls</li>
                          <li>Maintain silence in meditation areas</li>
                          <li>Ask permission before taking photographs</li>
                          <li>Circumambulate stupas and prayer wheels clockwise</li>
                        </ul>
                      </div>
                    </div>

                    <div className="festivals">
                      <h3>Annual Festivals & Events</h3>
                      <div className="festivals-list">
                        {monastery.festivals.map((festival, index) => (
                          <div key={index} className="festival-item">
                            <h4>{festival.name}</h4>
                            <p className="festival-date">{festival.date}</p>
                            <p>{festival.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="how-to-reach">
                      <h3>How to Reach</h3>
                      <div className="transport-options">
                        <div className="transport-option">
                          <h4>By Air</h4>
                          <p>Nearest airport: Bagdogra Airport (XX km away)</p>
                        </div>
                        <div className="transport-option">
                          <h4>By Train</h4>
                          <p>Nearest railway station: New Jalpaiguri (XX km away)</p>
                        </div>
                        <div className="transport-option">
                          <h4>By Road</h4>
                          <p>Well connected by road from Gangtok and other major towns</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </main>

            <aside className="monastery-sidebar">
              <div className="sidebar-card">
                <h3>Location Map</h3>
                <MapEmbed 
                  location={monastery.location} 
                  height="200px" 
                />
                <p className="map-note">Exact location shown after booking</p>
              </div>

              <div className="sidebar-card">
                <h3>Visitor Information</h3>
                <div className="info-item">
                  <span className="info-label">Entry Fee:</span>
                  <span className="info-value">₹{monastery.entryFee}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Photography:</span>
                  <span className="info-value">{monastery.photographyAllowed ? 'Allowed' : 'Restricted'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Visit Duration:</span>
                  <span className="info-value">1-2 hours</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Best Time:</span>
                  <span className="info-value">{monastery.bestTime.join(', ')}</span>
                </div>
              </div>

              <div className="sidebar-card">
                <h3>Nearby Attractions</h3>
                <ul className="nearby-list">
                  <li>Local markets (XX km)</li>
                  <li>Viewpoint (XX km)</li>
                  <li>Hiking trail (XX km)</li>
                  <li>Other monasteries (XX km)</li>
                </ul>
              </div>

              <div className="sidebar-card">
                <h3>Plan Your Visit</h3>
                <button className="cta-button">Book a Guided Tour</button>
                <button className="secondary-button">Download Brochure</button>
              </div>
            </aside>
          </div>

          {/* Related Monasteries */}
          {relatedMonasteries.length > 0 && (
            <div className="related-monasteries">
              <h2>Related Monasteries</h2>
              <div className="related-grid">
                {relatedMonasteries.map(monastery => (
                  <div key={monastery.id} className="related-card">
                    <img src={monastery.image} alt={monastery.name} />
                    <div className="related-content">
                      <h4>{monastery.name}</h4>
                      <p>{monastery.location}</p>
                      <Link to={`/monasteries/${monastery.id}`} className="view-link">
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonasteryDetail;