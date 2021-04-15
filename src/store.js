import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./components/UserSwitcher/usersSlice.js";
import runsReducer from "./components/RunList/runsSlice.js";
import sessionsReducer from "./components/SessionList/sessionsSlice.js";
import atmosReducer from "./components/AtmosBatcher/atmosSlice.js";

export default configureStore({
  reducer: {
    users: usersReducer,
    runs: runsReducer,
    sessions: sessionsReducer,
    atmos: atmosReducer,
  },
});
