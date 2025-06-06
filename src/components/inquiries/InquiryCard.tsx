"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  useGetAllEngineersByCategoryIdQuery,
  useUpdateInquiryMutation,
} from "@/store/apiSlice";
import CustomLoader from "../../../CustomPages/CustomLoader";
import { toast } from "react-hot-toast";

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
  amount: string;
  status: string;
  priority: string;
  userId: string;
  engineerId?: string | null;
  engineer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    status: boolean;
    address: string;
    createdAt: string;
    updatedAt: string;
  };
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
      categoryId?: string;
    };
    subCategoryId?: string;
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
  refetchInquiries?: () => void;
}

function InquiryCard({
  inquiry,
  onView,
  onRemark,
  onCancel,
  onFeedback,
  onCancelRequest,
  refetchInquiries,
}: InquiryCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedInquiryData, setUpdatedInquiryData] = useState<
    Partial<Inquiry>
  >({});

  const [isAssignPopupOpen, setIsAssignPopupOpen] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>("");
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const [updateInquiry, { isLoading: isUpdatingInquiry }] =
    useUpdateInquiryMutation();
  const { data: engineers, isLoading: isLoadingEngineers } =
    useGetAllEngineersByCategoryIdQuery(selectedCategoryId, {
      skip: !selectedCategoryId,
    });

  function extractSubAndCategoryIds(
    inquirySubCategories: Inquiry["inquirySubCategories"]
  ) {
    const subCategoryIds: string[] = [];
    const categoryIds: Set<string> = new Set();

    for (const item of inquirySubCategories || []) {
      if (item?.subCategoryId) subCategoryIds.push(item.subCategoryId);
      if (item?.subCategory?.categoryId)
        categoryIds.add(item.subCategory.categoryId);
    }

    return {
      subCategoryIds,
      categoryIds: Array.from(categoryIds),
    };
  }

  useEffect(() => {
    if (!inquiry) return;

    const { subCategoryIds, categoryIds } = extractSubAndCategoryIds(
      inquiry.inquirySubCategories || []
    );

    setUpdatedInquiryData({
      ...inquiry,
      amount: Number(inquiry.amount || 0).toString(),
      inquirySubCategories: subCategoryIds as any,
      inquiryCategories: categoryIds as any,
    });
  }, [inquiry]);

  useEffect(() => {
    if (isAssignPopupOpen) {
      setSelectedCategoryId(updatedInquiryData?.inquiryCategories?.[0]);
    }
  }, [isAssignPopupOpen]);

  const handleUpdateInquiry = async (data: Partial<Inquiry>) => {
    // console.log("data", data);
    try {
      const response = await updateInquiry({
        updatedInquiryBody: data,
        inquiryId: inquiry.id,
      });
      // console.log("response", response);
      refetchInquiries?.();
      toast.success("Inquiry updated successfully");
    } catch (error) {
      console.error("Error updating inquiry:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-4 w-full max-w-full">
      {(isUpdatingInquiry || isLoadingEngineers) && <CustomLoader />}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center cursor-pointer"
      >
        <div>
          <div className="flex items-center gap-3">
            <h2 className="dark:text-gray-300 text-purple-700">
              Inquiry ID : {inquiry.id}
            </h2>
            <span
              className={`text-sm  px-2 py-1 rounded font-semibold capitalize ${
                inquiry.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : inquiry.status === "ASSIGNED"
                  ? "bg-green-100 text-green-800"
                  : inquiry.status === "RESOLVED"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
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

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 dark:text-gray-300 border p-2 rounded-lg mt-2">
            <p className="font-medium">Service:</p>
            {inquiry.inquiryCategories?.map((cat, idx) => (
              <span
                key={idx}
                className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded"
              >
                {cat.category?.name || "Unnamed Category"}
              </span>
            ))}
            <FaArrowRightLong className="text-xl text-gray-500" />
            {inquiry.inquirySubCategories?.map((sub, idx) => (
              <span
                key={idx}
                className="px-3 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                {sub.subCategory?.subCategoryName} — ₹{sub.subCategory?.price}
              </span>
            ))}
          </div>
        </div>
        <IoIosArrowDown
          className={`text-2xl text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden space-y-4"
          >
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300 border p-3 rounded-lg">
              <p>
                <strong>Priority:</strong> {inquiry.priority}
              </p>
              <p>
                <strong>Engineer:</strong>{" "}
                {inquiry.engineer?.name || "Not Assigned"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300 border p-3 rounded-lg">
              <p>
                <strong>Created:</strong>{" "}
                {new Date(inquiry.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {new Date(inquiry.updatedAt).toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Add Callback
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                  value={new Date(inquiry.callbackTime)
                    .toISOString()
                    .slice(0, 16)}
                  onChange={(e) =>
                    setUpdatedInquiryData({
                      ...updatedInquiryData,
                      callbackTime: new Date(e.target.value).toISOString(),
                    })
                  }
                />
                <button
                  className="w-full mt-2 bg-indigo-700 hover:bg-indigo-800 text-white py-1 rounded text-sm"
                  onClick={() => handleUpdateInquiry(updatedInquiryData)}
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
                  value={new Date(inquiry.appointmentTime)
                    .toISOString()
                    .slice(0, 16)}
                  onChange={(e) =>
                    setUpdatedInquiryData({
                      ...updatedInquiryData,
                      appointmentTime: new Date(e.target.value).toISOString(),
                    })
                  }
                />
                <button
                  className="w-full mt-2 bg-indigo-700 hover:bg-indigo-800 text-white py-1 rounded text-sm"
                  onClick={() => handleUpdateInquiry(updatedInquiryData)}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
              <button
                onClick={() => setIsNoteOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded"
              >
                {inquiry.note ? "View Note" : "Add Note"}
              </button>
              {/* <button
                onClick={onRemark}
                className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded"
              >
                Remark
              </button> */}
              {/* <button
                onClick={onFeedback}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded"
              >
                Feedback
              </button> */}
              {/* <button
                onClick={onFeedback}
                className="bg-gray-700 hover:bg-gray-800 text-white text-sm py-2 rounded"
              >
                Engineer Invoice
              </button> */}
              <button
                // onClick={() => handleAssignEngineer()}
                onClick={() => setIsAssignPopupOpen(true)}
                className={` text-white text-sm py-2 rounded ${
                  inquiry.status === "ASSIGNED"
                    ? "bg-slate-600 hover:bg-slate-700"
                    : "bg-orange-500 hover:bg-orange-400"
                }`}
              >
                {inquiry.status === "ASSIGNED"
                  ? "Reassign Engineer"
                  : "Assign Engineer"}
              </button>
              <button
                onClick={onCancel}
                className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note Popup */}

      <AnimatePresence>
        {isNoteOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 z-50 shadow-lg border-l border-gray-300 dark:border-gray-700 p-5 overflow-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Add Note
              </h2>
              <button
                className="text-gray-600 dark:text-gray-300 hover:text-red-500"
                onClick={() => setIsNoteOpen(false)}
              >
                ✕
              </button>
            </div>
            <textarea
              rows={6}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              value={inquiry.note || noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write a note..."
            />
            <button
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
              onClick={async () => {
                await handleUpdateInquiry({
                  ...updatedInquiryData,
                  note: noteText,
                });
                setIsNoteOpen(false);
              }}
            >
              Save Note
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assign Engineer Popup */}

      <AnimatePresence>
        {isAssignPopupOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 z-50 shadow-lg border-l border-gray-300 dark:border-gray-700 p-5 overflow-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Assign Engineer
              </h2>
              <button
                className="text-gray-600 dark:text-gray-300 hover:text-red-500"
                onClick={() => setIsAssignPopupOpen(false)}
              >
                ✕
              </button>
            </div>

            <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
              Select Engineer
            </label>
            <select
              className="w-full mb-4 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
              value={selectedEngineer}
              onChange={(e) => setSelectedEngineer(e.target.value)}
            >
              <option value="">-- Select Engineer --</option>
              {engineers?.map((engineer) => (
                <option key={engineer.id} value={engineer.id}>
                  {engineer.name}
                </option>
              ))}
            </select>

            <button
              className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
              onClick={async () => {
                await handleUpdateInquiry({
                  ...updatedInquiryData,
                  engineerId: selectedEngineer,
                  status: "ASSIGNED",
                });
                setIsAssignPopupOpen(false);
              }}
            >
              Assign
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InquiryCard;
