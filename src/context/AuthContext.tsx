// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ROLE_PERMISSIONS, Role, Permission } from "@/constant/roles";

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions?: Permission[]; // optional if using PBAC override
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: Role) => boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Optional: hydrate from localStorage or cookies
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    //Navigate to dashboard
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    location.href = "/login";
  };

  const hasRole = (role: Role) => user?.role === role;

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    const rolePerms = ROLE_PERMISSIONS[user.role] || [];
    const userPerms = user.permissions || [];
    return userPerms.includes(permission) || rolePerms.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        hasPermission,
        hasRole,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
