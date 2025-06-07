"use client";

import React, { use, useEffect, useState } from "react";
import {
  MdAssignment,
  MdPendingActions,
  MdCheckCircle,
  MdOutlineToday,
  MdAssignmentTurnedIn,
  MdClose,
} from "react-icons/md";
import { RiProgress2Line } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import { useGetAllInquiriesByEngineerIdQuery } from "@/store/apiSlice";
import { formatDateTime } from "../../../Utils/Utils";

const stats = [
  {
    title: "All Inquiries",
    icon: <MdAssignment className="w-6 h-6" />,
    value: 120,
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  {
    title: "Today's Inquiries",
    icon: <MdOutlineToday className="w-6 h-6" />,
    value: 8,
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  {
    title: "Closed Today",
    icon: <MdCheckCircle className="w-6 h-6" />,
    value: 5,
    bg: "bg-green-100",
    text: "text-green-800",
  },
  {
    title: "Pending",
    icon: <MdPendingActions className="w-6 h-6" />,
    value: 30,
    bg: "bg-red-100",
    text: "text-red-800",
  },
  {
    title: "In Progress",
    icon: <RiProgress2Line className="w-6 h-6" />,
    value: 15,
    bg: "bg-indigo-100",
    text: "text-indigo-800",
  },
  {
    title: "Resolved",
    icon: <MdAssignmentTurnedIn className="w-6 h-6" />,
    value: 72,
    bg: "bg-teal-100",
    text: "text-teal-800",
  },
];

const todayInquiries = [
  {
    id: "1",
    title: "AC Service",
    time: "10:30 AM",
    date: "2025-06-04",
    status: "Pending",
    category: "Appliance",
    address: "123 Main Street",
    city: "Delhi",
    pincode: "110001",
    userName: "Ankit Mehta",
    userMobile: "+91-9876543210",
    altMobile: "+91-9123456789",
  },
  {
    id: "2",
    title: "Pipe Leakage",
    time: "12:00 PM",
    date: "2025-06-04",
    status: "In Progress",
    category: "Plumbing",
    address: "78 Shivaji Park",
    city: "Mumbai",
    pincode: "400028",
    userName: "Priya Singh",
    userMobile: "+91-9876540000",
    altMobile: "+91-9898989898",
  },
];

function EngineerHome() {
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [engineerId, setEngineerId] = useState<any>("683eef47858189e05cdc8f7e");

  const { data: engineerData } =
    useGetAllInquiriesByEngineerIdQuery(engineerId);

  return (
    <div className="px-4 py-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Engineer Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:grid-cols-3">
        {stats?.map((item) => (
          <div
            key={item.title}
            className={`flex flex-col justify-between p-4 rounded-2xl shadow-md ${item.bg} ${item.text} transition-all hover:scale-[1.01] active:scale-[0.99]`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{item.title}</span>
              <div className="text-xl">{item.icon}</div>
            </div>
            <div className="text-3xl font-bold">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Today's Inquiries */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Today's Inquiries
        </h2>
        {/* <div>hello</div> */}
        <div className="space-y-3">
          {engineerData?.map((inq: any, index: any) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm cursor-pointer"
              onClick={() => setSelectedInquiry(inq)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                    {inq?.inquiryCategories?.[0]?.category?.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {
                      inq?.inquirySubCategories?.[0]?.subCategory
                        ?.subCategoryName
                    }{" "}
                    - ₹{inq.inquirySubCategories?.[0]?.subCategory?.price}
                    {/* - {inq.status} */}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-indigo-600 dark:text-indigo-400">
                    {formatDateTime(inq?.appointmentTime)?.time}
                  </span>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400">
                    {formatDateTime(inq?.appointmentTime)?.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, x: 500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 500 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end"
            onClick={() => setSelectedInquiry(null)}
          >
            <div
              className="bg-white dark:bg-gray-900 w-full sm:max-w-md h-full overflow-y-auto p-6 rounded-l-xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Inquiry Details
                </h3>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-xl text-gray-600 dark:text-gray-400 hover:text-red-500"
                >
                  <MdClose />
                </button>
              </div>

              <div className="space-y-3 text-sm pb-20">
                <Info
                  label="Customer Name"
                  value={selectedInquiry.customerName}
                />
                <Info
                  label="Mobile No"
                  value={`${selectedInquiry.mobileNo}, ${selectedInquiry.alternateMobile}`}
                />
                <Info
                  label="Address"
                  value={`${selectedInquiry.address}, ${selectedInquiry.city} - ${selectedInquiry.pincode}`}
                />
                <Info label="Status" value={selectedInquiry.status} />
                <Info
                  label="Date & Time"
                  value={`${
                    formatDateTime(selectedInquiry?.appointmentTime).date
                  } ${formatDateTime(selectedInquiry?.appointmentTime).time}`}
                />
                <Info
                  label={
                    selectedInquiry?.inquiryCategories?.[0]?.category?.name
                  }
                  value={`${selectedInquiry?.inquirySubCategories?.[0]?.subCategory?.subCategoryName}
                    - ₹${selectedInquiry.inquirySubCategories?.[0]?.subCategory?.price}`}
                />
                <Info label="Note" value={selectedInquiry.note} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="text-[11px] uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wide mb-1">
        {label}
      </div>
      <div className="text-sm font-medium text-gray-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}

export default EngineerHome;
