import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import api from "../api/axios";
import NavbarWithSidebar from "./NavbarWithSidebar";

// 🌀 Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  // Display settings
  const [showPrice, setShowPrice] = useState(true);
  const [showRating, setShowRating] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  // Style customization
  const [cardColor, setCardColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#1f2937");
  const [starColor, setStarColor] = useState("#facc15");

  const navigate = useNavigate();

  // 🧭 Load products & user
  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("api_key");
    const name = localStorage.getItem("user_name") || "Guest";
    setUserName(name);

    if (!token || !apiKey) {
      navigate("/login");
      return;
    }

    // 📦 Fetch products
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();

    // 🎨 Load saved admin customization settings
    const savedSettings = JSON.parse(localStorage.getItem("productSettings"));
    if (savedSettings) {
      setShowPrice(savedSettings.showPrice);
      setShowRating(savedSettings.showRating);
      setShowLabels(savedSettings.showLabels);
      setVisibleCount(savedSettings.visibleCount);
      setCardColor(savedSettings.cardColor);
      setTextColor(savedSettings.textColor);
      setStarColor(savedSettings.starColor);
    }
  }, [navigate]);

  // 👁️ Track impressions when products become visible
  useEffect(() => {
    if (products.length > 0) {
      
      products.slice(0, visibleCount).forEach((item) => {
        console.log("Tracking impression for product:", item._id || item.asin);
        
        api
          .post("/analytics/track-impression", {
            product_id:item._id?.$oid|| item._id || item.asin,
          })
          .catch((err) => console.error("Impression error:", err));
      });
    }
  }, [products, visibleCount]);

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithSidebar />

      {/* 🖼️ Banner Section */}
      <div className="w-full">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <img
              src="https://img.freepik.com/premium-psd/banner-laptop-computer-sale-electronic-agency-social-media-web-banner-post-template-psd_610210-390.jpg?w=2000"
              alt="Banner"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://i.pinimg.com/originals/06/ba/27/06ba2728b2ff329fa448072ba7676b01.jpg"
              alt="Banner"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* 🛍️ Categories Section */}
      <div className="p-10 max-w-7xl mx-auto">
        <div className="mt-10 mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">
            🛍️ Product Categories
          </h2>
          <p className="text-gray-500 mt-2">Explore our trending collections</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            {
              name: "Laptops",
              key: "laptop",
              img: "https://tse2.mm.bing.net/th/id/OIP.jw-hh-7JWvedyEv-2qekaQHaE3?rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
              name: "Mobiles",
              key: "mobile",
              img: "https://m.media-amazon.com/images/I/81vxWpPpgNL.jpg",
            },
            {
              name: "Sofas",
              key: "sofa",
              img: "https://tse2.mm.bing.net/th/id/OIP.crPBzWUg_xYrh5D_EtBsnwHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
              name: "Shirts",
              key: "shirt",
              img: "https://tse3.mm.bing.net/th/id/OIP.F2-POkF06gMEJzdxvvXU-AHaHl?rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
              name: "Toys",
              key: "toys",
              img: "https://static.vecteezy.com/system/resources/previews/030/680/149/large_2x/toys-high-quality-4k-ultra-hd-hdr-free-photo.jpg",
            },
          ].map((c) => (
            <div
              key={c.key}
              onClick={() => handleCategoryClick(c.key)}
              className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={c.img}
                alt={c.name}
                className="w-full h-36 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-gray-800 text-lg">{c.name}</h3>
            </div>
          ))}
        </div>

        {/* ⭐ Popular Products Section */}
        {visibleCount > 0 && (
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
                <SwiperSlide key={ item.asin ||item._id}>
                  <Link
                    to={`/popular-product/${item.asin || item._id}`}
                    state={{ product: item }}
                    onClick={() => {
                      // 🖱️ Track product click
                      api
                        .post("/analytics/track-click", {
                          product_id:item._id?.$oid ||item.asin ||item._id,
                        })
                        .catch((err) => console.error("Click error:", err));
                    }}
                  >
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
                        {showLabels && (
                          <>
                            <h3 className="text-sm font-semibold line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-xs mt-1">
                              {item.brand || "Brand"}
                            </p>
                          </>
                        )}
                        {showRating && (
                          <div className="flex items-center mt-2">
                            {Array.from({ length: 5 }, (_, i) => {
                              const rating = item.rating || 4.2;
                              if (rating >= i + 1)
                                return (
                                  <FaStar key={i} style={{ color: starColor }} />
                                );
                              if (rating >= i + 0.5)
                                return (
                                  <FaStarHalfAlt
                                    key={i}
                                    style={{ color: starColor }}
                                  />
                                );
                              return (
                                <FaRegStar
                                  key={i}
                                  style={{ color: starColor }}
                                />
                              );
                            })}
                            <span className="text-xs ml-2">
                              ({item.rating || "4.2"})
                            </span>
                          </div>
                        )}
                        {showPrice && (
                          <p className="text-lg font-bold mt-2">
                            ₹{item.price || "—"}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
