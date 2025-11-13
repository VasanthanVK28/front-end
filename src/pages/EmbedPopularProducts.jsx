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
    cardColor: "white",
    textColor: "black",
    starColor: "#FFD700",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const apiKey = urlParams.get("apiKey");
    const category = urlParams.get("category") || "laptop"; // default laptop

    if (!apiKey) {
      console.error("❌ API key missing in URL");
      return;
    }

    // Try to load saved widget settings
    const savedSettings = JSON.parse(localStorage.getItem("productSettings"));
    if (savedSettings) setSettings(savedSettings);

    // ✅ Fetch products from your Laravel API
    axios
      .get(`http://127.0.0.1:8000/api/external/products/filter`, {
        headers: { "x-api-key": apiKey },
        params: { category },
      })
      .then((res) => {
        console.log("✅ Fetched products:", res.data);
        // Laravel wraps products inside res.data.data
        setProducts(res.data?.data || []);
      })
      .catch((err) => {
        console.error("❌ Failed to load products. Check Laravel API or category name.", err);
      });

    // Listen for dashboard updates (if settings are changed)
    const handleStorageChange = () => {
      const updatedSettings = JSON.parse(localStorage.getItem("productSettings"));
      if (updatedSettings) setSettings(updatedSettings);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Hide widget if no products
  if (!products.length || settings.visibleCount <= 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}></p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Popular Products
      </h3>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        grabCursor
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
            <a
              href={product.product_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl shadow-md overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
              style={{ backgroundColor: settings.cardColor, color: settings.textColor }}
            >
              {/* Product Image */}
              <div className="w-full h-56 flex items-center justify-center p-2 bg-gray-100">
                <img
                  src={product.image_url || "https://via.placeholder.com/300"}
                  alt={product.title || "Product"}
                  className="max-h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                {settings.showLabels && (
                  <>
                    <h4 className="text-sm font-semibold line-clamp-2 text-center">
                      {product.title || "Product"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      {product.brand && product.brand !== "Unknown"
                        ? product.brand
                        : product.title?.split(" ")[0] || "Brand"}
                    </p>
                  </>
                )}

                {settings.showRating && (
                  <div className="flex items-center mt-2 justify-center">
                    {Array.from({ length: 5 }, (_, i) => {
              const rating = product.rating || 4.2;
              if (rating >= i + 1)
                return <FaStar key={i} style={{ color: settings.starColor }} />;
              if (rating >= i + 0.5)
                return <FaStarHalfAlt key={i} style={{ color: settings.starColor }} />;
              return <FaRegStar key={i} style={{ color: "#d1d5db" }} />; // gray for empty stars
            })}

                    <span className="text-xs ml-2 text-gray-600">
                      ({product.rating || "4.2"})
                    </span>
                  </div>
                )}

                {settings.showPrice && (
                  <p className="text-lg font-bold mt-2 text-center text-gray-800">
                    ₹{product.price || "-"}
                  </p>
                )}
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EmbedPopularProducts;
