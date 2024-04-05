import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userLogin: {
      userId: 1,
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
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUsersLogin: (state, action) => {
      state.userLogin = action.payload;
    },
    setUserRegisterForm: (state, action) => {
      state.userRegisterForm = action.payload;
    },
  },
});


export const { setUserId, setUsersLogin, setUserRegisterForm } = usersSlice.actions;

export default usersSlice.reducer;
