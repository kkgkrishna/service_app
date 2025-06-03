"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Engineer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: boolean;
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEngineers.map((engineer) => (
                <tr key={engineer.id}>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4 text-right space-x-2">
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
  );
}
