import { Inquiry } from "@/types";
import React from "react";
import { formatDateForInput } from "../../../Utils/Utils";

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
    priority: string; // ✅ Add this line
    address: string;
    landmark: string;
    pincode: string;
    state: string;
    alternateMobile: string;
  };
}

function InquiryInfo({ isOpen, onClose, inquiry }: InquiryInfoProps) {
  if (!isOpen) return null;
  if (!inquiry) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className="bg-white dark:bg-gray-800 w-full max-w-xl mx-auto rounded-xl shadow-lg overflow-y-auto max-h-[90vh] p-6 relative">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Inquiry Details
          </h2>

          <div className="space-y-5">
            {[
              ["Inquiry ID", inquiry.id],
              ["Customer Name", inquiry.customerName],
              ["Mobile No", inquiry.mobileNo],
              ["Alternate Mobile", inquiry.alternateMobile],

              ["City", inquiry.city],
              ["Service", inquiry.service],
              ["Callback Time", formatDateForInput(inquiry.callbackTime)],
              ["Appointment Time", formatDateForInput(inquiry.appointmentTime)],
              ["Amount", `₹${inquiry.amount}`],
              ["Status", inquiry.status],
              ["Priority", inquiry.priority],
              ["Address", inquiry.address],
              ["Landmark", inquiry.landmark],
              ["Pincode", inquiry.pincode],
              ["State", inquiry.state],

              //   ["User ID", inquiry.userId],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {value || "N/A"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InquiryInfo;
