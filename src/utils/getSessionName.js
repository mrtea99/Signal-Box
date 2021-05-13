import getFlagName from "./getFlagName.js";
import stageNames from "../data/stageNames.json";

function getSessionName(session) {
  switch (session.type) {
    case "work":
      return `${session.activity.name} Session`;
    case "qa":
      return "QA Check";
    case "flag":
      return "Flag: " + getFlagName(session.amount, true);
    case "deactivate":
      return "Complete Stage";
    case "activate":
      return "Undo Complete Stage";
    case "consign":
      return `Consign ${session.stage === 1 ? "Batches" : "Units"}`;
    case "assign":
      return `${stageNames[session.stage]} Assignment`;
    default:
      return "Activity";
  }
}

export default getSessionName;
