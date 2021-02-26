function getFlagName(count, caps) {
  switch (count) {
    case 0:
      return caps ? "Note" : "note";
    case 1:
      return caps ? "Issue" : "issue";
    case 2:
      return caps ? "Blocker" : "blocker";
    default:
      return "N/A";
  }
}

export default getFlagName;
