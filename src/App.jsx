
// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HeroSlider from './components/HeroSlider';
import ProductList from './components/ProductList';
import ContactUs from './components/ContactUs';
import CartPage from './components/CartPage';
import './App.css';
import products from './data/products';
// import AdminProductManager from './components/AdminProductManager';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleCartChange = (product, quantityChange) => {
    setCartItems(prevCart => {
      const existing = prevCart.find(p => p.id === product.id);
      if (existing) {
        return prevCart
          .map(p =>
            p.id === product.id
              ? { ...p, quantity: Math.max(0, p.quantity + quantityChange) }
              : p
          )
          .filter(p => p.quantity > 0);
      } else if (quantityChange > 0) {
        return [...prevCart, { ...product, quantity: quantityChange }];
      }
      return prevCart;
    });
  };

  const handleRemoveFromCart = productId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <MainLayout cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/products"
            element={<ProductList products={products} onCartChange={handleCartChange} />}
          />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/cart"
            element={<CartPage cartItems={cartItems} onRemove={handleRemoveFromCart} />}
          />
         
        </Routes>
      </MainLayout>
    </Router>
  );
};

const MainLayout = ({ children, cartCount }) => (
  <div>
    <TopNav cartCount={cartCount} />
    <div className="main-content">{children}</div>
  </div>
);

const TopNav = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="top-nav">
      <div className="nav-container">
        

        <button className="hamburger-menu" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
         
          <li><Link to="/products" onClick={() => setIsOpen(false)}>Producters</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
          <li className="cart-link">
            <Link to="/cart" onClick={() => setIsOpen(false)}>🛒 Cart</Link>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

const LandingPage = () => (
  <div className="landing-wrapper">
    <HeroSlider />
  </div>
);

export default App;
