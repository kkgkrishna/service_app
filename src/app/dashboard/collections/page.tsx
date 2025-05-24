"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import ManageCollection from "@/components/ManageCollection";
import { toast } from "react-hot-toast";

export default function CollectionsPage() {
  const router = useRouter();

  const handleStatusChange = (id: string, status: string) => {
    // Additional logic if needed when status changes
    console.log("Status changed:", { id, status });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <ManageCollection onStatusChange={handleStatusChange} />
      </div>
    </DashboardLayout>
  );
}
