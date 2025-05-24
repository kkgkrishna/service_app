"use client";

import ManageEngineer from "@/components/ManageEngineer";
import DashboardLayout from "@/components/DashboardLayout";

export default function EngineersPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Manage Engineers
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage engineer accounts
        </p>
      </div>
      <ManageEngineer />
    </DashboardLayout>
  );
}
