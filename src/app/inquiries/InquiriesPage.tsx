"use client";

import DashboardLayout from "@/components/DashboardLayout";
import InquiryModal from "@/components/inquiries/InquiryModal";
import { useState, useCallback, useEffect } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import InquiryInfo from "@/components/inquiries/InquiryInfo";
import { FaIndianRupeeSign } from "react-icons/fa6";

interface Inquiry {
  id: string;
  customerName: string;
  mobileNo: string;
  city: string;
  service: string;
  callbackTime: string;
  appointmentTime: string;
  amount: number;
  status: "PENDING" | "ACTIVE" | "RESOLVED" | "CLOSED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  userId: string;
  address?: string;
}

interface Filters {
  from: string;
  to: string;
  status: string;
  search: string;
  page: number;
  limit: number;
  priority: string;
}

export default function InquiriesPage() {
  // State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filters, setFilters] = useState<Filters>({
    from: "",
    to: "",
    status: "",
    search: "",
    page: 1,
    limit: 10,
    priority: "",
  });
  const [isOpenAppointmentModal, setIsOpenAppointmentModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenInquiryInfo, setIsOpenInquiryInfo] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | undefined>();

  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const blankInquiry: Inquiry = {
    id: "",
    customerName: "",
    mobileNo: "",
    city: "",
    service: "",
    callbackTime: new Date().toISOString(),
    appointmentTime: new Date().toISOString(),
    amount: 0,
    status: "PENDING",
    priority: "HIGH",
    userId: "",
  };

  // Fetch inquiries from API
  const fetchInquiries = useCallback(async () => {
    try {
      setIsLoading(true);
      const query = new URLSearchParams();
      if (filters.status) query.append("status", filters.status.toUpperCase());
      if (filters.priority)
        query.append("priority", filters.priority.toUpperCase());
      if (filters.search) query.append("search", filters.search);
      if (filters.from) query.append("from", filters.from);
      if (filters.to) query.append("to", filters.to);
      query.append("page", filters.page.toString());
      query.append("limit", filters.limit.toString());

      console.log("Fetching page:", filters.page);
      console.log("API query:", query.toString());

      const response = await fetch(
        `/api/inquiries?${query.toString()}&excludeNullAddress=true`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Unknown error");

      setInquiries(data.inquiries || []);
      setTotalItems(data.total || 0);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast.error("Failed to fetch inquiries");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const handleAddInquiry = async (data: any) => {
    console.log("data", data);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create inquiry");

      toast.success("Inquiry created successfully");
      setIsModalOpen(false);
      fetchInquiries();
    } catch (error) {
      console.error("Error creating inquiry:", error);
      toast.error("Failed to create inquiry");
    }
  };

  // console.log("selectedInquiry", selectedInquiry);

  const toUTCISOString = (localDateStr: string): string => {
    const localDate = new Date(localDateStr);
    return localDate.toISOString(); // Converts local datetime to UTC ISO format
  };

  const handleEditInquiry = async (data: any) => {
    if (!selectedInquiry) {
      toast.error("No inquiry selected.");
      return;
    }

    // ✅ Convert datetime fields to proper ISO format
    const updatedData = {
      ...data,
      callbackTime: toUTCISOString(data.callbackTime),
      appointmentTime: toUTCISOString(data.appointmentTime),
    };

    // console.log("updatedData", updatedData);

    try {
      const response = await fetch(`/api/inquiries?id=${selectedInquiry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update inquiry");

      toast.success("Inquiry updated successfully");
      setIsModalOpen(false);
      fetchInquiries();
    } catch (error) {
      console.error("Error updating inquiry:", error);
      toast.error("Failed to update inquiry");
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?"))
      return;

    try {
      const response = await fetch(`/api/inquiries?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete inquiry");

      toast.success("Inquiry deleted successfully");
      fetchInquiries();
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      toast.error("Failed to delete inquiry");
    }
  };

  // Effects
  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Handlers
  const openAddModal = () => {
    setModalMode("add");
    setSelectedInquiry(blankInquiry);
    setIsModalOpen(true);
  };

  const openEditModal = (inquiry: Inquiry) => {
    setModalMode("edit");
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [key]: value,
        ...(key === "limit" ? { page: 1 } : {}), // Reset page to 1 when limit changes
      };
      console.log("Updated filters:", newFilters);
      return newFilters;
    });
  };

  const totalPages = Math.ceil(totalItems / filters.limit);

  const handleInquiryInfo = (inquiry: Inquiry) => {
    console.log("call huaa", inquiry);
    setSelectedInquiry(inquiry);
    setIsOpenInquiryInfo(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold gradient-text">
              Manage Inquiries
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Track and manage all service inquiries
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center px-4 py-2 bg-[var(--gradient-primary)] hover:opacity-90 text-gray-700 dark:text-gray-300 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">➕</span>
            Add New Inquiry
          </button>
        </div>

        {/* Filters Section */}
        <div className="glass-card rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                From Date
              </label>
              <input
                type="date"
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-primary-500 focus:border-primary-500"
                value={filters.from}
                onChange={(e) => handleFilterChange("from", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                To Date
              </label>
              <input
                type="date"
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-primary-500 focus:border-primary-500"
                value={filters.to}
                onChange={(e) => handleFilterChange("to", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-primary-500 focus:border-primary-500"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-primary-500 focus:border-primary-500"
                value={filters.priority}
                onChange={(e) => handleFilterChange("priority", e.target.value)}
              >
                <option value="" disabled>
                  Choose Priority
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-primary-500 focus:border-primary-500 pl-10"
                  placeholder="Search inquiries..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  🔍
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ">
                    Sr. No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Inquiry ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Mobile No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Add call back
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Add appointment
                  </th>{" "}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Add Notes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Engineer Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Engineer Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Remarks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Feedback
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Cancel Inquiry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Cancel Request
                  </th>{" "}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center">
                        <svg
                          className="animate-spin h-5 w-5 text-primary-500"
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
                        <span className="ml-2">Loading inquiries...</span>
                      </div>
                    </td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center">
                      No inquiries found
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inquiry, index) => (
                    <tr
                      key={inquiry.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      // onClick={() => handleInquiryInfo(inquiry)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 dark:text-primary-400">
                        {(filters.page - 1) * filters.limit + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 dark:text-primary-400">
                        {inquiry.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                          {inquiry.customerName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {inquiry.mobileNo}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {inquiry.city}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {inquiry.service}
                        </div>
                      </td>{" "}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2   shadow-sm">
                          {/* <div className="text-xs font-semibold uppercase">
                            Callback
                          </div> */}
                          <div className="text-sm font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-300 px-4 py-2 rounded-lg shadow-sm">
                            {format(
                              new Date(inquiry.callbackTime),
                              "dd MMM yyyy, h:mm a"
                            )}
                          </div>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            Add
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2  shadow-sm">
                          {/* <div className="text-xs font-semibold uppercase">
                            Appointment
                          </div> */}
                          <div className="text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 px-4 py-2 rounded-lg shadow-sm">
                            {format(
                              new Date(inquiry.appointmentTime),
                              "dd MMM yyyy, h:mm a"
                            )}
                          </div>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsOpenAppointmentModal(true);
                            }}
                          >
                            Add
                          </button>
                        </div>

                        {isOpenAppointmentModal && (
                          <div className="bg-white p-4 rounded-lg">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Appointment Time*
                              </label>
                              <input
                                type="datetime-local"
                                // defaultValue={formattedAppointmentTime}
                                className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 `}
                                // {...register("appointmentTime")}
                              />
                              {/* {errors.appointmentTime && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.appointmentTime.message}
                                </p>
                              )} */}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center gap-1">
                          <textarea
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-primary-500 focus:border-primary-500"
                            // value={inquiry.notes}
                            // onChange={(e) =>
                            //   handleFilterChange("notes", e.target.value)
                            // }
                          />
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            Add
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <FaIndianRupeeSign /> {inquiry.amount}
                        </div>
                      </td>{" "}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          Engineer Details
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm
                            ${
                              inquiry.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : inquiry.status === "ACTIVE"
                                ? "bg-green-100 text-green-800"
                                : inquiry.status === "RESOLVED"
                                ? "bg-blue-100 text-blue-800"
                                : inquiry.status === "CLOSED"
                                ? "bg-gray-200 text-gray-900"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          Engineer Invoice
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          Remarks
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          Feedback
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          Cancel Inquiry
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          Cancel Request
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(inquiry);
                            }}
                            className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteInquiry(inquiry.id);
                            }}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-3 border-t border-gray-200/50 dark:border-gray-700/50 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Showing {inquiries.length} of {totalItems} entries
                </span>
                <select
                  className="mx-2 rounded-md border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-700 dark:text-gray-300"
                  value={filters.limit}
                  onChange={(e) =>
                    handleFilterChange("limit", parseInt(e.target.value))
                  }
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  entries
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-600/80 disabled:opacity-50 transition-colors"
                  onClick={() => handleFilterChange("page", filters.page - 1)}
                  disabled={filters.page === 1 || isLoading}
                >
                  Previous
                </button>
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-600/80 disabled:opacity-50 transition-colors"
                  onClick={() => handleFilterChange("page", filters.page + 1)}
                  disabled={filters.page === totalPages || isLoading}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        inquiry={selectedInquiry as any}
        onSubmit={modalMode === "add" ? handleAddInquiry : handleEditInquiry}
      />

      <InquiryInfo
        isOpen={isOpenInquiryInfo}
        onClose={() => setIsOpenInquiryInfo(false)}
        inquiry={selectedInquiry as any}
      />
    </DashboardLayout>
  );
}
