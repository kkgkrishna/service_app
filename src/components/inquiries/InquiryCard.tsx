"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

interface Inquiry {
  id: string;
  customerName: string;
  mobileNo: string;
  alternateMobile: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  landmark: string;
  service: string;
  callbackTime: string;
  appointmentTime: string;
  amount: number;
  status: string;
  priority: string;
  userId: string;
  engineerId?: string | null;
  createdAt: string;
  updatedAt: string;
  remark?: string;
  feedback?: string;
  cancelReason?: string;
  note?: string;
  invoiceCustomer?: string;
  cancelInquire?: boolean;
  inquiryCategories: {
    category: {
      name: string;
    };
  }[];
  inquirySubCategories: {
    subCategory: {
      subCategoryName: string;
      price: number;
    };
  }[];
}

interface InquiryCardProps {
  inquiry: Inquiry;
  onSaveCallback?: () => void;
  onSaveAppointment?: () => void;
  onView?: () => void;
  onRemark?: () => void;
  onCancel?: () => void;
  onFeedback?: () => void;
  onCancelRequest?: () => void;
}

function InquiryCard({
  inquiry,
  onSaveCallback,
  onSaveAppointment,
  onView,
  onRemark,
  onCancel,
  onFeedback,
  onCancelRequest,
}: InquiryCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-4 w-full max-w-full">
      {/* Accordion Header */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center cursor-pointer"
      >
        <div>
          <div className="flex items-center gap-3">
            <h2 className="  dark:text-gray-300 text-purple-700">
              Inquiry ID : {inquiry.id}
            </h2>
            <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold">
              {inquiry.status}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
            Customer Name : {inquiry.customerName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Mobile: {inquiry.mobileNo}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Location: {inquiry.city}, {inquiry.state} - {inquiry.pincode}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 border p-2 rounded-lg mt-2">
            <p className="">Service :</p>
            {inquiry.inquiryCategories?.length > 0 && (
              <>
                <ul className="  ">
                  {inquiry.inquiryCategories.map((cat, idx) => (
                    <li key={idx}>
                      {cat.category?.name || "Unnamed Category"}
                    </li>
                  ))}
                </ul>
                <FaArrowRightLong className="text-2xl text-gray-500" />
                <ul className="">
                  {inquiry.inquirySubCategories.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full dark:bg-blue-900 dark:text-blue-300"
                    >
                      {sub.subCategory?.subCategoryName} — ₹
                      {sub.subCategory?.price}
                    </span>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IoIosArrowDown
            className={`text-2xl text-gray-500 transition-all duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden space-y-4"
          >
            {/* Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300 border p-3 rounded-lg">
              <p>
                <strong>City:</strong> {inquiry.city}
              </p>
              <p>
                <strong>State:</strong> {inquiry.state}
              </p>
              <p>
                <strong>Landmark:</strong> {inquiry.landmark}
              </p>
              <p>
                <strong>Pincode:</strong> {inquiry.pincode}
              </p>
              <p className="sm:col-span-2">
                <strong>Address:</strong> {inquiry.address}
              </p>
            </div>

            {/* Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300 border p-3 rounded-lg">
              <p>
                <strong>Service:</strong> {inquiry.service}
              </p>
              <p>
                <strong>Amount:</strong> ₹{inquiry.amount}
              </p>
              <p>
                <strong>Priority:</strong> {inquiry.priority}
              </p>
              <p>
                <strong>Engineer:</strong>{" "}
                {inquiry.engineerId || "Not Assigned"}
              </p>
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300 border p-3 rounded-lg">
              <p>
                <strong>Callback:</strong>{" "}
                {new Date(inquiry.callbackTime).toLocaleString()}
              </p>
              <p>
                <strong>Appointment:</strong>{" "}
                {new Date(inquiry.appointmentTime).toLocaleString()}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(inquiry.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {new Date(inquiry.updatedAt).toLocaleString()}
              </p>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Add Callback
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                />
                <button
                  className="w-full mt-2 bg-indigo-700 hover:bg-indigo-800 text-white py-1 rounded text-sm"
                  onClick={onSaveCallback}
                >
                  Save
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Add Appointment
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                />
                <button
                  className="w-full mt-2 bg-indigo-700 hover:bg-indigo-800 text-white py-1 rounded text-sm"
                  onClick={onSaveAppointment}
                >
                  Save
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
              <button
                onClick={onView}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded"
              >
                View
              </button>
              <button
                onClick={onRemark}
                className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded"
              >
                Remark
              </button>
              <button
                onClick={onCancel}
                className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={onFeedback}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded"
              >
                Feedback
              </button>
              <button
                onClick={onCancelRequest}
                className="bg-orange-600 hover:bg-orange-700 text-white text-sm py-2 rounded"
              >
                Cancel Request
              </button>
              <button
                onClick={onFeedback}
                className="bg-gray-700 hover:bg-gray-800 text-white text-sm py-2 rounded"
              >
                Engineer Invoice
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InquiryCard;
