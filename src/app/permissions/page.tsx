"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { MdSecurity } from "react-icons/md";
import { useGetAllUsersQuery } from "@/store/apiSlice";

const PERMISSION_GROUPS: { label: string; permissions: string[] }[] = [
  {
    label: "🔧 Inquiry Management",
    permissions: [
      "CREATE_INQUIRY",
      "VIEW_OWN_INQUIRIES",
      "VIEW_ALL_INQUIRIES",
      "EDIT_INQUIRY",
      "DELETE_INQUIRY",
      "ASSIGN_ENGINEER",
      "CHANGE_INQUIRY_STATUS",
      "CANCEL_INQUIRY",
      "VIEW_ASSIGNED_INQUIRIES",
    ],
  },
  {
    label: "👨‍🔧 Engineer Management",
    permissions: [
      "CREATE_ENGINEER",
      "VIEW_ENGINEERS",
      "EDIT_ENGINEER",
      "DELETE_ENGINEER",
      "ASSIGN_CATEGORY_TO_ENGINEER",
    ],
  },
  {
    label: "👥 User Management",
    permissions: [
      "CREATE_USER",
      "VIEW_USERS",
      "EDIT_USER",
      "DELETE_USER",
      "RESET_USER_PASSWORD",
    ],
  },
  {
    label: "📊 Dashboard & Analytics",
    permissions: [
      "VIEW_DASHBOARD",
      "VIEW_DAILY_STATS",
      "VIEW_MONTHLY_STATS",
      "VIEW_INQUIRY_TRENDS",
      "EXPORT_REPORTS",
    ],
  },
  {
    label: "📂 Category Management",
    permissions: [
      "CREATE_CATEGORY",
      "VIEW_CATEGORIES",
      "EDIT_CATEGORY",
      "DELETE_CATEGORY",
      "CREATE_SUBCATEGORY",
      "VIEW_SUBCATEGORIES",
      "EDIT_SUBCATEGORY",
      "DELETE_SUBCATEGORY",
      "SET_SUBCATEGORY_PRICING",
    ],
  },
  {
    label: "💰 Collection & Finance",
    permissions: [
      "VIEW_COLLECTIONS",
      "RECORD_COLLECTION",
      "SUBMIT_COLLECTION",
      "GENERATE_INVOICE",
      "VIEW_INVOICES",
    ],
  },
  {
    label: "🛠️ System & Configuration",
    permissions: [
      "MANAGE_ROLES",
      "MANAGE_PERMISSIONS",
      "SYSTEM_SETTINGS",
      "VIEW_LOGS",
      "ACCESS_API_KEYS",
    ],
  },
  {
    label: "📝 Feedback & Notes",
    permissions: [
      "VIEW_FEEDBACK",
      "RESPOND_TO_FEEDBACK",
      "DELETE_FEEDBACK",
      "ADD_INTERNAL_NOTES",
      "VIEW_INTERNAL_NOTES",
    ],
  },
  {
    label: "🌐 Location & Coverage",
    permissions: ["MANAGE_SERVICE_LOCATIONS", "VIEW_SERVICE_LOCATIONS"],
  },
  {
    label: "🔐 Security",
    permissions: ["LOGIN_AS_USER", "FORCE_LOGOUT_USER", "VIEW_LOGIN_HISTORY"],
  },
];

export default function ManagePermission() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [role, setRole] = useState<string>("USER");
  const [selectedUser, setSeleteduser] = useState();

  const { data } = useGetAllUsersQuery();

  useEffect(() => {
    const roleFromLocal = localStorage.getItem("role") || "USER";
    const permissionsFromLocal = JSON.parse(
      localStorage.getItem("permissions") || "[]"
    );
    setRole(roleFromLocal);
    setSelectedPermissions(permissionsFromLocal);
  }, []);

  const handleToggle = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleUpdate = () => {
    console.log("🔐 Role:", role);
    console.log("✅ Permissions:", selectedPermissions);
  };

  console.log(selectedUser);

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <MdSecurity className="w-6 h-6" />
              Manage Permissions
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Assign and modify feature-level access for users.
            </p>
          </div>
          <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 text-sm font-semibold px-3 py-1 rounded-full">
            Role: {role}
          </span>
        </div>

        {/* User Dropdown */}
        <div className="mb-6 max-w-md">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Select User
          </label>
          <select
            onChange={(e) => {
              const selected = JSON.parse(e.target.value);
              setRole(selected.role);
              // console.log("seleted", selected);
              setSeleteduser(selected);

              // localStorage.setItem("role", selected.role);
              // You can also load that user's permissions if available
            }}
            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option disabled selected>
              -- Select a User --
            </option>
            {data?.map((user: any) => (
              <option key={user._id} value={JSON.stringify(user)}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-4 sm:p-6 space-y-10">
              {PERMISSION_GROUPS.map((group) => (
                <div key={group.label}>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    {group.label}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {group.permissions.map((perm) => (
                      <label
                        key={perm}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(perm)}
                          onChange={() => handleToggle(perm)}
                          className="form-checkbox h-4 w-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded"
                        />
                        <span className="capitalize">
                          {perm.replace(/_/g, " ").toLowerCase()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-">
              <button
                onClick={handleUpdate}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                Update Permissions
              </button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
