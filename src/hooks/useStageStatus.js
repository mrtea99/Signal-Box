function useStageStatus(runData, stageNum, activeUser) {
  const stagesData = runData["stages"];
  const stageNumbers = Array.isArray(stageNum) ? stageNum : [stageNum];

  let stageActive = [];
  // let prevStarted = false;
  // let allPrevInactive = false;
  let workTotal = 0;
  let workActive = 0;
  let issueTotal = 0;
  let issueActive = 0;
  let qaTotal = 0;
  let qaActive = 0;
  let userActive = 0;
  let userTotal = 0;

  stageNumbers.forEach((stageNumber, index) => {
    stageActive.push(stagesData[stageNumber].active);

    const allSessions = stagesData[stageNumber]["sessions"];

    //Work
    const workSessions = allSessions.filter((session) => {
      return session.type === "work";
    });
    workTotal += workSessions.length;

    workActive += workSessions.filter((session) => {
      return session.resolved === false;
    }).length;

    //Issues
    const issueSessions = allSessions.filter((session) => {
      return session.type === "issue";
    });
    issueTotal += issueSessions.length;

    issueActive += issueSessions.filter((session) => {
      return session.resolved === false;
    }).length;

    //QA
    const qaSessions = allSessions.filter((session) => {
      return session.type === "qa";
    });
    qaTotal += qaSessions.length;

    qaActive += qaSessions.filter((session) => {
      return session.resolved === false;
    }).length;

    //User
    if (activeUser) {
      const userSessions = allSessions.filter((session) => {
        return session.user === activeUser;
      });
      userTotal += userSessions.length;

      userActive += userSessions.filter((session) => {
        return session.type === "work" && session.resolved === false;
      }).length;
    }

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
  });

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

  //Temporary simplified status
  function getStatus() {
    if (stageActive.includes(true)) {
      if (workActive) {
        return ["working"];
      } else {
        //Work out what the next status will be if set to inactive
        let nextStatus = "";
        if (workTotal) {
          nextStatus = "complete";
        } else {
          nextStatus = "pending";
        }

        if (workTotal) {
          return ["started", nextStatus];
        } else {
          return ["ready", nextStatus];
        }
      }
    } else {
      //Inactive States
      if (workTotal) {
        return ["complete"];
      } else {
        return ["pending"];
      }
    }
  }

  const statusNames = getStatus();

  return {
    stageIsActive: stageActive.includes(true),
    stageStatusName: statusNames[0],
    stageStatusNext: statusNames[1],
    workTotal: workTotal,
    workActive: workActive,
    issueTotal: issueTotal,
    issueActive: issueActive,
    qaTotal: qaTotal,
    qaActive: qaActive,
    userTotal: userTotal,
    userActive: userActive,
  };
}

export default useStageStatus;
