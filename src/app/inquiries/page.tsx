"use client";

import DashboardLayout from "@/components/DashboardLayout";
import InquiryModal from "@/components/inquiries/InquiryModal";
import { useState, useCallback, useEffect } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import InquiryInfo from "@/components/inquiries/InquiryInfo";
import { FaIndianRupeeSign } from "react-icons/fa6";
import InquiryCard from "@/components/inquiries/InquiryCard";

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

        {/* Inquiry Card */}
        <div className="flex gap-4">
          {inquiries.map((inquiry) => (
            <InquiryCard
              inquiry={inquiry as any}
              onSaveCallback={() => console.log("Save callback")}
              onSaveAppointment={() => console.log("Save appointment")}
              onView={() => console.log("View")}
              onRemark={() => console.log("Remark")}
              onCancel={() => console.log("Cancel")}
            />
          ))}
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
