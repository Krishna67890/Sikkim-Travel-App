// CostBadge.jsx
import React, { useState, useEffect } from 'react';
import './CostBadge.css';

const CostBadge = ({ 
  cost, 
  currency = '$', 
  size = 'medium', 
  variant = 'primary', 
  animated = false,
  pulse = false,
  discount,
  originalCost,
  className = '',
  onClick 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    // Handle pulse animation if enabled
    if (pulse) {
      const pulseInterval = setInterval(() => {
        setIsPulsing(prev => !prev);
      }, 2000);

      return () => clearInterval(pulseInterval);
    }
  }, [pulse]);

  const hasDiscount = discount !== undefined && originalCost !== undefined;

  const formatCost = (value) => {
    return value % 1 === 0 ? value : value.toFixed(2);
  };

  const badgeClasses = `
    cost-badge 
    cost-badge--${size} 
    cost-badge--${variant} 
    ${animated ? 'cost-badge--animated' : ''} 
    ${isVisible ? 'cost-badge--visible' : ''} 
    ${isPulsing ? 'cost-badge--pulse' : ''} 
    ${hasDiscount ? 'cost-badge--discount' : ''} 
    ${className}
  `.trim();

  const handleClick = () => {
    if (onClick) {
      onClick({ cost, currency, discount, originalCost });
    }
  };

  return (
    <div className={badgeClasses} onClick={handleClick}>
      {hasDiscount && (
        <div className="cost-badge__original">
          <span className="cost-badge__original-currency">{currency}</span>
          <span className="cost-badge__original-value">{formatCost(originalCost)}</span>
        </div>
      )}
      
      <div className="cost-badge__current">
        <span className="cost-badge__currency">{currency}</span>
        <span className="cost-badge__value">{formatCost(hasDiscount ? discount : cost)}</span>
      </div>

      {hasDiscount && (
        <div className="cost-badge__savings">
          Save {currency}{formatCost(originalCost - discount)}
        </div>
      )}

      <div className="cost-badge__shine"></div>
    </div>
  );
};

export default CostBadge;