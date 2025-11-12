import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import Ratings from "./pages/Ratings.jsx";
import About from "./pages/About.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
