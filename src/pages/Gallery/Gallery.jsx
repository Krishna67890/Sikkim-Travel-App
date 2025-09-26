import React, { useState, useCallback, useRef } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    { id: 'all', name: 'All Sikkim' },
    { id: 'landscapes', name: 'Landscapes' },
    { id: 'monasteries', name: 'Monasteries' },
    { id: 'lakes', name: 'Lakes' },
    { id: 'culture', name: 'Culture' },
    { id: 'wildlife', name: 'Wildlife' },
    { id: 'user-uploads', name: 'Your Uploads' }
  ];

  const initialImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1580502304784-8985b7eb7260?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'lakes',
      title: 'Tsomgo Lake',
      description: 'Sacred glacial lake at 12,400 ft surrounded by steep mountains',
      location: 'East Sikkim',
      type: 'image'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'landscapes',
      title: 'Himalayan Range',
      description: 'Majestic views of the Eastern Himalayas from Sikkim',
      location: 'North Sikkim',
      type: 'image'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'lakes',
      title: 'Gurudongmar Lake',
      description: 'One of the highest lakes in the world at 17,800 ft',
      location: 'North Sikkim',
      type: 'image'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'landscapes',
      title: 'Yumthang Valley',
      description: 'Valley of Flowers with stunning rhododendron blooms',
      location: 'North Sikkim',
      type: 'image'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1598439210629-50f3743ba523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'monasteries',
      title: 'Rumtek Monastery',
      description: 'One of the largest and most significant monasteries in Sikkim',
      location: 'East Sikkim',
      type: 'image'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'monasteries',
      title: 'Pemayangtse Monastery',
      description: 'One of the oldest monasteries dating back to 1705',
      location: 'West Sikkim',
      type: 'image'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'culture',
      title: 'Traditional Dance',
      description: 'Mask dance performed during religious festivals',
      location: 'Gangtok',
      type: 'image'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'culture',
      title: 'Local Market',
      description: 'Vibrant market showcasing Sikkimese handicrafts',
      location: 'Gangtok',
      type: 'image'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1533873983670-6d3f5d8a45a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'wildlife',
      title: 'Red Panda',
      description: 'Sikkims state animal found in Himalayan forests',
      location: 'Khangchendzonga National Park',
      type: 'image'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1561731155-0ee2e3165e5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'wildlife',
      title: 'Himalayan Monal',
      description: 'Colorful pheasant found in the high altitudes',
      location: 'Khangchendzonga Biosphere',
      type: 'image'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'landscapes',
      title: 'Kanchenjunga Peak',
      description: 'Third highest mountain in the world as seen from Sikkim',
      location: 'West Sikkim',
      type: 'image'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'landscapes',
      title: 'Tea Gardens',
      description: 'Lush green tea estates of Temi Tea Garden',
      location: 'South Sikkim',
      type: 'image'
    },
    // Additional 15 photos of Sikkim
    {
      id: 13,
      src: 'https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'landscapes',
      title: 'Nathula Pass',
      description: 'Historic mountain pass on the Indo-China border',
      location: 'East Sikkim',
      type: 'image'
    },
    {
      id: 14,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'monasteries',
      title: 'Enchey Monastery',
      description: '200-year-old monastery overlooking Gangtok city',
      location: 'Gangtok',
      type: 'image'
    },
    {
      id: 15,
      src: 'https://images.unsplash.com/photo-1580133318324-f2f76d987dd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'lakes',
      title: 'Khecheopalri Lake',
      description: 'Sacred lake believed to fulfill wishes of devotees',
      location: 'West Sikkim',
      type: 'image'
    },
    {
      id: 16,
      src: 'https://images.unsplash.com/photo-1566505670282-0d18df1e1f0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'culture',
      title: 'Prayer Flags',
      description: 'Colorful prayer flags fluttering in Himalayan breeze',
      location: 'Throughout Sikkim',
      type: 'image'
    },
    {
      id: 17,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'landscapes',
      title: 'Seven Sisters Waterfall',
      description: 'Spectacular seven-tiered waterfall on Gangtok-Lachung highway',
      location: 'North Sikkim',
      type: 'image'
    },
    {
      id: 18,
      src: 'https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'monasteries',
      title: 'Tashiding Monastery',
      description: 'Sacred monastery believed to cleanse all sins',
      location: 'West Sikkim',
      type: 'image'
    },
    {
      id: 19,
      src: 'https://images.unsplash.com/photo-1580133318324-f2f76d987dd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'wildlife',
      title: 'Himalayan Black Bear',
      description: 'Rare sighting of the elusive Himalayan black bear',
      location: 'Khangchendzonga National Park',
      type: 'image'
    },
    {
      id: 20,
      src: 'https://images.unsplash.com/photo-1566505670282-0d18df1e1f0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'culture',
      title: 'Lepcha Heritage',
      description: 'Traditional Lepcha tribal house and culture',
      location: 'Central Sikkim',
      type: 'image'
    },
    {
      id: 21,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'landscapes',
      title: 'Zemu Glacier',
      description: 'Source of Teesta River, one of the largest glaciers in Himalayas',
      location: 'North Sikkim',
      type: 'image'
    },
    {
      id: 22,
      src: 'https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'monasteries',
      title: 'Phodong Monastery',
      description: 'Ancient monastery of the Kagyu sect of Tibetan Buddhism',
      location: 'North Sikkim',
      type: 'image'
    },
    {
      id: 23,
      src: 'https://images.unsplash.com/photo-1580133318324-f2f76d987dd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'lakes',
      title: 'Menmecho Lake',
      description: 'Serene high-altitude lake near Tsomgo Lake',
      location: 'East Sikkim',
      type: 'image'
    },
    {
      id: 24,
      src: 'https://images.unsplash.com/photo-1566505670282-0d18df1e1f0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'culture',
      title: 'Sikkimese Cuisine',
      description: 'Traditional momos and thukpa - local delicacies',
      location: 'Throughout Sikkim',
      type: 'image'
    },
    {
      id: 25,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'landscapes',
      title: 'Ravangla Buddha Park',
      description: 'Giant Buddha statue overlooking the Himalayan ranges',
      location: 'South Sikkim',
      type: 'image'
    },
    {
      id: 26,
      src: 'https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'wildlife',
      title: 'Blood Pheasant',
      description: 'State bird of Sikkim with distinctive red plumage',
      location: 'Alpine zones of Sikkim',
      type: 'image'
    },
    {
      id: 27,
      src: 'https://images.unsplash.com/photo-1580133318324-f2f76d987dd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'culture',
      title: 'Handicrafts',
      description: 'Traditional Sikkimese carpets and woolen products',
      location: 'Government Handicrafts Center',
      type: 'image'
    }
  ];

  const [images, setImages] = useState(initialImages);

  const filteredImages = activeCategory === 'all' 
    ? [...images, ...uploadedMedia]
    : activeCategory === 'user-uploads'
    ? uploadedMedia
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

  // Upload functionality
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await simulateUpload(file, i);
    }

    setIsUploading(false);
    setUploadProgress(0);
    setUploadModalOpen(false);
    event.target.value = ''; // Reset file input
  };

  const simulateUpload = (file, index) => {
    return new Promise((resolve) => {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      
      if (!isImage && !isVideo) {
        alert('Please upload only images or videos');
        resolve();
        return;
      }

      const reader = new FileReader();
      
      reader.onloadstart = () => {
        setUploadProgress(10);
      };

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      };

      reader.onloadend = () => {
        const newMedia = {
          id: `user-${Date.now()}-${index}`,
          src: reader.result,
          category: 'user-uploads',
          title: file.name.split('.')[0],
          description: `Uploaded by user - ${file.type}`,
          location: 'User Upload',
          type: isVideo ? 'video' : 'image',
          file: file,
          uploadDate: new Date().toLocaleDateString()
        };

        setUploadedMedia(prev => [...prev, newMedia]);
        setUploadProgress(100);
        setTimeout(() => resolve(), 500);
      };

      if (isImage) {
        reader.readAsDataURL(file);
      } else {
        // For videos, create object URL
        const videoUrl = URL.createObjectURL(file);
        const newMedia = {
          id: `user-${Date.now()}-${index}`,
          src: videoUrl,
          category: 'user-uploads',
          title: file.name.split('.')[0],
          description: `Uploaded by user - ${file.type}`,
          location: 'User Upload',
          type: 'video',
          file: file,
          uploadDate: new Date().toLocaleDateString()
        };
        setUploadedMedia(prev => [...prev, newMedia]);
        setUploadProgress(100);
        resolve();
      }
    });
  };

  // Download functionality
  const downloadMedia = (media) => {
    if (media.type === 'image') {
      const link = document.createElement('a');
      link.href = media.src;
      link.download = `${media.title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // For videos
      const link = document.createElement('a');
      link.href = media.src;
      link.download = `${media.title}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Delete uploaded media
  const deleteUploadedMedia = (mediaId) => {
    setUploadedMedia(prev => prev.filter(media => media.id !== mediaId));
  };

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
          <button 
            className="upload-hero-btn"
            onClick={() => setUploadModalOpen(true)}
          >
            📸 Share Your Photos & Videos
          </button>
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
          
          <div className="action-buttons">
            <button 
              className="upload-btn"
              onClick={() => setUploadModalOpen(true)}
            >
              📤 Upload Media
            </button>
            <button 
              className="download-all-btn"
              onClick={() => alert('Download all feature coming soon!')}
            >
              ⬇️ Download All
            </button>
          </div>
        </div>

        <div className="masonry-grid">
          {filteredImages.map((media, index) => (
            <div 
              key={media.id} 
              className={`gallery-item ${media.type === 'video' ? 'video-item' : ''}`}
              onClick={() => openLightbox(index)}
            >
              <div className="image-container">
                {media.type === 'video' ? (
                  <video src={media.src} muted>
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={media.src} alt={media.title} />
                )}
                
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>{media.title}</h3>
                    <p>{media.location}</p>
                    {media.type === 'video' && <span className="video-badge">🎥 VIDEO</span>}
                  </div>
                  
                  <div className="media-actions">
                    <button 
                      className="download-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadMedia(media);
                      }}
                      title="Download"
                    >
                      ⬇️
                    </button>
                    {media.category === 'user-uploads' && (
                      <button 
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteUploadedMedia(media.id);
                        }}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="modal-overlay" onClick={() => setUploadModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setUploadModalOpen(false)}
            >
              ×
            </button>
            
            <h2>Upload Photos & Videos</h2>
            <div className="upload-zone">
              <div className="upload-instructions">
                <p>📸 Select photos or videos to share</p>
                <ul>
                  <li>Supported formats: JPG, PNG, MP4, MOV</li>
                  <li>Max file size: 50MB</li>
                  <li>You can select multiple files</li>
                </ul>
              </div>
              
              <button 
                className="upload-zone-btn"
                onClick={handleUploadClick}
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Choose Files'}
              </button>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                accept="image/*,video/*"
                style={{ display: 'none' }}
              />
              
              {isUploading && (
                <div className="upload-progress">
                  <div 
                    className="progress-bar"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
              )}
            </div>
            
            {uploadedMedia.length > 0 && (
              <div className="upload-preview">
                <h3>Your Uploads ({uploadedMedia.length})</h3>
                <div className="preview-grid">
                  {uploadedMedia.map(media => (
                    <div key={media.id} className="preview-item">
                      {media.type === 'video' ? (
                        <video src={media.src} muted />
                      ) : (
                        <img src={media.src} alt={media.title} />
                      )}
                      <button 
                        className="preview-delete"
                        onClick={() => deleteUploadedMedia(media.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-nav lightbox-prev" onClick={goToPrevious}>‹</button>
            
            <div className="lightbox-image-container">
              {filteredImages[currentImage].type === 'video' ? (
                <video src={filteredImages[currentImage].src} controls autoPlay>
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img 
                  src={filteredImages[currentImage].src} 
                  alt={filteredImages[currentImage].title} 
                />
              )}
              
              <div className="lightbox-info">
                <div className="lightbox-header">
                  <h3>{filteredImages[currentImage].title}</h3>
                  <button 
                    className="lightbox-download"
                    onClick={() => downloadMedia(filteredImages[currentImage])}
                  >
                    ⬇️ Download
                  </button>
                </div>
                <p>{filteredImages[currentImage].description}</p>
                <div className="image-meta">
                  <span className="location">📍 {filteredImages[currentImage].location}</span>
                  <span className="category">
                    {categories.find(cat => cat.id === filteredImages[currentImage].category)?.name}
                  </span>
                  {filteredImages[currentImage].uploadDate && (
                    <span className="upload-date">📅 {filteredImages[currentImage].uploadDate}</span>
                  )}
                </div>
              </div>
            </div>
            
            <button className="lightbox-nav lightbox-next" onClick={goToNext}>›</button>
            
            <div className="lightbox-thumbnails">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className={`thumbnail ${index === currentImage ? 'active' : ''}`}
                  onClick={() => setCurrentImage(index)}
                >
                  {image.type === 'video' ? (
                    <video src={image.src} muted />
                  ) : (
                    <img src={image.src} alt={image.title} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="gallery-cta">
        <div className="cta-content">
          <h2>Share Your Sikkim Experience</h2>
          <p>Have beautiful photos or videos of Sikkim? Share them with our community</p>
          <button 
            className="cta-button"
            onClick={() => setUploadModalOpen(true)}
          >
            Submit Your Photos & Videos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
