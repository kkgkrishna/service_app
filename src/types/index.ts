export type Role = "USER" | "ADMIN" | "ENGINEER";
export type Status = "PENDING" | "ACTIVE" | "RESOLVED" | "CLOSED";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Engineer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specialty: string[];
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  pages: number;
  currentPage: number;
}
