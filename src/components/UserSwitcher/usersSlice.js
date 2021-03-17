import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: 1,
    usersList: [
      { id: 1, title: "Jason Kezios" },
      { id: 2, title: "Jesus Sandoval" },
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
