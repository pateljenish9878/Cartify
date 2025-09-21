import { BiBorderAll } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const ShopByBrands = () => {
  const navigate = useNavigate();
  const brands = [
    {
      id: 1,
      name: "Apple",
      logo: "https://i.ibb.co/LhJxWtf5/apple.png",
      height: 40,
      description: "Premium technology and innovation",
      productCount: "50+ Products",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      color: "#c6dec6"
    },
    {
      id: 2,
      name: "Samsung",
      logo: "https://i.ibb.co/9HZqZ4Gj/samsung-1.png",
      height: 50,
      description: "Innovative mobile and electronics",
      productCount: "45+ Products",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      color: "#c6dec6"
    },
    {
      id: 3,
      name: "Sony",
      logo: "https://i.ibb.co/vxSYP1wD/sony-1.png",
      height: 40,
      description: "Audio and entertainment excellence",
      productCount: "30+ Products",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      color: "#c6dec6"
    },
    {
      id: 4,
      name: "JBL",
      logo: "https://i.ibb.co/nMPTS4k3/jbl-2-logo-black-and-white.png",
      height: 40,
      description: "Premium sound experiences",
      productCount: "25+ Products",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
      color: "#c6dec6"
    },
    {
      id: 5,
      name: "Logitech",
      logo: "https://i.ibb.co/NdJzZk05/Logitech-Logo-wine.png",
      height: 45,
      description: "Computer peripherals and accessories",
      productCount: "40+ Products",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
      color: "#c6dec6"
    },
    {
      id: 6,
      name: "Asus",
      logo: "https://i.ibb.co/MxM4xFwj/asus.png",
      height: 55,
      description: "High-performance computing",
      productCount: "20+ Products",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
      color: "#c6dec6",
    }
  ];

  const handleBrandClick = (brandName) => {
    navigate(`/products/${encodeURIComponent(brandName)}`);
  };

  return (
    <section className="shop-by-brands py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title mb-3">Shop by Brands</h2>
          <p>Discover products from your favorite brands</p>
        </div>
        
        <div className="row g-4">
          {brands.map(brand => (
            <div key={brand.id} className="col-md-6 col-lg-4">
              <div 
                className="brand-card h-100"
                onClick={() => handleBrandClick(brand.name)}
              >
                <div className="brand-card-header">
                  <div 
                    className="brand-logo-large"
                    style={{ backgroundColor: brand.color }}
                  >
                    <span className="brand-emoji-large d-flex justify-content-center align-items-center" role="img" aria-label={brand.name}>
                      <img src={brand.logo} alt="" height={brand.height} />
                    </span>
                  </div>
                  <div className="brand-info">
                    <h5 className="brand-name mb-1" style={{ color: 'var(--text-primary)' }}>{brand.name}</h5>
                    <p className="brand-description mb-2" style={{ color: 'var(--text-muted)' }}>{brand.description}</p>
                    <span className="badge" style={{ 
                      backgroundColor: 'var(--color-moss)',
                      color: 'var(--color-deep-forest)'
                    }}>{brand.productCount}</span>
                  </div>
                </div>
                
                <div className="brand-card-image">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="img-fluid rounded"
                    style={{ height: '120px', objectFit: 'cover', width: '100%' }}
                  />
                </div>
                
                <div className="brand-card-footer">
                  <button className=" shop-by-brand-btn btn w-100">
                    <i className="bi bi-arrow-right me-2"></i>
                    Shop {brand.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByBrands;
