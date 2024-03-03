import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addProduct: build.mutation({
      query: (data) => ({
        url: "/products/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    getProducts: build.query({
      query: (query: Record<string, unknown>) => {
        const params = new URLSearchParams();
        if (query.searchTerm) {
          params.append("searchTerm", query.searchTerm as string);
        }
        if (query.minPrice) {
          params.append("minPrice", query.minPrice! as string);
        }
        if (query.maxPrice) {
          params.append("maxPrice", query.maxPrice as string);
        }
        if (query.brand) {
          params.append("brand", query.brand as string);
        }
        if (query.ram) {
          params.append("ram", query.ram as string);
        }
        if (query.storage) {
          params.append("storage", query.storage as string);
        }
        if (query.operatingSystem) {
          params.append("operatingSystem", query.operatingSystem as string);
        }
        if (query.screenSize) {
          params.append("screenSize", query.screenSize as string);
        }
        if (query.date) {
          params.append("releaseDate", query.date as string);
        }
        if (query.releaseDate) {
          params.append("releaseDate", query.releaseDate as string);
        }

        return {
          url: `/products`,
          method: "GET",
          params,
        };
      },
      providesTags: ["product"],
    }),
    getSingleProduct: build.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `/products/update-product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: build.mutation({
      query: (ids) => ({
        url: `/products/delete-products/`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
export default productApi;
