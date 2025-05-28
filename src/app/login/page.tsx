"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      // Debug logging
      console.log("Login Response Status:", response.status);
      console.log("Login Response:", data);

      if (!response.ok) {
        console.error("Login failed:", {
          status: response.status,
          statusText: response.statusText,
          data: data,
        });
        throw new Error(data.error || data.message || "Failed to login");
      }

      // Show success message
      toast.success("Login successful! Redirecting...");

      // Get the redirect path from URL or default to dashboard
      const redirectTo = searchParams.get("from") || "/dashboard";

      // Wait for a short moment to ensure cookie is set
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Try to verify the login was successful
      try {
        const verifyResponse = await fetch("/api/me", {
          credentials: "include",
        });

        if (!verifyResponse.ok) {
          throw new Error("Failed to verify login");
        }

        // Use window.location for a hard redirect
        window.location.href = redirectTo;
      } catch (error) {
        console.error("Verification error:", error);
        // If verification fails, still try to redirect
        window.location.href = redirectTo;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to login");
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Sign in to your account"
      subtitle="Or start your 14-day free trial"
    >
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
              placeholder="Email address"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed pr-10"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={isLoading}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-indigo-500 dark:focus:ring-offset-gray-800 disabled:cursor-not-allowed"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900 dark:text-gray-300 select-none"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Don't have an account?
          </span>{" "}
          <Link
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
