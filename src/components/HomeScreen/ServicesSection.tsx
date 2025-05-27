"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // ✅ updated for Swiper v9+
import "swiper/css";

const services = [
  { title: "Refrigerator", image: "/assets/ServiceSection/refrigerator.jpg" },
  { title: "Washing Machine", image: "/assets/ServiceSection/washing.jpg" },
  { title: "Water Purifier", image: "/assets/ServiceSection/water.jpg" },
  { title: "DTH", image: "/assets/ServiceSection/dth.png" },
  { title: "Cooler", image: "/assets/ServiceSection/cooler.jpeg" },
  { title: "Air Conditioner", image: "/assets/ServiceSection/ac.jpg" },
  { title: "Chimney", image: "/assets/ServiceSection/chimney.jpeg" },
  { title: "Microwave", image: "/assets/ServiceSection/microwave.jpg" },
  { title: "Geyser", image: "/assets/ServiceSection/geyser.jpg" },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="bg-[#2A2AA5] text-white py-16 px-4 z-10 ">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
          SERVICES
        </h2>
        <p className="text-lg italic text-blue-100 mb-1">
          "Our Pricing Starts from ₹499 up to ₹999 !"
        </p>
        <p className="text-sm md:text-base text-blue-200 max-w-xl mx-auto">
          Installation, Servicing & Repair of AC, Washing Machine, Cooler,
          Geyser, DTH, Refrigerator
        </p>
      </div>

      {/* Swiper Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className=" !z-10"
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5.5 },
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className="!z-10"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index} className="">
              <div className="flex-shrink-0 w-full max-w-[200px] text-center rounded-xl bg-white text-black shadow-lg overflow-hidden mx-auto z-10 ">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={200}
                  height={160}
                  className="w-full h-[140px] object-cover !z-10"
                />
                <div className="py-3 font-semibold">{service.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
