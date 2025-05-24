import { fetchApi } from "@/lib/api-client";
import type { User, Inquiry, Engineer, PaginatedResponse } from "@/types";

// User API functions
export const userApi = {
  getAll: () => fetchApi<User[]>("/users"),
  create: (data: Partial<User>) =>
    fetchApi<User>("/users", {
      method: "POST",
      body: JSON.stringify(data),
      showSuccessToast: true,
      successMessage: "User created successfully",
    }),
};

// Inquiry API functions
export const inquiryApi = {
  getAll: (page = 1, filters?: { status?: string; priority?: string }) => {
    const params = new URLSearchParams({
      page: page.toString(),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.priority && { priority: filters.priority }),
    });
    return fetchApi<PaginatedResponse<Inquiry>>(`/inquiries?${params}`);
  },

  getById: (id: string) => fetchApi<Inquiry>(`/inquiries/${id}`),

  create: (data: Partial<Inquiry>) =>
    fetchApi<Inquiry>("/inquiries", {
      method: "POST",
      body: JSON.stringify(data),
      showSuccessToast: true,
      successMessage: "Inquiry created successfully",
    }),

  update: (id: string, data: Partial<Inquiry>) =>
    fetchApi<Inquiry>(`/inquiries/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      showSuccessToast: true,
      successMessage: "Inquiry updated successfully",
    }),

  delete: (id: string) =>
    fetchApi<void>(`/inquiries/${id}`, {
      method: "DELETE",
      showSuccessToast: true,
      successMessage: "Inquiry deleted successfully",
    }),
};

// Engineer API functions
export const engineerApi = {
  getAll: (filters?: { status?: string; specialty?: string }) => {
    const params = new URLSearchParams({
      ...(filters?.status && { status: filters.status }),
      ...(filters?.specialty && { specialty: filters.specialty }),
    });
    return fetchApi<Engineer[]>(`/engineers?${params}`);
  },

  create: (data: Partial<Engineer>) =>
    fetchApi<Engineer>("/engineers", {
      method: "POST",
      body: JSON.stringify(data),
      showSuccessToast: true,
      successMessage: "Engineer created successfully",
    }),
};
