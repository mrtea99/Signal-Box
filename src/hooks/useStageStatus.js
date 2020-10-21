function useStageStatus(runData, stageNum) {
  const stagesData = runData["stages"];
  const stageNumbers = Array.isArray(stageNum) ? stageNum : [stageNum];

  let stageActive = [];
  // let prevStarted = false;
  // let allPrevInactive = false;
  let sessionCount = 0;
  let sessionsEnded = [];

  stageNumbers.forEach((stageNumber, index) => {
    stageActive.push(stagesData[stageNumber].active);

    const allSessions = stagesData[stageNumber]["sessions"];
    const workSessions = allSessions.filter((session) => {
      return session.type === "work";
    });
    // const issueSessions = allSessions.filter((session) => {
    //   return session.type === "issue";
    // });
    // const qaSessions = allSessions.filter((session) => {
    //   return session.type === "qa";
    // });
    // const userSessions = allSessions.filter((session) => {
    //   return session.user === activeUser;
    // });

    sessionCount = sessionCount + workSessions.length;

    sessionsEnded.push(areSessionsEnded(workSessions));

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

  function areSessionsEnded(sessionsList) {
    for (let i = 0; i < sessionsList.length; i++) {
      // if (sessionsList[i].endTime === undefined) {
      if (!sessionsList[i].resolved) {
        return false;
      }
    }
    return true;
  }

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
      if (sessionsEnded.includes(false)) {
        return ["working"];
      } else {
        //Work out what the next status will be if set to inactive
        let nextStatus = "";
        if (sessionCount) {
          nextStatus = "complete";
        } else {
          nextStatus = "pending";
        }

        if (sessionCount) {
          return ["started", nextStatus];
        } else {
          return ["ready", nextStatus];
        }
      }
    } else {
      //Inactive States
      if (sessionCount) {
        return ["complete"];
      } else {
        return ["pending"];
      }
    }
  }

  const stageIsActive = stageActive.includes(true);
  const stageStatusName = getStatus()[0];
  const stageStatusNext = getStatus()[1];

  return [
    stageIsActive,
    stageStatusName,
    sessionCount,
    stageStatusNext,
  ];
}

export default useStageStatus;
