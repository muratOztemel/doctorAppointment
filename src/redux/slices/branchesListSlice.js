import { createSlice } from "@reduxjs/toolkit";

export const branchesListSlice = createSlice({
  name: "branchesList",
  initialState: {
    selectedValue: "KBB",
    showOptions: false,
  },
  reducers: {
    setSelectedValue: (state, action) => {
      state.selectedValue = action.payload;
    },
    setShowOptions: (state, action) => {
      state.showOptions = action.payload;
    },
  },
});

export const { setSelectedValue, setShowOptions } = branchesListSlice.actions;

export default branchesListSlice.reducer;
