"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const serviceCategories = [
  "TV UPTO 32INCH Installation",
  "Window AC Installation",
  "Split AC Installation",
  "Chimney Installation",
  "Gas Geyser Installation",
  "Water Purifier Installation",
  "DTH Installation",
  "HOB TOP Installation",
  "Chimney Deep Cleaning",
  "Electric Geyser Services",
  "Water Purifier Service",
  "Gas Stove Repair",
  "Split / Window (Deep Cleaning with Jet Pump)",
  "Cassette AC Repair",
  "Gas Leak Fixing & Refill (Window/Split)",
  "Chimney Uninstallation",
];

interface AddEngineerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (engineer: any) => void;
  type: "add" | "edit";
  initialData?: any;
}

export default function AddEngineerModal({
  isOpen,
  onClose,
  onAdd,
  type,
  initialData,
}: AddEngineerModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    categories: [] as string[],
  });

  useEffect(() => {
    if (type === "edit" && initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "", // keep password empty in edit
        phone: initialData.phone || "",
        address: initialData.address || "",
        city: initialData.city || "",
        categories: initialData.categories || [],
      });
    } else {
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        city: "",
        categories: [],
      });
    }
  }, [type, initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (cat: string) => {
    setForm((prev) => {
      const categories = prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat];
      return { ...prev, categories };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
    toast.success(
      type === "edit"
        ? "Engineer updated successfully"
        : "Engineer added successfully"
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          {type === "edit" ? "Update Engineer" : "Add New Engineer"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="col-span-1 space-y-4">
            {["name", "email", "password", "phone"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}*
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={form[field as keyof typeof form] as string}
                  onChange={handleChange}
                  required={field !== "password" || type === "add"}
                  placeholder={
                    field === "password" && type === "edit"
                      ? "Leave blank to keep same"
                      : ""
                  }
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
            ))}
          </div>

          <div className="col-span-1 space-y-4">
            {["address", "city"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}*
                </label>
                <input
                  type="text"
                  name={field}
                  value={form[field as keyof typeof form] as string}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
            ))}

            {/* Categories Dropdown with Styled Checkboxes */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Categories
              </label>
              <details className="w-full border rounded-md dark:bg-gray-700 dark:text-white px-4 py-2 open:shadow-lg">
                <summary className="cursor-pointer list-none">
                  {form.categories.length > 0
                    ? "Selected Categories"
                    : "Select categories"}
                </summary>
                <div className="mt-2 max-h-48 overflow-y-auto space-y-1">
                  {serviceCategories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 px-2 py-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={form.categories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 rounded text-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </details>

              {/* Chips */}
              {form.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.categories.map((cat) => (
                    <span
                      key={cat}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium dark:bg-blue-800 dark:text-blue-100"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2 flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {type === "edit" ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
