"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface Engineer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: boolean;
}

export default function ManageEngineer() {
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([]);

  useEffect(() => {
    fetchEngineers();
  }, []);

  const fetchEngineers = async () => {
    try {
      const response = await fetch("/api/engineers");
      if (!response.ok) throw new Error("Failed to fetch engineers");
      const data = await response.json();
      setEngineers(data);
    } catch (error) {
      toast.error("Failed to load engineers");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    try {
      const response = await fetch(`/api/engineers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");
      toast.success("Status updated successfully");
      fetchEngineers(); // Refresh the list
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Error:", error);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEngineers(filteredEngineers.map((engineer) => engineer.id));
    } else {
      setSelectedEngineers([]);
    }
  };

  const handleSelectEngineer = (engineerId: string, checked: boolean) => {
    if (checked) {
      setSelectedEngineers((prev) => [...prev, engineerId]);
    } else {
      setSelectedEngineers((prev) => prev.filter((id) => id !== engineerId));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedEngineers.length === 0) {
      toast.error("Please select engineers to delete");
      return;
    }

    try {
      await Promise.all(
        selectedEngineers.map((id) =>
          fetch(`/api/engineers/${id}`, {
            method: "DELETE",
          })
        )
      );

      toast.success("Selected engineers deleted successfully");
      setSelectedEngineers([]);
      fetchEngineers();
    } catch (error) {
      toast.error("Failed to delete selected engineers");
      console.error("Error:", error);
    }
  };

  const filteredEngineers = engineers.filter(
    (engineer) =>
      engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.phone.includes(searchTerm)
  );

  const CustomCheckbox = ({
    checked,
    onChange,
    label,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
  }) => (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={cn(
          "w-4 h-4 rounded border-gray-300 text-blue-600",
          "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
          "dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-600",
          "transition-colors duration-200",
          "cursor-pointer"
        )}
      />
      {label && (
        <label className="ml-2 text-sm text-gray-900 dark:text-gray-300 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">Show</span>
              <select
                className={cn(
                  "border rounded px-3 py-1 pr-8",
                  "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                  "dark:bg-gray-700 dark:border-gray-600",
                  "text-gray-900 dark:text-gray-300",
                  "appearance-none",
                  "bg-no-repeat bg-right",
                  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')]",
                  "bg-[length:1.25rem_1.25rem]",
                  "dark:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23e2e8f0%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')]"
                )}
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(e.target.value)}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-gray-600 dark:text-gray-400">entries</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-400">Search:</span>
            <input
              type="text"
              className={cn(
                "border rounded px-3 py-1",
                "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                "dark:bg-gray-700 dark:border-gray-600",
                "text-gray-900 dark:text-gray-300",
                "placeholder-gray-400 dark:placeholder-gray-500"
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search engineers..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="w-12 px-6 py-3">
                  <CustomCheckbox
                    checked={
                      selectedEngineers.length === filteredEngineers.length &&
                      filteredEngineers.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEngineers.map((engineer) => (
                <tr
                  key={engineer.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4">
                    <CustomCheckbox
                      checked={selectedEngineers.includes(engineer.id)}
                      onChange={(checked) =>
                        handleSelectEngineer(engineer.id, checked)
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {engineer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-300">
                      {engineer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-300">
                      {engineer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-300">
                      {engineer.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className={`h-3 w-3 rounded-full ${
                          engineer.status ? "bg-green-500" : "bg-red-500"
                        } mr-2`}
                      ></span>
                      <span className="text-sm text-gray-900 dark:text-gray-300">
                        {engineer.status ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing{" "}
            {Math.min(filteredEngineers.length, parseInt(entriesPerPage))} of{" "}
            {filteredEngineers.length} entries
          </div>
          <button
            className={cn(
              "px-4 py-2 rounded transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              selectedEngineers.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                : "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
              "dark:focus:ring-offset-gray-800"
            )}
            onClick={handleDeleteSelected}
            disabled={selectedEngineers.length === 0}
          >
            Delete Selected ({selectedEngineers.length})
          </button>
        </div>
      </div>
    </div>
  );
}
