import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import HomePage from './components/HomePage'
import AllProductsPage from './components/AllProductsPage'
import CartModal from './components/CartModal'

function App() {
  return (
    <CartProvider>
      <div className="App min-vh-100 d-flex flex-column">
        {/* Header Component */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/products/:brand" element={<AllProductsPage />} />
            <Route path="/search/:query" element={<AllProductsPage />} />
          </Routes>
        </main>
        
        {/* Enhanced Footer */}
        <footer className="mt-auto" style={{
          background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--secondary-800) 100%)',
          color: 'var(--text-white)',
          padding: 'var(--space-16) 0 var(--space-8)'
        }}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h5 className="fw-bold mb-3" style={{ color: 'var(--brand-accent)' }}>ShopCart</h5>
                <p className="text-muted mb-3">
                  Your one-stop destination for premium products with exceptional quality and service.
                </p>
                <div className="d-flex gap-3">
                  <a href="#" className="text-muted" style={{ fontSize: '1.5rem' }}>
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="text-muted" style={{ fontSize: '1.5rem' }}>
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="text-muted" style={{ fontSize: '1.5rem' }}>
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="text-muted" style={{ fontSize: '1.5rem' }}>
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-3">
                <h6 className="fw-semibold mb-3">Quick Links</h6>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="/" className="text-muted text-decoration-none">Home</a></li>
                  <li className="mb-2"><a href="/products" className="text-muted text-decoration-none">Products</a></li>
                </ul>
              </div>
              <div className="col-md-3">
                <h6 className="fw-semibold mb-3">Support</h6>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Help Center</a></li>
                  <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Shipping Info</a></li>
                  <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Returns</a></li>
                  <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <hr className="my-4" style={{ borderColor: 'var(--secondary-600)' }} />
            <div className="text-center">
              <p className="text-muted mb-0">
                © 2025 Cartify. Built with React & Bootstrap. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
        
        {/* Cart Modal */}
        <CartModal />
      </div>
    </CartProvider>
  )
}

export default App