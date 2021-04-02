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
      const { runId, dataSection, dataKey, newValue } = action.payload;

      const updatedRunsList = state.runsList.map((run) => {
        if (run.id === runId) {
          if (dataSection !== null) {
            run[dataSection][dataKey] = newValue;
          } else {
            run[dataKey] = newValue;
          }
          return run;
        }
        return run;
      });

      state.runsList = updatedRunsList;
    },
    delete: (state, action) => {
      const runId = action.payload;

      state.runsList = state.runsList.filter((run) => runId !== run.id);
    },
  },
});

export const {
  create,
  update,
  addSession,
  updateSession,
  endSession,
} = runsSlice.actions;

export default runsSlice.reducer;

// Selectors
//------------------------------------
export const selectAllRuns = (state) => state.runs.runsList;

export const selectRun = (state, runId) =>
  state.runs.runsList.find((run) => run.id === runId);
