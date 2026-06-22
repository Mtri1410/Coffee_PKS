import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Flower } from 'lucide-react';

export default function Header({ cartCount, onCartOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Chuyện Bông Biêng', path: '/story' },
    { name: 'Thực đơn', path: '/menu' },
    { name: 'Sản phẩm', path: '/products' },
    { name: 'Thành viên', path: '/membership' },
    { name: 'Tin tức', path: '/news' },
    { name: 'Liên hệ', path: '/contact' }
  ];

  return (
    <>
      <header className={`fixed-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo Section */}
          <Link to="/" className="logo-area">
            <Flower className="logo-icon" size={26} />
            <span className="logo-text">Bông Biêng</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link-item ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Utility Actions */}
          <div className="header-actions">
            <button 
              onClick={onCartOpen} 
              className="action-btn cart-trigger" 
              aria-label="Mở giỏ hàng"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="cart-badge-count">{cartCount}</span>}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="action-btn mobile-menu-toggle"
              aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <Link to="/" className="logo-area" onClick={() => setIsMobileMenuOpen(false)}>
              <Flower className="logo-icon" size={24} />
              <span className="logo-text">Bông Biêng</span>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="close-drawer-btn">
              <X size={24} />
            </button>
          </div>
          <nav className="mobile-links-grid">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`mobile-link-item ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="mobile-nav-footer">
            <button onClick={() => { setIsMobileMenuOpen(false); onCartOpen(); }} className="btn btn-primary w-full">
              <ShoppingBag size={18} style={{ marginRight: '8px' }} />
              Giỏ hàng ({cartCount})
            </button>
            <p className="mobile-nav-slogan">Dệt hương thanh, dịu vị trà</p>
          </div>
        </div>
      </div>

      <style>{`
        .fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          z-index: 100;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: var(--transition-smooth);
        }

        .fixed-header.scrolled {
          background: rgba(250, 247, 240, 0.9);
          backdrop-filter: blur(8px);
          height: 70px;
          border-bottom: 1px solid rgba(85, 111, 82, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }

        .header-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--color-text-primary);
          z-index: 101;
        }

        .logo-icon {
          color: var(--color-primary);
          animation: float 6s ease-in-out infinite;
        }

        .logo-text {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link-item {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text-primary);
          position: relative;
          padding: 6px 0;
        }

        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--color-primary);
          transition: var(--transition-smooth);
        }

        .nav-link-item:hover::after,
        .nav-link-item.active::after {
          width: 100%;
        }

        .nav-link-item.active {
          color: var(--color-primary);
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .action-btn {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-primary);
          transition: var(--transition-smooth);
        }

        .action-btn:hover {
          background-color: var(--color-accent-gold-light);
          color: var(--color-primary);
        }

        .cart-trigger {
          border: 1px solid rgba(85, 111, 82, 0.15);
        }

        .cart-badge-count {
          position: absolute;
          top: -2px;
          right: -2px;
          background-color: var(--color-primary);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--color-bg-primary);
        }

        .mobile-menu-toggle {
          display: none;
        }

        /* Mobile Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 320px;
          height: 100%;
          background-color: var(--color-bg-secondary);
          z-index: 200;
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-nav-drawer.open {
          right: 0;
        }

        .mobile-nav-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 24px;
        }

        .mobile-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .close-drawer-btn {
          color: var(--color-text-secondary);
          padding: 4px;
        }

        .mobile-links-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
          flex-grow: 1;
        }

        .mobile-link-item {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--color-text-primary);
          padding: 8px 0;
          border-bottom: 1px solid var(--color-bg-primary);
        }

        .mobile-link-item.active {
          color: var(--color-primary);
          font-weight: 600;
          border-bottom-color: var(--color-primary);
        }

        .mobile-nav-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-nav-slogan {
          text-align: center;
          font-size: 0.8rem;
          color: var(--color-accent-gold);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .w-full {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-toggle {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
