"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "react-hot-toast";
import { getUserFromToken } from "../../../Utils/Utils";
import { useGetAllDashboardDataQuery } from "@/store/apiSlice";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

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
  const [stats, setStats] = useState<any>();
  const { login, logout, hasRole, hasPermission, user: userData } = useAuth();

  const {
    data: dashboardData,
    isLoading: isLoadingDashboard,
    refetch: refetchDashboard,
  } = useGetAllDashboardDataQuery();

  useEffect(() => {
    if (dashboardData) {
      setStats(dashboardData);
    }
  }, [dashboardData]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchDashboard();
    }, 60000); // Auto-refresh every 60 seconds

    return () => clearInterval(interval); // Avoid memory leaks
  }, [refetchDashboard]);

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

  if (isLoading || isLoadingDashboard) {
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
    <ProtectedRoute role="ADMIN" permission={userData?.permissions}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <span className="text-gray-500 dark:text-gray-400">/ Home</span>
            </div>
            <button
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg shadow hover:from-indigo-700 hover:to-blue-700 transition"
              onClick={() => refetchDashboard()}
            >
              🔄 Refresh
            </button>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon="📊"
              title="Total Inqueries"
              value={stats?.totalInquiries}
              color="text-[#00bcd4] dark:text-[#4dd0e1]"
            />
            <StatCard
              icon="👥"
              title="Total Engineers"
              value={stats?.totalEngineers}
              color="text-[#ff9800] dark:text-[#ffb74d]"
            />
            <StatCard
              icon="📬"
              title="Total All Open Inqueries"
              value={stats?.totalOpenInquiries}
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
                  value={stats?.todaySummary?.open}
                  color="bg-[#e3f2fd]"
                  textColor="text-[#1a237e]"
                />
                <StatsCard
                  icon="✅"
                  title="Total Close"
                  value={stats?.todaySummary?.closed}
                  color="bg-[#e8f5e9]"
                  textColor="text-[#2e7d32]"
                />
                <StatsCard
                  icon="❌"
                  title="Total Cancelled"
                  value={stats?.todaySummary?.cancelled}
                  color="bg-[#fbe9e7]"
                  textColor="text-[#d84315]"
                />
                <StatsCard
                  icon="💰"
                  title="Total Collection"
                  value={stats?.todaySummary?.collection}
                  color="bg-[#fff3e0]"
                  textColor="text-[#ff9800]"
                />
                <StatsCard
                  icon="💸"
                  title="Submitted Amount"
                  value={stats?.todaySummary?.submitted}
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
                  value={stats?.monthSummary?.open}
                  color="bg-[#e3f2fd]"
                  textColor="text-[#1a237e]"
                />
                <StatsCard
                  icon="✅"
                  title="Total Close"
                  value={stats?.monthSummary?.closed}
                  color="bg-[#e8f5e9]"
                  textColor="text-[#2e7d32]"
                />
                <StatsCard
                  icon="❌"
                  title="Total Cancelled"
                  value={stats?.monthSummary?.cancelled}
                  color="bg-[#fbe9e7]"
                  textColor="text-[#d84315]"
                />
                <StatsCard
                  icon="💰"
                  title="Total Collection"
                  value={stats?.monthSummary?.collection}
                  color="bg-[#fff3e0]"
                  textColor="text-[#ff9800]"
                />
                <StatsCard
                  icon="💸"
                  title="Submitted Amount"
                  value={stats?.monthSummary?.submitted}
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
                    {stats?.todayTopInquiries?.map((item: any) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          #{item.id?.slice(-6).toUpperCase()}
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {item.customerName || "N/A"}
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {item.mobileNo || "N/A"}
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          ₹{item.amount?.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {new Date(item.appointmentTime).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {item.engineer?.name || "Unassigned"}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.status === "CLOSED"
                                ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                : item.status === "ASSIGNED"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : item.status === "ACTIVE"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {item.cancelInquire ? (
                            <span className="text-red-600 dark:text-red-400">
                              Cancelled
                            </span>
                          ) : (
                            <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
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
    <div className="relative rounded-2xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow">
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-3xl shadow-md">
        {icon}
      </div>
      <div className="ml-16">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          {title}
        </h3>
        <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">
          {value}
        </p>
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
      className={`rounded-xl p-4 border border-gray-200 dark:border-gray-700 ${color} hover:shadow-md transition`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`text-2xl ${textColor} bg-white dark:bg-gray-800 rounded-full p-3 shadow-inner`}
        >
          {icon}
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-medium text-gray-600 dark:text-gray-600">
            {title}
          </p>
          <p className={`text-xl font-bold ${textColor}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}
