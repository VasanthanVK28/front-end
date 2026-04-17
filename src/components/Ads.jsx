import React from "react";
import { motion } from "framer-motion";


const Ads = () => {
        const napkinPad1 = "/images/test-1.jpg";
    const napkinPad2 = "/images/test-2.jpg";
    const napkinPad3 = "/images/test-3.jpg";
    const napkinPad4 = "/images/test-4.jpg";

  const adItems = [
    {
      icon: napkinPad1,
      title: "Biodegradable & Compostable",
      description:
        "Saathi Pads are biodegradable & compostable and degrade within six months - 1200 times faster than plastic pads!",
    },
    {
      icon: napkinPad2,
      title: "Empowering Women Employees",
      description:
        "Saathi employs women from the community, leading to an increase in job opportunities and empowers women.",
    },
    {
      icon: napkinPad3,
      title: "100% Natural",
      description:
        "Since Saathi pads don't contain chemicals, they provide a rash and irritation free experience.",
    },
    {
      icon: napkinPad4,
      title: "Good for the Earth",
      description:
        "When you dispose our sanitary napkins, it goes back to the earth giving life to a healthier, cleaner, and empowered tomorrow.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative z-[10] h-auto">
      <div className="relative h-auto flex items-center overflow-hidden py-12 sm:py-16">
        {/* Main Gradient Background */}
         <div
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "linear-gradient(135deg, #6e0fbdef 0%, #370460ff 20%, #751fbbff 45%, #4A1570 68%, #9542d1ff 100%)",
                }}
            />

        {/* Decorative blobs */}
        <div className="hidden sm:block absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />
        <div className="hidden sm:block absolute bottom-[-80px] right-[-60px] w-[250px] h-[250px] rounded-full bg-indigo-400/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: "easeOut", type: "spring", damping: 25 }}
            className="text-center text-white mt-12 font-bold mb-8 sm:mb-10 lg:mb-12
              text-2xl sm:text-3xl md:text-4xl lg:text-4xl
              leading-tight tracking-tight font-[Playfair_Display]"
          >
            Why Choose Airly?
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="
              grid gap-5
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              sm:gap-6
              lg:gap-7
              xl:gap-10
              text-center
            "
          >
            {adItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.8, rotate: index % 2 === 0 ? -10 : 10 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut", type: "spring", stiffness: 80 }}
                whileHover={{ y: -12, scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                className="
                  group
                  bg-white/95 backdrop-blur-md
                  rounded-[28px] sm:rounded-[32px] lg:rounded-[40px]
                  p-5 sm:p-6 md:p-7 lg:p-6 xl:p-8
                  shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                  border border-white/20
                  flex flex-col items-center
                  transition-all duration-500
                "
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15, ease: "easeOut" }}
                  className="
                    mb-5 sm:mb-6 lg:mb-7 xl:mb-8
                    flex items-center justify-center
                    w-24 h-24
                    sm:w-32 sm:h-32
                    md:w-36 md:h-36
                    lg:w-36 lg:h-36
                    xl:w-40 xl:h-40
                  "
                >
                  <motion.img
                    initial={{ opacity: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: 0.5 + index * 0.15, ease: "easeOut" }}
                    src={item.icon}
                    alt={item.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>
                <div>
                  <h3
                    className="
                      font-bold text-gray-900 mb-2 sm:mb-3
                      leading-tight px-1
                      text-base sm:text-base md:text-lg lg:text-base xl:text-lg
                    "
                  >
                    {item.title}
                  </h3>
                  <p
                    className="
                      text-gray-600 leading-relaxed
                      text-xs sm:text-sm md:text-sm lg:text-xs xl:text-sm
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Ads;