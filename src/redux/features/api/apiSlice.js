import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  //  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3001/" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://api.makinaburada.net/" }),
  endpoints: (builder) => ({
    // Get Patients By Page
    getPatientsPage: builder.query({
      query: ({ page = 1, searchTerm, sortField, sortOrder }) =>
        `patients?_page=${page}&_limit=10&q=${searchTerm}&_sort=${sortField}&_order=${sortOrder}`,
    }),
    // Delete Patient By Id
    deletePatient: builder.mutation({
      query: (id) => ({
        url: `patients/${id}`,
        method: "DELETE",
      }),
    }),
    authentication: builder.mutation({
      query: (id, loginModel) => ({
        url: `api/v1/Authentication`,
        method: "POST",
        body: loginModel,
      }),
    }),
    addNewPatient: builder.mutation({
      query(newPatient) {
        return {
          url: `patients`,
          method: "POST",
          header: { "Content-Type": "application/json" },
          body: newPatient,
        };
      },
    }),

    updatePatient: builder.mutation({
      query: ({ id, updatedPatient }) => ({
        url: `patients/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedPatient,
      }),
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
  useAuthenticationMutation,
  useDeletePatientMutation,
  useAddNewPatientMutation,
  useUpdatePatientMutation,
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
