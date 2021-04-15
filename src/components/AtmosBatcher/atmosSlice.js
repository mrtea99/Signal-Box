import { createSlice } from "@reduxjs/toolkit";

export const atmosSlice = createSlice({
  name: "atmos",
  initialState: {
    atmosList: JSON.parse(window.localStorage.getItem("atmosData")) || [],
  },
  reducers: {
    add: (state, action) => {
      const atmosItem = action.payload;

      state.atmosList.push(atmosItem);
    },
    deleteAllInRun: (state, action) => {
      const runId = action.payload;

      const filteredAtmosList = state.atmosList.filter(
        (atmosItem) => atmosItem.runId !== runId
      );

      state.atmosList = filteredAtmosList;
    },
  },
});

export const { add, deleteAllInRun } = atmosSlice.actions;

export default atmosSlice.reducer;
