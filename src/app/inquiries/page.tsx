"use client";

import DashboardLayout from "@/components/DashboardLayout";
import InquiryModal from "@/components/inquiries/InquiryModal";
import { useState, useCallback, useEffect } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface Inquiry {
  id: string;
  customerName: string;
  mobileNo: string;
  city: string;
  service: string;
  callbackTime: string;
  appointmentTime: string;
  amount: number;
  status: "pending" | "active" | "resolved" | "closed";
}

interface Filters {
  from: string;
  to: string;
  status: string;
  search: string;
  page: number;
  limit: number;
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
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch inquiries from API
  const fetchInquiries = useCallback(async () => {
    try {
      setIsLoading(true);
      const query = new URLSearchParams();
      if (filters.status) query.append("status", filters.status);
      if (filters.search) query.append("search", filters.search);
      if (filters.from) query.append("from", filters.from);
      if (filters.to) query.append("to", filters.to);
      query.append("page", filters.page.toString());
      query.append("limit", filters.limit.toString());

      const response = await fetch(`/api/inquiries?${query.toString()}`);
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

  const handleEditInquiry = async (data: any) => {
    try {
      const response = await fetch(`/api/inquiries?id=${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    setSelectedInquiry(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (inquiry: Inquiry) => {
    setModalMode("edit");
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const totalPages = Math.ceil(totalItems / filters.limit);

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Inquiry ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
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
                  inquiries.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 dark:text-primary-400">
                        {inquiry.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {inquiry.customerName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {inquiry.mobileNo}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {inquiry.city}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {inquiry.service}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          Callback: {inquiry.callbackTime}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Appointment: {inquiry.appointmentTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${
                            inquiry.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
                              : inquiry.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
                              : inquiry.status === "resolved"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500"
                              : inquiry.status === "closed"
                              ? "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500"
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditModal(inquiry)}
                            className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(inquiry.id)}
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
                  Show
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
        inquiry={selectedInquiry}
        onSubmit={modalMode === "add" ? handleAddInquiry : handleEditInquiry}
      />
    </DashboardLayout>
  );
}
