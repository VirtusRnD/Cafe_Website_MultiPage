import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { ReactLenis } from "lenis/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SEO from "./components/SEO";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import OurStoryPage from "./pages/OurStoryPage";
import ReviewsPage from "./pages/ReviewsPage";
import MenuPage from "./pages/MenuPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <Router>
        <ReactLenis
          root
          options={{ lerp: 0.1, duration: 1.2, smoothTouch: false }}
        >
          {/* 👑 ÇÖZÜM 1: ScrollToTop artık ReactLenis'in içinde, böylece onun özelliklerini kullanabilecek */}
          <ScrollToTop />

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/menu" element={<MenuPage />} />
          </Routes>

          <Footer />
        </ReactLenis>
      </Router>
    </HelmetProvider>
  );
}

export default App;
