import { FiUser, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const activities = [
  {
    id: 1,
    title: "New user registered",
    time: "2 minutes ago",
    icon: <FiUser className="w-5 h-5 text-blue-500" />,
  },
  {
    id: 2,
    title: "Task completed: Website Update",
    time: "1 hour ago",
    icon: <FiCheckCircle className="w-5 h-5 text-green-500" />,
  },
  {
    id: 3,
    title: "Server alert: High CPU Usage",
    time: "2 hours ago",
    icon: <FiAlertCircle className="w-5 h-5 text-red-500" />,
  },
  {
    id: 4,
    title: "New feature deployed",
    time: "4 hours ago",
    icon: <FiCheckCircle className="w-5 h-5 text-green-500" />,
  },
];

export default function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {activity.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {activity.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
