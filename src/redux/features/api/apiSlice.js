import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.makinaburada.net/api/v1/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // If a 401 error is received, delete the token from localStorage and redirect to the login page
    localStorage.removeItem("token");
    // Redirect to login page
    window.location.href = "/auth/login";
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Patients"],
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
        `Patients/SearchPatient?page=${page}&pageSize=20&searchterm=${searchTerm}&sort=${sortField}&sortby=${sortOrder}`,
      providesTags: ["Patients"],
    }),
    // providesTags: ["Patients"],
    // Delete Patient By Id
    deletePatient: builder.mutation({
      query: (id) => ({
        url: `Patients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Patients"],
    }),
    // Authentication Control
    authentication: builder.mutation({
      query: (loginModel) => ({
        url: `Authentication`,
        method: "POST",
        body: loginModel,
      }),
    }),
    // Authentication Create user and send activation code
    createAuthentication: builder.mutation({
      query: (loginModel) => ({
        url: `Authentication/create-user-and-send-activation-code`,
        method: "POST",
        body: loginModel,
      }),
    }),
    // Authentication Control
    confirmActivationCode: builder.mutation({
      query: (loginModel) => ({
        url: `Authentication/confirm-activation-code`,
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
    // Delete Doctor By Id
    getDeleteDoctorById: builder.mutation({
      query: (id) => ({
        url: `Doctors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctors"],
    }),
    getDoctorInfoByDoctorId: builder.query({
      query: (id) => `DoctorInfos/GetDoctorInfoByDoctorId?doctorId=${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    getPatients: builder.query({
      query: () => "Patients",
    }),
    getAppointmentsPage: builder.query({
      query: ({ page = 1, searchTerm, sortField, sortOrder }) =>
        // `Patients/SearchPatient?page=${page}&pageSize=10&q=${searchTerm}&sort=${sortField}&sortby=${sortOrder}`,
        `Appointments?page=${page}&pageSize=20&q=${searchTerm}&sort=${sortField}&sortby=${sortOrder}`,
      method: "GET",
    }),
    getByDoctorAndDate: builder.query({
      query: ({
        date = "2024-04-21",
        page = 1,
        searchTerm,
        sortField,
        sortOrder,
      }) =>
        // `Appointments/GetByDoctorAndDate/1/${date}&page=${page}&pageSize=20&q=${searchTerm}&sort=${sortField}&sortby=${sortOrder}`,
        `Appointments/GetByDoctorAndDate/1/${date}`,
      method: "GET",
    }),
    getAppointmentById: builder.query({
      query: (id) => `Appointments/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    getAppointments: builder.query({
      query: () => "Appointments",
    }),
    AppointmentUpdate: builder.mutation({
      query: ({ id, updatedAppointment }) => ({
        url: `Appointments/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedAppointment,
      }),
    }),
    getDoctors: builder.query({
      query: () => "Doctors",
      providesTags: ["Doctors"],
    }),
    getBranches: builder.query({
      query: () => "Branches",
    }),
    getRoles: builder.query({
      query: () => "roles",
    }),
    getUsersRoles: builder.query({
      query: () => "UsersRoles",
    }),
    getUsers: builder.query({
      query: () => "Users",
    }),
    addNewUser: builder.mutation({
      query(newUser) {
        return {
          url: `Users/`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newUser,
        };
      },
    }),
    getUserById: builder.query({
      query: (id) => `Users/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
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
    getMedicinesPage: builder.query({
      query: ({ page = 1, searchTerm, sortField, sortOrder }) =>
        // `Medicines?page=${page}&pageSize=20&searchterm=${searchTerm}&sort=${sortField}&sortby=${sortOrder}`,
        `Medicines`,
      providesTags: ["Medicines"],
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
  useDeletePatientMutation,
  useAuthenticationMutation,
  useCreateAuthenticationMutation,
  useConfirmActivationCodeMutation,
  useAddNewPatientMutation,
  useUpdatePatientMutation,
  useGetPatientByIdQuery,
  useGetDoctorByIdQuery,
  useGetDeleteDoctorByIdMutation,
  useGetDoctorInfoByDoctorIdQuery,
  useGetPatientsQuery,
  useGetAppointmentsPageQuery,
  useGetByDoctorAndDateQuery,
  useGetAppointmentByIdQuery,
  useGetAppointmentsQuery,
  useAppointmentUpdateMutation,
  useGetDoctorsQuery,
  useGetBranchesQuery,
  useGetRolesQuery,
  useGetUsersRolesQuery,
  useGetUsersQuery,
  useAddNewUserMutation,
  useGetUserByIdQuery,
  useGetExaminationsQuery,
  useGetExamMedicinesQuery,
  useGetMedicinesPageQuery,
  useGetAuthorityQuery,
  useGetHolidaysQuery,
  useGetLinksQuery,
  useGetMonthlyAppointmentCountQuery,
  useGetMonthlyPatientCountQuery,
  useGetDailyAppointmentCountQuery,
  useGetDailyPatientCountQuery,
  useGetAppointmentCountByDoctorQuery,
} = apiSlice;
