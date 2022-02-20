import { createSlice } from "@reduxjs/toolkit";

export const selectedUserSlice = createSlice({
  name: "selectUser",
  initialState: {
    selectedUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    selectUser: (state, action) => {
      state.isFetching = false;
      state.selectedUser = action.payload;
    },
    selectUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    selectOff: (state) => {
      state.selectedUser = null;
    },
  },
});

export const { selectUser, selectUserFailure, selectOff } =
  selectedUserSlice.actions;

export default selectedUserSlice.reducer;
