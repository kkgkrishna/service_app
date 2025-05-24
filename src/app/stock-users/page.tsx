import { Metadata } from "next";
import ManageStockUser from "@/components/ManageStockUser";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata: Metadata = {
  title: "Manage Stock Users",
  description: "Manage stock users in the admin dashboard",
};

export default function StockUsersPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Stock Users
        </h1>
        <ManageStockUser />
      </div>
    </DashboardLayout>
  );
}
