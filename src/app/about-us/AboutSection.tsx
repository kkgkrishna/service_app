"use client";

import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
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

const AboutSection: React.FC = () => {
  return (
    <section className="px-6 py-20 space-y-28 bg-white text-gray-800">
      {/* Section 1: Company Mission */}
      <motion.div
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="w-full lg:w-1/2 overflow-hidden rounded-3xl shadow-lg">
          <Image
            src="/assets/AboutSection/aboutSectionHero.png"
            alt="Technician working"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <h4 className="text-[#2f4097] text-sm font-semibold uppercase">
            Our Mission
          </h4>
          <h2 className="text-4xl font-bold text-[#2f4097]">
            Why Choose Arya Services?
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Arya Services is committed to delivering hassle-free, expert-level
            appliance repair and maintenance right at your doorstep. With
            transparent pricing, fully equipped professionals, and a strong
            customer-first philosophy, we simplify home services for your peace
            of mind.
          </p>
          <ul className="space-y-4">
            {[
              "Transparent pricing. No surprises.",
              "Skilled and certified technicians.",
              "Quick response and reliable support.",
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <FaCheckCircle className="text-[#2f4097] mt-1" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Section 2: Services Overview */}
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-10">
          <h3 className="text-sm font-semibold uppercase text-[#2f4097]">
            What We Offer
          </h3>
          <h2 className="text-3xl font-bold text-[#2f4097]">
            Our Core Services
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of appliance repair and installation services
            that ensure the smooth functioning of your home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white border"
            >
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={250}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-1 text-[#2f4097]">
                  {service.title}
                </h4>
                <p className="text-sm text-gray-600">
                  We offer fast and reliable repair, installation, and
                  maintenance for your {service.title.toLowerCase()}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Section 3: Our Promise */}
      <motion.div
        className="max-w-6xl mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-[#2f4097]">
          We Stand By Our Promise
        </h2>
        <p className="text-gray-600 text-lg">
          Whether it’s your cooling appliance in peak summer or your geyser in
          winter, we’re always ready to help. Our service ethos is rooted in
          trust, speed, and satisfaction. That’s why hundreds of customers rely
          on Arya Services.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {[
            {
              title: "Fast Scheduling",
              desc: "Book services online in just a few clicks.",
            },
            {
              title: "Trusted Professionals",
              desc: "Technicians with verified backgrounds & expert training.",
            },
            {
              title: "Peace of Mind",
              desc: "Real-time updates, transparent pricing, and guaranteed satisfaction.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 rounded-xl border shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-bold text-lg text-[#2f4097] mb-2">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
