import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

import ScrollToTop from './utils/ScrollToTop';
import './App.css';

function App() {
  return (
      <CartProvider>
          <Router>
              {/* Reset scroll mỗi khi đổi route */}
              <ScrollToTop />

              <div className="app">
                  <Header />

                  <main className="main-content">
                      <Routes>
                          {/* Home */}
                          <Route path="/" element={<Home />} />
                          {/*{Auth}*/}

                          {/* Products */}

                          {/* Categories */}

                          {/* Brands */}

                          {/* Cart & Checkout */}

                          {/* Accessories */}

                          {/* Fallback */}

                      </Routes>
                  </main>

                  <Footer />
              </div>
          </Router>
      </CartProvider>
  );
}

export default App;
