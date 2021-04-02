function getStageStatus(runData, allSessions, stageNumber, activeUser) {

  // Stage Active Status
  let stageActive;
  switch (stageNumber) {
    case 0:
      stageActive = runData.activePrep;
      break;
    case 4:
      stageActive = runData.activeStocking;
      break;
    default:
      stageActive = true;
  }

  // Items
  let itemCount = 0;
  let targetItemCount = 0;

  switch (stageNumber) {
    case 0:
      targetItemCount = 1;
      break;
    case 1:
      itemCount = runData.consignedManufacturing;
      targetItemCount = runData.batchQuantity;
      break;
    case 2:
      itemCount = runData.consignedPackaging;
      targetItemCount =
        runData.consignedManufacturing * runData.productInfo.unitsPerBatch;
      break;
    case 3:
      itemCount = runData.consignedLabeling;
      targetItemCount = runData.consignedPackaging;
      break;
    case 4:
      targetItemCount = runData.consignedLabeling;
      break;
    default:
      break;
  }

  // Completion progress
  let completionFraction;
  let completionPercentage;

  if ([1, 2, 3].includes(stageNumber)) {
    completionFraction = itemCount + "/" + targetItemCount;

    if (itemCount === targetItemCount && targetItemCount !== 0) {
      completionPercentage = 100;
    } else {
      completionPercentage = itemCount
        ? Math.floor((100 / targetItemCount) * itemCount)
        : 0;
    }
  }

  // Work
  const workSessions = allSessions.filter((session) => {
    return session.type === "work";
  });
  const workTotal = workSessions.length;

  const workActiveSessions = workSessions.filter((session) => {
    return !session.endTime;
  });
  const workActive = workActiveSessions.length;

  let workActiveNames = "";
  workActiveSessions.forEach((session, index) => {
    workActiveNames =
      workActiveNames + (index ? ", " : "") + session.activity.name;
  });

  // Flag Notes
  const noteSessions = allSessions.filter((session) => {
    return session.type === "flag" && session.amount === 0;
  });
  const noteTotal = noteSessions.length;

  const noteActive = noteSessions.filter((session) => {
    return !session.endTime;
  }).length;

  // Flag Issues
  const issueSessions = allSessions.filter((session) => {
    return session.type === "flag" && session.amount === 1;
  });
  const issueTotal = issueSessions.length;

  const issueActive = issueSessions.filter((session) => {
    return !session.endTime;
  }).length;

  // Flag Blockers
  const blockerSessions = allSessions.filter((session) => {
    return session.type === "flag" && session.amount === 2;
  });
  const blockerTotal = blockerSessions.length;

  const blockerActive = blockerSessions.filter((session) => {
    return !session.endTime;
  }).length;

  // QA
  const qaSessions = allSessions.filter((session) => {
    return session.type === "qa";
  });
  const qaTotal = qaSessions.length;

  const qaActive = qaSessions.filter((session) => {
    return !session.endTime;
  }).length;

  // User
  let userTotal = 0;
  let userActive = 0;

  if (activeUser) {
    const userSessions = allSessions.filter((session) => {
      return (
        session.user === activeUser || session.secondaryUser === activeUser
      );
    });
    userTotal = userSessions.length;

    userActive = userSessions.filter((session) => {
      return session.type === "work" && !session.endTime;
    }).length;
  }

  // Assignments
  const assignSessions = allSessions.filter((session) => {
    return session.type === "assign";
  });
  const assignTotal = assignSessions.length;

  const assignActive = assignSessions.filter((session) => {
    return !session.endTime;
  }).length;

  let assignUserTotal = 0;
  let assignUserActive = 0;

  if (activeUser) {
    const assignUserSessions = assignSessions.filter((session) => {
      return session.secondaryUser === activeUser;
    });
    assignUserTotal = assignUserSessions.length;

    assignUserActive = assignUserSessions.filter((session) => {
      return !session.endTime;
    }).length;
  }

  // Status
  const getStatus = function () {
    if (blockerActive) {
      return ["blocked"];
    } else {
      if (stageActive) {
        if (targetItemCount) {
          if (workActive) {
            return ["working"];
          } else {
            if (
              completionPercentage === 100 &&
              issueActive === 0 &&
              qaActive === 0 &&
              assignActive === 0
            ) {
              return ["complete"];
            } else {
              if (allSessions.length) {
                return ["started"];
              } else {
                return ["ready"];
              }
            }
          }
        } else {
          return ["pending"];
        }
      } else {
        return ["complete"];
      }
    }
  };

  const statusNames = getStatus();

  return {
    stageActive,
    stageStatusName: statusNames[0],
    stageStatusNext: statusNames[1],
    workTotal,
    workActive,
    workActiveNames,
    noteTotal,
    noteActive,
    issueTotal,
    issueActive,
    blockerTotal,
    blockerActive,
    qaTotal,
    qaActive,
    userTotal,
    userActive,
    assignTotal,
    assignActive,
    assignUserTotal,
    assignUserActive,
    itemCount,
    targetItemCount,
    completionFraction,
    completionPercentage,
  };
}

export default getStageStatus;
