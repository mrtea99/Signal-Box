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
      const { uid, dataSection, dataKey, newValue } = action.payload;

      if (dataSection === "delete") {
        state.runsList = state.runsList.filter((run) => uid !== run.id);
      } else {
        const updatedRunData = state.runsList.map((run) => {
          if (run.id === uid) {
            if (dataSection !== null) {
              run[dataSection][dataKey] = newValue;
            } else {
              run[dataKey] = newValue;
            }
            return run;
          }
          return run;
        });
        state.runsList = updatedRunData;
      }
    },
    addSession: (state, action) => {
      const { runId, stage, sessionData } = action.payload;

      const runToChange = state.runsList.find((run) => {
        return run.id === runId;
      });

      runToChange.stages[stage].sessions.push(sessionData);
    },
    updateSession: (state, action) => {
      const { runId, stage, sessionId, extraData } = action.payload;

      const sessionToChange = state.runsList
        .find((run) => run.id === runId)
        .stages[stage].sessions.find(
          (session) => session.sessionId === sessionId
        );

      Object.assign(sessionToChange, extraData);
    },
  },
});

export const { create, update, addSession, updateSession } = runsSlice.actions;

export default runsSlice.reducer;