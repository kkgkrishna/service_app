import { Constants } from "@/constant/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: Constants.API_URL }), // or your backend URL
  endpoints: (builder) => ({
    getAllCategories: builder.query<any[], void>({
      query: () => "/categories",
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
    // more endpoints...
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesByCategoryIdQuery,
  useCreateInquiryMutation,
} = apiSlice;
