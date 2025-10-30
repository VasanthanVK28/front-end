import { FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const NavbarBanner = () => {
  const bannerImages = [
    "https://img.freepik.com/premium-psd/banner-laptop-computer-sale-electronic-agency-social-media-web-banner-post-template-psd_610210-390.jpg?w=2000",
    "https://i.pinimg.com/originals/06/ba/27/06ba2728b2ff329fa448072ba7676b01.jpg",
    "https://img.freepik.com/premium-psd/new-arrival-t-shirt-banner-template_361928-1654.jpg?w=740",
  ];
  const [query, setQuery] = useState("");
const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    const amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
    window.open(amazonUrl, "_blank"); // Opens Amazon search results in new tab
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* ✅ NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 space-x-6">
            {/* Left - Brand */}
            <div className="text-2xl font-extrabold tracking-wide cursor-pointer text-indigo-600 hover:text-pink-500 transition-colors duration-300">
              Trendy<span className="text-yellow-500">Mart</span>
            </div>

            {/* Center - Search */}
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-xl relative hidden sm:flex"
            >
              <input
                type="text"
                placeholder="Search for trending products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-gray-700"
              />
              <FaSearch
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600 text-lg cursor-pointer"
                onClick={handleSearch}
              />
            </form>

            {/* Right - Buttons */}
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="text-indigo-600 border border-indigo-600 font-semibold px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-full shadow hover:bg-yellow-300 transition duration-300"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ BANNER SECTION */}
      <div className="max-w-7xl mx-auto mt-6">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation
          pagination={{ clickable: true }}
          className="rounded-2xl overflow-hidden"
        >
          {bannerImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="w-full h-[450px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

     {/* ✅ LAPTOP COLLECTIONS SECTION */}
  <div className="max-w-7xl mx-auto mt-16 px-4">
  <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent tracking-wide uppercase">
    Laptop Collections
  </h2>

  <Swiper
    modules={[Autoplay, Navigation]}
    spaceBetween={20}
    loop={true}
    navigation
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    breakpoints={{
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 },
    }}
    className="pb-10"
  >
    {[
      {
        title: "HP 15, 13th Gen",
        img: "https://m.media-amazon.com/images/I/71FXHAM+jWL._AC_UY218_.jpg",
        url: "https://www.amazon.in/HP-i3-1315U-Anti-Glare-Micro-Edge-fd0573TU/dp/B0F4R3GFMQ/ref=sr_1_1",
      },
      {
        title: "Acer Aspire Lite",
        img: "https://m.media-amazon.com/images/I/513p8BwV-RL._AC_UY218_.jpg",
        url: "https://www.amazon.in/Acer-Aspire-Premium-AL15-41-Display/dp/B0D37T35JP/ref=sr_1_2",
      },
      {
        title: "Ultimus APEX Pro",
        img: "https://m.media-amazon.com/images/I/61rutN1uR6L._AC_UY218_.jpg",
        url: "https://www.amazon.in/Ultimus-Celeron-Expandable-512GB-%E2%80%8ELPDDR4-Speaker/dp/B0FKM5KW4R/ref=sr_1_4",
      },
      {
        title: "JioBook 11",
        img: "https://m.media-amazon.com/images/I/61IDcxw27+L._AC_UY218_.jpg",
        url: "https://www.amazon.in/JioBook-Octa-Core-LPDDR4-JioOS-Expandable/dp/B0CKX9PY1H/ref=sr_1_5",
      },
      {
        title: "HP 15, 13th Gen",
        img: "https://m.media-amazon.com/images/I/71Z4mSII9BL._AC_UY218_.jpg",
        url: "https://www.amazon.in/HP-i5-1334U-Anti-Glare-Micro-Edge-fd0577TU/dp/B0F4R6H3NB/ref=sr_1_6",
      },
      {
        title: "Acer Aspire 3",
        img: "https://m.media-amazon.com/images/I/61qlqvTsocL._AC_UY218_.jpg",
        url: "https://www.amazon.in/Acer-Celeron-Processor-LPDDR4X-A325-45/dp/B0D7PTFFZH/ref=sr_1_7",
      },
      {
        title: "ASUS Vivobook 15",
        img: "https://m.media-amazon.com/images/I/71zMooVIVAL._AC_UY218_.jpg",
        url: "https://www.amazon.in/ASUS-Vivobook-Smartchoice-Windows-M1502YA-BQ703WS/dp/B0FC2LKFSC/ref=sr_1_8",
      },
      {
        title: "HP Victus",
        img: "https://m.media-amazon.com/images/I/71wT57gW0hL._AC_UY218_.jpg",
        url: "https://www.amazon.in/HP-Smartchoice-i5-13420H-Upgradeable-Office24/dp/B0F6CVT23B/ref=sr_1_10",
      },
      {
        title: "Lenovo V15 G4",
        img: "https://m.media-amazon.com/images/I/71aup0IO2ZL._AC_UY218_.jpg",
        url: "https://www.amazon.in/Lenovo-Graphics-5500Mhz-Windows-Warranty/dp/B0F29HNJL1/ref=sr_1_11",
      },
      {
        title: "ULTIMUS APEX",
        img: "https://m.media-amazon.com/images/I/713QmwFZbsL._AC_UY218_.jpg",
        url: "https://www.amazon.in/ULTIMUS-Laptop-Celeron-Expandable-1TB-Anti-Glare/dp/B0F5WTFC3D/ref=sr_1_12",
      },
    ].map((laptop, index) => (
      <SwiperSlide key={index}>
        {/* 💻 Clickable Product Card */}
        <a
          href={laptop.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <img
              src={laptop.img}
              alt={laptop.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {laptop.title}
              </h3>
            </div>
          </div>
        </a>
      </SwiperSlide>
    ))}
  </Swiper>
  </div>

      

      {/* ✅ MOBILE COLLECTIONS SECTION */}
<div className="max-w-7xl mx-auto mt-16 px-4">
  <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-pink-500 via-yellow-400 to-red-500 bg-clip-text text-transparent tracking-wide uppercase">
    Mobile Collections
  </h2>

  <Swiper
    modules={[Autoplay, Navigation]}
    spaceBetween={20}
    loop={true}
    navigation
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    breakpoints={{
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 },
    }}
    className="pb-10"
  >
    {[
      {
        title: "realme NARZO 80",
        img: "https://m.media-amazon.com/images/I/81oxfhHd5XL._AC_UY218_.jpg",
        url: "https://www.amazon.in/realme-Obsidian-6300mAh-Segments-Biggest/dp/B0FG2LPC6K/ref=sr_1_1",
      },
      {
        title: "realme NARZO 80 Lite",
        img: "https://m.media-amazon.com/images/I/71Vjn1DfArL._AC_UY218_.jpg",
        url: "https://www.amazon.in/realme-Long-Lasting-Resistance-Military-Grade-Durability/dp/B0F9TT7Z5Q/ref=sr_1_2",
      },
      {
        title: "Samsung Galaxy M35",
        img: "https://m.media-amazon.com/images/I/81nt-RGKpyL._AC_UY218_.jpg",
        url: "https://www.amazon.in/Samsung-Daybreak-Storage-Corning-Gorilla/dp/B0D7Z8FJZ9/ref=sr_1_3",
      },
      {
        title: "Redmi 13 5G Prime Edition",
        img: "https://m.media-amazon.com/images/I/81CQZB2t52L._AC_UY218_.jpg",
        url: "https://www.amazon.in/Redmi-Hawaiian-Largest-Display-Segment/dp/B0D78X544X/ref=sr_1_4",
      },
      {
        title: "Samsung Galaxy M06 5G",
        img: "https://m.media-amazon.com/images/I/71iMTdPA34L._AC_UY218_.jpg",
        url: "https://www.amazon.in/Samsung-MediaTek-Dimensity-Charging-Upgrades/dp/B0F3X4R33R/ref=sr_1_5",
      },
      {
        title: "iQOO Neo 10",
        img: "https://m.media-amazon.com/images/I/61gGRaXQoGL._AC_UY218_.jpg",
        url: "https://www.amazon.in/iQOO-Snapdragon-Processor-SuperComputing-Smartphone/dp/B0F83KLGCS/ref=sr_1_6",
      },
      {
        title: "Redmi A4 5G",
        img: "https://m.media-amazon.com/images/I/718HzJbvY1L._AC_UY218_.jpg",
        url: "https://www.amazon.in/Redmi-A4-5G-Storage-Charging/dp/B0DLW4QD72/ref=sr_1_7",
      },
      {
        title: "Samsung Galaxy S24",
        img: "https://m.media-amazon.com/images/I/71eUNTW+nJL._AC_UY218_.jpg",
        url: "https://www.amazon.in/Samsung-Galaxy-Smartphone-Graphite-Storage/dp/B0DHL7YT5S/ref=sr_1_8",
      },
      {
        title: "POCO M6 Plus 5G",
        img: "https://m.media-amazon.com/images/I/71tsuJCkV+L._AC_UY218_.jpg",
        url: "https://www.amazon.in/POCO-Plus-Graphite-Black-128GB/dp/B0D9KHQ4M1/ref=sr_1_12",
      },
      {
        title: "OnePlus 13s",
        img: "https://m.media-amazon.com/images/I/61BTIyv+XdL._AC_UY218_.jpg",
        url: "https://www.amazon.in/OnePlus-Snapdragon%C2%AE-Battery-Lifetime-Warranty/dp/B0F5WNYJF8/ref=sr_1_16",
      },
    ].map((mobile, index) => (
      <SwiperSlide key={index}>
        {/* 📱 Clickable Card */}
        <a
          href={mobile.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <img
              src={mobile.img}
              alt={mobile.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {mobile.title}
              </h3>
            </div>
          </div>
        </a>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


        {/* ✅ SOFAS COLLECTIONS SECTION */}
<div className="max-w-7xl mx-auto mt-16 px-4">
  <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500 bg-clip-text text-transparent tracking-wide uppercase">
    Sofas Collections
  </h2>

  <Swiper
    modules={[Autoplay, Navigation]}
    spaceBetween={20}
    loop={true}
    navigation
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    breakpoints={{
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 },
    }}
    className="pb-10"
  >
    {[
      {
        title: "Holstein Housewares PVC",
        img: "https://m.media-amazon.com/images/I/71BkBl2ehAL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Holstein-Housewares-Recliner-Sofa-Lightweight/dp/B0FP8Y164Q/ref=sr_1_1",
      },
      {
        title: "SleepyHug FoldPRO Sofa-Cum-Bed",
        img: "https://m.media-amazon.com/images/I/81CKGLYc35L._AC_UL320_.jpg",
        url: "https://www.amazon.in/SleepyHug-Sofa-Cum-Bed-Convertible-TouchSense-Lightweight/dp/B0FCSPS2TF/ref=sr_1_5",
      },
      {
        title: "Adorn India Premium",
        img: "https://m.media-amazon.com/images/I/81IF8CFdFEL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Adorn-India-Premium-Warranty-Striped/dp/B0F4DT26BL/ref=sr_1_6",
      },
      {
        title: "AMATA Eagle Solid Wood",
        img: "https://m.media-amazon.com/images/I/51OZfS1WkgL._AC_UL320_.jpg",
        url: "https://www.amazon.in/AMATA-Cushions-Perfect-Living-Guests/dp/B0B68G4F1S/ref=sr_1_7",
      },
      {
        title: "WESTERN WOOD ART Stylish",
        img: "https://m.media-amazon.com/images/I/71bku3+80jL._AC_UL320_.jpg",
        url: "https://www.amazon.in/WESTERN-WOOD-ART-Traditional-Chesterfield/dp/B0DM9V33GF/ref=sr_1_12",
      },
      {
        title: "STRATA FURNITURE",
        img: "https://m.media-amazon.com/images/I/5100dr0PkVL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Strata-Furniture-Sheesham-3-Person-Newspaper/dp/B0CJY6YTPH/ref=sr_1_13",
      },
      {
        title: "Sleepyhead Kiki - 3 Seater Sofa",
        img: "https://m.media-amazon.com/images/I/71FsK1GXYuL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Sleepyhead-Kiki-Seater-Fabric-Sapling/dp/B0B4JNRFFH/ref=sr_1_15",
      },
      {
        title: "Sofa Cum Bed",
        img: "https://m.media-amazon.com/images/I/61jCawANhpL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Single-Seater-Folding-Cushion-Velvet/dp/B0FP5X6VQ9/ref=sr_1_16",
      },
      {
        title: "AMATA Solid Wood Eagle",
        img: "https://m.media-amazon.com/images/I/51yZzx-mq0L._AC_UL320_.jpg",
        url: "https://www.amazon.in/AMATA-Seater-Cushions-Perfect-Warranty/dp/B0DHPJ31DD/ref=sr_1_18",
      },
      {
        title: "Wakefit Polyester Sofa",
        img: "https://m.media-amazon.com/images/I/616udVTZUEL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Wakefit-Warranty-Folding-Flipper-Warpknit/dp/B0C6MM9F6G/ref=sr_1_19",
      },
    ].map((sofa, index) => (
      <SwiperSlide key={index}>
        {/* 🛋️ Clickable Card */}
        <a
          href={sofa.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <img
              src={sofa.img}
              alt={sofa.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {sofa.title}
              </h3>
            </div>
          </div>
        </a>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


                {/* ✅ SHIRTS COLLECTIONS SECTION */}
<div className="max-w-7xl mx-auto mt-16 px-4">
  <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-rose-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent tracking-wide uppercase">
    Shirts Collections
  </h2>

  <Swiper
    modules={[Autoplay, Navigation]}
    spaceBetween={20}
    loop={true}
    navigation
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    breakpoints={{
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 },
    }}
    className="pb-10"
  >
    {[
      {
        title: "SOLY CLOTHING",
        img: "https://m.media-amazon.com/images/I/61rJgcPO1GL._AC_UL320_.jpg",
        url: "https://www.amazon.in/SOLY-CLOTHING-Stylish-Business-Festival/dp/B0FQD27DL8/ref=sr_1_1",
      },
      {
        title: "CB-COLEBROOK",
        img: "https://m.media-amazon.com/images/I/71DU0wuXOSL._AC_UL320_.jpg",
        url: "https://www.amazon.in/CB-COLEBROOK-Casual-Button-Fashion-Textured/dp/B0D77N88Q3/ref=sr_1_3",
      },
      {
        title: "U TURN",
        img: "https://m.media-amazon.com/images/I/71Jli-Yjv2L._AC_UL320_.jpg",
        url: "https://www.amazon.in/U-TURN-Printed-Striped-Stylish-Skyblue-White/dp/B0DKP8NXCH/ref=sr_1_5",
      },
      {
        title: "FINIVO FASHION",
        img: "https://m.media-amazon.com/images/I/51yn92oL9fL._AC_UL320_.jpg",
        url: "https://www.amazon.in/FINIVO-FASHION-Textured-Shirts-Stylish/dp/B0DFWXR6J7/ref=sr_1_6",
      },
      {
        title: "The Indian Garage Co",
        img: "https://m.media-amazon.com/images/I/61rG+UIslgL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Indian-Garage-Co-Checkered-0121-SH69-05_White/dp/B08ZNFRY1P/ref=sr_1_7",
      },
      {
        title: "Majestic Man",
        img: "https://m.media-amazon.com/images/I/71ck9U5rmkL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Majestic-Man-Checkered-Cotton-Charcoal/dp/B0CLK9XJZQ/ref=sr_1_9",
      },
      {
        title: "Allen Solly",
        img: "https://m.media-amazon.com/images/I/61idJrfaIRL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Allen-Solly-Geometric-Regular-ASSFWMOFO48848_White_40/dp/B07DN1BJ51/ref=sr_1_10",
      },
      {
        title: "Lymio",
        img: "https://m.media-amazon.com/images/I/71V5gEc8YVL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Lymio-Casual-Stylish-Rib-Shirt-Khakhi/dp/B0CRPH5L6B/ref=sr_1_11",
      },
      {
        title: "TAGDO",
        img: "https://m.media-amazon.com/images/I/71LnycrT7qL._AC_UL320_.jpg",
        url: "https://www.amazon.in/TAGDO-Regular-Casual-Shirt-Popcorn-5171-Cream-L/dp/B0CYQ9VND7/ref=sr_1_14",
      },
      {
        title: "Amazon Brand - INKAST",
        img: "https://m.media-amazon.com/images/I/714veNGWosL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Amazon-Brand-Inkast-Casual-02_Navy/dp/B084DNHYYY/ref=sr_1_17",
      },
    ].map((shirt, index) => (
      <SwiperSlide key={index}>
        {/* 👕 Clickable Card */}
        <a
          href={shirt.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <img
              src={shirt.img}
              alt={shirt.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {shirt.title}
              </h3>
            </div>
          </div>
        </a>
      </SwiperSlide>
    ))}
  </Swiper>
</div>



   {/* ✅ TOYS COLLECTIONS SECTION */}
<div className="max-w-7xl mx-auto mt-16 px-4">
  <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 bg-clip-text text-transparent tracking-wide uppercase">
    Toys Collections
  </h2>

  <Swiper
    modules={[Autoplay, Navigation]}
    spaceBetween={20}
    loop={true}
    navigation
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    breakpoints={{
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 },
    }}
    className="pb-10"
  >
    {[
      {
        title: "GRAPHENE 4WD",
        img: "https://m.media-amazon.com/images/I/81iA9xlbqjL._AC_UL320_.jpg",
        url: "https://www.amazon.in/GRAPHENE-Friction-Off-Road-All-Terrain-Christmas/dp/B0CDSBQ9FH/ref=sr_1_1",
      },
      {
        title: "Storio Inflatable Bop",
        img: "https://m.media-amazon.com/images/I/61mHUJFQhoL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Storio-Inflatable-Punching-Standing-Wrestling/dp/B0FL1RPRJJ/ref=sr_1_2",
      },
      {
        title: "Plush Teddy Bear",
        img: "https://m.media-amazon.com/images/I/51C5TrSt-GL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Babique-Unicorn-Stuffed-Plush-Birthday/dp/B08LTGVND9/ref=sr_1_3",
      },
      {
        title: "Galaxy Hi-Tech Mini Metal",
        img: "https://m.media-amazon.com/images/I/71XiWPwcVoL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Galaxy-Hi-Tech-Unbreakable-Adventures-Multicolor/dp/B0D5B81RCT/ref=sr_1_4",
      },
      {
        title: "Mirana Vande Bharat",
        img: "https://m.media-amazon.com/images/I/61jA-v+qZ6L._AC_UL320_.jpg",
        url: "https://www.amazon.in/Mirana-Vande-Bharat-Bullet-Train/dp/B0FP2V7XVL/ref=sr_1_5",
      },
      {
        title: "Bedtime Fun Kids Slide",
        img: "https://m.media-amazon.com/images/I/7110Uyo6lXL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Projector-Materials-Interchangeable-Flashlight-PoPo/dp/B0F5X5BWP2/ref=sr_1_6",
      },
      {
        title: "Gooyo GY3716 Battery",
        img: "https://m.media-amazon.com/images/I/51tJJaipJlL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Gooyo-Portable-Keyboard-Musical-Included/dp/B0BMLQ1RHP/ref=sr_1_8",
      },
      {
        title: "VGRASSP Radish Style",
        img: "https://m.media-amazon.com/images/I/61hVaHSCx2L._AC_UL320_.jpg",
        url: "https://www.amazon.in/VGRASSP-Radish-Pretend-Toddlers-Ringtones/dp/B0BKZMHP48/ref=sr_1_9",
      },
      {
        title: "Blix Queaky- STEM",
        img: "https://m.media-amazon.com/images/I/41KNN7e0KEL._AC_UL320_.jpg",
        url: "https://www.amazon.in/Blix-Queaky-STEM-Best-Yellow/dp/B0CFF2SRPT/ref=sr_1_10",
      },
      {
        title: "ToyTastic Strong Suction",
        img: "https://m.media-amazon.com/images/I/61THM73i4KL._AC_UL320_.jpg",
        url: "https://www.amazon.in/ToyTastic-Suction-Rotating-Sensory-Airplane/dp/B0FKNGWHFN/ref=sr_1_11",
      },
    ].map((toy, index) => (
      <SwiperSlide key={index}>
        {/* 🧸 Wrap the entire card in a clickable link */}
        <a
          href={toy.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <img
              src={toy.img}
              alt={toy.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {toy.title}
              </h3>
            </div>
          </div>
        </a>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

{/* ✅ FOOTER SECTION */}
<footer className="bg-gray-900 text-gray-300 mt-20">
  {/* Gradient Top Border */}
  <div className="h-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500"></div>

  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
    {/* About Section */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
      <p className="text-sm leading-relaxed">
        We bring you the trendiest and most loved products — from stylish shirts to cozy sofas and exciting toys. 
        Quality and style, all in one place!
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-yellow-400">Home</a></li>
        <li><a href="#" className="hover:text-yellow-400">Shop</a></li>
        <li><a href="#" className="hover:text-yellow-400">Trending</a></li>
        <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
      </ul>
    </div>

    {/* Customer Service */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-yellow-400">Help Center</a></li>
        <li><a href="#" className="hover:text-yellow-400">Returns</a></li>
        <li><a href="#" className="hover:text-yellow-400">Shipping Info</a></li>
        <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
      </ul>
    </div>

    {/* Social Links */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
      <div className="flex space-x-4 text-2xl">
        <a href="#" className="hover:text-blue-500"><i className="fab fa-facebook"></i></a>
        <a href="#" className="hover:text-pink-500"><i className="fab fa-instagram"></i></a>
        <a href="#" className="hover:text-sky-400"><i className="fab fa-twitter"></i></a>
        <a href="#" className="hover:text-red-500"><i className="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="border-t border-gray-700 py-4 text-center text-sm">
    <p>
      © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">TrendyMart</span>. All rights reserved.
    </p>
  </div>
</footer>

    </div>
  );
};

export default NavbarBanner;
