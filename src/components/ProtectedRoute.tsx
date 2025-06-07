// components/ProtectedRoute.tsx
"use client";

import { ReactNode } from "react";
import { useCan } from "@/components/Provider/useCan";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string;
  permission?: string | string[];
  fallback?: ReactNode;
}

export default function ProtectedRoute({
  children,
  role,
  permission,
  fallback = <p className="text-center text-red-500 mt-4">Access Denied</p>,
}: ProtectedRouteProps) {
  const { can } = useCan();

  if (!can({ role: role as any, permission: permission as any })) {
    return fallback;
  }

  return <>{children}</>;
}
