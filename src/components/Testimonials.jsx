import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Ananya Sharma",
      role: "Verified Buyer",
      content: "I've tried many organic brands, but these bamboo pads are on another level...",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya"
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Health Enthusiast",
      content: "The stacking scroll effect on the site is cool, but the products are even cooler...",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      role: "Eco-Conscious User",
      content: "Finally a brand that cares about both women and the planet...",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha"
    },
    {
      id: 4,
      name: "Meera Iyer",
      role: "Yoga Instructor",
      content: "Being active all day requires something reliable...",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden z-10">
       <div
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "linear-gradient(135deg, #6e0fbdef 0%, #370460ff 20%, #751fbbff 45%, #4A1570 68%, #9542d1ff 100%)",
                }}
            />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight font-[Playfair_Display]">
              Real Stories from <span className="text-purple-200">Real Women</span>
            </h2>

            <div className="w-24 h-1.5 bg-white/40 mx-auto rounded-full mb-6" />

            <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium">
              Join thousands of women who have switched to a more comfortable and sustainable period experience.
            </p>
          </motion.div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="testimonial-swiper !pb-16 items-stretch"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={review.id} className="h-auto flex">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-10 w-full min-h-[360px] sm:min-h-[390px] flex flex-col shadow-xl border border-white/30 relative group transition-all duration-500"
              >
                <motion.div
                  initial={{ opacity: 0, rotate: -180, scale: 0 }}
                  whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.2, ease: "easeOut" }}
                  className="absolute top-8 right-10 text-purple-200 transition-all duration-300"
                >
                  <FaQuoteLeft size={40} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.2, ease: "easeOut" }}
                  className="flex gap-1 mb-6"
                >
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, rotate: -90 }}
                      whileInView={{ opacity: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.1 + index * 0.2, ease: "easeOut" }}
                      className="text-yellow-400"
                    >
                      <FaStar size={16} />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.2, ease: "easeOut" }}
                  className="text-gray-700 text-lg leading-relaxed mb-8 italic flex-grow"
                >
                  "{review.content}"
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.2, ease: "easeOut" }}
                  className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto"
                >
                  <motion.img
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.2, ease: "easeOut" }}
                    className="w-14 h-14 rounded-2xl bg-purple-50 p-1 object-cover shadow-md"
                    src={review.avatar}
                    alt={review.name}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.3 + index * 0.2, ease: "easeOut" }}
                  >
                    <h4 className="text-gray-900 font-bold text-lg">
                      {review.name}
                    </h4>
                    <p className="text-purple-600 font-semibold text-xs uppercase tracking-widest">
                      {review.role}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .testimonial-swiper :global(.swiper-wrapper) {
          align-items: stretch;
        }

        .testimonial-swiper :global(.swiper-slide) {
          height: auto;
          display: flex;
        }

        .testimonial-swiper :global(.swiper-pagination-bullet) {
          width: 10px;
          height: 10px;
          background: #DDD6FE;
          opacity: 1;
        }

        .testimonial-swiper :global(.swiper-pagination-bullet-active) {
          width: 30px;
          border-radius: 5px;
          background: #7C3AED;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;