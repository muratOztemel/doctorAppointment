import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  //baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3001/" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "https://bsg37cps-5002.euw.devtunnels.ms/",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.makinaburada.net/api/v1/",
    prepareHeaders: (headers) => {
      // LocalStorage'dan token'ı al
      const token = localStorage.getItem("token");
      // Eğer token varsa, header'a ekle
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get Patients By Page
    // getPatientsPage: builder.query({
    //   query: ({ page = 1, searchTerm, sortField, sortOrder }) =>
    //     `patients?_page=${page}&_limit=10&q=${searchTerm}&_sort=${sortField}&_order=${sortOrder}`,
    // }),
    getDashboardData: builder.query({
      query: () => "Dashboard/GetDashboardData",
    }),
    getPatientsPage: builder.query({
      query: ({ page = 1, searchTerm, sortField, sortOrder }) =>
        // `Patients/SearchPatient?page=${page}&pageSize=10&q=${searchTerm}&sort=${sortField}&sortby=${sortOrder}`,
        `Patients/SearchPatient?page=${page}&pageSize=20&q=${searchTerm}&sort=${sortField}&sortby=${sortOrder}`,
      method: "GET",
    }),
    // Delete Patient By Id
    deletePatient: builder.mutation({
      query: (id) => ({
        url: `Patients/${id}`,
        method: "DELETE",
      }),
    }),
    // Authentication Control
    authentication: builder.mutation({
      query: (loginModel) => ({
        url: `Authentication`,
        method: "POST",
        body: loginModel,
      }),
    }),
    addNewPatient: builder.mutation({
      query(newPatient) {
        return {
          url: `Patients`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newPatient,
        };
      },
    }),
    updatePatient: builder.mutation({
      query: ({ id, updatedPatient }) => ({
        url: `Patients/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedPatient,
      }),
    }),
    getPatientById: builder.query({
      query: (id) => `Patients/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    getDoctorById: builder.query({
      query: (id) => `Doctors/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    getPatients: builder.query({
      query: () => "Patients",
    }),
    getAppointmentsPage: builder.query({
      query: ({ page = 1, searchTerm, sortField, sortOrder }) =>
        // `Patients/SearchPatient?page=${page}&pageSize=10&q=${searchTerm}&sort=${sortField}&sortby=${sortOrder}`,
        `Appointments?page=${page}&pageSize=20&q=a&sort=${sortField}&sortby=${sortOrder}`,
      method: "GET",
    }),
    getAppointmentById: builder.query({
      query: (id) => `Appointments/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    getAppointments: builder.query({
      query: () => "Appointments",
    }),
    getDoctors: builder.query({
      query: () => "Doctors",
    }),
    getBranches: builder.query({
      query: () => "Branches",
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
    getMonthlyAppointmentCount: builder.query({
      query: () =>
        "Dashboard/monthly-appointment-count?startDate=2024-03-01T00%3A00%3A00&endDate=2024-04-21T00%3A00%3A00",
    }),
    getMonthlyPatientCount: builder.query({
      query: () =>
        "Dashboard/monthly-patient-count?startDate=2024-01-01&endDate=2024-03-30",
    }),
    getDailyAppointmentCount: builder.query({
      query: () =>
        "Dashboard/daily-appointment-count?startDate=2024-04-15&endDate=2024-04-21",
    }),
    getDailyPatientCount: builder.query({
      query: () =>
        "Dashboard/daily-patient-count?startDate=2024-03-28&endDate=2024-04-03",
    }),
    GetAppointmentCountByDoctor: builder.query({
      query: () =>
        "Dashboard/appointment-count-by-doctor?startDate=2024-04-01&endDate=2024-05-01",
    }),
  }),
  /*   keepUnusedDataFor: 30,
  refetchOnMountOrArgChange: 5, */
});

export const {
  useGetDashboardDataQuery,
  useGetPatientsPageQuery,
  useAuthenticationMutation,
  useDeletePatientMutation,
  useAddNewPatientMutation,
  useUpdatePatientMutation,
  useGetPatientByIdQuery,
  useGetDoctorByIdQuery,
  useGetPatientsQuery,
  useGetAppointmentsPageQuery,
  useGetAppointmentByIdQuery,
  useGetAppointmentsQuery,
  useGetDoctorsQuery,
  useGetBranchesQuery,
  useGetRolesQuery,
  useGetUsersRolesQuery,
  useGetUsersQuery,
  useGetExaminationsQuery,
  useGetExamMedicinesQuery,
  useGetMedicinesQuery,
  useGetAuthorityQuery,
  useGetHolidaysQuery,
  useGetLinksQuery,
  useGetMonthlyAppointmentCountQuery,
  useGetMonthlyPatientCountQuery,
  useGetDailyAppointmentCountQuery,
  useGetDailyPatientCountQuery,
  useGetAppointmentCountByDoctorQuery,
} = apiSlice;
