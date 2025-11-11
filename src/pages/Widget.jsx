import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Widget = () => {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({
    visibleCount: 5,
    cardColor: "#fff",
    textColor: "#000",
    starColor: "#FFD700",
    showPrice: true,
    showRating: true,
    showLabels: true,
  });
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(window.location.search);
  const apiKey = queryParams.get("api_key");

  useEffect(() => {
    if (!apiKey) {
      setError("API key missing");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/widget`, {
        params: { api_key: apiKey },
      })
      .then((res) => {
        setProducts(res.data.products);
        setSettings(res.data.settings || settings);
      })
      .catch((err) => setError(err.response?.data?.error || err.message));
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        grabCursor
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {products.slice(0, settings.visibleCount).map((item) => (
          <SwiperSlide key={item._id || item.asin}>
            <div
              style={{
                backgroundColor: settings.cardColor,
                color: settings.textColor,
                padding: "10px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <img
                src={item.image_url || "https://via.placeholder.com/300"}
                alt={item.title}
                style={{ width: "100%", height: "200px", objectFit: "contain" }}
              />
              {settings.showLabels && (
                <>
                  <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "5px 0" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "12px" }}>{item.brand || "Brand"}</p>
                </>
              )}
              {settings.showRating && (
                <div style={{ display: "flex", justifyContent: "center", margin: "5px 0" }}>
                  {Array.from({ length: 5 }, (_, i) => {
                    const rating = item.rating || 4.2;
                    if (rating >= i + 1) return <FaStar key={i} color={settings.starColor} />;
                    if (rating >= i + 0.5) return <FaStarHalfAlt key={i} color={settings.starColor} />;
                    return <FaRegStar key={i} color={settings.starColor} />;
                  })}
                  <span style={{ fontSize: "12px", marginLeft: "4px" }}>{item.rating || "4.2"}</span>
                </div>
              )}
              {settings.showPrice && <p style={{ fontWeight: "bold", margin: "5px 0" }}>₹{item.price || "—"}</p>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Widget;
