import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const { getCartCount, openModal } = useCart();
  const cartCount = getCartCount();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleNavbarToggle = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const handleNavLinkClick = () => {
    setIsNavbarCollapsed(true);
    setShowOffcanvas(false);
  };

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };


  // Close offcanvas when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setShowOffcanvas(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar" style={{
        background: 'var(--brand-primary)',
        color: 'var(--text-white)',
        padding: 'var(--space-2) 0',
        fontSize: 'var(--font-size-sm)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center gap-4">
                <span>
                  <i className="bi bi-telephone me-1"></i>
                  +1 (555) 123-4567
                </span>
                <span>
                  <i className="bi bi-envelope me-1"></i>
                  support@shopcart.com
                </span>
              </div>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <div className="d-flex justify-content-end align-items-center gap-3">
                <span>Free shipping on orders over $50</span>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="navbar navbar-expand-lg " style={{
        background: '#647a67',
        color: 'var(--text-white)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 1020
      }}>
        <div className="container">
          {/* Desktop Logo Section - Hidden on mobile */}
          <Link 
            className="navbar-brand d-none d-lg-flex align-items-center" 
            to="/"
            style={{ textDecoration: 'none' }}
          >
            <div className="brand-text">
              <img src="https://i.ibb.co/cSPWys0j/capture-20250920212314006-removebg-preview.png" width={150} height={50} alt="Logo" />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <div className="d-lg-none">
            <button
              className="btn btn-outline-secondary d-flex align-items-center"
              onClick={toggleOffcanvas}
              style={{
                border: '2px solid var(--neutral-300)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-2)',
                background: 'var(--bg-primary)',
                transition: 'all var(--transition-normal)',
                width: '40px',
                height: '40px',
                justifyContent: 'center'
              }}
              title="Menu"
            >
              <i className="bi bi-list"></i>
            </button>
          </div>

          {/* Desktop Navigation Content - Hidden on mobile */}
          <div className="collapse navbar-collapse d-none d-lg-block" id="navbarNav">
            {/* Center Navigation */}
            <ul className="navbar-nav mx-auto mb-3 mb-lg-0">
              <li className="nav-item">
                <Link 
                  className={`nav-link fw-semibold px-3 py-0 ${isActive('/') ? 'active' : ''}`}
                  to="/"
                  onClick={handleNavLinkClick}
                  style={{
                    color: isActive('/') ? 'var(--brand-secondary)' : 'var(--text-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    transition: 'all var(--transition-normal)',
                    position: 'relative'
                  }}
                >
                  <i className="bi bi-house me-2"></i>
                  Home
                  {isActive('/') && (
                    <div className="nav-indicator" style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '30px',
                      height: '3px',
                      background: 'linear-gradient(90deg, var(--brand-secondary), var(--brand-accent))',
                      borderRadius: 'var(--radius-full)'
                    }}></div>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link fw-semibold px-3 py-0 ${isActive('/products') ? 'active' : ''}`}
                  to="/products"
                  onClick={handleNavLinkClick}
                  style={{
                    color: isActive('/products') ? 'var(--brand-secondary)' : 'var(--text-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    transition: 'all var(--transition-normal)',
                    position: 'relative'
                  }}
                >
                  <i className="bi bi-grid me-2"></i>
                  Products
                  {isActive('/products') && (
                    <div className="nav-indicator" style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '30px',
                      height: '3px',
                      background: 'linear-gradient(90deg, var(--brand-secondary), var(--brand-accent))',
                      borderRadius: 'var(--radius-full)'
                    }}></div>
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section - Search and Cart - Always Visible */}
          <div className="d-flex flex-row align-items-center gap-2">
            {/* Search Field - Always Visible */}
            <div className="search-container position-relative" ref={searchRef}>
              <div className="input-group" style={{
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                minWidth: '200px',
                maxWidth: '300px'
              }}>
                <input
                  className="form-control search-box"
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(e);
                    }
                  }}
                  style={{
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    padding: 'var(--space-2) var(--space-3)',
                    fontSize: 'var(--font-size-sm)',
                    border: '1px solid #b8d2b3 !important',
                  }}
                />
                <button 
                  className="btn border-0" 
                  type="button"
                  onClick={handleSearch}
                  style={{
                    background: 'linear-gradient(135deg, var(--brand-secondary), var(--brand-accent))',
                    color: '#020402',
                    padding: 'var(--space-2) var(--space-3)',
                    transition: 'all var(--transition-normal)',
                    border: 'none'
                  }}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>

            {/* Cart Icon - No Button Styling */}
            <div 
              className="position-relative d-flex align-items-center justify-content-center"
              onClick={openModal}
              style={{
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-lg)',
                transition: 'all var(--transition-normal)',
                color: 'var(--brand-secondary)',
                fontSize: '1.2rem'
              }}
              title="View Shopping Cart"
            >
              <i className="bi bi-cart3"></i>
              {cartCount > 0 && (
                <span 
                  className="position-absolute translate-middle badge rounded-pill"
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    minWidth: '15px',
                    height: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse 0.3s ease-in-out',
                    boxShadow: 'var(--shadow-md)',
                    top: '5px',
                    right: '-17px',
                    background: '#a9c5a0',
                    color: '#020402',
                  }}
                >
                  {cartCount}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Offcanvas for Navigation */}
      {showOffcanvas && (
        <>
          {/* Backdrop */}
          <div 
            className="offcanvas-backdrop show"
            onClick={() => setShowOffcanvas(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1040,
              animation: 'fadeIn 0.3s ease-out'
            }}
          ></div>
          
          {/* Offcanvas Panel */}
          <div 
            className="offcanvas offcanvas-start show"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '280px',
              height: '100vh',
              backgroundColor: 'white',
              zIndex: 1045,
              transform: 'translateX(0)',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '2px 0 20px rgba(0, 0, 0, 0.15)',
              borderRight: '1px solid #e9ecef',
              animation: 'slideInLeft 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            <div className="offcanvas-header" style={{ borderBottom: '1px solid #dee2e6', padding: '1rem' }}>
              <div className='offcanvas-image'>
                <img src="https://i.ibb.co/cSPWys0j/capture-20250920212314006-removebg-preview.png" alt="logo" height={45} />
              </div>
              <button 
              
                type="button" 
                className="btn-close offcanvas-close-button" 
                onClick={() => setShowOffcanvas(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body" style={{ padding: '1rem' }}>
              <div className="d-flex flex-column gap-3">
                <Link 
                  className={`btn btn-outline-primary d-flex align-items-center ${isActive('/') ? 'active' : ''}`}
                  to="/"
                  onClick={handleNavLinkClick}
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    color: isActive('/') ? 'var(--brand-secondary)' : 'var(--text-secondary)',
                    transition: 'all var(--transition-normal)',
                    textDecoration: 'none'
                  }}
                >
                  <i className="bi bi-house me-3"></i>
                  Home
                </Link>
                <Link 
                  className={`btn btn-outline-primary d-flex align-items-center ${isActive('/products') ? 'active' : ''}`}
                  to="/products"
                  onClick={handleNavLinkClick}
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    color: isActive('/products') ? 'var(--brand-secondary)' : 'var(--text-secondary)',
                    transition: 'all var(--transition-normal)',
                    textDecoration: 'none'
                  }}
                >
                  <i className="bi bi-grid me-3"></i>
                  Products
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
