import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchContent: {},
    isFetching: false,
    error: false,
  },
  reducers: {
    save: (state, action) => {
      state.searchContent = action.payload;
      state.error = false;
    },
    saveFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { save, saveFailure } = searchSlice.actions;

export default searchSlice.reducer;
