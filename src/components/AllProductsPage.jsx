import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import ProductCard from './ProductCard';

const AllProductsPage = () => {
  const { brand } = useParams();
  const location = useLocation();
  
  // Extract search query from URL pathname
  const searchQuery = location.pathname.startsWith('/search/') 
    ? decodeURIComponent(location.pathname.split('/search/')[1])
    : '';
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(brand || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [priceRange, setPriceRange] = useState({ min: '', max: '', predefined: '' });
  const [currentSearchQuery, setCurrentSearchQuery] = useState(searchQuery);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const productsPerPage = 12;
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/products.json');
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Update brand and search query when URL params change
  useEffect(() => {
    setSelectedBrand(brand || '');
    setCurrentSearchQuery(searchQuery);
  }, [brand, searchQuery]);

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let filtered = [...products];

    // Filter by search query
    if (currentSearchQuery) {
      const query = currentSearchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter(product => 
        product.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by price range
    if (priceRange.min !== '') {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max !== '') {
      filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
    }

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'brand':
          aValue = a.brand.toLowerCase();
          bValue = b.brand.toLowerCase();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, currentSearchQuery, selectedBrand, selectedCategory, sortBy, sortOrder, priceRange]);

  // Get unique brands and categories for filter options
  const brands = [...new Set(products.map(product => product.brand))];
  const categories = [...new Set(products.map(product => product.category))];

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleClearFilters = () => {
    setSelectedBrand('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '', predefined: '' });
    setSortBy('name');
    setSortOrder('asc');
    setCurrentSearchQuery('');
    setShowOffcanvas(false); // Close offcanvas on mobile
  };

  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="all-products-page">
      <div className="container mt-4">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
              <div className="d-flex align-items-center justify-content-between w-100">
                <div>
                  <h2 className="mb-2">All Products</h2>
                  <p className="text-muted mb-0">
                    {filteredProducts.length} products found
                    {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
                    {currentSearchQuery && ` • Search: "${currentSearchQuery}"`}
                    {selectedBrand && ` • Brand: ${selectedBrand}`}
                    {selectedCategory && ` • Category: ${selectedCategory}`}
                  </p>
                </div>
                
                {/* Mobile Filter Toggle */}
                <div className="d-lg-none">
                  <button
                    className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                    onClick={() => setShowOffcanvas(true)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      border: '2px solid #c5efcb',
                      background: 'transparent',
                      transition: 'all 0.3s ease'
                    }}
                    title="Filters & Sorting"
                  >
                    <i className="bi bi-funnel fs-5"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Desktop Filters Sidebar */}
          <div className="col-lg-3 mb-4 d-none d-lg-block">
            <div className="filter-sidebar">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Filters & Sorting</h5>
              </div>
              
              {/* Brand Filter */}
              <div className="filter-group mb-4">
                <h6>Brand</h6>
                <select
                  className="form-select form-select-sm"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="filter-group mb-4">
                <h6>Category</h6>
                <select
                  className="form-select form-select-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="filter-group mb-4">
                <h6>Price Range</h6>
                <select
                  className="form-select form-select-sm mb-2"
                  value={priceRange.predefined || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      setPriceRange({ min: '', max: '', predefined: '' });
                    } else if (value === '0-100') {
                      setPriceRange({ min: '0', max: '100', predefined: '0-100' });
                    } else if (value === '100-500') {
                      setPriceRange({ min: '100', max: '500', predefined: '100-500' });
                    } else if (value === '500-1000') {
                      setPriceRange({ min: '500', max: '1000', predefined: '500-1000' });
                    } else if (value === '1000+') {
                      setPriceRange({ min: '1000', max: '', predefined: '1000+' });
                    }
                  }}
                >
                  <option value="">All Prices</option>
                  <option value="0-100">$0 - $100</option>
                  <option value="100-500">$100 - $500</option>
                  <option value="500-1000">$500 - $1000</option>
                  <option value="1000+">$1000+</option>
                </select>
                
                <div className="row g-2">
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Min $"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value, predefined: '' }))}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Max $"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value, predefined: '' }))}
                    />
                  </div>
                </div>
                <small className="text-muted">Or enter custom range above</small>
              </div>

              {/* Sort Options */}
              <div className="filter-group mb-4">
                <h6>Sort By</h6>
                <div className="mb-2">
                  <select
                    className="form-select form-select-sm"
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field);
                      setSortOrder(order);
                    }}
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="brand-asc">Brand (A-Z)</option>
                    <option value="brand-desc">Brand (Z-A)</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                className="btn btn-outline-secondary btn-sm w-100"
                onClick={handleClearFilters}
              >
                <i className="bi bi-x-circle me-2"></i>
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-search display-1 text-muted"></i>
                <h4 className="mt-3 text-muted">No products found</h4>
                <p className="text-muted">Try adjusting your filters</p>
                <button
                  className="btn btn-primary"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`${viewMode === 'grid' ? 'row g-4' : 'list-view'}`}>
                  {loading ? (
                    // Show skeleton loading cards while loading
                    Array(12).fill(null).map((_, index) => (
                      <div key={index} className={`${viewMode === 'grid' ? 'col-6 col-md-4 col-lg-3' : 'w-100'}`}>
                      </div>
                    ))
                  ) : (
                    // Show actual products once loaded
                    currentProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={handleAddToCart}
                        viewMode={viewMode}
                      />
                    ))
                  )}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="mt-5" aria-label="Products pagination">
                    <div className="d-flex justify-content-center">
                      <ul className="pagination">
                        {/* Previous Button */}
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                          >
                            <i className="bi bi-chevron-left"></i>
                          </button>
                        </li>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                          // Show first page, last page, current page, and pages around current
                          const showPage = page === 1 || 
                                         page === totalPages || 
                                         (page >= currentPage - 1 && page <= currentPage + 1);
                          
                          if (!showPage) {
                            // Show ellipsis for gaps
                            if (page === 2 && currentPage > 4) {
                              return (
                                <li key={`ellipsis-start`} className="page-item disabled">
                                  <span className="page-link">...</span>
                                </li>
                              );
                            }
                            if (page === totalPages - 1 && currentPage < totalPages - 3) {
                              return (
                                <li key={`ellipsis-end`} className="page-item disabled">
                                  <span className="page-link">...</span>
                                </li>
                              );
                            }
                            return null;
                          }

                          return (
                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(page)}
                                aria-label={`Go to page ${page}`}
                                aria-current={currentPage === page ? 'page' : undefined}
                              >
                                {page}
                              </button>
                            </li>
                          );
                        })}

                        {/* Next Button */}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                          >
                            <i className="bi bi-chevron-right"></i>
                          </button>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Pagination Info */}
                    <div className="text-center mt-3">
                      <small className="text-muted">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                        {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
                      </small>
                    </div>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Offcanvas for Filters */}
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
            className="offcanvas offcanvas-end show"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '320px',
              height: '100vh',
              backgroundColor: 'white',
              zIndex: 1045,
              transform: 'translateX(0)',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '-2px 0 20px rgba(0, 0, 0, 0.15)',
              borderLeft: '1px solid #e9ecef',
              animation: 'slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            <div className="offcanvas-header" style={{ borderBottom: '1px solid #dee2e6', padding: '1rem' }}>
              <h5 className="offcanvas-title mb-0">
                Filters & Sorting
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowOffcanvas(false)}
                aria-label="Close"
              ></button>
            </div>
        <div className="offcanvas-body">
          {/* Brand Filter */}
          <div className="filter-group mb-4">
            <h6>Brand</h6>
            <select
              className="form-select form-select-sm"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="filter-group mb-4">
            <h6>Category</h6>
            <select
              className="form-select form-select-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="filter-group mb-4">
            <h6>Price Range</h6>
            <select
              className="form-select form-select-sm mb-2"
              value={priceRange.predefined || ''}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setPriceRange({ min: '', max: '', predefined: '' });
                } else if (value === '0-100') {
                  setPriceRange({ min: '0', max: '100', predefined: '0-100' });
                } else if (value === '100-500') {
                  setPriceRange({ min: '100', max: '500', predefined: '100-500' });
                } else if (value === '500-1000') {
                  setPriceRange({ min: '500', max: '1000', predefined: '500-1000' });
                } else if (value === '1000+') {
                  setPriceRange({ min: '1000', max: '', predefined: '1000+' });
                }
              }}
            >
              <option value="">All Prices</option>
              <option value="0-100">$0 - $100</option>
              <option value="100-500">$100 - $500</option>
              <option value="500-1000">$500 - $1000</option>
              <option value="1000+">$1000+</option>
            </select>
            
            <div className="row g-2">
              <div className="col-6">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Min $"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value, predefined: '' }))}
                />
              </div>
              <div className="col-6">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Max $"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value, predefined: '' }))}
                />
              </div>
            </div>
            <small className="text-muted">Or enter custom range above</small>
          </div>

          {/* Sort Options */}
          <div className="filter-group mb-4">
            <h6>Sort By</h6>
            <div className="mb-2">
              <select
                className="form-select form-select-sm"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="brand-asc">Brand (A-Z)</option>
                <option value="brand-desc">Brand (Z-A)</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          <button
            className="btn btn-outline-secondary btn-sm w-100"
            onClick={handleClearFilters}
          >
            <i className="bi bi-x-circle me-2"></i>
            Clear All Filters
          </button>
        </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllProductsPage;
