"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useGetAllUsersQuery } from "@/store/apiSlice";
import React, { useState } from "react";
import { MdAdd, MdPeople } from "react-icons/md";
import CustomLoader from "../../../CustomPages/CustomLoader";
import ServicePartnersForm from "./ServicePartnersForm";

function ServicePartners() {

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  
  const { data: users, isLoading ,refetch:refetchUsers} = useGetAllUsersQuery();
  console.log(users);
  return (
    <DashboardLayout>
      {isLoading && <CustomLoader />}
      <div className="px-4 py-6 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <MdPeople className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              Service Partners
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage and view all registered service partners across regions.
            </p>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow"
            onClick={() => setIsOpenForm(true)}
          >
            <MdAdd className="w-6 h-6  text-white" /> Add Partner
          </button>
        </div>

        {/* Table Placeholder */}
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {/* Example row */}
              {users?.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {user.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full 
                        ${
                          user.role === "ADMIN"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300"
                            : user.role === "ENGINEER"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300"
                            : user.role === "SERVICE_PROVIDER"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700/40 dark:text-gray-300"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full 
                        ${
                          user.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300"
                        }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right space-x-2">
                    <button
                      className="text-indigo-600 hover:underline text-sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsOpenForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/* You can map real data here */}
            </tbody>
          </table>
        </div>
      </div>
      {isOpenForm && (
        <ServicePartnersForm
          setIsOpenForm={setIsOpenForm}
          selectedUser={selectedUser}
          refetchUsers={refetchUsers}
        />
      )}
    </DashboardLayout>
  );
}

export default ServicePartners;
