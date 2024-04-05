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
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUsersLogin: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

export const { setUserId, setUsersLogin } = usersSlice.actions;

export default usersSlice.reducer;
