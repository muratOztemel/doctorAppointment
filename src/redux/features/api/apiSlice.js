import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3001/" }),
  endpoints: (builder) => ({
    getPatientsPage: builder.query({
      query: ({ page = 1, searchTerm, sortField, sortOrder }) =>
        `patients?_page=${page}&_limit=10&q=${searchTerm}&_sort=${sortField}&_order=${sortOrder}`,
    }),
    DeletePatient: builder.mutation({
      query(id) {
        return {
          url: `patients/${id}`,
          method: "DELETE",
        };
      },
    }),
    CreatePatient: builder.mutation({
      query(newPost) {
        return {
          url: `patients`,
          method: "POST",
          body: newPost,
        };
      },
    }),
    getPatientById: builder.query({
      query: (id) => `patients/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    getPatients: builder.query({
      query: () => "patients",
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
  }),
  keepUnusedDataFor: 30,
  refetchOnMountOrArgChange: 5,
});

export const {
  useGetPatientsPageQuery,
  useDeletePatientQuery,
  useCreatePatientQuery,
  useGetPatientByIdQuery,
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
