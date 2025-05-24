import { FC, ReactNode } from "react";
import Image from "next/image";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthCard: FC<AuthCardProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-900 px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-[420px] space-y-6 sm:space-y-8 bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-center">
            <Image
              className="h-10 w-auto sm:h-12"
              src="/logo.svg"
              alt="Arya Service"
              width={48}
              height={48}
              priority
            />
          </div>
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="text-center text-sm sm:text-base text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default AuthCard;
