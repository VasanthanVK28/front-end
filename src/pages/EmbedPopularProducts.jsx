import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const EmbedPopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({
    showPrice: true,
    showRating: true,
    showLabels: true,
    visibleCount: 5,
    cardColor: "#ffffff",
    textColor: "#000000",
    starColor: "#FFD700",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const apiKey = urlParams.get("apiKey");
    if (!apiKey) return console.error("API key missing in URL");

    // Load saved settings from localStorage first
    const savedSettings = JSON.parse(localStorage.getItem("productSettings"));
    if (savedSettings) setSettings(savedSettings);

    // Fetch products
    axios
      .get(`http://127.0.0.1:8000/api/embed/popular-products?apiKey=${apiKey}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));

    // Fetch settings from backend if localStorage empty
    if (!savedSettings) {
      axios
        .get(`http://127.0.0.1:8000/api/embed/settings?apiKey=${apiKey}`)
        .then((res) => {
          if (res.data.status === "success") setSettings(res.data.data);
        })
        .catch((err) => console.error("Failed to load settings:", err));
    }

    // Listen for dashboard updates via localStorage
    const handleStorageChange = () => {
      const updatedSettings = JSON.parse(localStorage.getItem("productSettings"));
      if (updatedSettings) setSettings(updatedSettings);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "10px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Popular Products</h3>

      {products.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={settings.visibleCount || 3}
          spaceBetween={20}
          navigation // Arrows
          pagination={{ clickable: true }} // Bullets
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay
          loop
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: settings.visibleCount || 5 },
          }}
        >
          {products.slice(0, settings.visibleCount).map((product) => (
            <SwiperSlide key={product.id || product._id}>
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                  textAlign: "center",
                  backgroundColor: settings.cardColor,
                  color: settings.textColor,
                }}
              >
                <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={product.image_url || "https://via.placeholder.com/300"}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "contain",
                      backgroundColor: "#f5f5f5",
                    }}
                  />

                  {settings.showLabels && (
                    <>
                      <h4
                        style={{
                          margin: "10px 0 5px",
                          fontSize: "14px",
                          lineHeight: "1.2em",
                          minHeight: "40px",
                        }}
                      >
                        {product.title}
                      </h4>
                      <p style={{ fontSize: "12px", margin: 0 }}>{product.brand || "Brand"}</p>
                    </>
                  )}

                  {settings.showRating && (
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
                      {Array.from({ length: 5 }, (_, i) => {
                        const rating = product.rating || 4.2;
                        if (rating >= i + 1) return <FaStar key={i} style={{ color: settings.starColor }} />;
                        if (rating >= i + 0.5) return <FaStarHalfAlt key={i} style={{ color: settings.starColor }} />;
                        return <FaRegStar key={i} style={{ color: settings.starColor }} />;
                      })}
                    </div>
                  )}

                  {settings.showPrice && <p style={{ fontWeight: "bold", marginTop: "5px" }}>₹{product.price || "-"}</p>}
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p style={{ textAlign: "center" }}>No products available</p>
      )}
    </div>
  );
};

export default EmbedPopularProducts;
