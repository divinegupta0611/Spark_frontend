import React, { useEffect, useState } from "react";
import "../style/ExploreCSS.css";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
export default function Explore() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);

  const fetchNews = async (symbol) => {
    try {
      setNewsLoading(true);
      const res = await fetch(`http://localhost:5000/company-news/${symbol}`);
      
      if (!res.ok) {
        throw new Error("Failed to fetch news");
      }
      
      const result = await res.json();
      console.log("📰 News data:", result);
      setNews(result.news || []);
      
    } catch (err) {
      console.error("Error fetching news:", err);
      setNews([]);
    } finally {
      setNewsLoading(false);
    }
  };

  const fetchRandomData = async () => {
    try {
      setLoading(true);
      setError(null);
      setLiked(null);
      
      const res = await fetch("http://localhost:5000/random-nse");
      
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      
      const result = await res.json();
      console.log("Random company data:", result);
      setData(result);
      
      // Fetch news for this company
      if (result.symbol) {
        fetchNews(result.symbol);
      }
      
    } catch (err) {
      console.error("Error fetching:", err);
      setError("Failed to load company data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!data || !data.symbol) {
      console.error("No company data to like");
      return;
    }

    console.log("Liking company:", data.symbol);
    setLiked(true);

    try {
      const res = await fetch("http://localhost:5000/like-company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ symbol: data.symbol })
      });

      if (!res.ok) {
        throw new Error("Failed to save like");
      }

      const result = await res.json();
      console.log("✅ Like saved successfully:", result);

    } catch (err) {
      console.error("❌ Error saving like:", err);
    }

    setTimeout(() => {
      fetchRandomData();
    }, 600);
  };

  const handleDislike = async () => {
    if (!data || !data.symbol) {
      console.error("No company data to dislike");
      return;
    }

    console.log("Disliking company:", data.symbol);
    setLiked(false);

    try {
      const res = await fetch("http://localhost:5000/dislike-company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ symbol: data.symbol })
      });

      if (!res.ok) {
        throw new Error("Failed to save dislike");
      }

      const result = await res.json();
      console.log("✅ Dislike saved successfully:", result);

    } catch (err) {
      console.error("❌ Error saving dislike:", err);
    }

    setTimeout(() => {
      fetchRandomData();
    }, 600);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const trimmedQuery = searchQuery.trim();
    
    if (!trimmedQuery) {
      alert("Please enter a company symbol");
      return;
    }

    console.log("Searching for:", trimmedQuery);

    try {
      setLoading(true);
      setError(null);
      setLiked(null);
      
      const res = await fetch(`http://localhost:5000/search-nse?symbol=${encodeURIComponent(trimmedQuery)}`);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to search company");
      }
      
      const result = await res.json();
      console.log("Search result:", result);
      setData(result);
      setSearchQuery("");
      
      // Fetch news for searched company
      if (result.symbol) {
        fetchNews(result.symbol);
      }
      
    } catch (err) {
      console.error("Error searching:", err);
      const errorMessage = err.message || "Company not found. Please check the symbol and try again.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomData();
  }, []);

  const getCompanyDetails = () => {
    if (!data) return null;

    if (!data.nseData) {
      return {
        symbol: data.symbol || "N/A",
        companyName: data.symbol || "N/A",
        industry: "N/A",
        lastPrice: "N/A",
        change: 0,
        pChange: 0,
        open: "N/A",
        close: "N/A",
        weekHigh: "N/A",
        weekLow: "N/A",
        pe: "N/A",
        sector: "N/A",
        likes: data.likes || 0,
        dislikes: data.dislikes || 0
      };
    }

    const nseData = data.nseData;
    const info = nseData.info || {};
    const metadata = nseData.metadata || {};
    const priceInfo = nseData.priceInfo || {};
    const industryInfo = nseData.industryInfo || {};

    return {
      symbol: info.symbol || data.symbol || "N/A",
      companyName: info.companyName || metadata.companyName || "N/A",
      industry: info.industry || metadata.industry || industryInfo.basicIndustry || "N/A",
      lastPrice: priceInfo.lastPrice || "N/A",
      change: priceInfo.change || 0,
      pChange: priceInfo.pChange || 0,
      open: priceInfo.open || "N/A",
      close: priceInfo.close || "N/A",
      weekHigh: priceInfo.weekHighLow?.max || "N/A",
      weekLow: priceInfo.weekHighLow?.min || "N/A",
      pe: metadata.pdSymbolPe || "N/A",
      sector: industryInfo.sector || "N/A",
      likes: data.likes || 0,
      dislikes: data.dislikes || 0
    };
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      
      if (diffDays === 0) {
        if (diffHours === 0) return "Just now";
        return `${diffHours}h ago`;
      } else if (diffDays === 1) {
        return "Yesterday";
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else {
        return date.toLocaleDateString();
      }
    } catch {
      return dateString;
    }
  };

  const company = getCompanyDetails();

  return (
    <div className="explore-container">
      <NavBar/>
      
      <div className="explore-header">
        <h1>Explore Companies</h1>
        <p className="explore-subtitle">Swipe through companies and share your opinion</p>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by company symbol (e.g., RELIANCE, TCS, INFY)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          Search
        </button>
      </form>

      {error && !loading && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading company data...</p>
        </div>
      )}

      {!loading && company && (
        <div className="content-wrapper">
          {/* Company Card */}
          <div className={`company-card-container ${liked === true ? 'slide-right' : liked === false ? 'slide-left' : ''}`}>
            <div className="company-card-explore">
              <div className="card-header-explore">
                <div>
                  <h3>{company.companyName}</h3>
                  <span className="symbol-explore">{company.symbol}</span>
                  <div className="stats-badges">
                    <span className="stat-badge like-badge">
                      👍 {company.likes}
                    </span>
                    <span className="stat-badge dislike-badge">
                      👎 {company.dislikes}
                    </span>
                  </div>
                </div>
                <div className="price-badge-explore">
                  ₹{company.lastPrice}
                </div>
              </div>

              <div className="card-body-explore">
                <div className="info-grid-explore">
                  <div className="info-item-explore">
                    <span className="label-explore">Industry</span>
                    <span className="value-explore">{company.industry}</span>
                  </div>
                  <div className="info-item-explore">
                    <span className="label-explore">Sector</span>
                    <span className="value-explore">{company.sector}</span>
                  </div>
                  <div className="info-item-explore">
                    <span className="label-explore">Open</span>
                    <span className="value-explore">₹{company.open}</span>
                  </div>
                  <div className="info-item-explore">
                    <span className="label-explore">Close</span>
                    <span className="value-explore">₹{company.close}</span>
                  </div>
                  <div className="info-item-explore">
                    <span className="label-explore">Day Change</span>
                    <span className={`value-explore ${company.change < 0 ? 'negative' : 'positive'}`}>
                      {typeof company.change === 'number' ? company.change.toFixed(2) : company.change} 
                      {typeof company.pChange === 'number' ? ` (${company.pChange.toFixed(2)}%)` : ''}
                    </span>
                  </div>
                  <div className="info-item-explore">
                    <span className="label-explore">P/E Ratio</span>
                    <span className="value-explore">{company.pe}</span>
                  </div>
                  <div className="info-item-explore">
                    <span className="label-explore">52W High</span>
                    <span className="value-explore">₹{company.weekHigh}</span>
                  </div>
                  <div className="info-item-explore">
                    <span className="label-explore">52W Low</span>
                    <span className="value-explore">₹{company.weekLow}</span>
                  </div>
                </div>
              </div>

              <div className="card-actions-explore">
                <button 
                  className="action-btn-explore dislike-btn-explore" 
                  onClick={handleDislike}
                  disabled={loading}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button 
                  className="action-btn-explore like-btn-explore" 
                  onClick={handleLike}
                  disabled={loading}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* News Section */}
          <div className="news-section">
            <h2 className="news-title">
              📰 Latest News - {company.symbol}
            </h2>
            
            {newsLoading && (
              <div className="news-loading">
                <div className="spinner-small"></div>
                <p>Loading news...</p>
              </div>
            )}

            {!newsLoading && news.length === 0 && (
              <div className="no-news">
                <p>No recent news available for this company</p>
              </div>
            )}

            {!newsLoading && news.length > 0 && (
              <div className="news-list">
                {news.map((article, index) => (
                  <a 
                    key={index} 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="news-card"
                  >
                    <div className="news-header">
                      <span className="news-number">{index + 1}</span>
                      <span className="news-source">{article.source}</span>
                    </div>
                    <h3 className="news-headline">{article.title}</h3>
                    <div className="news-footer">
                      <span className="news-date">{formatDate(article.pubDate)}</span>
                      <span className="news-read-more">Read more →</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}