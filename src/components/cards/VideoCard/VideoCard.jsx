import React, { useState, useRef } from 'react';
import './VideoCard.css';

const VideoCard = ({ 
  videoSrc, 
  thumbnail, 
  title, 
  description, 
  duration, 
  location, 
  category,
  onPlay,
  isPlaying = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => setShowControls(false), 2000);
  };

  const handlePlayClick = () => {
    if (onPlay) {
      onPlay(videoSrc);
    } else if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={`video-card ${isHovered ? 'hovered' : ''} ${isPlaying ? 'playing' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-container">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={thumbnail}
          muted
          loop
          className="video-element"
          preload="metadata"
        />
        
        <div className="video-overlay">
          {showControls && (
            <button 
              className="play-button"
              onClick={handlePlayClick}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              <svg className="play-icon" viewBox="0 0 24 24">
                {isPlaying ? (
                  <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                ) : (
                  <path fill="currentColor" d="M8 5v14l11-7z"/>
                )}
              </svg>
            </button>
          )}
          
          {duration && (
            <span className="duration-badge">
              {formatDuration(duration)}
            </span>
          )}
        </div>

        <div className="gradient-overlay" />
      </div>

      <div className="video-content">
        <div className="video-meta">
          {category && <span className="category-tag">{category}</span>}
          {location && <span className="location-tag">{location}</span>}
        </div>
        
        <h3 className="video-title">{title}</h3>
        <p className="video-description">{description}</p>
        
        <div className="video-actions">
          <button className="action-btn save-btn" aria-label="Save video">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </button>
          <button className="action-btn share-btn" aria-label="Share video">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
          </button>
        </div>
      </div>

      {isHovered && (
        <div className="hover-indicator">
          <div className="pulse-ring"></div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;