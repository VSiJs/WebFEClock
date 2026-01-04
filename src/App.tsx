import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Brands from './pages/Brands';
import BrandDetail from './pages/BrandDetail';
import Accessories from './pages/Accessories';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ScrollToTop from './utils/ScrollToTop';
import SearchResults from './pages/SearchResults';
import './styles/global.css';

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
                          <Route path="/dang-nhap" element={<Login />} />
                          <Route path="/dang-ky" element={<Register />} />
                          <Route path="/quen-mat-khau" element={<ForgotPassword />} />
                          <Route path="/tim-kiem" element={<SearchResults />} />
                          {/* Products */}
                          <Route path="/san-pham" element={<Products />} />
                          <Route path="/san-pham/:id" element={<ProductDetail />} />

                          {/* Categories */}
                          <Route path="/danh-muc" element={<Categories />} />
                          <Route path="/danh-muc/:category" element={<Products />} />
                          <Route path="/danh-muc/:category/:subcategory" element={<Products />} />

                          {/* Brands */}
                          <Route path="/thuong-hieu" element={<Brands />} />
                          <Route path="/thuong-hieu/:brandId" element={<BrandDetail />} />

                          {/* Cart & Checkout */}
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />

                          {/* Accessories */}
                          <Route path="/phu-kien" element={<Accessories />} />

                          {/* Fallback */}
                          <Route path="*" element={<Home />} />
                      </Routes>
                  </main>

                  <Footer />
              </div>
          </Router>
      </CartProvider>
  );
}

export default App;
