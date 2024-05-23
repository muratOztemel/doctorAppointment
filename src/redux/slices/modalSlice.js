// src/redux/slices/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    timer: 30,
    isActive: true,
  },
  reducers: {
    decreaseTimer: (state) => {
      if (state.timer > 0) {
        state.timer -= 1;
      }
      if (state.timer === 0) {
        state.isActive = false;
      }
    },
    resetTimer: (state) => {
      state.timer = 30;
      state.isActive = true;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { decreaseTimer, resetTimer, setIsActive } = modalSlice.actions;

export default modalSlice.reducer;
