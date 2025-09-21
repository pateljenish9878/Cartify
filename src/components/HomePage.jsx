import HeroSlider from './HeroSlider';
import BrandsStrip from './BrandsStrip';
import ShopByBrands from './ShopByBrands';
import FeaturedProducts from './FeaturedProducts';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Slider Banner */}
      <HeroSlider />
      
      {/* Brands Strip */}
      <BrandsStrip />
      
      {/* Shop by Brands */}
      <ShopByBrands />
      
      {/* Featured Products */}
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
