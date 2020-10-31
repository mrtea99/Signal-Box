function useStageStatus(runData, stageNumber, activeUser) {
  const stagesData = runData["stages"];

  const stageActive = stagesData[stageNumber].active;

  const allSessions = stagesData[stageNumber]["sessions"];

  //Items
  let itemCount = 0;
  let targetItemCount = 0;

  switch (stageNumber) {
    case 0:
      targetItemCount = 1;
      break;
    case 1:
      itemCount = runData.consignedManufacturing;
      targetItemCount = runData.productInfo.batchQuantity;
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

  //Completion progress
  let completion;
  let completionPercentage;

  if ([1, 2, 3].includes(stageNumber)) {
    completion = itemCount + "/" + targetItemCount;
    completionPercentage = itemCount
      ? Math.floor((100 / targetItemCount) * itemCount)
      : 0;
  }

  //Work
  const workSessions = allSessions.filter((session) => {
    return session.type === "work";
  });
  const workTotal = workSessions.length;

  const workActiveSessions = workSessions.filter((session) => {
    return session.resolved === false;
  });
  const workActive = workActiveSessions.length;

  let workActiveNames = "";
  workActiveSessions.forEach((session, index) => {
    workActiveNames = workActiveNames + (index ? ", " : "") + session.activity;
  });

  //Issues
  const issueSessions = allSessions.filter((session) => {
    return session.type === "issue";
  });
  const issueTotal = issueSessions.length;

  const issueActive = issueSessions.filter((session) => {
    return session.resolved === false;
  }).length;

  //QA
  const qaSessions = allSessions.filter((session) => {
    return session.type === "qa";
  });
  const qaTotal = qaSessions.length;

  const qaActive = qaSessions.filter((session) => {
    return session.resolved === false;
  }).length;

  //User
  let userTotal = 0;
  let userActive = 0;

  if (activeUser) {
    const userSessions = allSessions.filter((session) => {
      return session.user === activeUser;
    });
    userTotal = userSessions.length;

    userActive = userSessions.filter((session) => {
      return session.type === "work" && session.resolved === false;
    }).length;
  }

  // let prevStarted = false;
  // let allPrevInactive = false;

  // if (stageNumber === 0) {
  //   prevStarted = true;
  // } else {
  //   const prevSessions = stagesData[stageNumber - 1]["sessions"];
  //   if (prevSessions.length && areSessionsEnded(prevSessions)) {
  //     prevStarted = true;
  //   }
  // }

  // if (
  //   stageNumber === 0 ||
  //   (runData.completion !== null && stageNumber - 1 <= runData.completion)
  // ) {
  //   allPrevInactive = true;
  // }

  // function getStatus() {
  //   if (stageActive.includes(true)) {
  //     if (sessionsEnded.includes(false)) {
  //       return ["working"];
  //     } else {
  //       //Work out what the next status will be if set to inactive
  //       let nextStatus = "";
  //       if (allPrevInactive) {
  //         if (sessionCount) {
  //           nextStatus = "complete";
  //         } else {
  //           nextStatus = "skipped";
  //         }
  //       } else {
  //         if (sessionCount || prevStarted) {
  //           nextStatus = "paused";
  //         } else {
  //           nextStatus = "pending";
  //         }
  //       }

  //       if (sessionCount) {
  //         return ["started", nextStatus];
  //       } else {
  //         return ["ready", nextStatus];
  //       }
  //     }
  //   } else {
  //     //Inactive States
  //     if (allPrevInactive) {
  //       if (sessionCount) {
  //         return ["complete"];
  //       } else {
  //         return ["skipped"];
  //       }
  //     } else {
  //       if (sessionCount || prevStarted) {
  //         return ["paused"];
  //       } else {
  //         return ["pending"];
  //       }
  //     }
  //   }
  // }

  // //Temporary simplified status
  // function getStatus() {
  //   if (stageActive) {
  //     if (workActive) {
  //       return ["working"];
  //     } else {
  //       //Work out what the next status will be if set to inactive
  //       let nextStatus = "";
  //       if (workTotal) {
  //         nextStatus = "complete";
  //       } else {
  //         nextStatus = "pending";
  //       }

  //       if (workTotal) {
  //         return ["ready", nextStatus]; //started
  //       } else {
  //         return ["ready", nextStatus]; //ready
  //       }
  //     }
  //   } else {
  //     //Inactive States
  //     if (workTotal) {
  //       return ["complete"];
  //     } else {
  //       return ["pending"];
  //     }
  //   }
  // }

  //Status v3
  const getStatus = function () {
    if (stageActive) {
      if (targetItemCount) {
        if (workActive) {
          return ["working"];
        } else {
          if (
            completionPercentage === 100 &&
            issueActive === 0 &&
            qaActive === 0
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
  };

  const statusNames = getStatus();

  return {
    stageActive: stageActive,
    stageStatusName: statusNames[0],
    stageStatusNext: statusNames[1],
    workTotal: workTotal,
    workActive: workActive,
    workActiveNames: workActiveNames,
    issueTotal: issueTotal,
    issueActive: issueActive,
    qaTotal: qaTotal,
    qaActive: qaActive,
    userTotal: userTotal,
    userActive: userActive,
    completion: completion,
    completionPercentage: completionPercentage,
  };
}

export default useStageStatus;
