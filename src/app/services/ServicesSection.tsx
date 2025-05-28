"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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

const ServicesSection = () => {
  return (
    <div className="px-6 py-20 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto space-y-16">
        <section className="text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold text-[#2f4097]"
          >
            Arya Services
          </motion.h1>
          <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-600">
            Arya Services is your trusted partner for fast, reliable, and expert
            home appliance service. From installations to emergency repairs, our
            technicians deliver top-tier service with utmost professionalism.
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gray-50 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-base">
                    We provide comprehensive service for your{" "}
                    {service.title.toLowerCase()}. Whether it's installation,
                    maintenance, or urgent repair, our experts ensure your
                    appliance performs flawlessly and safely.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-indigo-50 p-10 rounded-xl shadow-md space-y-6">
          <h2 className="text-3xl font-bold text-[#2f4097]">
            Why Choose Arya Services?
          </h2>
          <ul className="space-y-3 text-gray-700 list-disc pl-6">
            <li>Certified and experienced professionals.</li>
            <li>Quick response and same-day service available.</li>
            <li>Upfront pricing with no hidden costs.</li>
            <li>Original spare parts and warranty assurance.</li>
            <li>Trusted by thousands of happy customers across the region.</li>
          </ul>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#2f4097]">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At Arya Services, our mission is to revolutionize home service
            experiences by combining convenience, transparency, and expertise.
            We strive to deliver hassle-free maintenance and repair solutions
            that empower customers to enjoy the comfort of their homes without
            disruption.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We believe in creating lasting relationships built on trust,
            integrity, and quality. Every technician is trained not just to fix
            a problem but to educate and advise, ensuring long-term appliance
            health.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ServicesSection;
