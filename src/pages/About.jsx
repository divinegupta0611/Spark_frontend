// src/pages/About.jsx
import React from "react";
import "../style/AboutCSS.css";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
const About = () => {
  return (
    <div className="about-page">
      <NavBar/>

      {/* About Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-text">
            <h1>About Spark</h1>
            <p>
              Spark is a community-driven platform that lets users explore,
              rate, and review companies based on performance, innovation, and
              market sentiment. Our goal is to democratize financial insights
              and empower every individual investor.
            </p>
            <p>
              We believe in the power of crowdsourced intelligence — because the
              market is made by people, and their opinions matter.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          To make stock analysis more human, transparent, and accessible. Spark
          brings together investors and enthusiasts to share collective wisdom —
          helping everyone make smarter financial decisions.
        </p>

        <div className="mission-cards">
          <div className="mission-card">
            <h3>🚀 Empower Investors</h3>
            <p>Enable every individual to make data-driven investment choices.</p>
          </div>
          <div className="mission-card">
            <h3>💬 Community Insights</h3>
            <p>Gather genuine opinions from thousands of users in real-time.</p>
          </div>
          <div className="mission-card">
            <h3>📊 Transparency</h3>
            <p>Ensure clear, verified data for smarter company evaluations.</p>
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
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/ratings">Ratings</Link>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <a href="mailto:info@spark.com">info@spark.com</a>
            <a href="tel:8826613045">+91 8826613046</a>
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

export default About;
