import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userLogin: {
      username: "",
      password: "",
      token: "",
    },
    userRegisterForm: {
      name: "",
      surname: "",
      idNumber: "",
      birthDate: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      terms: false,
    },
  },
  reducers: {
    setUsersLogin: (state, action) => {
      state.userLogin = action.payload;
    },
    setUserRegisterForm: (state, action) => {
      state.userRegisterForm = action.payload;
    },
  },
});

export const { setUsersLogin, setUserRegisterForm } = usersSlice.actions;

export default usersSlice.reducer;
