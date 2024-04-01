import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userLogin: {
      username: "",
      password: "",
      token: "",
    },
  },
  reducers: {
    setUsersLogin: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

export const { setUsersLogin } = usersSlice.actions;

export default usersSlice.reducer;
