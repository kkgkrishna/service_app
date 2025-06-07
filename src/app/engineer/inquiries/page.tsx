"use client";

import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllInquiriesByEngineerIdWithDateQuery } from "@/store/apiSlice";
import { formatDateTime } from "../../../../Utils/Utils";
import dayjs from "dayjs";
import CustomLoader from "../../../../CustomPages/CustomLoader";
import LocationCardByDate from "../LocationCardByDate";

function getStatusColors(status: string) {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300";
    case "IN PROGRESS":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-300";
    case "RESOLVED":
      return "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300";
    case "ASSIGNED":
      return "bg-pink-100 text-pink-800 dark:bg-pink-800/30 dark:text-pink-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
}

function EngineerInquiries() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  const engineerId = "683eef47858189e05cdc8f7e";

  const { data, isLoading } = useGetAllInquiriesByEngineerIdWithDateQuery(
    engineerId as any
  );
  const inquiriesByDate = data && typeof data === "object" ? data : {};

  const toggleSection = (dateKey: string) => {
    setOpenSections((prev) => ({ ...prev, [dateKey]: !prev[dateKey] }));
  };

  const todayFormatted = dayjs().format("DD/MMMM/YYYY");
  const hasToday = Object.keys(inquiriesByDate).includes(todayFormatted);
  const hasAnyData = Object.keys(inquiriesByDate).length > 0;

  return (
    <div className="relative px-4 py-6 sm:px-6 md:px-8 max-w-3xl mx-auto">
      {isLoading && <CustomLoader />}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Inquiries Grouped by Date
      </h1>

      {!hasAnyData && (
        <div className="min-h-[40vh] flex justify-center items-center">
          <p className="text-gray-500 dark:text-gray-400 border-red-400 border rounded-lg p-5">
            No inquiries assigned yet.
          </p>
        </div>
      )}

      {hasAnyData && !hasToday && (
        <div className="min-h-[40vh] flex justify-center items-center">
          <p className="text-gray-500 dark:text-gray-400 border-red-400 border rounded-lg p-5">
            Today no service assigned.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {Object.entries(inquiriesByDate).map(([date, items]: [string, any]) => {
          const isOpen = openSections[date] ?? false;
          return (
            <div
              key={date}
              className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleSection(date)}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-left flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                <span>{date}</span>
                <div className="text-sm flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {items.length} item{items.length > 1 && "s"}
                  </span>
                  {isOpen ? <MdExpandLess /> : <MdExpandMore />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden divide-y divide-gray-100 dark:divide-gray-800"
                  >
                    {items.map((item: any) => {
                      const { time } =
                        formatDateTime(
                          item?.appointmentTime || item?.createdAt
                        ) || {};
                      return (
                        <li
                          key={item.id}
                          className="p-3 space-y-2 text-base text-gray-700 dark:text-gray-300 bg-gray-600/10 mb-5"
                        >
                          <div className="flex justify-between">
                            <div className="font-semibold text-gray-800 dark:text-white">
                              {
                                item?.inquirySubCategories?.[0]?.subCategory
                                  ?.subCategoryName
                              }{" "}
                              – ₹
                              {
                                item?.inquirySubCategories?.[0]?.subCategory
                                  ?.price
                              }
                            </div>
                            <div
                              className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColors(
                                item.status
                              )}`}
                            >
                              {item.status}
                            </div>
                          </div>
                          <div>
                            Service:{" "}
                            {item?.inquiryCategories?.[0]?.category?.name}
                          </div>
                          <div>Customer: {item.customerName}</div>
                          <div>
                            Mobile: {item.mobileNo}, {item.alternateMobile}
                          </div>
                          <div>Time: {time}</div>
                          <div>
                            Address: {item.address}, {item.city} -{" "}
                            {item.pincode}
                          </div>
                          <div>Note: {item.note || "-"}</div>
                          <div>Inquiry Id: {item.id || "-"}</div>

                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-5 rounded"
                            onClick={() => {
                              setSelectedInquiry(item);
                              setShowLocationPopup(true);
                            }}
                          >
                            Show My Location
                          </button>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {showLocationPopup && (
        <AnimatePresence mode="wait">
          {showLocationPopup && selectedInquiry && (
            <motion.div
              key="locationPopup"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full sm:w-1/2 bg-white dark:bg-gray-800 z-50 shadow-xl p-4 overflow-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">My Location</h2>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => setShowLocationPopup(false)}
                >
                  Close
                </button>
              </div>
              <LocationCardByDate inquiry={selectedInquiry} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default EngineerInquiries;
