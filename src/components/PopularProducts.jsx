import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PopularProducts = ({ fadeInUp }) => {
  const navigate = useNavigate();

  const napkinPad1 = "/images/pads-1.png";
  const napkinPad2 = "/images/pads-2.png";

  const popularProductsList = [
    {
      id: 1,
      title: "Premium Organic Bamboo Pads - Ultra Soft",
      brand: "PureComfort",
      price: "299",
      originalPrice: "349",
      rating: 4.8,
      size: "XL+ 290MM",
      image: napkinPad1,
    },
    {
      id: 2,
      title: "Overnight Bamboo Pads - Extra Long",
      brand: "PureComfort",
      price: "349",
      originalPrice: "399",
      rating: 4.7,
      size: "XXL+ 330MM",
      image: napkinPad2,
    },
    {
      id: 3,
      title: "Daily Comfort Bamboo Pads - Regular",
      brand: "PureComfort",
      price: "249",
      originalPrice: "299",
      rating: 4.9,
      size: "XL+ 280mm",
      image: napkinPad1,
    },
    {
      id: 4,
      title: "Sport Active Bamboo Pads - Winged",
      brand: "PureComfort",
      price: "399",
      originalPrice: "449",
      rating: 4.6,
      size: "XL+ 290MM",
      image: napkinPad2,
    },
    {
      id: 5,
      title: "Sensitive Skin Bamboo Pads - Hypoallergenic",
      brand: "PureComfort",
      price: "329",
      originalPrice: "379",
      rating: 4.8,
      size: "XXL+ 330MM",
      image: napkinPad1,
    },
    {
      id: 6,
      title: "Heavy Flow Bamboo Pads - Max Protection",
      brand: "PureComfort",
      price: "379",
      originalPrice: "429",
      rating: 4.7,
      size: "XL+ 280mm",
      image: napkinPad2,
    },
    {
      id: 7,
      title: "Light Days Bamboo Pads - Thin & Discreet",
      brand: "PureComfort",
      price: "199",
      originalPrice: "249",
      rating: 4.5,
      size: "XL+ 290MM",
      image: napkinPad1,
    },
    {
      id: 8,
      title: "Postpartum Bamboo Pads - Extra Soft",
      brand: "PureComfort",
      price: "449",
      originalPrice: "499",
      rating: 4.9,
      size: "XXL+ 330MM",
      image: napkinPad2,
    },
  ];

  return (
    <div className="relative bg-white py-10 sm:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative flex flex-col items-center justify-center mb-8 sm:mb-12"
        >
          <div className="text-center -mt-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl lg:text-4xl font-extrabold text-purple-800 mb-4 font-[Playfair_Display]"
            >
              Popular Products
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-sm sm:text-base lg:text-lg text-black mt-2 font-medium"
            >
              Handpicked favorites just for you
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="w-20 h-1 bg-purple-800 mx-auto mt-6 rounded-full origin-center"
            />
          </div>

          <div className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 mt-4 sm:mt-0">
            <button className="hidden lg:flex items-center gap-2 text-sm lg:text-base text-gray-800 font-semibold hover:text-purple-500 transition px-6 py-2 bg-gray-50 rounded-full border border-gray-100">
              View All <FaArrowRight />
            </button>
          </div>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="pb-16"
        >
          {popularProductsList.map((item, index) => (
            <SwiperSlide key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="bg-white rounded-[1.5rem] p-5 relative border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow group"
              >
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                  className="absolute top-4 right-4 z-10 p-1.5 text-purple-500 hover:scale-110 transition-transform"
                >
                  <FaRegHeart size={20} />
                </motion.button>

                <div className="relative aspect-[4/3] mb-6 flex items-center justify-center p-2">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
                    {item.brand}
                  </p>

                  <h3 className="text-[#1F2937] font-semibold text-lg mb-4 min-h-[56px] line-clamp-2 leading-[1.4] transition-colors group-hover:text-purple-600">
                    {item.title}
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-gray-900 block">
                        Price
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-gray-900">
                          ₹{item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[10px] text-gray-400 line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={() => navigate("/my-bag")}
                      className="group relative w-full h-[92px] overflow-hidden rounded-full bg-transparent"
                    >
                      <img
                        src="/images/napkin-pads.png"
                        alt="Buy Now"
                        className="absolute inset-0 w-full h-full object-contain scale-125 transition-transform duration-500 ease-out group-hover:scale-135"
                      />
                      <span className="absolute left-1/2 bottom-7 -translate-x-1/2 text-[15px] font-medium uppercase text-white pointer-events-none text-center">
                        BUY NOW
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularProducts;