import { useState, useCallback } from "react";
import { engineerApi } from "@/services/api";
import type { Engineer } from "@/types";

interface UseEngineersOptions {
  initialFilters?: {
    status?: string;
    specialty?: string;
  };
}

export function useEngineers(options: UseEngineersOptions = {}) {
  const { initialFilters } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [filters, setFilters] = useState(initialFilters);

  const fetchEngineers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await engineerApi.getAll(filters);
      setEngineers(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch engineers"
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const createEngineer = async (engineerData: Partial<Engineer>) => {
    try {
      await engineerApi.create(engineerData);
      fetchEngineers(); // Refresh the list
    } catch (err) {
      throw err;
    }
  };

  return {
    engineers,
    isLoading,
    error,
    setFilters,
    fetchEngineers,
    createEngineer,
  };
}
