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

  if (result.error && result.error.status === 401) {
    return handleTokenRefresh(args, api, extraOptions);
  }

  return result;
};

const handleTokenRefresh = async (args, api, extraOptions) => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("Refresh token:", refreshToken);
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "Authentication/refresh-web-token",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        },
        api,
        extraOptions
      );

      console.log("Refresh token result:", refreshResult);

      if (refreshResult.data) {
        const { token: newToken } = refreshResult.data;
        localStorage.setItem("token", newToken);
        return await baseQuery(args, api, extraOptions);
      } else {
        localStorage.clear();
        window.location.href = "/auth/login";
      }
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.clear();
    window.location.href = "/auth/login";
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Patients",
    "Appointments",
    "Roles",
    "Doctors",
    "Users",
    "Branches",
    "Favorites",
    "UserRoles",
    "DoctorWorkingDays",
  ],
  endpoints: (builder) => ({
    verifyToken: builder.query({
      query: () => "Authentication/refresh-web-token",
    }),
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
      query: ({ doctorId }) =>
        `Appointments/GetByDoctorAndDate?doctorId=${doctorId}&page=1&pageSize=20`,
      method: "GET",
      providesTags: ["Appointments"],
    }),
    getAppointmentsByPatientAndDate: builder.query({
      query: ({ patientId, date }) =>
        date
          ? `Appointments/GetByPatientAndDate?patientId=${patientId}&date=${date}&page=1&pageSize=20`
          : `Appointments/GetByPatientAndDate?patientId=${patientId}&page=1&pageSize=20`,
      method: "GET",
      providesTags: ["Appointments"],
    }),
    getAppointmentById: builder.query({
      query: (id) => `Appointments/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    getAppointments: builder.query({
      query: () => "Appointments?page=1&pageSize=150",
      providesTags: ["Appointments"],
    }),
    addNewAppointment: builder.mutation({
      query(newAppointment) {
        return {
          url: `Appointments`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newAppointment,
        };
      },
      invalidatesTags: ["Appointments"],
    }),
    AppointmentUpdate: builder.mutation({
      query: ({ id, updatedAppointment }) => ({
        url: `Appointments/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedAppointment,
      }),
    }),
    deleteAppointment: builder.mutation({
      query(id) {
        return {
          url: `Appointments/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Appointments"],
    }),
    getDoctors: builder.query({
      query: () => "Doctors",
      providesTags: ["Doctors"],
    }),
    addNewDoctor: builder.mutation({
      query(newDoctor) {
        return {
          url: `Doctors`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newDoctor,
        };
      },
      invalidatesTags: ["Doctors"],
    }),
    updateDoctor: builder.mutation({
      query: ({ id, updatedDoctor }) => ({
        url: `Doctors/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedDoctor,
      }),
      invalidatesTags: ["Doctors"],
    }),
    addNewDoctorInfos: builder.mutation({
      query(newDoctorInfos) {
        return {
          url: `DoctorInfos`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newDoctorInfos,
        };
      },
      invalidatesTags: ["DoctorInfos"],
    }),
    updateDoctorInfos: builder.mutation({
      query: ({ id, updatedDoctorInfos }) => ({
        url: `DoctorInfos/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedDoctorInfos,
      }),
      invalidatesTags: ["DoctorInfos"],
    }),
    getBranches: builder.query({
      query: () => "Branches",
      providesTags: ["Branches"],
    }),
    getBranchById: builder.query({
      query: (id) => `Branches/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    addNewBranch: builder.mutation({
      query(newBranch) {
        return {
          url: `Branches`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newBranch,
        };
      },
      invalidatesTags: ["Branches"],
    }),
    updateBranch: builder.mutation({
      query: ({ id, updatedBranch }) => ({
        url: `Branches/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedBranch,
      }),
      invalidatesTags: ["Branches"],
    }),
    deleteBranch: builder.mutation({
      query(id) {
        return {
          url: `Branches/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Branches"],
    }),
    getFavorites: builder.query({
      query: () => "Favorites",
      providesTags: ["Favorites"],
    }),
    getFavoritesById: builder.query({
      query: (id) => `Favorites/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    addNewFavorite: builder.mutation({
      query(newFavorite) {
        return {
          url: `Favorites`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newFavorite,
        };
      },
      invalidatesTags: ["Favorites"],
    }),
    updateFavorite: builder.mutation({
      query: ({ id, updatedFavorite }) => ({
        url: `Favorites/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedFavorite,
      }),
      invalidatesTags: ["Favorites"],
    }),
    deleteFavorite: builder.mutation({
      query(id) {
        return {
          url: `Favorites/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Favorites"],
    }),
    getRoles: builder.query({
      query: () => "Roles",
      providesTags: ["Roles"],
    }),
    addNewRole: builder.mutation({
      query(newRole) {
        return {
          url: `Roles`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newRole,
        };
      },
      invalidatesTags: ["Roles"],
    }),
    updateRole: builder.mutation({
      query: ({ id, updatedRole }) => ({
        url: `Roles/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedRole,
      }),
      invalidatesTags: ["Roles"],
    }),
    deleteRole: builder.mutation({
      query(id) {
        return {
          url: `Roles/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Roles"],
    }),
    getUserRoles: builder.query({
      query: () => "UserRoles",
      providesTags: ["UserRoles"],
    }),
    getUserRolesById: builder.query({
      query: (id) => `UserRoles/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    addNewUserRole: builder.mutation({
      query(newUserRole) {
        return {
          url: `UserRoles`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newUserRole,
        };
      },
      invalidatesTags: ["UserRoles"],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, updatedUserRole }) => ({
        url: `UserRoles/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedUserRole,
      }),
      invalidatesTags: ["UserRoles"],
    }),
    deleteUserRole: builder.mutation({
      query(id) {
        return {
          url: `UserRoles/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["UserRoles"],
    }),
    getUsers: builder.query({
      query: () => "Users",
      providesTags: ["Users"],
    }),
    addNewUser: builder.mutation({
      query(newUser) {
        return {
          url: `Users`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newUser,
        };
      },
      invalidatesTags: ["Users"],
    }),
    getUserById: builder.query({
      query: (id) => `Users/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    updateUser: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `Users/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `Users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Users"], // Silme işlemi sonrası rolleri yenile
    }),
    getExaminations: builder.query({
      query: () => "examinations",
    }),
    getExamMedicines: builder.query({
      query: () => "examMedicines",
    }),
    getMedicines: builder.query({
      query: () => "Medicines",
      providesTags: ["Medicines"],
    }),
    getMedicineById: builder.query({
      query: (id) => `Medicines/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    addNewMedicine: builder.mutation({
      query(newMedicine) {
        return {
          url: `Medicines`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newMedicine,
        };
      },
      invalidatesTags: ["Medicines"],
    }),
    updateMedicine: builder.mutation({
      query: ({ id, updatedMedicine }) => ({
        url: `Medicines/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedMedicine,
      }),
      invalidatesTags: ["Medicines"],
    }),
    deleteMedicine: builder.mutation({
      query(id) {
        return {
          url: `Medicines/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Medicines"],
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
      query: () => "Holidays",
    }),
    addNewHoliday: builder.mutation({
      query(newHoliday) {
        return {
          url: `Holidays`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newHoliday,
        };
      },
      invalidatesTags: ["Holidays"],
    }),
    updateHoliday: builder.mutation({
      query: ({ id, updatedHoliday }) => ({
        url: `Holidays/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedHoliday,
      }),
      invalidatesTags: ["Holidays"],
    }),
    deleteHoliday: builder.mutation({
      query(id) {
        return {
          url: `Holidays/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Holidays"],
    }),
    getLinks: builder.query({
      query: () => "links",
      providesTags: ["Links"],
    }),
    addNewLink: builder.mutation({
      query(newLink) {
        return {
          url: `Links`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newLink,
        };
      },
      invalidatesTags: ["Links"],
    }),
    updateLink: builder.mutation({
      query: ({ id, updatedLink }) => ({
        url: `Links/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedLink,
      }),
      invalidatesTags: ["Links"],
    }),
    deleteLink: builder.mutation({
      query(id) {
        return {
          url: `Links/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Links"],
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
    getDoctorWorkingDays: builder.query({
      query: () => "DoctorWorkingDays",
      providesTags: ["DoctorWorkingDays"],
    }),
    getDailySlots: builder.query({
      query: ({ doctorId, date }) =>
        `DoctorWorkingDays/daily-slots?doctorId=${doctorId}&date=${date}`,
    }),
    addNewDoctorWorkingDays: builder.mutation({
      query(newDoctorWorkingDays) {
        return {
          url: `DoctorWorkingDays`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: newDoctorWorkingDays,
        };
      },
      invalidatesTags: ["DoctorWorkingDays"],
    }),
    getDoctorWorkingDayByDoctorId: builder.query({
      query: (id) =>
        `DoctorWorkingDays/GetDoctorWorkingDayByDoctorId?doctorId=${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    getDoctorWorkingDaysById: builder.query({
      query: (id) => `DoctorWorkingDays/${id}`,
      providesTags: (results, error, id) => [{ type: "Post", id: id }],
    }),
    updateDoctorWorkingDays: builder.mutation({
      query: ({ id, updatedDoctorWorkingDays }) => ({
        url: `DoctorWorkingDays/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedDoctorWorkingDays,
      }),
      invalidatesTags: ["DoctorWorkingDays"],
    }),
    deleteDoctorWorkingDays: builder.mutation({
      query(id) {
        return {
          url: `DoctorWorkingDays/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["DoctorWorkingDays"], // Silme işlemi sonrası rolleri yenile
    }),
  }),
  /*   keepUnusedDataFor: 30,
  refetchOnMountOrArgChange: 5, */
});

export const {
  useVerifyTokenQuery,
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
  useGetAppointmentsByPatientAndDateQuery,
  useGetAppointmentByIdQuery,
  useGetAppointmentsQuery,
  useAddNewAppointmentMutation,
  useAppointmentUpdateMutation,
  useDeleteAppointmentMutation,
  useGetDoctorsQuery,
  useAddNewDoctorMutation,
  useUpdateDoctorMutation,
  useAddNewDoctorInfosMutation,
  useUpdateDoctorInfosMutation,
  useGetBranchesQuery,
  useGetBranchByIdQuery,
  useAddNewBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
  useGetFavoritesQuery,
  useGetFavoritesByIdQuery,
  useAddNewFavoriteMutation,
  useUpdateFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetRolesQuery,
  useAddNewRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetUserRolesQuery,
  useGetUserRolesByIdQuery,
  useAddNewUserRoleMutation,
  useUpdateUserRoleMutation,
  useDeleteUserRoleMutation,
  useGetUsersQuery,
  useAddNewUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetExaminationsQuery,
  useGetExamMedicinesQuery,
  useGetMedicinesQuery,
  useGetMedicineByIdQuery,
  useAddNewMedicineMutation,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
  useGetMedicinesPageQuery,
  useGetAuthorityQuery,
  useGetHolidaysQuery,
  useAddNewHolidayMutation,
  useUpdateHolidayMutation,
  useDeleteHolidayMutation,
  useGetLinksQuery,
  useAddNewLinkMutation,
  useUpdateLinkMutation,
  useDeleteLinkMutation,
  useGetMonthlyAppointmentCountQuery,
  useGetMonthlyPatientCountQuery,
  useGetDailyAppointmentCountQuery,
  useGetDailyPatientCountQuery,
  useGetAppointmentCountByDoctorQuery,
  useGetDoctorWorkingDaysByIdQuery,
  useGetDailySlotsQuery,
  useAddNewDoctorWorkingDaysMutation,
  useGetDoctorWorkingDayByDoctorIdQuery,
  useGetDoctorWorkingDaysQuery,
  useUpdateDoctorWorkingDaysMutation,
  useDeleteDoctorWorkingDaysMutation,
} = apiSlice;
