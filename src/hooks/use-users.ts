import { useState, useCallback } from "react";
import { userApi } from "@/services/api";
import type { User } from "@/types";

export function useUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await userApi.getAll();
      setUsers(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createUser = async (userData: Partial<User>) => {
    try {
      await userApi.create(userData);
      fetchUsers(); // Refresh the list
    } catch (err) {
      throw err;
    }
  };

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    createUser,
  };
}
