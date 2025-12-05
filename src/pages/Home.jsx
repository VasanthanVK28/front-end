import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar,FaShoppingCart , } from "react-icons/fa";
import { LuSparkle } from "react-icons/lu";
import { MdVerified } from "react-icons/md";
import { MdStorefront } from "react-icons/md";
import api from "../api/axios";
import NavbarWithSidebar from "./NavbarWithSidebar";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";


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
const { t, i18n } = useTranslation();
const normalizeBrand = (brand) => {
  if (!brand) return "";
  return brand
    .toLowerCase()
    .replace(/\s+/g, "_")   // spaces → underscore
    .replace(/-/g, "_")     // hyphens → underscore
    .trim();
};

  const navigate = useNavigate();
const brands = [
  {
    name: "Apple",
    logo: "https://logo.svgcdn.com/logos/apple.png", // transparent Apple logo :contentReference[oaicite:0]{index=0}
  },
  {
    name: "HP",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Hewlett-Packard-Logo-2008-2014.png", // HP transparent logo :contentReference[oaicite:1]{index=1}
  },
  {
    name: "Dell",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/640px-Dell_logo_2016.svg.png", // Dell transparent logo :contentReference[oaicite:2]{index=2}
  },
  {
    name: "Samsung",
    logo: "https://logo.svgcdn.com/logos/samsung.png", // Samsung transparent PNG :contentReference[oaicite:3]{index=3}
  },
  {
    name: "Raymond",
    logo: "https://static.vecteezy.com/system/resources/previews/022/100/845/non_2x/raymond-logo-free-png.png", // Raymond logo from wikimedia :contentReference[oaicite:4]{index=4}
  },
  {
    name: "Allen Solly",
    logo: "https://tse1.mm.bing.net/th/id/OIP.1hs9A2LwCU5M-Q6fQafCYQHaER?rs=1&pid=ImgDetMain&o=7&rm=3", // Allen Solly logo from wikimedia
  },
  {
    name: "OnePlus",
    logo: "https://oasis.opstatics.com/content/dam/oasis/page/vi/03Image%20A_large.jpg",
  },
  {
    name: "Redmi",
    logo: "https://wallpapercave.com/wp/wp6707768.png",
  },
  {
    name: "Peter England",
    logo: "https://logowik.com/content/uploads/images/peter-england4491.logowik.com.webp",
  },
];

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
        const res = await api.get(`/products?lang=${i18n.language}`);
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
  //useEffect(() => {
    //if (products.length > 0) {
      
      //products.slice(0, visibleCount).forEach((item) => {
        //console.log("Tracking impression for product:", item._id || item.asin);
        
        //api
          //.post("", {
            //product_id:item._id?.$oid|| item._id || item.asin,
          //})
          
      //});
   // }
  //}, [products, visibleCount]);

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithSidebar />

      {/* 🖼️ Banner Section */}
      {/* 🖼️ Banner Section */}
<div className="w-full">
  <Swiper
    modules={[Autoplay, Navigation, Pagination]}
    spaceBetween={10}
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
        className="w-full h-[200px] sm:h-[300px] md:h-[450px] object-cover"
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src="https://i.pinimg.com/originals/06/ba/27/06ba2728b2ff329fa448072ba7676b01.jpg"
        alt="Banner"
        className="w-full h-[200px] sm:h-[300px] md:h-[450px] object-cover"
      />
    </SwiperSlide>
  </Swiper>
</div>


      {/* ✨ TrendyMart Neon Glow Marquee */}
<div className="bg-[#111827] py-3 shadow-lg">
  <marquee
    className="text-pink-400 font-bold text-xl tracking-wide animate-pulse"
    behavior="scroll"
    direction="left"
    scrollamount="9"
  >
    {t("super_deals")}

  </marquee>
