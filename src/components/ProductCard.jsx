import { useState } from 'react';

const ProductCard = ({ product, onAddToCart, viewMode = 'grid' }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    onAddToCart(product);
    
    // Simulate loading state
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };
  return (
    <div className="col-md-6 col-lg-4">
      <div 
        className="card h-100 shadow-sm product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="card-img-top-container position-relative" style={{ height: '280px', overflow: 'hidden' }}>
          <img
            src={product.image}
            className="card-img-top h-100 w-100"
            style={{ objectFit: 'cover' }}
            alt={product.name}
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div 
            className={`position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center transition-all ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(245, 158, 11, 0.8))',
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            <div className="text-center text-white">
              <i className="bi bi-eye-fill display-4 mb-2"></i>
              <p className="mb-0 fw-semibold">Quick View</p>
            </div>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="card-body d-flex flex-column p-4">
          {/* Product Info */}
          <div className="product-info mb-3">
            <h5 className="card-title product-name">{product.name}</h5>
            {product.brand && (
              <p className="card-text text-muted mb-2 product-brand">
                <i className="bi bi-tag me-1"></i>
                {product.brand}
              </p>
            )}
            {product.category && (
              <span className="badge mb-2 product-category">
                {product.category}
              </span>
            )}
          </div>
          
          {/* Price and Add to Cart */}
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="h4 text-primary mb-0 product-price">
                ${product.price}
              </span>
            </div>
            
            <button 
              className={`btn w-100 add-to-cart-btn position-relative ${
                isAdding ? 'disabled' : ''
              }`}
              onClick={handleAddToCart}
              disabled={isAdding}
              style={{border: "1px solid white", color: '#c6dec6'}}
            >
              {isAdding ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" style={{color: '#c6dec6'}} role="status" aria-hidden="true"></span>
                  Adding...
                </>
              ) : (
                <>
                  <i className="bi bi-cart-plus me-2"></i>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
