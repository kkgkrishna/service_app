"use client";

import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "framer-motion";

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <section className="bg-white px-6 py-20 text-black relative space-y-20">
      {/* Quick Access Boxes */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto space-y-12 text-center"
      >
        <h2 className="text-3xl font-bold text-[#2f4097]">
          Get in touch with us.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow p-6 space-y-4 text-center">
            <div className="flex justify-center">
              <FaPhoneAlt className="text-[#2f4097] text-4xl" />
            </div>
            <h4 className="text-xl font-semibold text-[#2f4097]">
              Speak to Us
            </h4>
            <p className="text-gray-600 text-sm">
              For queries, support & complaints,
              <br /> contact: <strong>+91 0987654321</strong>
            </p>
            <button className="bg-[#2f4097] text-white px-6 py-2 rounded-full font-semibold text-sm mt-2">
              Call
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 space-y-4 text-center">
            <div className="flex justify-center">
              <FaWhatsapp className="text-[#2f4097] text-4xl" />
            </div>
            <h4 className="text-xl font-semibold text-[#2f4097]">
              Chat with Us
            </h4>
            <p className="text-gray-600 text-sm">
              Drop us a message for quick WhatsApp assistance
            </p>
            <button className="bg-[#2f4097] text-white px-6 py-2 rounded-full font-semibold text-sm mt-2">
              WhatsApp
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 space-y-4 text-center">
            <div className="flex justify-center">
              <FaEnvelope className="text-[#2f4097] text-4xl" />
            </div>
            <h4 className="text-xl font-semibold text-[#2f4097]">
              Write to Us
            </h4>
            <p className="text-gray-600 text-sm">
              For inquiries, quotes or export details, email us at:{" "}
              <strong>info@example.com</strong>
            </p>
            <button className="bg-[#2f4097] text-white px-6 py-2 rounded-full font-semibold text-sm mt-2">
              Email
            </button>
          </div>
        </div>
      </motion.div>
      {/* Top Contact Info + Form */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row rounded-3xl shadow-xl overflow-hidden bg-white"
      >
        {/* Contact Info */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full lg:w-1/2 p-8 md:p-12 space-y-6"
        >
          <h3 className="text-2xl font-bold mb-4 text-[#2f4097]">CONTACT US</h3>

          <div className="flex items-center gap-4">
            <div className="bg-[#2f4097] p-3 rounded-full text-white text-xl">
              <FaEnvelope />
            </div>
            <p className="text-gray-700 font-medium">info@example.com</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#2f4097] p-3 rounded-full text-white text-xl">
              <FaPhoneAlt />
            </div>
            <p className="text-gray-700 font-medium">+91 0987654321</p>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-[#2f4097] p-3 rounded-full text-white text-xl">
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

        {/* Form */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full lg:w-1/2 p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-gray-200 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6 text-[#2f4097]">
            GET IN TOUCH
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your fullname"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#2f4097]"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#2f4097]"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#2f4097]"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#2f4097]"
            />
            <button
              type="submit"
              className="bg-[#2f4097] hover:bg-[#24337a] text-white px-8 py-3 rounded-full font-semibold text-sm transition"
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
