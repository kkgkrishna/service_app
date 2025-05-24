import { FC } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
  icon: string;
}

const StatCard: FC<StatCardProps> = ({ title, value, change, trend, icon }) => {
  return (
    <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1 sm:space-y-2">
          <p className="text-sm sm:text-base font-medium text-secondary-600 dark:text-secondary-400">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white">
            {value}
          </p>
          {change && (
            <p
              className={`text-sm font-medium ${
                trend === "up"
                  ? "text-success-600 dark:text-success-400"
                  : "text-error-600 dark:text-error-400"
              }`}
            >
              {trend === "up" ? "↑" : "↓"} {change}
            </p>
          )}
        </div>
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/20">
          <span className="text-2xl sm:text-3xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
