import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Latest Technology",
      subtitle: "Discover the newest innovations",
      description: "Shop our latest collection of cutting-edge technology products",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Premium Quality",
      subtitle: "Best brands, best prices",
      description: "Experience premium quality products from top brands at unbeatable prices",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Smart Solutions",
      subtitle: "For your digital life",
      description: "Transform your digital experience with our smart technology solutions",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleShopNow = () => {
    navigate('/products');
  };

  return (
    <section className="hero-slider">
      <div className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
            >
              <div 
                className="hero-slide"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '500px'
                }}
              >
                <div className="container h-100">
                  <div className="row h-100 align-items-center">
                    <div className="col-lg-8">
                      <div className="hero-content text-white">
                        <h1 className="hero-title display-4 fw-bold mb-3">
                          {slide.title}
                        </h1>
                        <h2 className="hero-subtitle h3 mb-3 text-warning">
                          {slide.subtitle}
                        </h2>
                        <p className="hero-description lead mb-4">
                          {slide.description}
                        </p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target=""
              className={index === currentSlide ? 'active' : ''}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
