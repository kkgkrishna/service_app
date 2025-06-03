"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface Engineer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  categories: { id: string; name: string }[];
}

interface ManageEngineerProps {
  engineers: Engineer[];
  onEdit: (engineer: Engineer) => void;
  onDeleteSuccess: () => Promise<void>;
}

export default function ManageEngineer({
  engineers,
  onEdit,
  onDeleteSuccess,
}: ManageEngineerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(
    null
  );

  const filteredEngineers = engineers.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm)
  );

  const handleSelectAll = (checked: boolean) => {
    setSelectedEngineers(checked ? filteredEngineers.map((e) => e.id) : []);
  };

  const handleSelectEngineer = (id: string, checked: boolean) => {
    setSelectedEngineers((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const handleRowClick = (engineer: Engineer) => {
    setSelectedEngineer(engineer);
    setDetailModalOpen(true);
  };

  const CustomCheckbox = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={cn(
        "w-4 h-4 rounded border-gray-300 text-blue-600",
        "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
        "dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-600",
        "transition-colors duration-200 cursor-pointer"
      )}
    />
  );

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">Search:</span>
              <input
                type="text"
                className="border rounded px-3 py-1 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-300"
                placeholder="Search engineers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3">
                    <CustomCheckbox
                      checked={
                        selectedEngineers.length === filteredEngineers.length &&
                        filteredEngineers.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  {["Name", "Email", "Phone", "City", "Status", "Actions"].map(
                    (h, i) => (
                      <th
                        key={i}
                        className={cn(
                          "px-6 py-3 text-xs font-medium uppercase",
                          i === 5 ? "text-right" : "text-left",
                          "text-gray-500 dark:text-gray-300"
                        )}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredEngineers.map((engineer) => (
                  <tr
                    key={engineer.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleRowClick(engineer)}
                  >
                    <td
                      className="px-6 py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CustomCheckbox
                        checked={selectedEngineers.includes(engineer.id)}
                        onChange={(checked) =>
                          handleSelectEngineer(engineer.id, checked)
                        }
                      />
                    </td>
                    <td className="px-6 py-4">{engineer.name}</td>
                    <td className="px-6 py-4">{engineer.email}</td>
                    <td className="px-6 py-4">{engineer.phone}</td>
                    <td className="px-6 py-4">{engineer.city}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block h-3 w-3 rounded-full mr-2 ${
                          engineer.status ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                      {engineer.status ? "Active" : "Inactive"}
                    </td>
                    <td
                      className="px-6 py-4 text-right space-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onEdit(engineer)}
                        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          await onDeleteSuccess();
                        }}
                        className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bulk Delete */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredEngineers.length} entries
            </div>
            <button
              onClick={onDeleteSuccess}
              disabled={selectedEngineers.length === 0}
              className={cn(
                "px-4 py-2 rounded text-sm font-medium",
                selectedEngineers.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  : "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              )}
            >
              Delete Selected ({selectedEngineers.length})
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {detailModalOpen && selectedEngineer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Engineer Details
            </h2>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 dark:text-gray-200 text-sm">
              <div>
                <strong>ID:</strong>{" "}
                <span className="ml-1">{selectedEngineer.id}</span>
              </div>
              <div>
                <strong>Name:</strong>{" "}
                <span className="ml-1">{selectedEngineer.name}</span>
              </div>
              <div>
                <strong>Email:</strong>{" "}
                <span className="ml-1">{selectedEngineer.email}</span>
              </div>
              <div>
                <strong>Phone:</strong>{" "}
                <span className="ml-1">{selectedEngineer.phone}</span>
              </div>
              <div>
                <strong>City:</strong>{" "}
                <span className="ml-1">{selectedEngineer.city}</span>
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span
                  className={`ml-1 font-medium ${
                    selectedEngineer.status ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {selectedEngineer.status ? "Active" : "Inactive"}
                </span>
              </div>
              <div>
                <strong>Created:</strong>{" "}
                <span className="ml-1">
                  {new Date(selectedEngineer.createdAt).toLocaleString()}
                </span>
              </div>
              <div>
                <strong>Updated:</strong>{" "}
                <span className="ml-1">
                  {new Date(selectedEngineer.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Categories */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Categories:
              </h3>
              {selectedEngineer.categories &&
              selectedEngineer.categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedEngineer.categories.map((cat: any) => (
                    <span
                      key={cat.id}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium dark:bg-blue-700 dark:text-white"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No categories assigned.</p>
              )}
            </div>

            {/* Close Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => {
                  setDetailModalOpen(false);
                  setSelectedEngineer(null);
                }}
                className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
