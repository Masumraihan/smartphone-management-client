/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSales: build.query({
      query: (query: string) => ({
        url: `/sales/get-sales-history/${query}`,
        method: "GET",
      }),
      providesTags: ["sales"],
    }),
    createSales: build.mutation({
      query: (data) => ({
        url: "/sales/create-sales",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sales", "product"],
    }),
  }),
});

export const { useGetSalesQuery, useCreateSalesMutation } = salesApi;

export default salesApi;
