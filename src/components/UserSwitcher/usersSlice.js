import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: parseInt(window.localStorage.getItem("activeUser")) || 11,
    usersList: [
      {
        "odata.type": "SP.User",
        "odata.id":
          "https://mojospa.sharepoint.com/sites/TestApp/_api/Web/GetUserById(11)",
        "odata.editLink": "Web/GetUserById(11)",
        Id: 11,
        Title: "Jason Kezios",
        Email: "jkezios@mojospa.com",
        UserPrincipalName: "jkezios@mojospa.com",
      },
      {
        "odata.type": "SP.User",
        "odata.id":
          "https://mojospa.sharepoint.com/sites/TestApp/_api/Web/GetUserById(12)",
        "odata.editLink": "Web/GetUserById(12)",
        Id: 12,
        Title: "Jessica De La Cruz",
        Email: "jessica.c@mojospa.com",
        UserPrincipalName: "jessica.c@mojospa.com",
      },
      {
        "odata.type": "SP.User",
        "odata.id":
          "https://mojospa.sharepoint.com/sites/TestApp/_api/Web/GetUserById(13)",
        "odata.editLink": "Web/GetUserById(13)",
        Id: 13,
        Title: "Jesus Sandoval",
        Email: "jesus.s@mojospa.com",
        UserPrincipalName: "jesus.s@mojospa.com",
      },
      {
        "odata.type": "SP.User",
        "odata.id":
          "https://mojospa.sharepoint.com/sites/TestApp/_api/Web/GetUserById(14)",
        "odata.editLink": "Web/GetUserById(14)",
        Id: 14,
        Title: "Stephen Train",
        Email: "stephen.t@mojospa.com",
        UserPrincipalName: "stephen.t@mojospa.com",
      },
      {
        "odata.type": "SP.User",
        "odata.id":
          "https://mojospa.sharepoint.com/sites/TestApp/_api/Web/GetUserById(7)",
        "odata.editLink": "Web/GetUserById(7)",
        Id: 7,
        Title: "TestApp Members",
        Email: "TestApp@mojospa.onmicrosoft.com",
        UserPrincipalName: null,
      },
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

export const selectCurrentUser = (state) => state.users.currentUser;
