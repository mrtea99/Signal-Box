import { createSlice } from "@reduxjs/toolkit";

const changeSession = function (runId, stage, sessionId, extraData, state) {
  const sessionToChange = state.sessionsList.find(
    (session) => session.sessionId === sessionId
  );

  Object.assign(sessionToChange, extraData);
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState: {
    sessionsList: JSON.parse(window.localStorage.getItem("sessionsData")) || [],
  },
  reducers: {
    add: (state, action) => {
      const { sessionData } = action.payload;

      state.sessionsList.push(sessionData);
    },
    update: (state, action) => {
      const { runId, stage, sessionId, extraData } = action.payload;

      changeSession(runId, stage, sessionId, extraData, state);
    },
    end: (state, action) => {
      const { runId, stage, sessionId, extraData } = action.payload;

      let combinedExtra = extraData || {};
      // Todo: remove Date.now() as it is not allowed in a reducer
      Object.assign(combinedExtra, { endTime: Date.now() });

      changeSession(runId, stage, sessionId, combinedExtra, state);
    },
  },
});

export const { add, update, end } = sessionsSlice.actions;

export default sessionsSlice.reducer;

// Selectors
//------------------------------------
export const selectStageSessions = (state, runId, stageNum) => {
  const value = state.sessions.sessionsList.filter(
    (session) => session.runId === runId && session.stage === stageNum
  );

  return value;
};
