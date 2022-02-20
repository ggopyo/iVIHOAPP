import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    isFetching: false,
    currentPost: null,
    error: false,
  },
  reducers: {
    select: (state, action) => {
      state.currentPost = action.payload;
      state.error = false;
    },
    selectFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { select, selectFailure } = postSlice.actions;

export default postSlice.reducer;
