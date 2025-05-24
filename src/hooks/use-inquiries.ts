import { useState, useCallback } from "react";
import { inquiryApi } from "@/services/api";
import type { Inquiry, PaginatedResponse } from "@/types";

interface UseInquiriesOptions {
  initialPage?: number;
  initialFilters?: {
    status?: string;
    priority?: string;
  };
}

export function useInquiries(options: UseInquiriesOptions = {}) {
  const { initialPage = 1, initialFilters } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PaginatedResponse<Inquiry> | null>(null);
  const [page, setPage] = useState(initialPage);
  const [filters, setFilters] = useState(initialFilters);

  const fetchInquiries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await inquiryApi.getAll(page, filters);
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch inquiries"
      );
    } finally {
      setIsLoading(false);
    }
  }, [page, filters]);

  const createInquiry = async (inquiryData: Partial<Inquiry>) => {
    try {
      await inquiryApi.create(inquiryData);
      fetchInquiries(); // Refresh the list
    } catch (err) {
      throw err;
    }
  };

  const updateInquiry = async (id: string, inquiryData: Partial<Inquiry>) => {
    try {
      await inquiryApi.update(id, inquiryData);
      fetchInquiries(); // Refresh the list
    } catch (err) {
      throw err;
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      await inquiryApi.delete(id);
      fetchInquiries(); // Refresh the list
    } catch (err) {
      throw err;
    }
  };

  return {
    inquiries: data?.items || [],
    total: data?.total || 0,
    pages: data?.pages || 0,
    currentPage: page,
    isLoading,
    error,
    setPage,
    setFilters,
    fetchInquiries,
    createInquiry,
    updateInquiry,
    deleteInquiry,
  };
}
