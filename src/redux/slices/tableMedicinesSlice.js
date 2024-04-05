import { createSlice } from "@reduxjs/toolkit";

export const tableMedicinesSlice = createSlice({
  name: "tableMedicines",
  initialState: {
    medicineId: 0,
    sortField: "id",
    sortOrder: "asc",
    searchTerm: "",
    filter: "",
  },
  reducers: {
    setMedicineId: (state, action) => {
      state.medicineId = action.payload;
    },
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setMedicineId,
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
  setIsShowError,
} = tableMedicinesSlice.actions;

export default tableMedicinesSlice.reducer;
