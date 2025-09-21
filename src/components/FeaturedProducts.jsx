import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Load products from the JSON file
    const loadProducts = async () => {
      try {
        const response = await fetch('/products.json');
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        const data = await response.json();
        setProducts(data);
        
        // Select first 6 products as featured (you can modify this logic)
        setFeaturedProducts(data.slice(0, 6));
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <section className="featured-products py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title mb-3">Featured Products</h2>
            <p className="text-muted">Handpicked products just for you</p>
          </div>
          
          <div className="row g-4 mb-4">
            {Array(6).fill(null).map((_, index) => (
              <div key={index} className="col-md-6 col-lg-4">
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-products py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title featured-title mb-3" style={{color : '#c5efcb'}}>Featured Products</h2>
          <p style={{color :'#a9c5a0'}}>Handpicked products just for you</p>
        </div>
        
        <div className="row g-4 mb-4">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        
        <div className="text-center">
          <button 
          style={{border:'1px solid #fff' }}
            className="btn btn-primary btn-lg"
            onClick={handleViewAllProducts}
          >
            <i className="bi bi-grid me-2"></i>
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;