/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://server-tau-fawn.vercel.app/api",
  //baseUrl: "http://localhost:8080/api",

  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const baseQueryWithRefresh = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  try {
    if (result?.error?.status === 401) {
      console.log("fetch refresh token");
      const url = `https://server-tau-fawn.vercel.app/api/auth/refresh-token`;
      //const url = `http://localhost:8080/api/auth/refresh-token`;
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      const user = api.getState().auth.user;
      api.dispatch(setUser({ user, token: data.data.accessToken }));
    }
  } catch (error) {
    api.dispatch(setUser({ user: null, token: null }));
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["auth", "product", "sales", "user"],
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
});
