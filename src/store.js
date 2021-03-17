import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./components/UserSwitcher/usersSlice.js";

export default configureStore({
  reducer: { users: usersReducer },
});