</div>

      {/* 🛍️ Categories Section */}
      
      <div className="p-10 max-w-7xl mx-auto">
        <div id="categories" className="p-10 max-w-7xl mx-auto">

        <div className="mt-10 mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 text-center">
                <MdStorefront className="text-4xl text-violet-600" />
                {t("product_categories")}
              </h2>

              <p className="text-gray-500 mt-2">{t("explore_collections")}</p>


          
        </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">

          {[
            {
             name: t("laptops"),
              key: "laptop",
              img: "https://tse2.mm.bing.net/th/id/OIP.jw-hh-7JWvedyEv-2qekaQHaE3?rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
              name: t("mobiles"),
              key: "mobile",
              img: "https://m.media-amazon.com/images/I/81vxWpPpgNL.jpg",
            },
            {
              name: t("sofas"),
              key: "sofa",
              img: "https://tse2.mm.bing.net/th/id/OIP.crPBzWUg_xYrh5D_EtBsnwHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
              name:  t("shirts"),
              key: "shirt",
              img: "https://tse3.mm.bing.net/th/id/OIP.F2-POkF06gMEJzdxvvXU-AHaHl?rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
              name: t("toys"),
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
                className="w-full h-28 sm:h-36 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-gray-800 text-lg">{c.name}</h3>
            </div>
          ))}
        </div>

        {/* ⭐ Popular Products Section */}
        {visibleCount > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
                <FaRegStar className="text-3xl text-yellow-500" />
                {t("popular_products")}
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
                        className="w-full h-40 sm:h-48 md:h-56 object-contain bg-gray-100"

                      />
                      <div className="p-4" style={{ color: textColor }}>
                        {showLabels && (
                          <>
                            <h3 className="text-sm font-semibold line-clamp-2">
                              <h3 className="text-sm font-semibold line-clamp-2">
                              {item.translated_title || item.title}
                            </h3>

                            </h3>
                            <p className="text-xs mt-1">
                           <p>{t(normalizeBrand(item.brand))}</p>


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

        {/* 🏷️ Top Brands Section */}
<div className="mt-16 max-w-full mx-auto px-6">
  
<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
  <MdVerified className="text-blue-500 mr-2" />
  {t("original_brands")}
</h2>


  {/* Scrolling container */}
  <div className="overflow-hidden">
    <div className="flex animate-scroll gap-8 hover:animation-pause">
      {brands.concat(brands).map((brand, idx) => (
        <div
          key={idx}
         className="bg-white p-3 sm:p-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0"
          title={brand.name}
        >
          <img
            src={brand.logo}
            alt={brand.name}
            className="h-12 sm:h-16 w-24 sm:w-32 object-contain"

          />
        </div>
      ))}
    </div>
  </div>

  {/* Animation */}
  <style>
    {`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-scroll {
        animation: scroll 10s linear infinite;
      }
      /* Pause animation on hover */
      .hover\\:animation-pause:hover {
        animation-play-state: paused;
      }
    `}
  </style>
</div>
</div>

<div class="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-amber-200 py-16 px-6">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

    
<div class="relative w-full h-full flex items-center justify-center">
  
  <div class="absolute inset-0">
    <img src="https://cdn.pixabay.com/photo/2022/03/24/22/57/online-shop-7090027_1280.png" alt="Promo Background" class="w-full h-full object-cover" />
    
    <div class="absolute inset-0 bg-black/40"></div>
  </div>

  
  <div class="relative text-white space-y-6 text-center lg:text-left px-6">
    <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight">
      Up to <span class="text-black drop-shadow-lg">35% OFF</span>
    </h1>
    <p class="text-lg sm:text-xl font-semibold">
      On your selected Products
    </p>

    <button
  onClick={() => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  }}
  class="bg-black text-white px-8 sm:px-10 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-gray-900 transition"
>
  {t("shop_now")}
</button>

  </div>
</div>


    
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6">

  
  <a href="#" class="flex flex-col items-center group cursor-pointer">
    <div class="h-52 w-full bg-white shadow-2xl rounded-xl transform group-hover:-rotate-2 group-hover:scale-105 transition-all overflow-hidden border-l-8 border-red-500">
      <img src="https://cdn.pixabay.com/photo/2021/07/10/15/45/online-shop-6401739_1280.png" class="w-full h-full object-cover" />
    </div>
    <p class="mt-3 text-center bg-white/30 backdrop-blur-md text-white font-bold text-lg px-4 py-2 rounded-full shadow-lg">
      {t("top_picks")}
    </p>
  </a>

  
  <a href="#" class="flex flex-col items-center group cursor-pointer">
    <div class="h-52 w-full bg-white shadow-2xl rounded-xl transform group-hover:rotate-2 group-hover:scale-105 transition-all overflow-hidden border-l-8 border-blue-500">
      <img src="https://cdn.pixabay.com/photo/2025/09/17/12/11/sale-9839498_1280.png" class="w-full h-full object-cover" />
    </div>
    <p class="mt-3 text-center bg-white/30 backdrop-blur-md text-white font-bold text-lg px-4 py-2 rounded-full shadow-lg">
      {t("flash_sale")}
    </p>
  </a>

  
  <a href="#" class="flex flex-col items-center group cursor-pointer">
    <div class="h-52 w-full bg-white shadow-2xl rounded-xl transform group-hover:-rotate-3 group-hover:scale-105 transition-all overflow-hidden border-l-8 border-green-500">
      <img src="https://static.vecteezy.com/system/resources/previews/023/892/435/non_2x/trending-now-button-speech-bubble-banner-label-trending-now-vector.jpg" class="w-full h-full object-cover" />
    </div>
    <p class="mt-3 text-center bg-white/30 backdrop-blur-md text-white font-bold text-lg px-4 py-2 rounded-full shadow-lg">
      {t("trending_now")}
    </p>
  </a>

  
  <a href="#" class="flex flex-col items-center group cursor-pointer">
    <div class="h-52 w-full bg-white shadow-2xl rounded-xl transform group-hover:rotate-3 group-hover:scale-105 transition-all overflow-hidden border-l-8 border-yellow-600">
      <img src="https://img.freepik.com/premium-vector/hot-deal-graphic-sales-promotions_1277164-9485.jpg" class="w-full h-full object-cover" />
    </div>
    <p class="mt-3 text-center bg-white/30 backdrop-blur-md text-white font-bold text-lg px-4 py-2 rounded-full shadow-lg">
      {t("hot_deals")}
    </p>
  </a>

</div>

  </div>
</div>

<section className="w-full bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">
      {t("why_shop_with_us")}
    </h2>

    <div className="flex justify-center gap-8 flex-wrap">
      {/* Feature 1 */}
      <div className="flex flex-col items-center text-center">
        <div className="bg-indigo-100 p-4 rounded-full mb-3">
          <svg
            className="w-12 h-12 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h4l3-6 4 12 3-6h4"
            />
          </svg>
        </div>
        <p className="font-semibold text-gray-800">{t("easy_exchange")}</p>
      </div>

      {/* Feature 2 */}
      <div className="flex flex-col items-center text-center">
        <div className="bg-green-100 p-4 rounded-full mb-3">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="font-semibold text-gray-800">100% {t("handpicked")}</p>
      </div>

      {/* Feature 3 */}
      <div className="flex flex-col items-center text-center">
        <div className="bg-yellow-100 p-4 rounded-full mb-3">
          <svg
            className="w-12 h-12 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="font-semibold text-gray-800">{t("assured_quality")}</p>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 mt-20">
        {/* Gradient Top Border */}
        <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">

          <div>
  <h3 className="text-lg font-semibold text-white mb-4">
  {t("contact_us")}
</h3>
  <p className="text-sm mb-1">{t("company_name")}</p>
  <p className="text-sm mb-1">{t("company_cin")}</p>
  <p className="text-sm mb-1">
    {t("company_address")}
  </p>
  <p className="text-sm mb-1">
    {t("company_email_label")}{" "} <a href="mailto:query@trendymart.com" className="text-yellow-400 hover:underline">query@trendymart.com</a>
  </p>
  
</div>


          <div>
          <h3 className="text-lg font-semibold text-white mb-4">
  {t("shop_non_stop")}
</h3>

          <p className="text-sm text-gray-400 mb-1">{t("trusted_by_indians")}</p>
          <p className="text-sm text-gray-400">{t("delivery_info")}</p>
        </div>


          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
  {t("customer_service")}
</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition">{t("help_center")}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">{t("returns")}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">{t("shipping_info")}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">{t("privacy_policy")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
  {t("follow_us")}
</h3>
            <div className="flex space-x-3 sm:space-x-4 text-xl sm:text-2xl">
              <a href="#" className="hover:text-blue-500 transition"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-pink-500 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-sky-400 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-red-500 transition"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-700 py-4 text-center text-sm">
          <p>© {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">TrendyMart</span>. All rights reserved.</p>
        </div>
      </footer>
    </div>
    
  );
};

export default Home;
