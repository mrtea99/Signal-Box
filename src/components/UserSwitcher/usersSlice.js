import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: parseInt(window.localStorage.getItem("activeUser")) || 1,
    usersList: [
      { id: 1, title: "Jesus Sandoval" },
      { id: 2, title: "Amanda Kezios" },
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

export const selectCurrentUser = (state) => state.users.currentUser;
