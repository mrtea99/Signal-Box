import { createSlice } from "@reduxjs/toolkit";

export const runsSlice = createSlice({
  name: "runs",
  initialState: {
    runsList: JSON.parse(window.localStorage.getItem("runData")) || [],
  },
  reducers: {
    create: (state, action) => {
      state.runsList.push(action.payload);
    },
    update: (state, action) => {
      const { id, dataSection, dataKey, newValue } = action.payload;

      if (dataSection === "delete") {
        state.runsList = state.runsList.filter((run) => id !== run.id);
      } else {
        state.runList = state.runList.map((run) => {
          if (run.id === id) {
            if (dataSection !== null) {
              run[dataSection][dataKey] = newValue;
            } else {
              run[dataKey] = newValue;
            }
            return run;
          }
          return run;
        });
      }
    },
  },
});

export const { create, update } = runsSlice.actions;

export default runsSlice.reducer;
