import { Constants } from "@/constant/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: Constants.API_URL }), // or your backend URL
  endpoints: (builder) => ({
    getAllUsers: builder.query<any[], void>({
      query: () => "/users",
    }),
    getAllInquiriesByUserId: builder.query<any[], void>({
      query: (userId) => `/inquiries?userId=${userId}`,
    }),
    getAllCategories: builder.query<any[], void>({
      query: () => "/categories",
    }),
    getAllEngineersByCategoryId: builder.query<any[], void>({
      query: (categoryId) => `/categories/${categoryId}/engineers`,
    }),
    getAllSubCategoriesByCategoryId: builder.query<any, void>({
      query: (categoryId) => `/subcategories?categoryId=${categoryId}`,
    }),

    getAllDashboardData: builder.query<any, void>({
      query: () => "/dashboard",
    }),
    getAllInquiriesByEngineerId: builder.query<any, void>({
      query: (engineerId) => `/engineers/${engineerId}/inquiries`,
    }),
    getAllInquiriesByEngineerIdWithDate: builder.query<any, void>({
      query: (engineerId) => `/inquiries/byEngineer?engineerId=${engineerId}`,
    }),

    createServicePartner: builder.mutation<any, any>({
      query: (newServicePartner) => ({
        url: "/users",
        method: "POST",
        body: newServicePartner,
      }),
    }),
    updateServicePartner: builder.mutation<any, any>({
      query: ({ id, updatedServicePartnerBody }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updatedServicePartnerBody,
      }),
    }),
    createInquiry: builder.mutation<any, any>({
      query: (newInquiry) => ({
        url: "/inquiries",
        method: "POST",
        body: newInquiry,
      }),
    }),
    updateInquiry: builder.mutation<any, any>({
      query: ({ inquiryId, updatedInquiryBody }) => ({
        url: `/inquiries/${inquiryId}`,
        method: "PUT",
        body: updatedInquiryBody,
      }),
    }),
    // more endpoints...
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesByCategoryIdQuery,
  useCreateInquiryMutation,
  useGetAllInquiriesByUserIdQuery,
  useUpdateInquiryMutation,
  useGetAllEngineersByCategoryIdQuery,
  useGetAllDashboardDataQuery,
  useGetAllUsersQuery,
  useCreateServicePartnerMutation,
  useUpdateServicePartnerMutation,
  useGetAllInquiriesByEngineerIdQuery,
  useGetAllInquiriesByEngineerIdWithDateQuery
} = apiSlice;
