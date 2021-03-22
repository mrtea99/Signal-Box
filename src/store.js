import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./components/UserSwitcher/usersSlice.js";
import runsReducer from "./components/RunList/runsSlice.js";

export default configureStore({
  reducer: { users: usersReducer, runs: runsReducer },
});
