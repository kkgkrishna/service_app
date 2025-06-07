// hooks/useCan.ts
import { useAuth } from "@/context/AuthContext";
import { Permission, Role } from "@/constant/roles";

interface CanOptions {
  role?: Role;
  permission?: Permission | Permission[];
}

export const useCan = () => {
  const { user, hasPermission, hasRole } = useAuth();

  const can = ({ role, permission }: CanOptions): boolean => {
    if (!user) return false;

    if (role && !hasRole(role)) return false;

    if (permission) {
      if (Array.isArray(permission)) {
        return permission.every((perm) => hasPermission(perm));
      }
      return hasPermission(permission);
    }

    return true;
  };

  return { can };
};