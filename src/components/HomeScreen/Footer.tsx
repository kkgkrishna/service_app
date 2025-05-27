"use client";

import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1B1B32] text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
        {/* Logo & Socials */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <span className="text-4xl">⚙️</span>
            <h2 className="text-2xl font-bold text-white">Arya Services</h2>
          </div>
          <div className="flex gap-4 text-xl mt-2">
            <a href="#" className="hover:text-blue-300">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-300">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-300">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-xl font-bold mb-2 uppercase text-white">
            NEWS LETTER
          </h3>
          <p className="text-sm text-white/80 mb-4">
            Subscribe our newsletter to get our latest update & news
          </p>
          <form className="flex items-center bg-white rounded-lg overflow-hidden pe-1">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-3 text-black text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#1f2aa5] text-white px-5 py-3 text-lg "
            >
              <FaPaperPlane className="rounded-lg" />
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-white/80">
        <p>
          © Copyright 2022 <strong>Arya Service</strong>. All Rights Reserved. –
          Design & Developed by{" "}
          <a
            href="https://phynlabz.com"
            className="text-blue-400 hover:underline"
            target="_blank"
          >
            Phynlabz Tech Pvt. Ltd.
          </a>
        </p>
        <div className="flex justify-center gap-4 mt-2 text-sm">
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
          <a href="#" className="hover:underline">
            Terms and Conditions
          </a>
          <a href="#" className="hover:underline">
            Refund Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
