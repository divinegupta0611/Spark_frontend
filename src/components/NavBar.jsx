import React from 'react'
import "../style/NavBarCSS.css";
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <div>
      <header className="header">
              <div className="logo">Spark</div>
              <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/explore">Explore</Link>
                <Link to="/ratings">Ratings</Link>
                <Link to="/about">About</Link>
              </nav>
            </header>
    </div>
  )
}

export default NavBar
