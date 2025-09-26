import React, { useEffect, useRef } from 'react';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  closeOnOverlayClick = true,
  showCloseButton = true,
  animation = 'scale',
  className = ''
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      
      // Focus trap for accessibility
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unstyled';
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className={`
          modal 
          modal--${size}
          modal--${animation}
          ${className}
          ${isOpen ? 'modal--open' : ''}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <div className="modal-header">
          {title && (
            <h2 id="modal-title" className="modal-title">
              {title}
            </h2>
          )}
          {showCloseButton && (
            <button
              className="modal-close"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        
        <div className="modal-content">
          {children}
        </div>
        
        <div className="modal-footer">
          <button 
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Specific modal types for the travel app
export const BookingModal = ({ isOpen, onClose, package: travelPackage }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Book ${travelPackage?.name}`}
      size="large"
    >
      <div className="booking-modal-content">
        <div className="booking-summary">
          <h3>Package Details</h3>
          <div className="package-info">
            <p><strong>Duration:</strong> {travelPackage?.duration}</p>
            <p><strong>Price:</strong> ₹{travelPackage?.price}</p>
            <p><strong>Difficulty:</strong> {travelPackage?.difficulty}</p>
          </div>
        </div>
        
        <form className="booking-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="travelers">Number of Travelers</label>
            <select id="travelers">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Preferred Date</label>
            <input type="date" id="date" required />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Confirm Booking
          </button>
        </form>
      </div>
    </Modal>
  );
};

export const GalleryModal = ({ isOpen, onClose, images, currentIndex }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Photo Gallery"
      size="extra-large"
      closeOnOverlayClick={true}
    >
      <div className="gallery-modal-content">
        <div className="gallery-main-image">
          <img 
            src={images[currentIndex]?.src} 
            alt={images[currentIndex]?.alt} 
          />
        </div>
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={index === currentIndex ? 'active' : ''}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default Modal;