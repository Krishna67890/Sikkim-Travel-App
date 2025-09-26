
import React, { useState, useEffect, useRef } from 'react';
import './QuickFacts.css';

const QuickFacts = () => {
  const [countersVisible, setCountersVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="quick-facts" ref={sectionRef}>
      <div className="container">
        <div className="quick-facts-header">
          <h2>Quick Facts</h2>
          <p>Here's what we've achieved so far</p>
        </div>

        <div className="facts-grid">
          <div className="fact-card">
            <div className="fact-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
            </div>
            <h3 className="fact-number" data-target="350">
              {countersVisible ? <Counter target={350} duration={2000} /> : 0}
            </h3>
            <p className="fact-label">Projects Completed</p>
          </div>

          <div className="fact-card">
            <div className="fact-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h3 className="fact-number" data-target="95">
              {countersVisible ? <Counter target={95} duration={2000} /> : 0}
            </h3>
            <p className="fact-label">Happy Clients</p>
          </div>

          <div className="fact-card">
            <div className="fact-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h11c.55 0 1-.45 1-1z"/>
              </svg>
            </div>
            <h3 className="fact-number" data-target="1200">
              {countersVisible ? <Counter target={1200} duration={2000} /> : 0}
            </h3>
            <p className="fact-label">Support Tickets Solved</p>
          </div>

          <div className="fact-card">
            <div className="fact-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
              </svg>
            </div>
            <h3 className="fact-number" data-target="15">
              {countersVisible ? <Counter target={15} duration={2000} /> : 0}
            </h3>
            <p className="fact-label">Years of Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Counter component for animated numbers
const Counter = ({ target, duration }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    let startTime = null;
    let animationFrameId = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}+</span>;
};

export default QuickFacts;