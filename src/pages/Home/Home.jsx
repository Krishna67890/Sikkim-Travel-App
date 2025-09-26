// Home.jsx
import React from 'react';
import HeroSection from '../../components/sections/HeroSection/HeroSection';
import QuickFacts from '../../components/sections/QuickFacts/QuickFacts';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <QuickFacts />
    </div>
  );
};

export default Home;