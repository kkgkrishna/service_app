"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Stats {
  totalInquiries: number;
  totalEngineers: number;
  totalOpenInquiries: number;
  todayStats: {
    open: number;
    close: number;
    cancelled: number;
    collection: string;
    submitted: string;
  };
  monthlyStats: {
    open: number;
    close: number;
    cancelled: number;
    collection: string;
    submitted: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalInquiries: 95,
    totalEngineers: 7,
    totalOpenInquiries: 78,
    todayStats: {
      open: 7,
      close: 0,
      cancelled: 0,
      collection: "Rs. 0",
      submitted: "Rs. 0",
    },
    monthlyStats: {
      open: 78,
      close: 0,
      cancelled: 5,
      collection: "Rs. 0",
      submitted: "Rs. 0",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/me", {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.replace("/login");
            return;
          }
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Dashboard error:", error);
        toast.error("Failed to load dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a237e] dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <span className="text-gray-500 dark:text-gray-400">/ Home</span>
          </div>
          <button className="px-6 py-2 bg-[#1a237e] text-white rounded hover:bg-[#1a237e]/90 dark:hover:bg-[#1a237e]/70">
            Refresh
          </button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon="📊"
            title="Total Inqueries"
            value={stats.totalInquiries}
            color="text-[#00bcd4] dark:text-[#4dd0e1]"
          />
          <StatCard
            icon="👥"
            title="Total Engineers"
            value={stats.totalEngineers}
            color="text-[#ff9800] dark:text-[#ffb74d]"
          />
          <StatCard
            icon="📬"
            title="Total All Open Inqueries"
            value={stats.totalOpenInquiries}
            color="text-[#9c27b0] dark:text-[#ba68c8]"
          />
        </div>

        {/* Today's Stats */}
        <div className="bg-white dark:bg-gray-800 rounded shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Today's Inqueries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <StatsCard
                icon="📬"
                title="Total Open"
                value={stats.todayStats.open}
                color="bg-[#e3f2fd]"
                textColor="text-[#1a237e]"
              />
              <StatsCard
                icon="✅"
                title="Total Close"
                value={stats.todayStats.close}
                color="bg-[#e8f5e9]"
                textColor="text-[#2e7d32]"
              />
              <StatsCard
                icon="❌"
                title="Total Cancelled"
                value={stats.todayStats.cancelled}
                color="bg-[#fbe9e7]"
                textColor="text-[#d84315]"
              />
              <StatsCard
                icon="💰"
                title="Total Collection"
                value={stats.todayStats.collection}
                color="bg-[#fff3e0]"
                textColor="text-[#ff9800]"
              />
              <StatsCard
                icon="💸"
                title="Submitted Amount"
                value={stats.todayStats.submitted}
                color="bg-[#f3e5f5]"
                textColor="text-[#9c27b0]"
              />
            </div>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="bg-white dark:bg-gray-800 rounded shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Current Month's Inqueries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <StatsCard
                icon="📬"
                title="Total Open"
                value={stats.monthlyStats.open}
                color="bg-[#e3f2fd]"
                textColor="text-[#1a237e]"
              />
              <StatsCard
                icon="✅"
                title="Total Close"
                value={stats.monthlyStats.close}
                color="bg-[#e8f5e9]"
                textColor="text-[#2e7d32]"
              />
              <StatsCard
                icon="❌"
                title="Total Cancelled"
                value={stats.monthlyStats.cancelled}
                color="bg-[#fbe9e7]"
                textColor="text-[#d84315]"
              />
              <StatsCard
                icon="💰"
                title="Total Collection"
                value={stats.monthlyStats.collection}
                color="bg-[#fff3e0]"
                textColor="text-[#ff9800]"
              />
              <StatsCard
                icon="💸"
                title="Submitted Amount"
                value={stats.monthlyStats.submitted}
                color="bg-[#f3e5f5]"
                textColor="text-[#9c27b0]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Today's Top Inqueries
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Inquery ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      User
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Mobile No
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Payable Amount
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Engineer
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Inquery Cancel
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Example row - you can map through your data here */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      #INQ001
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      John Doe
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      +1234567890
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      $100.00
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      2024-03-20
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      Engineer A
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                        Cancel
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: string;
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-center gap-4">
        <div
          className={`text-3xl ${color} group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {title}
          </h3>
          <p className={`text-2xl font-bold gradient-text`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

function StatsCard({
  icon,
  title,
  value,
  color,
  textColor,
}: {
  icon: string;
  title: string;
  value: string | number;
  color: string;
  textColor: string;
}) {
  return (
    <div
      className={`glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-300 group`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`text-2xl ${textColor} group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {title}
          </p>
          <p className={`text-lg font-semibold gradient-text`}>{value}</p>
        </div>
      </div>
    </div>
  );
}
