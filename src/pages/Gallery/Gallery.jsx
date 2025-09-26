import React, { useState, useCallback } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const categories = [
    { id: 'all', name: 'All Sikkim' },
    { id: 'landscapes', name: 'Landscapes' },
    { id: 'monasteries', name: 'Monasteries' },
    { id: 'lakes', name: 'Lakes' },
    { id: 'culture', name: 'Culture' },
    { id: 'wildlife', name: 'Wildlife' }
  ];

  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1580502304784-8985b7eb7260?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'lakes',
      title: 'Tsomgo Lake',
      description: 'Sacred glacial lake at 12,400 ft surrounded by steep mountains',
      location: 'East Sikkim'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'landscapes',
      title: 'Himalayan Range',
      description: 'Majestic views of the Eastern Himalayas from Sikkim',
      location: 'North Sikkim'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'lakes',
      title: 'Gurudongmar Lake',
      description: 'One of the highest lakes in the world at 17,800 ft',
      location: 'North Sikkim'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'landscapes',
      title: 'Yumthang Valley',
      description: 'Valley of Flowers with stunning rhododendron blooms',
      location: 'North Sikkim'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1598439210629-50f3743ba523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'monasteries',
      title: 'Rumtek Monastery',
      description: 'One of the largest and most significant monasteries in Sikkim',
      location: 'East Sikkim'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'monasteries',
      title: 'Pemayangtse Monastery',
      description: 'One of the oldest monasteries dating back to 1705',
      location: 'West Sikkim'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'culture',
      title: 'Traditional Dance',
      description: 'Mask dance performed during religious festivals',
      location: 'Gangtok'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'culture',
      title: 'Local Market',
      description: 'Vibrant market showcasing Sikkimese handicrafts',
      location: 'Gangtok'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1533873983670-6d3f5d8a45a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'wildlife',
      title: 'Red Panda',
      description: 'Sikkims state animal found in Himalayan forests',
      location: 'Khangchendzonga National Park'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1561731155-0ee2e3165e5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'wildlife',
      title: 'Himalayan Monal',
      description: 'Colorful pheasant found in the high altitudes',
      location: 'Khangchendzonga Biosphere'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'landscapes',
      title: 'Kanchenjunga Peak',
      description: 'Third highest mountain in the world as seen from Sikkim',
      location: 'West Sikkim'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'landscapes',
      title: 'Tea Gardens',
      description: 'Lush green tea estates of Temi Tea Garden',
      location: 'South Sikkim'
    }
  ];

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(image => image.category === activeCategory);

  const openLightbox = useCallback((index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    setCurrentImage((prevIndex) => 
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImage((prevIndex) => 
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleKeyDown = useCallback((e) => {
    if (lightboxOpen) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    }
  }, [lightboxOpen, goToPrevious, goToNext]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <div className="hero-content">
          <h1>Sikkim Through the Lens</h1>
          <p>Discover the breathtaking beauty of the Himalayan paradise</p>
        </div>
      </div>

      <div className="gallery-container">
        <div className="gallery-controls">
          <h2>Explore Our Collection</h2>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="masonry-grid">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              <div className="image-container">
                <img src={image.src} alt={image.title} />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>{image.title}</h3>
                    <p>{image.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-nav lightbox-prev" onClick={goToPrevious}>‹</button>
            
            <div className="lightbox-image-container">
              <img 
                src={filteredImages[currentImage].src} 
                alt={filteredImages[currentImage].title} 
              />
              <div className="lightbox-info">
                <h3>{filteredImages[currentImage].title}</h3>
                <p>{filteredImages[currentImage].description}</p>
                <div className="image-meta">
                  <span className="location">📍 {filteredImages[currentImage].location}</span>
                  <span className="category">
                    {categories.find(cat => cat.id === filteredImages[currentImage].category)?.name}
                  </span>
                </div>
              </div>
            </div>
            
            <button className="lightbox-nav lightbox-next" onClick={goToNext}>›</button>
            
            <div className="lightbox-thumbnails">
              {filteredImages.map((image, index) => (
                <img
                  key={image.id}
                  src={image.src}
                  alt={image.title}
                  className={index === currentImage ? 'active' : ''}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="gallery-cta">
        <div className="cta-content">
          <h2>Share Your Sikkim Experience</h2>
          <p>Have beautiful photos of Sikkim? Share them with our community</p>
          <button className="cta-button">Submit Your Photos</button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;