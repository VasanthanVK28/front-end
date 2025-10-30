import React from "react";
import { FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const NavbarBanner = () => {
  const bannerImages = [
    "https://img.freepik.com/premium-psd/banner-laptop-computer-sale-electronic-agency-social-media-web-banner-post-template-psd_610210-390.jpg?w=2000",
    "https://i.pinimg.com/originals/06/ba/27/06ba2728b2ff329fa448072ba7676b01.jpg",
    "https://img.freepik.com/premium-psd/new-arrival-t-shirt-banner-template_361928-1654.jpg?w=740",
  ];

  

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
            <div className="flex-1 max-w-xl relative hidden sm:flex">
              <input
                type="text"
                placeholder="Search for trending products..."
                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-gray-700"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600 text-lg" />
            </div>

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
      },
      {
        title: "Acer Aspire Lite",
        img: "https://m.media-amazon.com/images/I/513p8BwV-RL._AC_UY218_.jpg",
      },
      {
        title: "Ultimus APEX Pro",
        img: "https://m.media-amazon.com/images/I/61rutN1uR6L._AC_UY218_.jpg",
      },
      {
        title: "JioBook 11 ",
        img: "https://m.media-amazon.com/images/I/61IDcxw27+L._AC_UY218_.jpg",
      },
      {
        title: "HP 15, 13th Gen ",
        img: "https://m.media-amazon.com/images/I/71Z4mSII9BL._AC_UY218_.jpg",
      },
      {
        title: "acer SmartChoice Aspire 3",
        img: "https://m.media-amazon.com/images/I/61qlqvTsocL._AC_UY218_.jpg",
      },
      {
        title: "ASUS Vivobook 15",
        img: "https://m.media-amazon.com/images/I/71zMooVIVAL._AC_UY218_.jpg",
      },
      {
        title: "HP Victus",
        img: "https://m.media-amazon.com/images/I/71wT57gW0hL._AC_UY218_.jpg",
      },
      {
        title: "Lenovo V15 G4 ",
        img: "https://m.media-amazon.com/images/I/71aup0IO2ZL._AC_UY218_.jpg",
      },
      {
        title: "ULTIMUS APEX",
        img: "https://m.media-amazon.com/images/I/713QmwFZbsL._AC_UY218_.jpg",
      },
    ].map((laptop, index) => (
      <SwiperSlide key={index}>
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
      },
      {
        title: "realme NARZO 80 Lite",
        img: "https://m.media-amazon.com/images/I/71Vjn1DfArL._AC_UY218_.jpg",
      },
      {
        title: "Samsung Galaxy M35",
        img: "https://m.media-amazon.com/images/I/81nt-RGKpyL._AC_UY218_.jpg",
      },
      {
        title: "Redmi 13 5G Prime Edition",
        img: "https://m.media-amazon.com/images/I/81CQZB2t52L._AC_UY218_.jpg",
      },
      {
        title: "Samsung Galaxy M06 5G",
        img: "https://m.media-amazon.com/images/I/71iMTdPA34L._AC_UY218_.jpg",
      },
      {
        title: "iQOO Neo 10",
        img: "https://m.media-amazon.com/images/I/61gGRaXQoGL._AC_UY218_.jpg",
      },
      {
        title: "Redmi A4 5G",
        img: "https://m.media-amazon.com/images/I/718HzJbvY1L._AC_UY218_.jpg",
      },
      {
        title: "Samsung Galaxy S24  ",
        img: "https://m.media-amazon.com/images/I/71eUNTW+nJL._AC_UY218_.jpg",
      },
      {
        title: "POCO M6 Plus 5G",
        img: "https://m.media-amazon.com/images/I/71tsuJCkV+L._AC_UY218_.jpg",
      },
      {
        title: "OnePlus 13s",
        img: "https://m.media-amazon.com/images/I/61BTIyv+XdL._AC_UY218_.jpg",
      },
    ].map((mobile, index) => (
      <SwiperSlide key={index}>
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
            },
            {
                title: "SleepyHug FoldPRO Sofa-Cum-Bed ",
                img: "https://m.media-amazon.com/images/I/81CKGLYc35L._AC_UL320_.jpg",
            },
            {
                title: "Adorn India Premium",
                img: "https://m.media-amazon.com/images/I/81IF8CFdFEL._AC_UL320_.jpg",
            },
            {
                title: "AMATA Eagle Solid Wood",
                img: "https://m.media-amazon.com/images/I/51OZfS1WkgL._AC_UL320_.jpg",
            },
            {
                title: "WESTERN WOOD ART Stylish",
                img: "https://m.media-amazon.com/images/I/71bku3+80jL._AC_UL320_.jpg",
            },
            {
                title: "STRATA FURNITURE",
                img: "https://m.media-amazon.com/images/I/5100dr0PkVL._AC_UL320_.jpg",
            },
            {
                title: "Sleepyhead Kiki - 3 Seater Sofa",
                img: "https://m.media-amazon.com/images/I/71FsK1GXYuL._AC_UL320_.jpg",
            },
            {
                title: "Sofa Cum Bed",
                img: "https://m.media-amazon.com/images/I/61jCawANhpL._AC_UL320_.jpg",
            },
            {
                title: "AMATA Solid Wood Eagle",
                img: "https://m.media-amazon.com/images/I/51yZzx-mq0L._AC_UL320_.jpg",
            },
            {
                title: "Wakefit Polyester Sofa",
                img: "https://m.media-amazon.com/images/I/616udVTZUEL._AC_UL320_.jpg",
            },
            ].map((sofa, index) => (
            <SwiperSlide key={index}>
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
      },
      {
        title: "CB-COLEBROOK",
        img: "https://m.media-amazon.com/images/I/71DU0wuXOSL._AC_UL320_.jpg",
      },
      {
        title: "U TURN",
        img: "https://m.media-amazon.com/images/I/71Jli-Yjv2L._AC_UL320_.jpg",
      },
      {
        title: "FINIVO FASHION",
        img: "https://m.media-amazon.com/images/I/51yn92oL9fL._AC_UL320_.jpg",
      },
      {
        title: "The Indian Garage Co",
        img: "https://m.media-amazon.com/images/I/61rG+UIslgL._AC_UL320_.jpg",
      },
      {
        title: "Majestic Man",
        img: "https://m.media-amazon.com/images/I/71ck9U5rmkL._AC_UL320_.jpg",
      },
      {
        title: "Allen Solly",
        img: "https://m.media-amazon.com/images/I/61idJrfaIRL._AC_UL320_.jpg",
      },
      {
        title: "Lymio",
        img: "https://m.media-amazon.com/images/I/71V5gEc8YVL._AC_UL320_.jpg",
      },
      {
        title: "TAGDO",
        img: "https://m.media-amazon.com/images/I/71LnycrT7qL._AC_UL320_.jpg",
      },
      {
        title: "Amazon Brand - INKAST",
        img: "https://m.media-amazon.com/images/I/714veNGWosL._AC_UL320_.jpg",
      },
    ].map((shirt, index) => (
      <SwiperSlide key={index}>
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
        title: "GRAPHENE 4WD ",
        img: "https://m.media-amazon.com/images/I/81iA9xlbqjL._AC_UL320_.jpg",
      },
      {
        title: "Storio Inflatable Bop",
        img: "https://m.media-amazon.com/images/I/61mHUJFQhoL._AC_UL320_.jpg",
      },
      {
        title: "Plush Teddy Bear",
        img: "https://m.media-amazon.com/images/I/51C5TrSt-GL._AC_UL320_.jpg",
      },
      {
        title: "Galaxy Hi-Tech Mini Metal ",
        img: "https://m.media-amazon.com/images/I/71XiWPwcVoL._AC_UL320_.jpg",
      },
      {
        title: "Mirana Vande Bharat",
        img: "https://m.media-amazon.com/images/I/61jA-v+qZ6L._AC_UL320_.jpg",
      },
      {
        title: "Bedtime Fun Kids Slide",
        img: "https://m.media-amazon.com/images/I/7110Uyo6lXL._AC_UL320_.jpg",
      },
      {
        title: "Gooyo GY3716 Battery",
        img: "https://m.media-amazon.com/images/I/51tJJaipJlL._AC_UL320_.jpg",
      },
      {
        title: "VGRASSP Radish Style",
        img: "https://m.media-amazon.com/images/I/61hVaHSCx2L._AC_UL320_.jpg",
      },
      {
        title: "Blix Queaky- STEM",
        img: "https://m.media-amazon.com/images/I/41KNN7e0KEL._AC_UL320_.jpg",
      },
      {
        title: "ToyTastic Strong Suction",
        img: "https://m.media-amazon.com/images/I/61THM73i4KL._AC_UL320_.jpg",
      },
    ].map((toy, index) => (
      <SwiperSlide key={index}>
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
