import { createSlice } from "@reduxjs/toolkit";

const changeSession = function (state, sessionId, extraData) {
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
      const { sessionId, extraData } = action.payload;

      changeSession(state, sessionId, extraData);
    },
    end: (state, action) => {
      const { sessionId, extraData } = action.payload;

      changeSession(state, sessionId, extraData);
    },
    deleteAllInRun: (state, action) => {
      const runId = action.payload;

      const filteredSessionsList = state.sessionsList.filter(
        (session) => session.runId !== runId
      );

      state.sessionsList = filteredSessionsList;
    },
  },
});

export const { add, update, end } = sessionsSlice.actions;

export default sessionsSlice.reducer;

// Selectors
//------------------------------------
export const selectStageSessions = (state, runId, stageNum) => {
  return state.sessions.sessionsList.filter(
    (session) => session.runId === runId && session.stage === stageNum
  );
};
