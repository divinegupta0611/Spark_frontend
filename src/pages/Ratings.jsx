import React, { useEffect, useState } from "react";
import "../style/RatingsCSS.css";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
export default function Ratings() {
  const [topLiked, setTopLiked] = useState([]);
  const [topDisliked, setTopDisliked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch top liked companies
      const likedRes = await fetch("http://localhost:5000/top-liked");
      if (!likedRes.ok) throw new Error("Failed to fetch top liked");
      const likedData = await likedRes.json();

      // Fetch top disliked companies
      const dislikedRes = await fetch("http://localhost:5000/top-disliked");
      if (!dislikedRes.ok) throw new Error("Failed to fetch top disliked");
      const dislikedData = await dislikedRes.json();

      setTopLiked(likedData.companies || []);
      setTopDisliked(dislikedData.companies || []);

    } catch (err) {
      console.error("Error fetching ratings:", err);
      setError("Failed to load ratings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (index) => {
    const medals = ["🥇", "🥈", "🥉"];
    return medals[index] || `#${index + 1}`;
  };

  return (
    <div className="ratings-container">
      <NavBar/>

      <div className="ratings-header">
        <h1>Company Rankings</h1>
        <p className="ratings-subtitle">
          See what the community thinks about companies
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading rankings...</p>
        </div>
      )}

      {/* Error Message */}
      {error && !loading && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {/* Ratings Content */}
      {!loading && !error && (
        <div className="ratings-content">
          {/* Top Liked Companies */}
          <div className="rating-section">
            <div className="section-header liked-header">
              <h2>
                <span className="icon">👍</span>
                Most Liked Companies
              </h2>
              <p>Top 10 companies loved by the community</p>
            </div>

            {topLiked.length === 0 ? (
              <div className="no-data">
                <p>No data available yet. Start rating companies!</p>
              </div>
            ) : (
              <div className="ranking-list">
                {topLiked.map((company, index) => (
                  <div key={company._id} className="ranking-card liked-card">
                    <div className="rank-badge liked-rank">
                      {getRankBadge(index)}
                    </div>
                    <div className="company-info">
                      <h3>{company.SYMBOL}</h3>
                      <div className="stats">
                        <span className="stat-item likes">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          {company.likes} likes
                        </span>
                        <span className="stat-item dislikes">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                          </svg>
                          {company.dislikes} dislikes
                        </span>
                      </div>
                    </div>
                    <div className="rating-score liked-score">
                      {company.likes}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Disliked Companies */}
          <div className="rating-section">
            <div className="section-header disliked-header">
              <h2>
                <span className="icon">👎</span>
                Most Disliked Companies
              </h2>
              <p>Top 10 companies with most dislikes</p>
            </div>

            {topDisliked.length === 0 ? (
              <div className="no-data">
                <p>No data available yet. Start rating companies!</p>
              </div>
            ) : (
              <div className="ranking-list">
                {topDisliked.map((company, index) => (
                  <div key={company._id} className="ranking-card disliked-card">
                    <div className="rank-badge disliked-rank">
                      {getRankBadge(index)}
                    </div>
                    <div className="company-info">
                      <h3>{company.SYMBOL}</h3>
                      <div className="stats">
                        <span className="stat-item likes">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          {company.likes} likes
                        </span>
                        <span className="stat-item dislikes">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                          </svg>
                          {company.dislikes} dislikes
                        </span>
                      </div>
                    </div>
                    <div className="rating-score disliked-score">
                      {company.dislikes}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}