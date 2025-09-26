// About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Sikkim Travel App</h1>
        <p>Discover the beauty of Sikkim with our comprehensive travel guide</p>
      </div>
      
      <div className="about-content">
        <section className="app-description">
          <h2>Our App</h2>
          <p>
            The Sikkim Travel App is your ultimate companion for exploring the breathtaking landscapes, 
            rich culture, and unique experiences that Sikkim has to offer. From the majestic Himalayas 
            to ancient monasteries, our app helps you plan your perfect trip to this northeastern paradise.
          </p>
        </section>
        
        <section className="development-team">
          <h2>Development Team</h2>
          <p className="team-intro">
            This application was developed by a dedicated team of developers:
          </p>
          <div className="team-members">
            <div className="team-member">
              <div className="member-avatar">KP</div>
              <h3>Krishna Patil Rajput</h3>
              <p>Lead Developer</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">DD</div>
              <h3>Darshan Deore</h3>
              <p>Frontend Developer</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">SC</div> 
              <h3>Shraddha Chavan</h3>
              <p>UI/UX Designer</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">CD</div>
              <h3>Chaitannya Deore</h3>
              <p>Backend Developer</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">DK</div>
              <h3>Diksha Khambayate</h3>
              <p>Content Specialist</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">ZB</div>
              <h3>Zalak Bora</h3>
              <p>Project Coordinator</p>
            </div>
          </div>
        </section>
        
        <section className="client-info">
          <h2>Our Client</h2>
          <div className="client-details">
            <div className="client-logo">
              <div className="logo-placeholder">MCER</div>
            </div>
            <div className="client-text">
              <h3>Matoshri College of Engineering and Research Center</h3>
              <p>
                We extend our gratitude to Matoshri College of Engineering and Research Center 
                for their support and collaboration in making this project possible. Their vision 
                for promoting technology in tourism has been instrumental in the development of this application.
              </p>
              <p className="client-location">Nashik, Maharashtra, India</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
