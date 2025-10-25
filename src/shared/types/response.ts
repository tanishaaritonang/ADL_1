import { Meta } from "./api";

export type ApiResponse<T = void> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  code?: string;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  meta: Meta;
}>;

export type ListParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
};

export type FilterParams = {
  [key: string]: string | number | boolean | undefined;
};