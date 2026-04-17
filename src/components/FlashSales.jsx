import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaRegHeart, FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

const FlashSales = () => {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({
    hours: 10,
    minutes: 39,
    seconds: 28,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Images from public/images folder
  const products = [
    {
      id: 1,
      title: "Airly Premium Pads - Ultra Soft",
      available: "XL+ 290MM",
      price: 299,
      originalPrice: 349,
      image: "/images/pads-1.png",
    },
    {
      id: 2,
      title: "Airly Bamboo Pads - Extra Long",
      available: "XXL+ 330MM",
      price: 349,
      originalPrice: 399,
      image: "/images/pads-2.png",
    },
    {
      id: 3,
      title: "Airly Daily Comfort Pads - Regular",
      available: "XL+ 280MM",
      price: 249,
      originalPrice: 299,
      image: "/images/pads-1.png",
    },
    {
      id: 4,
      title: "Airly Night Protection Pads",
      available: "XXL+ 320MM",
      price: 399,
      originalPrice: 449,
      image: "/images/pads-2.png",
    },
    {
      id: 5,
      title: "Airly Sensitive Care Pads",
      available: "XL+ 290MM",
      price: 329,
      originalPrice: 379,
      image: "/images/pads-1.png",
    },
    {
      id: 6,
      title: "Airly Heavy Flow Pads",
      available: "XXL+ 330MM",
      price: 379,
      originalPrice: 429,
      image: "/images/pads-2.png",
    },
  ];

  return (
    <section
      className="
  relative
  bg-white
  py-16 sm:py-24
  overflow-hidden
  mt-0
  z-[10]
"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group -mt-54">
              <div className="relative w-20 h-20 bg-white shadow-xl rounded-[2rem] flex items-center justify-center p-3 border border-purple-50 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                <span className="font-black text-[#2E1065] text-xl italic tracking-tighter">
                  DAY
                </span>
              </div>
            </div>

            <div className="text-center sm:text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-800 tracking-tight text-center font-[Playfair_Display]">
                Limited-Time Deals For You
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] px-6 py-4 rounded-3xl border border-gray-100">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
              Ends In
            </span>

            <div className="flex items-center gap-3">
              {[
                { val: timeLeft.hours, label: "h" },
                { val: timeLeft.minutes, label: "m" },
                { val: timeLeft.seconds, label: "s" },
              ].map((unit, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center">
                    <div className="bg-purple-300 text-black w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm">
                      {unit.val.toString().padStart(2, "0")}
                    </div>
                  </div>
                  {idx < 2 && (
                    <span className="text-lg font-bold text-gray-200">:</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="relative group/swiper px-2">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-fs",
              prevEl: ".swiper-button-prev-fs",
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="flash-sales-swiper !overflow-visible"
          >
            {products.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white rounded-[1.5rem] p-5 relative border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                  <button className="absolute top-4 right-4 z-10 p-1.5 text-purple-500 hover:scale-110 transition-transform">
                    <FaRegHeart size={20} />
                  </button>

                  <div className="relative aspect-[4/3] mb-6 flex items-center justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col flex-grow">
                    <h3 className="text-[#1F2937] font-semibold text-lg leading-[1.4] mb-4 min-h-[56px] line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="space-y-4 mb-5">
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-gray-900 block">
                          Available In
                        </span>
                        <span className="inline-block bg-purple-200 text-black text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wide">
                          {item.available}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-gray-900">
                          ₹{item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => navigate("/my-bag")}
                      className="group relative w-full h-[92px] overflow-hidden rounded-full bg-transparent"
                    >
                      <img
                        src="/images/napkin-pads.png"
                        alt="Buy Now"
                        className="absolute inset-0 w-full h-full object-contain scale-125 transition-transform duration-500 ease-out group-hover:scale-[1.35]"
                      />

                      <span className="absolute left-1/2 bottom-7 -translate-x-1/2 text-[14px] font-medium uppercase text-white tracking-[1px] pointer-events-none text-center">
                        BUY NOW
                      </span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev-fs absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-all border border-gray-100 disabled:opacity-0">
            <FaArrowRight className="rotate-180" size={14} />
          </button>

          <button className="swiper-button-next-fs absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-all border border-gray-100 disabled:opacity-0">
            <FaArrowRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .flash-sales-swiper .swiper-button-disabled {
          opacity: 0 !important;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default FlashSales;