import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Context Providers
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';

// Common Components
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import Loader from './components/common/Loader/Loader';
import Modal from './components/common/Modal/Modal';

// Card Components
import MonasteryCard from './components/cards/MonasteryCard';
import RouteCard from './components/cards/RouteCard';
import StayCard from "./components/cards/Staycard/StayCard";
import VideoCard from './components/cards/VideoCard';




// Section Components
import HeroSection from './components/sections/HeroSection/HeroSection';
import AttractionsGrid from './components/sections/AttractionsGrid/AttractionsGrid.jsx';
import QuickFacts from './components/sections/QuickFacts/QuickFacts.jsx';

// UI Components
import ConstBadge from './components/ui/CostBadge/CostBadge';
import FilterPanel from './components/ui/FilterPanel/FilterPanel';
import LanguageToggle from './components/ui/LanguageToggle/LanguageToggle';
import MapEmbed from './components/ui/MapEmbed/MapEmbed';
import SearchBar from './components/ui/SearchBar/SearchBar';

// Lazy-loaded Pages
const Home = lazy(() => import('./pages/Home/Home'));
const Destinations = lazy(() => import('./pages/Destinations/Destinations'));
const Itineraries = lazy(() => import('./pages/Itineraries/Itineraries'));
const Gallery = lazy(() => import('./pages/Gallery/Gallery'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const About = lazy(() => import('./pages/About/About'));
const Vlogs = lazy(() => import('./pages/Vlogs/Vlogs'));
const Transportation = lazy(() => import('./pages/Transportation/Transportation'));
const MonasteriesList = lazy(() => import('./pages/Monasteries/MonasteriesList'));
const MonasteryDetail = lazy(() => import('./pages/Monasteries/MonasteryDetail'));
const Accommodation = lazy(() => import('./pages/Accomodation/Accomodation'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

// Global Styles
import './styles/globals.css';
import './styles/variables.css';
import './styles/animations.css';


// Simple Error Boundary
class SimpleErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong loading this page.</h2>
          <button onClick={() => window.location.reload()} style={buttonStyle}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Styles
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  margin: '0 10px',
  padding: '5px 10px',
  borderRadius: '4px',
  transition: 'background-color 0.3s'
};

const pageStyle = {
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%'
};

const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
  marginTop: '20px'
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  width: '300px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const listStyle = {
  textAlign: 'left',
  maxWidth: '500px',
  margin: '0 auto'
};

const galleryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '15px',
  marginTop: '20px'
};

const imagePlaceholderStyle = {
  height: '200px',
  backgroundColor: '#ecf0f1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  border: '1px dashed #bdc3c7'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '500px',
  margin: '0 auto'
};

const inputStyle = {
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const buttonStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '10px'
};

// Main App Component
function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    // Listen for route changes
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <LanguageProvider>
      <AppProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="/" element={
                      <SimpleErrorBoundary>
                        <Home />
                      </SimpleErrorBoundary>
                    } />
                    <Route path="/destinations" element={
                      <SimpleErrorBoundary>
                        <Destinations />
                      </SimpleErrorBoundary>
                    } />
                    <Route path="/itineraries" element={
                      <SimpleErrorBoundary>
                        <Itineraries />
                      </SimpleErrorBoundary>
                    } />
                    <Route path="/gallery" element={
                      <SimpleErrorBoundary>
                        <Gallery />
                      </SimpleErrorBoundary>
                    } />
                    <Route path="/contact" element={
                      <SimpleErrorBoundary>
                        <Contact />
                      </SimpleErrorBoundary>
                    } />
                    <Route path="/about" element={
                      <SimpleErrorBoundary>
                        <About />
                      </SimpleErrorBoundary>
                    } />
                    <Route path="/vlogs" element={
                      <SimpleErrorBoundary>
                        <Vlogs />
                      </SimpleErrorBoundary>
                    } />
                    <Route path="/transportation" element={
                      <SimpleErrorBoundary>
                        <Transportation />
                      </SimpleErrorBoundary>
                    } />
                    <Route path="/monasteries" element={
                      <SimpleErrorBoundary>
                        <MonasteriesList />
                      </SimpleErrorBoundary>
                    } />
                    <Route path="/monasteries/:id" element={
                      <SimpleErrorBoundary>
                        <MonasteryDetail />
                      </SimpleErrorBoundary>
                    } />
                    <Route path="/accommodation" element={
                      <SimpleErrorBoundary>
                        <Accommodation />
                      </SimpleErrorBoundary>
                    } />
                    <Route path="*" element={
                      <SimpleErrorBoundary>
                        <NotFound />
                      </SimpleErrorBoundary>
                    } />
                  </Routes>
                </Suspense>
            </main>
            <Footer />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              {modalContent}
            </Modal>
          </div>
        </Router>
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;