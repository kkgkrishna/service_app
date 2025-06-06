import { Constants } from "@/constant/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: Constants.API_URL }), // or your backend URL
  endpoints: (builder) => ({
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
} = apiSlice;
