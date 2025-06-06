"use client";

import React from "react";
import { formatDateForInput } from "../../../Utils/Utils";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";

interface InquiryInfoProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry?: {
    id: string;
    customerName: string;
    mobileNo: string;
    city: string;
    service: string;
    callbackTime: string;
    appointmentTime: string;
    amount: number;
    status: string;
    userId: string;
    priority: string;
    address: string;
    landmark: string;
    pincode: string;
    state: string;
    alternateMobile: string;
  };
}

function InquiryInfo({ isOpen, onClose, inquiry }: InquiryInfoProps) {
  return (
    <AnimatePresence>
      {isOpen && inquiry && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
          {/* Right Slide-in Panel */}
          <motion.div
            key="inquiry-info"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] h-full bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto relative"
          >
            {/* Close Icon */}
            <div className="absolute top-4 right-4">
              <IoIosCloseCircle
                className="text-4xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-transform hover:rotate-180 hover:scale-110 duration-300"
                onClick={onClose}
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">
              Inquiry Details
            </h2>

            <div className="space-y-4 text-sm text-gray-800 dark:text-gray-200">
              {[
                ["Inquiry ID", inquiry.id],
                ["Customer Name", inquiry.customerName],
                ["Mobile No", inquiry.mobileNo],
                ["Alternate Mobile", inquiry.alternateMobile],
                ["City", inquiry.city],
                ["Service", inquiry.service],
                ["Callback Time", formatDateForInput(inquiry.callbackTime)],
                [
                  "Appointment Time",
                  formatDateForInput(inquiry.appointmentTime),
                ],
                ["Amount", `₹${inquiry.amount}`],
                ["Status", inquiry.status],
                ["Priority", inquiry.priority],
                ["Address", inquiry.address],
                ["Landmark", inquiry.landmark],
                ["Pincode", inquiry.pincode],
                ["State", inquiry.state],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {label}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100 text-right">
                    {value || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default InquiryInfo;
