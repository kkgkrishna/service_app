"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import React, { useState } from "react";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Optionally reset form
    // setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section className="bg-white px-6 py-20 text-black relative -z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row rounded-3xl shadow-xl overflow-hidden bg-white"
      >
        {/* Contact Info */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full lg:w-1/2 p-8 md:p-12 space-y-6"
        >
          <h3 className="text-2xl font-bold mb-4">CONTACT US</h3>
          <div className="flex items-center gap-4">
            <div className="bg-[#1f2aa5] p-3 rounded-full text-white text-xl">
              <FaEnvelope />
            </div>
            <p className="text-gray-700 font-medium">info@example.com</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#1f2aa5] p-3 rounded-full text-white text-xl">
              <FaPhoneAlt />
            </div>
            <p className="text-gray-700 font-medium">+91 0987654321</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-[#1f2aa5] p-3 rounded-full text-white text-xl">
              <FaMapMarkerAlt />
            </div>
            <p className="text-gray-700 font-medium">
              MIG 110 Siddhart Inclave Vistar
              <br />
              Taramandal, Gorakhpur
              <br />
              Uttar Pradesh 273010
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full lg:w-1/2 p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-gray-200 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6">GET IN TOUCH</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your fullname"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-[#1f2aa5] hover:bg-[#1a238e] text-white px-8 py-3 rounded-full font-semibold text-sm"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
