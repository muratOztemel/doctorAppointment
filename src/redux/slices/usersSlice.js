import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userLogin: {
      userId: null,
      username: null,
      token: null,
      userRole: null,
    },
  },
  reducers: {
    setUserId: (state, action) => {
      state.userLogin.userId = action.payload;
    },
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
    clearUser: (state) => {
      state.userId = null;
      state.username = null;
      state.token = null;
      state.userRole = null;
    },
  },
});

export const { setUserId, setUserLogin, clearUser } = usersSlice.actions;

export default usersSlice.reducer;
