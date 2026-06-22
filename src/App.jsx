import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import Story from './pages/Story';
import Menu from './pages/Menu';
import Products from './pages/Products';
import Membership from './pages/Membership';
import News from './pages/News';
import Contact from './pages/Contact';
import Petals from './components/Petals';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('genxpks_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from local storage', e);
    }
  }, []);

  // Save cart to LocalStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('genxpks_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to local storage', e);
    }
  }, [cartItems]);

  const handleAddToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((item) => item.id === newItem.id);
      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prevItems, newItem];
    });
    
    // Auto open cart drawer to show items added
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const getTotalCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Falling Petals Background */}
        <Petals />

        {/* Navigation Header */}
        <Header 
          cartCount={getTotalCartItemsCount()} 
          onCartOpen={() => setIsCartOpen(true)} 
        />

        {/* Global Cart Slide-out Drawer */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />

        {/* Main Content Router */}
        <main className="main-content-area">
          <Routes>
            <Route path="/" element={<Home onSelectProduct={handleAddToCart} />} />
            <Route path="/story" element={<Story />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer info & links */}
        <Footer />
      </div>

      <style>{`
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-content-area {
          flex-grow: 1;
        }
      `}</style>
    </Router>
  );
}
