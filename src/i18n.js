import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "New Run": "New Run",
      Info: "Info",
      "Create New Run": "Create New Run",
      Save: "Save",
      Cancel: "Cancel",
      "Run Status": "Run Status",
      All: "All",
      "Edit Assignment": "Edit Assignment",
      Status: "Status",
      "Assign Stage": "Assign Stage",
      Assignments: "Assignments",
      "No Assignee": "No Assignee",
      Add: "Add",
      Assignment: "Assignment",
      Edit: "Edit",
      Resolve: "Resolve",
      Assignee: "Assignee",
      None: "None",
      Notes: "Notes",
      "Planned Start Date": "Planned Start Date",
      "Planned Start Time": "Planned Start Time",
      "QA Check": "QA Check",
      Creator: "Creator",
      Timeframe: "Timeframe",
      "Raising Note": "Raising Note",
      "Checker Note": "Checker Note",
      Checked: "Checked",
      Passed: "Passed",
      Failed: "Failed",
      Active: "Active",
      Resolved: "Resolved",
      "Request QA Check": "Request QA Check",
      "QA Note": "QA Note",
      Requested: "Requested",
      Checker: "Checker",
      Immediate: "Immediate",
      "Before next shift": "Before next shift",
      "Before next day": "Before next day",
      Batches: "Batches",
      Units: "Units",
      Items: "Items",
      Consign: "Consign",
      Remaining: "Remaining",
      Consigned: "Consigned",
      "Activity Totals": "Activity Totals",
      "Consignments Summary": "Consignments Summary",
      "New Consignment": "New Consignment",
      "Consignment amount": "Consignment amount",
      "Defective amount": "Defective amount",
      QA: "QA",
      Activity: "Activity",
      Defective: "Defective",
      Fix: "Fix",
      Update: "Update",
      Note: "Note",
      Issue: "Issue",
      Blocker: "Blocker",
      "N/A": "N/A",
      "Raised by": "Raised by",
      Priority: "Priority",
      Waiting: "Waiting",
      "Fix Description": "Fix Description",
      "Update Note": "Update Note",
      "Raise Flag": "Raise Flag",
      "Flag Problem": "Flag Problem",
      Description: "Description",
      Reported: "Reported",
    },
  },
  es: {
    translation: {
      "New Run": "Nueva Corrida",
    },
  },
};

const language = window.localStorage.getItem("language") || "en-us";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: language,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
