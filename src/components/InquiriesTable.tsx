import { FC } from "react";

interface InquiriesTableProps {
  inquiries?: Array<{
    id: string;
    customerName: string;
    service: string;
    status: string;
    date: string;
    amount: string;
  }>;
}

const InquiriesTable: FC<InquiriesTableProps> = ({
  inquiries = [
    {
      id: "INQ001",
      customerName: "John Doe",
      service: "AC Repair",
      status: "Open",
      date: "2024-03-20",
      amount: "₹2,500",
    },
    // Add more sample data as needed
  ],
}) => {
  return (
    <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-secondary-900 dark:text-white mb-4">
          Recent Inquiries
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 dark:bg-secondary-700/50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-secondary-500 dark:text-secondary-400">
                ID
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-secondary-500 dark:text-secondary-400">
                Customer
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-secondary-500 dark:text-secondary-400">
                Service
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-secondary-500 dark:text-secondary-400">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-secondary-500 dark:text-secondary-400">
                Date
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-secondary-500 dark:text-secondary-400">
                Amount
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-secondary-500 dark:text-secondary-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
            {inquiries.map((inquiry) => (
              <tr
                key={inquiry.id}
                className="hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
              >
                <td className="px-4 sm:px-6 py-4 text-sm text-secondary-900 dark:text-secondary-100">
                  {inquiry.id}
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-secondary-900 dark:text-secondary-100">
                  {inquiry.customerName}
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-secondary-900 dark:text-secondary-100">
                  {inquiry.service}
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      inquiry.status === "Open"
                        ? "bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-200"
                        : "bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-200"
                    }`}
                  >
                    {inquiry.status}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-secondary-900 dark:text-secondary-100">
                  {inquiry.date}
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-secondary-900 dark:text-secondary-100">
                  {inquiry.amount}
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-secondary-900 dark:text-secondary-100">
                  <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="block sm:hidden">
        <div className="divide-y divide-secondary-200 dark:divide-secondary-700">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="p-4 space-y-3 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                    {inquiry.customerName}
                  </p>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">
                    {inquiry.id}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    inquiry.status === "Open"
                      ? "bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-200"
                      : "bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-200"
                  }`}
                >
                  {inquiry.status}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary-600 dark:text-secondary-400">
                  {inquiry.service}
                </span>
                <span className="font-medium text-secondary-900 dark:text-secondary-100">
                  {inquiry.amount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-secondary-500 dark:text-secondary-400">
                  {inquiry.date}
                </span>
                <button className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InquiriesTable;
