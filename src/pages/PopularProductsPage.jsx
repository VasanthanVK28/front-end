// src/pages/PopularProductsPage.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import api from "../api/axios"; // your axios setup

const PopularProductsPage = () => {
  const [products, setProducts] = useState([]);
  const visibleCount = 10; // limit how many products to show
  const cardColor = "#fff";
  const textColor = "#333";
  const starColor = "#facc15";

  useEffect(() => {
    // Fetch products from API with API key
    api
      .get("/popular-products", {
        headers: {
          "x-api-key": localStorage.getItem("apiKey") || "YOUR_DEFAULT_KEY",
        },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {products.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Popular Products
          </h2>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            grabCursor={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {products.slice(0, visibleCount).map((item) => (
              <SwiperSlide key={item._id || item.asin}>
                <div
                  className="shadow-md rounded-xl overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: cardColor }}
                >
                  <img
                    src={item.image_url || "https://via.placeholder.com/300"}
                    alt={item.title}
                    className="w-full h-56 object-contain bg-gray-100"
                  />
                  <div className="p-4" style={{ color: textColor }}>
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs mt-1">{item.brand || "Brand"}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default PopularProductsPage;
