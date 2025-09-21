const BrandsStrip = () => {
  const brands = [
    { name: "Sony", logo: "https://i.ibb.co/vxSYP1wD/sony-1.png", height: 70 },
    { name: "Samsung", logo: "https://i.ibb.co/9HZqZ4Gj/samsung-1.png", height: 80 },
    { name: "JBL", logo: "https://i.ibb.co/nMPTS4k3/jbl-2-logo-black-and-white.png", height: 50 },
    { name: "Apple", logo: "https://i.ibb.co/LhJxWtf5/apple.png", height: 45 },
    { name: "Google", logo: "https://i.ibb.co/sdpNDWmJ/google.png", height: 40 },
    { name: "Huawei", logo: "https://i.ibb.co/zhJHw9NB/huawei.png", height: 40 },
    { name: "Logitech", logo: "https://i.ibb.co/NdJzZk05/Logitech-Logo-wine.png", height: 70 },
    { name: "Microsoft", logo: "https://i.ibb.co/20Cgvm0q/microsoft.png", height: 40 },
    { name: "Dell", logo: "https://i.ibb.co/XxzTxjy4/dell.png", height: 60 },
    { name: "Asus", logo: "https://i.ibb.co/MxM4xFwj/asus.png", height: 80 },
    { name: "Nintendo", logo: "https://i.ibb.co/LDjXq0RX/nintendo.png", height: 80 },
    { name: "Canon", logo: "https://i.ibb.co/Ng38qgcr/canon.png", height: 30 },
  ];

  const duplicatedBrands = [...brands, ...brands]; // duplicate for infinite loop

  return (
    <section
      className="brands-strip"
      style={{ backgroundColor: "var(--color-light-mint)", overflow: "hidden" }}
    >
      <div className="brands-container" style={{ whiteSpace: "nowrap" }}>
        <div
          className="brands-track"
          style={{
            display: "inline-flex",
            animation: "scroll 40s linear infinite",
          }}
        >
          {duplicatedBrands.map((brand, idx) => (
            <img
              key={idx}
              src={brand.logo}
              alt={brand.name}
              height={brand.height}
              style={{ margin: "0 10px" }}
            />
          ))}
        </div>
      </div>

      {/* CSS for scrolling */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
};

export default BrandsStrip;
