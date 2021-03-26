import getFlagName from "./getFlagName.js";

function getSessionName(session) {
  switch (session.type) {
    case "work":
      return session.activity.name;
    case "qa":
      return "QA Check";
    case "flag":
      return "Flag: " + getFlagName(session.amount, true);
    case "deactivate":
      return "Complete Stage";
    case "activate":
      return "Undo Complete Stage";
    case "consign":
      return `Consign ${session.stage === "Manufacture" ? "Batches" : "Units"}`;
    case "assign":
      return "Assignment";
    default:
      return "Activity";
  }
}

export default getSessionName;
