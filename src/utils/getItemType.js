function getItemType(stageNum) {
  switch (stageNum) {
    case 0:
    case 1:
      return "Batches";
    case 2:
    case 3:
      return "Units";
    default:
      return "Items";
  }
}

export default getItemType;
