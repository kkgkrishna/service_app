"use client";

import React from "react";
import {
  MdEmail,
  MdPhone,
  MdLocationCity,
  MdWork,
  MdHome,
  MdMap,
  MdPinDrop,
  MdCategory,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const mockProfile = {
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  role: "ENGINEER",
  status: "Active",
  phone: "+91-9876543210",
  address: "12A, Sunshine Apartments, Andheri West",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400058",
  joiningDate: "2024-11-20",
  categories: ["AC Repair", "Washing Machine", "Refrigerator"],
};

function EngineerAccount() {
  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50 dark:bg-gray-950">
      {/* Avatar & Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <FaUserCircle className="text-6xl text-indigo-500 dark:text-indigo-400 mb-2" />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {mockProfile.name}
        </h1>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {mockProfile.role}
        </span>
        <span
          className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
            mockProfile.status === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300"
          }`}
        >
          {mockProfile.status}
        </span>
      </div>

      {/* Info Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
        <InfoRow icon={<MdEmail />} label="Email" value={mockProfile.email} />
        <InfoRow icon={<MdPhone />} label="Phone" value={mockProfile.phone} />
        <InfoRow
          icon={<MdHome />}
          label="Address"
          value={mockProfile.address}
        />
        <InfoRow
          icon={<MdLocationCity />}
          label="City"
          value={mockProfile.city}
        />
        <InfoRow icon={<MdMap />} label="State" value={mockProfile.state} />
        <InfoRow
          icon={<MdPinDrop />}
          label="Pincode"
          value={mockProfile.pincode}
        />
        <InfoRow
          icon={<MdWork />}
          label="Joining Date"
          value={new Date(mockProfile.joiningDate).toLocaleDateString()}
        />
        <CategoryRow
          icon={<MdCategory />}
          label="Categories"
          values={mockProfile.categories}
        />
      </div>
    </div>
  );
}

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 px-5 py-4">
    <div className="text-lg text-indigo-500 dark:text-indigo-400">{icon}</div>
    <div className="flex-1">
      <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">
        {label}
      </div>
      <div className="text-sm text-gray-900 dark:text-white">{value}</div>
    </div>
  </div>
);

const CategoryRow = ({
  icon,
  label,
  values,
}: {
  icon: React.ReactNode;
  label: string;
  values: string[];
}) => (
  <div className="flex items-start gap-3 px-5 py-4  sm:flex-row sm:items-center">
    <div className="text-lg text-indigo-500 dark:text-indigo-400">{icon}</div>
    <div className="flex-1">
      <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((cat) => (
          <span
            key={cat}
            className="inline-block px-3 py-1 text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-700/20 dark:text-indigo-300 rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default EngineerAccount;
