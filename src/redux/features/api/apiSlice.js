import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://api.makinaburada.net/api/" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3001/" }),
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: () => "patients",
      totalCounts: 0,
    }),
    getAppointments: builder.query({
      query: () => "appointments",
    }),
    getDoctors: builder.query({
      query: () => "doctors",
    }),
    getBranchs: builder.query({
      query: () => "branchs",
    }),
    getRoles: builder.query({
      query: () => "roles",
    }),
    getUsersRoles: builder.query({
      query: () => "usersRoles",
    }),
    getUsers: builder.query({
      query: () => "users",
    }),
    getExaminations: builder.query({
      query: () => "examinations",
    }),
    getExamMedicines: builder.query({
      query: () => "examMedicines",
    }),
    getMedicines: builder.query({
      query: () => "medicines",
    }),
    getAuthority: builder.query({
      query: () => "authority",
    }),
    getHolidays: builder.query({
      query: () => "holidays",
    }),
    getLinks: builder.query({
      query: () => "links",
    }),

    // Diğer endpoint'lerinizi burada tanımlayabilirsiniz
  }),
});

export const {
  useGetPatientsQuery,
  useGetAppointmentsQuery,
  useGetDoctorsQuery,
  useGetBranchsQuery,
  useGetRolesQuery,
  useGetUsersRolesQuery,
  useGetUsersQuery,
  useGetExaminationsQuery,
  useGetExamMedicinesQuery,
  useGetMedicinesQuery,
  useGetAuthorityQuery,
  useGetHolidaysQuery,
  useGetLinksQuery,
} = apiSlice;
