"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";
import {
  useCreateServicePartnerMutation,
  useUpdateServicePartnerMutation,
} from "@/store/apiSlice";

const ROLES = ["ADMIN", "USER", "ENGINEER", "SERVICE_PROVIDER"];

function ServicePartnersForm({
  setIsOpenForm,
  selectedUser,
  refetchUsers,
}: {
  setIsOpenForm: (isOpen: boolean) => void;
  selectedUser?: any;
  refetchUsers: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "SERVICE_PROVIDER",
    isActive: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  const [createServicePartner, { isLoading: isCreating }] =
    useCreateServicePartnerMutation();
  const [updateServicePartner, { isLoading: isUpdating }] =
    useUpdateServicePartnerMutation();

  console.log("selectedUser", selectedUser);

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        password: "",
        role: selectedUser.role || "SERVICE_PROVIDER",
        isActive: selectedUser.isActive ?? true,
      });
    }
  }, [selectedUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStatusChange = (value: boolean) => {
    setForm((prev) => ({ ...prev, isActive: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("selectedUser?._id", selectedUser?.id);
    e.preventDefault();
    try {
      if (selectedUser?.id) {
        const payload = { ...form };
        if (!form.password) delete (payload as any).password;
        const response = await updateServicePartner({
          id: selectedUser.id,
          updatedServicePartnerBody: payload,
        }).unwrap();
        console.log("Updated:", response);
      } else {
        const response = await createServicePartner(form).unwrap();
        console.log("Created:", response);
      }
      refetchUsers();
      setIsOpenForm(false);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpenForm(false);
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [setIsOpenForm]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md h-full bg-white dark:bg-gray-900 p-6 shadow-xl relative"
      >
        <button
          onClick={() => setIsOpenForm(false)}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          {selectedUser ? "Edit Service Partner" : "Add Service Partner"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
              disabled={!!selectedUser}
            />
          </div>

          {/* Password (only for create) */}
          {!selectedUser && (
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[38px] right-3 text-gray-600 dark:text-gray-300"
              >
                {showPassword ? (
                  <IoEyeOff className="w-5 h-5" />
                ) : (
                  <IoEye className="w-5 h-5" />
                )}
              </button>
            </div>
          )}

          {/* Role Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Status Radio */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                checked={form.isActive === true}
                onChange={() => handleStatusChange(true)}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Active
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                checked={form.isActive === false}
                onChange={() => handleStatusChange(false)}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Inactive
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
          >
            {selectedUser
              ? isUpdating
                ? "Updating..."
                : "Update"
              : isCreating
              ? "Saving..."
              : "Save"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ServicePartnersForm;
