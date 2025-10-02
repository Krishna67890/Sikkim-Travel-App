import React, { useState, useEffect, useRef } from 'react';
import MapEmbed from '../../components/ui/MapEmbed/MapEmbed';
import CostBadge from '../../components/ui/CostBadge/CostBadge';
import SearchBar from '../../components/ui/SearchBar/SearchBar';
import './Transportation.css';
import transportationData from '../../data/mockData/transportationData';

const Transportation = () => {
  const [filteredTransport, setFilteredTransport] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [qrLoadingError, setQrLoadingError] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [travelBill, setTravelBill] = useState(null);
  const [showBillPopup, setShowBillPopup] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentView, setCurrentView] = useState('destinations'); // 'destinations' or 'routes'
  const [filters, setFilters] = useState({
    transportType: 'all',
    priceRange: [0, 10000],
    searchQuery: ''
  });

  const searchRef = useRef(null);

  // Sikkim popular destinations with coordinates
  const sikkimDestinations = [
    {
      id: 1,
      name: "Gangtok",
      type: "City",
      description: "Capital city of Sikkim with beautiful monasteries and markets",
      coordinates: { lat: 27.3389, lng: 88.6065 },
      altitude: "1,650m",
      bestTime: "Mar-Jun, Sep-Dec",
      attractions: ["MG Marg", "Rumtek Monastery", "Tsomgo Lake", "Enchey Monastery"],
      popularFor: ["Shopping", "Monasteries", "City Life"]
    },
    {
      id: 2,
      name: "Tsomgo Lake",
      type: "Lake",
      description: "Glacial lake at 12,400 feet surrounded by mountains",
      coordinates: { lat: 27.3755, lng: 88.7632 },
      altitude: "3,780m",
      bestTime: "Mar-May",
      attractions: ["Lake View", "Yak Ride", "Snow Activities"],
      popularFor: ["Lake Views", "Adventure", "Photography"]
    },
    {
      id: 3,
      name: "Nathula Pass",
      type: "Mountain Pass",
      description: "Historic Indo-China border crossing at 14,140 feet",
      coordinates: { lat: 27.3869, lng: 88.8329 },
      altitude: "4,310m",
      bestTime: "May-Nov",
      attractions: ["India-China Border", "War Memorial", "Snow Views"],
      popularFor: ["Border Experience", "History", "Snow"]
    },
    {
      id: 4,
      name: "Pelling",
      type: "Town",
      description: "Scenic town with stunning views of Kanchenjunga",
      coordinates: { lat: 27.2805, lng: 88.2391 },
      altitude: "2,150m",
      bestTime: "Oct-Jun",
      attractions: ["Pemayangtse Monastery", "Sky Walk", "Rimbi Waterfall"],
      popularFor: ["Mountain Views", "Trekking", "Nature"]
    },
    {
      id: 5,
      name: "Lachung",
      type: "Village",
      description: "Picturesque village in North Sikkim known as 'small pass'",
      coordinates: { lat: 27.6867, lng: 88.7392 },
      altitude: "2,750m",
      bestTime: "Mar-Jun, Oct-Dec",
      attractions: ["Lachung Monastery", "Yumthang Valley", "Snow Points"],
      popularFor: ["Village Life", "Valleys", "Culture"]
    },
    {
      id: 6,
      name: "Yumthang Valley",
      type: "Valley",
      description: "Valley of Flowers with hot springs and rhododendrons",
      coordinates: { lat: 27.8206, lng: 88.6997 },
      altitude: "3,564m",
      bestTime: "Feb-Jun",
      attractions: ["Flower Gardens", "Hot Springs", "Shingba Rhododendron Sanctuary"],
      popularFor: ["Flowers", "Hot Springs", "Valley Views"]
    },
    {
      id: 7,
      name: "Ravangla",
      type: "Town",
      description: "Quiet town with Buddha Park and tea gardens",
      coordinates: { lat: 27.3042, lng: 88.3564 },
      altitude: "2,200m",
      bestTime: "Mar-Jun, Sep-Dec",
      attractions: ["Buddha Park", "Ralong Monastery", "Tea Gardens"],
      popularFor: ["Buddhism", "Tea Gardens", "Peace"]
    },
    {
      id: 8,
      name: "Namchi",
      type: "City",
      description: "South Sikkim's capital with giant statue complexes",
      coordinates: { lat: 27.1648, lng: 88.3564 },
      altitude: "1,315m",
      bestTime: "Oct-Jun",
      attractions: ["Char Dham", "Samdruptse", "Tendong Hill"],
      popularFor: ["Religious Sites", "Statues", "Culture"]
    }
  ];

  // Travel options to reach Sikkim
  const travelToSikkimOptions = [
    {
      id: 'plane',
      type: 'Flight',
      provider: 'Air India, IndiGo, SpiceJet',
      from: 'Kolkata/Delhi/Bagdogra',
      to: 'Pakyong Airport (Gangtok)',
      duration: '2-4 hours',
      cost: 5000,
      description: 'Direct flights to Pakyong Airport near Gangtok',
      contact: 'Airline websites or travel agents',
      bookable: true
    },
    {
      id: 'train',
      type: 'Train',
      provider: 'Indian Railways',
      from: 'Kolkata/Delhi',
      to: 'New Jalpaiguri (NJP)',
      duration: '18-24 hours',
      cost: 1500,
      description: 'Train to NJP followed by 4-5 hour drive to Gangtok',
      contact: 'IRCTC or railway stations',
      bookable: true
    },
    {
      id: 'bus',
      type: 'Bus',
      provider: 'SNT & Private Operators',
      from: 'Siliguri/Kolkata',
      to: 'Gangtok',
      duration: '4-6 hours from Siliguri',
      cost: 800,
      description: 'Regular bus services from Siliguri to Gangtok',
      contact: 'Siliguri Bus Stand +91 1234567890',
      bookable: true
    },
    {
      id: 'helicopter',
      type: 'Helicopter',
      provider: 'Sikkim Tourism',
      from: 'Bagdogra',
      to: 'Gangtok',
      duration: '30 minutes',
      cost: 3000,
      description: 'Helicopter service from Bagdogra to Gangtok',
      contact: 'Sikkim Tourism Department',
      bookable: true
    }
  ];

  // Convert to INR
  const convertToINR = (amount) => {
    return Math.round(amount * 83);
  };

  // Calculate distance between destinations
  const calculateDistance = (from, to) => {
    const destinations = [...sikkimDestinations];
    const fromDest = destinations.find(d => d.name === from);
    const toDest = destinations.find(d => d.name === to);
    
    if (!fromDest || !toDest) return 50;
    
    const latDiff = Math.abs(fromDest.coordinates.lat - toDest.coordinates.lat);
    const lngDiff = Math.abs(fromDest.coordinates.lng - toDest.coordinates.lng);
    return Math.round((latDiff + lngDiff) * 1000);
  };

  // Generate travel bill
  const generateTravelBill = (route, passengerCount = 1, isExternal = false) => {
    const distance = isExternal ? 0 : calculateDistance(route.from, route.to);
    const baseCost = route.cost * passengerCount;
    const gst = baseCost * 0.18;
    const convenienceFee = 50;
    const total = baseCost + gst + convenienceFee;
    
    return {
      bookingId: `SKM${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN'),
      from: route.from,
      to: route.to,
      provider: route.provider,
      transportType: route.type,
      distance: isExternal ? 'N/A' : `${distance} km`,
      baseFare: Math.round(baseCost),
      gst: Math.round(gst),
      convenienceFee: convenienceFee,
      totalAmount: Math.round(total),
      passengers: passengerCount,
      duration: route.durationText,
      status: 'Confirmed',
      isExternal: isExternal
    };
  };

  // Search functionality for map
  const handleMapSearch = (query) => {
    setMapSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = [
      ...sikkimDestinations.filter(dest => 
        dest.name.toLowerCase().includes(query.toLowerCase()) ||
        dest.type.toLowerCase().includes(query.toLowerCase()) ||
        dest.attractions.some(attr => attr.toLowerCase().includes(query.toLowerCase()))
      ),
      ...travelToSikkimOptions.filter(option =>
        option.type.toLowerCase().includes(query.toLowerCase()) ||
        option.from.toLowerCase().includes(query.toLowerCase()) ||
        option.to.toLowerCase().includes(query.toLowerCase())
      )
    ];

    setSearchResults(results);
    setShowSearchResults(true);
  };

  // Handle search result selection
  const handleSearchResultSelect = (result) => {
    if (result.attractions) {
      // It's a destination
      setSelectedDestination(result);
      setCurrentView('destinations');
    } else {
      // It's a travel option
      handleBookTravelOption(result);
    }
    setMapSearchQuery('');
    setShowSearchResults(false);
  };

  // Normalize transport data
  useEffect(() => {
    const normalized = [];
    transportationData.forEach((item) => {
      if (item.routes && Array.isArray(item.routes)) {
        item.routes.forEach((r, idx) => {
          const originalCost = item.price?.perPerson || item.price?.min || item.pricePerKm || item.pricePerDay || 0;
          const distance = calculateDistance(r.from, r.to);
          const calculatedCost = item.pricePerKm ? convertToINR(item.pricePerKm * distance) : convertToINR(originalCost);
          
          normalized.push({
            id: `${item.id}-${idx + 1}`,
            type: item.type.toLowerCase(),
            provider: item.provider,
            contact: item.contact,
            from: r.from,
            to: r.to,
            durationText: r.duration,
            cost: calculatedCost,
            originalCost: originalCost,
            currency: 'INR',
            distance: distance,
            meta: item,
            bookable: true
          });
        });
      } else {
        const originalCost = item.pricePerKm || item.pricePerDay || item.price?.min || 0;
        const randomDest = sikkimDestinations[Math.floor(Math.random() * sikkimDestinations.length)];
        normalized.push({
          id: item.id,
          type: item.type.toLowerCase(),
          provider: item.provider,
          contact: item.contact,
          from: 'Gangtok',
          to: randomDest.name,
          durationText: item.duration || '-',
          cost: convertToINR(originalCost),
          originalCost: originalCost,
          currency: 'INR',
          meta: item,
          bookable: true
        });
      }
    });

    let results = normalized;

    if (filters.transportType !== 'all') {
      results = results.filter((i) => i.type === filters.transportType);
    }

    if (selectedDestination) {
      results = results.filter((i) => 
        i.to.toLowerCase().includes(selectedDestination.name.toLowerCase()) ||
        i.from.toLowerCase().includes(selectedDestination.name.toLowerCase())
      );
    }

    results = results.filter((i) => i.cost >= filters.priceRange[0] && i.cost <= filters.priceRange[1]);

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      results = results.filter((i) =>
        i.from.toLowerCase().includes(q) || i.to.toLowerCase().includes(q) || 
        i.type.toLowerCase().includes(q) || i.provider.toLowerCase().includes(q)
      );
    }

    setFilteredTransport(results);
  }, [filters, selectedDestination]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination);
    setSelectedRoute(null);
    setCurrentView('destinations');
  };

  const handleBookNow = (route, e) => {
    e?.stopPropagation();
    setSelectedRoute(route);
    const bill = generateTravelBill(route, passengers, false);
    setTravelBill(bill);
    setShowPaymentPopup(true);
    setQrLoadingError(false);
    setProcessingPayment(false);
    setPaymentSuccess(false);
  };

  const handleBookTravelOption = (option) => {
    const bill = generateTravelBill(option, passengers, true);
    setTravelBill(bill);
    setShowPaymentPopup(true);
    setQrLoadingError(false);
    setProcessingPayment(false);
    setPaymentSuccess(false);
  };

  const handlePaymentSubmit = () => {
    setProcessingPayment(true);
    
    setTimeout(() => {
      if (Math.random() < 0.4) {
        setQrLoadingError(true);
        setProcessingPayment(false);
      } else {
        setPaymentSuccess(true);
        setTimeout(() => {
          setShowPaymentPopup(false);
          setPaymentSuccess(false);
          setShowBillPopup(true);
        }, 2000);
      }
    }, 3000);
  };

  const handleRetryQR = () => {
    setQrLoadingError(false);
  };

  const handleClosePopup = () => {
    setShowPaymentPopup(false);
    setQrLoadingError(false);
    setProcessingPayment(false);
    setPaymentSuccess(false);
  };

  const handlePrintBill = () => {
    window.print();
  };

  const handleShareBill = () => {
    if (navigator.share) {
      navigator.share({
        title: `Travel Booking - ${travelBill.bookingId}`,
        text: `Your ${travelBill.transportType} booking from ${travelBill.from} to ${travelBill.to} is confirmed!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`Booking ID: ${travelBill.bookingId}\nFrom: ${travelBill.from}\nTo: ${travelBill.to}\nTotal: ₹${travelBill.totalAmount}`);
      alert('Booking details copied to clipboard!');
    }
  };

  // Enhanced Payment Popup Component
  const PaymentPopup = () => {
    if (!showPaymentPopup) return null;

    return (
      <div className="payment-popup-overlay">
        <div className="payment-popup">
          <div className="payment-header">
            <h3>Complete Your Booking</h3>
            <button className="close-btn" onClick={handleClosePopup}>×</button>
          </div>
          
          <div className="payment-details">
            <div className="booking-summary">
              <h4>Booking Summary</h4>
              <div className="summary-item">
                <span>Provider:</span>
                <span>{travelBill?.provider}</span>
              </div>
              <div className="summary-item">
                <span>Route:</span>
                <span>{travelBill?.from} → {travelBill?.to}</span>
              </div>
              <div className="summary-item">
                <span>Type:</span>
                <span>{travelBill?.transportType}</span>
              </div>
              {!travelBill?.isExternal && (
                <div className="summary-item">
                  <span>Distance:</span>
                  <span>{travelBill?.distance}</span>
                </div>
              )}
              <div className="summary-item">
                <span>Passengers:</span>
                <span>
                  <select 
                    value={passengers} 
                    onChange={(e) => {
                      setPassengers(parseInt(e.target.value));
                      const updatedBill = generateTravelBill(
                        selectedRoute || travelToSikkimOptions.find(opt => opt.id === travelBill?.provider?.toLowerCase()),
                        parseInt(e.target.value),
                        travelBill?.isExternal
                      );
                      setTravelBill(updatedBill);
                    }}
                    className="passenger-select"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </span>
              </div>
              <div className="summary-item total">
                <span>Total Amount:</span>
                <span className="total-amount">₹{travelBill?.totalAmount}</span>
              </div>
            </div>

            {!processingPayment && !paymentSuccess && !qrLoadingError && (
              <div className="qr-section">
                <h4>Choose Payment Method</h4>
                <div className="payment-methods">
                  <div className="payment-method active">
                    <div className="method-icon">📱</div>
                    <div className="method-info">
                      <h5>UPI & QR Code</h5>
                      <p>Scan QR with any UPI app</p>
                    </div>
                  </div>
                  <div className="payment-method">
                    <div className="method-icon">💳</div>
                    <div className="method-info">
                      <h5>Credit/Debit Card</h5>
                      <p>Visa, Mastercard, RuPay</p>
                    </div>
                  </div>
                  <div className="payment-method">
                    <div className="method-icon">🏦</div>
                    <div className="method-info">
                      <h5>Net Banking</h5>
                      <p>All major banks</p>
                    </div>
                  </div>
                  <div className="payment-method">
                    <div className="method-icon">👛</div>
                    <div className="method-info">
                      <h5>Wallets</h5>
                      <p>Paytm, PhonePe, Google Pay</p>
                    </div>
                  </div>
                </div>

                <div className="qr-container">
                  <h5>Scan QR Code to Pay</h5>
                  <div className="qr-placeholder">
                    <div className="fake-qr">
                      <div className="qr-code">
                        <div className="qr-pattern">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div key={i} className="qr-row">
                              {Array.from({ length: 25 }).map((_, j) => (
                                <div 
                                  key={j} 
                                  className={`qr-cell ${Math.random() > 0.5 ? 'filled' : ''}`}
                                ></div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="payment-apps">
                        <div className="payment-app">PhonePe</div>
                        <div className="payment-app">Google Pay</div>
                        <div className="payment-app">Paytm</div>
                        <div className="payment-app">BHIM UPI</div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="pay-now-btn" onClick={handlePaymentSubmit}>
                  <span className="btn-icon">💳</span>
                  Pay ₹{travelBill?.totalAmount} Now
                </button>
                <p className="payment-note">Your booking will be confirmed instantly after payment</p>
              </div>
            )}

            {qrLoadingError && (
              <div className="error-section">
                <div className="error-icon">⚠️</div>
                <h4>Payment Method Unavailable</h4>
                <p>Sorry, the selected payment method is currently unavailable. Please try another option.</p>
                <div className="error-actions">
                  <button className="retry-btn" onClick={handleRetryQR}>
                    <span className="btn-icon">🔄</span>
                    Try QR Code Again
                  </button>
                  <button className="alternative-btn" onClick={handleRetryQR}>
                    <span className="btn-icon">💳</span>
                    Use Card Payment
                  </button>
                  <button className="alternative-btn" onClick={handleRetryQR}>
                    <span className="btn-icon">🏦</span>
                    Net Banking
                  </button>
                </div>
              </div>
            )}

            {processingPayment && (
              <div className="processing-section">
                <div className="payment-loader">
                  <div className="loader-circle"></div>
                  <div className="loader-checkmark"></div>
                </div>
                <h4>Processing Your Payment</h4>
                <p>Please wait while we secure your booking...</p>
                <div className="processing-steps">
                  <div className="step active">Payment</div>
                  <div className="step">Verification</div>
                  <div className="step">Confirmation</div>
                </div>
              </div>
            )}

            {paymentSuccess && (
              <div className="success-section">
                <div className="success-animation">
                  <div className="success-circle"></div>
                  <div className="success-checkmark">✓</div>
                </div>
                <h4>Payment Successful!</h4>
                <p>Your booking has been confirmed. Preparing your travel details...</p>
              </div>
            )}
          </div>

          <div className="payment-security">
            <div className="security-features">
              <div className="security-badge">🔒 256-bit SSL Encrypted</div>
              <div className="security-badge">✅ Verified Payment Gateway</div>
              <div className="security-badge">🛡️ Fraud Protection</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Travel Bill Component
  const TravelBillPopup = () => {
    if (!showBillPopup || !travelBill) return null;

    return (
      <div className="bill-popup-overlay">
        <div className="bill-popup">
          <div className="bill-header">
            <div className="bill-header-content">
              <h3>🎉 Booking Confirmed!</h3>
              <p>Your Sikkim adventure awaits!</p>
            </div>
            <button className="close-btn" onClick={() => setShowBillPopup(false)}>×</button>
          </div>
          
          <div className="bill-content">
            <div className="bill-header-section">
              <div className="company-info">
                <div className="company-logo">🏔️</div>
                <div>
                  <h2>Sikkim Travels</h2>
                  <p>Your Trusted Travel Partner in Sikkim</p>
                </div>
              </div>
              <div className="bill-meta">
                <div className="booking-id">Booking ID: <span>{travelBill.bookingId}</span></div>
                <div className="bill-date">Date: {travelBill.date}</div>
                <div className="bill-time">Time: {travelBill.time}</div>
              </div>
            </div>

            <div className="bill-details">
              <div className="bill-section">
                <h4>🚗 Journey Details</h4>
                <div className="bill-row">
                  <span>From:</span>
                  <span className="highlight">{travelBill.from}</span>
                </div>
                <div className="bill-row">
                  <span>To:</span>
                  <span className="highlight">{travelBill.to}</span>
                </div>
                <div className="bill-row">
                  <span>Transport:</span>
                  <span>{travelBill.transportType} - {travelBill.provider}</span>
                </div>
                {!travelBill.isExternal && (
                  <div className="bill-row">
                    <span>Distance:</span>
                    <span>{travelBill.distance}</span>
                  </div>
                )}
                <div className="bill-row">
                  <span>Duration:</span>
                  <span>{travelBill.duration}</span>
                </div>
                <div className="bill-row">
                  <span>Passengers:</span>
                  <span>{travelBill.passengers}</span>
                </div>
              </div>

              <div className="bill-section">
                <h4>💰 Fare Breakdown</h4>
                <div className="bill-row">
                  <span>Base Fare:</span>
                  <span>₹{travelBill.baseFare}</span>
                </div>
                <div className="bill-row">
                  <span>GST (18%):</span>
                  <span>₹{travelBill.gst}</span>
                </div>
                <div className="bill-row">
                  <span>Convenience Fee:</span>
                  <span>₹{travelBill.convenienceFee}</span>
                </div>
                <div className="bill-row total">
                  <span>Total Amount:</span>
                  <span className="total-amount">₹{travelBill.totalAmount}</span>
                </div>
              </div>

              <div className="bill-section status-section">
                <h4>📋 Booking Status</h4>
                <div className="status-container">
                  <div className="status-badge confirmed">
                    <span className="status-icon">✅</span>
                    {travelBill.status}
                  </div>
                  <div className="status-timeline">
                    <div className="timeline-item active">
                      <div className="timeline-dot"></div>
                      <span>Booked</span>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <span>Confirmed</span>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <span>Completed</span>
                    </div>
                  </div>
                </div>
                <p className="status-note">Show this bill to the service provider. Keep a digital copy handy.</p>
              </div>

              <div className="bill-section tips">
                <h4>📌 Travel Tips & Instructions</h4>
                <div className="tips-grid">
                  <div className="tip-item">
                    <span className="tip-icon">🆔</span>
                    <span>Carry valid ID proof</span>
                  </div>
                  <div className="tip-item">
                    <span className="tip-icon">⏰</span>
                    <span>Arrive 15 minutes early</span>
                  </div>
                  <div className="tip-item">
                    <span className="tip-icon">📞</span>
                    <span>Save emergency contacts</span>
                  </div>
                  <div className="tip-item">
                    <span className="tip-icon">🧥</span>
                    <span>Dress for mountain weather</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bill-actions">
            <button className="action-btn print-btn" onClick={handlePrintBill}>
              <span className="btn-icon">🖨️</span>
              Print Bill
            </button>
            <button className="action-btn share-btn" onClick={handleShareBill}>
              <span className="btn-icon">📤</span>
              Share Bill
            </button>
            <button className="action-btn download-btn">
              <span className="btn-icon">📥</span>
              Download PDF
            </button>
            <button className="action-btn close-btn" onClick={() => setShowBillPopup(false)}>
              <span className="btn-icon">👍</span>
              Got It
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Search Results Component
  const SearchResults = () => {
    if (!showSearchResults || searchResults.length === 0) return null;

    return (
      <div className="search-results-dropdown" ref={searchRef}>
        {searchResults.map((result, index) => (
          <div
            key={index}
            className="search-result-item"
            onClick={() => handleSearchResultSelect(result)}
          >
            <div className="result-icon">
              {result.attractions ? '🏔️' : '🚗'}
            </div>
            <div className="result-content">
              <h4>{result.name || result.type}</h4>
              <p>{result.description}</p>
              <div className="result-meta">
                {result.attractions ? (
                  <span>📍 {result.type} • {result.attractions.length} attractions</span>
                ) : (
                  <span>🚗 {result.from} → {result.to}</span>
                )}
              </div>
            </div>
            <div className="result-action">
              <button className="view-btn">
                {result.attractions ? 'View' : 'Book'}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const transportTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'taxi', label: 'Taxi' },
    { value: 'bus', label: 'Bus' },
    { value: 'shared jeep', label: 'Shared Jeep' },
    { value: 'helicopter', label: 'Helicopter' },
    { value: 'rental car', label: 'Rental Car' }
  ];

  return (
    <div className="transportation-page">
      <div className="transportation-container">
        <div className="transportation-intro">
          <h2>🚗 Transportation in Sikkim</h2>
          <p>Plan your journey across the beautiful landscapes of Sikkim</p>
        </div>

        {/* Enhanced Map Search Section */}
        <div className="map-search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="🔍 Search destinations, transport, attractions..."
                value={mapSearchQuery}
                onChange={(e) => handleMapSearch(e.target.value)}
                className="map-search-input"
              />
              <SearchResults />
            </div>
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${currentView === 'destinations' ? 'active' : ''}`}
                onClick={() => setCurrentView('destinations')}
              >
                🏔️ Destinations
              </button>
              <button 
                className={`toggle-btn ${currentView === 'routes' ? 'active' : ''}`}
                onClick={() => setCurrentView('routes')}
              >
                🚗 Transport Routes
              </button>
            </div>
          </div>
        </div>

        {/* How to Reach Sikkim Section */}
        <div className="reach-sikkim-section">
          <h3>🚀 How to Reach Sikkim</h3>
          <div className="travel-options-grid">
            {travelToSikkimOptions.map(option => (
              <div key={option.id} className="travel-option-card">
                <div className="travel-icon">
                  {option.type === 'Flight' && '✈️'}
                  {option.type === 'Train' && '🚆'}
                  {option.type === 'Bus' && '🚌'}
                  {option.type === 'Helicopter' && '🚁'}
                </div>
                <h4>{option.type}</h4>
                <p className="travel-route">{option.from} → {option.to}</p>
                <p className="travel-desc">{option.description}</p>
                <div className="travel-details">
                  <span>⏱️ {option.duration}</span>
                  <span>💰 ₹{option.cost}</span>
                </div>
                <div className="travel-provider">
                  <strong>Provider:</strong> {option.provider}
                </div>
                <div className="travel-contact">
                  <strong>Contact:</strong> {option.contact}
                </div>
                {option.bookable && (
                  <button 
                    className="book-travel-option-btn"
                    onClick={() => handleBookTravelOption(option)}
                  >
                    Book This Journey
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="destinations-section">
          <h3>🏔️ Popular Destinations in Sikkim</h3>
          <div className="destinations-grid">
            {sikkimDestinations.map(destination => (
              <div 
                key={destination.id}
                className={`destination-card ${selectedDestination?.id === destination.id ? 'selected' : ''}`}
                onClick={() => handleDestinationSelect(destination)}
              >
                <div className="destination-header">
                  <h4>{destination.name}</h4>
                  <span className="destination-type">{destination.type}</span>
                </div>
                <p className="destination-desc">{destination.description}</p>
                <div className="destination-meta">
                  <span>📍 Altitude: {destination.altitude}</span>
                  <span>⏰ Best Time: {destination.bestTime}</span>
                </div>
                <div className="destination-popular">
                  <strong>Popular for:</strong> {destination.popularFor.join(', ')}
                </div>
                <div className="destination-attractions">
                  {destination.attractions.slice(0, 2).map((attr, idx) => (
                    <span key={idx} className="attraction-tag">{attr}</span>
                  ))}
                  {destination.attractions.length > 2 && (
                    <span className="attraction-more">+{destination.attractions.length - 2} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="transportation-content">
          <aside className="filters-sidebar transportation-filters">
            <div className="filters-section">
              <h3>Filters</h3>
              <SearchBar 
                placeholder="Search routes, providers..."
                onSearch={(payload) => {
                  const q = typeof payload === 'string' ? payload : payload?.query || '';
                  handleFilterChange({ searchQuery: q });
                }}
              />
              <div className="filter-row">
                <div>
                  <label>Transport Type</label>
                  <select value={filters.transportType} onChange={(e) => handleFilterChange({ transportType: e.target.value })}>
                    {transportTypes.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Max Price (₹)</label>
                  <input
                    type="range"
                    min={0}
                    max={10000}
                    step={100}
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange({ priceRange: [0, parseInt(e.target.value)] })}
                  />
                  <div>Up to ₹{filters.priceRange[1].toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            {selectedDestination && (
              <div className="destination-details-panel">
                <h3>📍 {selectedDestination.name}</h3>
                <p>{selectedDestination.description}</p>
                <div className="destination-stats">
                  <div className="stat">
                    <span className="label">Altitude</span>
                    <span className="value">{selectedDestination.altitude}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Best Time</span>
                    <span className="value">{selectedDestination.bestTime}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Type</span>
                    <span className="value">{selectedDestination.type}</span>
                  </div>
                </div>
                <div className="attractions-list">
                  <h4>Main Attractions:</h4>
                  {selectedDestination.attractions.map((attr, idx) => (
                    <div key={idx} className="attraction-item">• {attr}</div>
                  ))}
                </div>
                <button className="view-on-map-btn" onClick={() => setCurrentView('destinations')}>
                  📍 View on Map
                </button>
              </div>
            )}

            {selectedRoute && (
              <div className="route-details-panel">
                <h3>Selected Option</h3>
                <div className="detail-item"><span className="label">Provider:</span><span className="value">{selectedRoute.provider}</span></div>
                <div className="detail-item"><span className="label">Type:</span><span className="value">{selectedRoute.type}</span></div>
                <div className="detail-item"><span className="label">From:</span><span className="value">{selectedRoute.from}</span></div>
                <div className="detail-item"><span className="label">To:</span><span className="value">{selectedRoute.to}</span></div>
                <div className="detail-item"><span className="label">Distance:</span><span className="value">{selectedRoute.distance} km</span></div>
                <div className="detail-item"><span className="label">Duration:</span><span className="value">{selectedRoute.durationText}</span></div>
                <div className="detail-item"><span className="label">Contact:</span><span className="value">{selectedRoute.contact}</span></div>
                <div className="detail-item"><span className="label">Cost:</span><span className="value"><CostBadge cost={selectedRoute.cost} currency="INR" /></span></div>
                <button 
                  className="book-button"
                  onClick={() => handleBookNow(selectedRoute)}
                >
                  Book This Option
                </button>
              </div>
            )}
          </aside>

          <main className="transportation-main">
            <div className="transportation-map-container">
              <div className="map-header">
                <h3>🗺️ Sikkim Interactive Map</h3>
                <div className="map-controls">
                  <span className="map-view-info">
                    Viewing: {currentView === 'destinations' ? 'Destinations' : 'Transport Routes'}
                  </span>
                </div>
              </div>
              <div className="map-wrapper">
                <MapEmbed 
                  routes={filteredTransport} 
                  onRouteSelect={handleRouteSelect} 
                  selectedRoute={selectedRoute}
                  destinations={sikkimDestinations}
                  selectedDestination={selectedDestination}
                  currentView={currentView}
                  searchQuery={mapSearchQuery}
                />
              </div>
            </div>

            <div className="routes-section">
              <div className="section-header">
                <h3>Available Transport Options ({filteredTransport.length})</h3>
                <div className="sort-options">
                  <span>Sort by:</span>
                  <select onChange={(e) => handleFilterChange({ sortBy: e.target.value })}>
                    <option value="cost">Price</option>
                    <option value="type">Type</option>
                    <option value="provider">Provider</option>
                    <option value="distance">Distance</option>
                  </select>
                </div>
              </div>

              <div className="routes-grid">
                {filteredTransport.length > 0 ? (
                  filteredTransport.map((route) => (
                    <div 
                      key={route.id} 
                      className={`route-card ${selectedRoute?.id === route.id ? 'selected' : ''}`}
                      onClick={() => handleRouteSelect(route)}
                    >
                      <div className="route-header">
                        <h4>{route.from} → {route.to}</h4>
                        <CostBadge cost={route.cost} currency="INR" />
                      </div>
                      <div className="route-details">
                        <div className="detail">
                          <span className="icon">⏱️</span>
                          <span>{route.durationText}</span>
                        </div>
                        <div className="detail">
                          <span className="icon">🚗</span>
                          <span>{route.type}</span>
                        </div>
                        <div className="detail">
                          <span className="icon">📏</span>
                          <span>{route.distance} km</span>
                        </div>
                        <div className="detail">
                          <span className="icon">📞</span>
                          <span>{route.contact}</span>
                        </div>
                      </div>
                      <div className="route-actions">
                        <button className="action-btn">View Details</button>
                        <button 
                          className="action-btn primary"
                          onClick={(e) => handleBookNow(route, e)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <h4>No transportation options found</h4>
                    <p>Try adjusting your filters or select a different destination</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        <div className="transportation-info">
          <h3>📝 Travel Tips for Sikkim</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>🛂 Permits Required</h4>
              <p>Foreign nationals need Protected Area Permit (PAP) to visit Sikkim. Indian nationals need Inner Line Permit (ILP) for certain areas.</p>
            </div>
            <div className="tip-card">
              <h4>⏰ Best Travel Times</h4>
              <p>March to June and September to December are the best months to visit. Monsoon (July-August) can cause road disruptions.</p>
            </div>
            <div className="tip-card">
              <h4>💰 Cost Saving Tips</h4>
              <p>Shared jeeps are cheaper than private taxis. Book in advance during peak season for better rates.</p>
            </div>
            <div className="tip-card">
              <h4>🚗 Road Conditions</h4>
              <p>Mountain roads can be narrow and winding. Travel during daylight hours for safety.</p>
            </div>
          </div>
        </div>
      </div>

      <PaymentPopup />
      <TravelBillPopup />
    </div>
  );
};

export default Transportation;
