import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: window.localStorage.getItem("activeUser") || 1,
    usersList: [
      { id: 1, title: "User One" },
      { id: 2, title: "User Two" },
    ],
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
