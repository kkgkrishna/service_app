"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { toast } from "react-hot-toast";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Call your API here (example)
    console.log("Forgot password request:", email);
    toast.success("Password reset link sent!");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`shadow-lg rounded-lg p-8 w-full max-w-md ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            theme === "dark" ? "text-indigo-400" : "text-blue-700"
          }`}
        >
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Enter your registered email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-400"
                  : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500"
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold transition ${
              theme === "dark"
                ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                : "bg-blue-700 hover:bg-blue-800 text-white"
            }`}
          >
            Send Reset Link
          </button>
        </form>

        <div
          className={`text-sm text-center mt-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Remembered?{" "}
          <Link
            href="/login"
            className={`font-medium ${
              theme === "dark"
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-blue-700 hover:underline"
            }`}
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
