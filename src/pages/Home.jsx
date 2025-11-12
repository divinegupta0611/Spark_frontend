import React, { useState } from 'react';
import '../style/HomeCSS.css';
import rocketImage from '../assets/rocket.png';  // ✅ Correct import
import { Link } from "react-router-dom";
import NavBar from '../components/NavBar';
const Home = () => {
  const [liked, setLiked] = useState(null);

  const sampleCompany = {
    symbol: "RELIANCE",
    companyName: "Reliance Industries Limited",
    industry: "Refineries & Marketing",
    lastPrice: 1480,
    change: -16.1,
    pChange: -1.08,
    open: 1494.6,
    close: 1478,
    weekHigh: 1551,
    weekLow: 1114.85,
    marketCap: "₹20,02,807 Cr",
    pe: 21.53,
    sector: "Oil Gas & Consumable Fuels"
  };

  const handleLike = () => {
    setLiked(true);
    setTimeout(() => setLiked(null), 1000);
  };

  const handleDislike = () => {
    setLiked(false);
    setTimeout(() => setLiked(null), 1000);
  };

  return (
    <div className="app">
      {/* Header */}
      <NavBar/>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <h1>Discover & Rate Companies</h1>
            <p className="hero-description">
              Swipe through companies, explore their performance, and share your opinion. 
              It's like Tinder, but for the stock market! Help build a community-driven 
              ranking system based on real insights and public sentiment.
            </p>
            <button className="explore-btn"><Link to="/explore"className="explore-btn">Explore Companies</Link></button>
          </div>
          <div className="hero-right">
            <div className="rocket-container">
              <img src={rocketImage} alt="Rocket" className="rocket-image" /> {/* ✅ Use variable */}
              <div className="rocket-trail"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Card Section */}
      <section className="card-demo">
        <h2>See How It Works</h2>
        <p className="card-demo-subtitle">Swipe right to like, left to dislike</p>
        
        <div className={`company-card ${liked === true ? 'liked' : liked === false ? 'disliked' : ''}`}>
          <div className="card-header">
            <div>
              <h3>{sampleCompany.companyName}</h3>
              <span className="symbol">{sampleCompany.symbol}</span>
            </div>
            <div className="price-badge">
              ₹{sampleCompany.lastPrice}
            </div>
          </div>

          <div className="card-body">
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Industry</span>
                <span className="value">{sampleCompany.industry}</span>
              </div>
              <div className="info-item">
                <span className="label">Sector</span>
                <span className="value">{sampleCompany.sector}</span>
              </div>
              <div className="info-item">
                <span className="label">Open</span>
                <span className="value">₹{sampleCompany.open}</span>
              </div>
              <div className="info-item">
                <span className="label">Close</span>
                <span className="value">₹{sampleCompany.close}</span>
              </div>
              <div className="info-item">
                <span className="label">Day Change</span>
                <span className={`value ${sampleCompany.change < 0 ? 'negative' : 'positive'}`}>
                  {sampleCompany.change.toFixed(2)} ({sampleCompany.pChange.toFixed(2)}%)
                </span>
              </div>
              <div className="info-item">
                <span className="label">P/E Ratio</span>
                <span className="value">{sampleCompany.pe}</span>
              </div>
              <div className="info-item">
                <span className="label">52W High</span>
                <span className="value">₹{sampleCompany.weekHigh}</span>
              </div>
              <div className="info-item">
                <span className="label">52W Low</span>
                <span className="value">₹{sampleCompany.weekLow}</span>
              </div>
              <div className="info-item">
                <span className="label">Market Cap</span>
                <span className="value">{sampleCompany.marketCap}</span>
              </div>
            </div>
          </div>

          <div className="card-actions">
            <button className="action-btn dislike-btn" onClick={handleDislike}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="action-btn like-btn" onClick={handleLike}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Spark</h4>
            <p>Your platform for rating and discovering companies</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#about">About Us</a>
            <a href="#how">How It Works</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <a href="mailto:info@spark.com">info@spark.com</a>
            <a href="tel:8826613046">+91 8826613046</a>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#twitter">Twitter</a>
              <a href="#linkedin">LinkedIn</a>
              <a href="#instagram">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Spark. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;