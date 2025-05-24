import { FC } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  trend?: "up" | "down";
  color?: string;
}

const StatCard: FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  trend,
  color = "bg-primary-50 dark:bg-primary-900/20",
}) => {
  return (
    <div
      className={`${color} rounded-xl p-6 transition-transform hover:scale-[1.02] cursor-pointer`}
    >
      <div className="flex items-center gap-4">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
            {title}
          </h3>
          <p className="mt-1 text-2xl font-bold text-secondary-900 dark:text-white">
            {value}
          </p>
          {change && (
            <p
              className={`mt-1 text-xs ${
                trend === "up"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {change}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
