function useStageStatus(runData, stageNum) {
  const stagesData = runData["stages"];
  const stageNumbers = Array.isArray(stageNum) ? stageNum : [stageNum];

  let sessionCount = 0;
  let stageActive = [];
  let sessionsEnded = [];
  let prevStarted = false;
  let allPrevInactive = false;

  stageNumbers.forEach((stageNumber, index) => {
    sessionCount = sessionCount + stagesData[stageNumber]["sessions"].length;

    stageActive.push(stagesData[stageNumber].active);

    sessionsEnded.push(areSessionsEnded(stagesData[stageNumber]["sessions"]));

    if (stageNumber === 0) {
      prevStarted = true;
    } else {
      const prevSessions = stagesData[stageNumber - 1]["sessions"];
      if (prevSessions.length && areSessionsEnded(prevSessions)) {
        prevStarted = true;
      }
    }

    if (
      stageNumber === 0 ||
      (runData.completion !== null && stageNumber - 1 <= runData.completion)
    ) {
      allPrevInactive = true;
    }
  });

  function areSessionsEnded(sessionsList) {
    for (let i = 0; i < sessionsList.length; i++) {
      if (sessionsList[i].endTime === undefined) {
        return false;
      }
    }
    return true;
  }

  function getStatus() {
    if (stageActive.includes(true)) {
      if (sessionsEnded.includes(false)) {
        return ["working"];
      } else {
        //Work out what the next status will be if set to inactive
        let nextStatus = "";
        if (allPrevInactive) {
          if (sessionCount) {
            nextStatus = "complete";
          } else {
            nextStatus = "skipped";
          }
        } else {
          if (sessionCount || prevStarted) {
            nextStatus = "paused";
          } else {
            nextStatus = "pending";
          }
        }

        if (sessionCount) {
          return ["started", nextStatus];
        } else {
          return ["ready", nextStatus];
        }
      }
    } else {
      //Inactive States
      if (allPrevInactive) {
        if (sessionCount) {
          return ["complete"];
        } else {
          return ["skipped"];
        }
      } else {
        if (sessionCount || prevStarted) {
          return ["paused"];
        } else {
          return ["pending"];
        }
      }
    }
  }

  function getStatusIcon(status) {
    switch (status) {
      case "complete":
        return "C";
      case "skipped":
        return "S";
      case "paused":
        return "P";
      case "pending":
        return "-";
      default:
        return "-";
    }
  }

  const stageIsActive = stageActive.includes(true);
  const stageStatusName = getStatus()[0];
  const stageStatusNext = getStatus()[1];
  const stageStatusIcon = getStatusIcon(stageStatusName);

  return [
    stageIsActive,
    stageStatusName,
    stageStatusIcon,
    sessionCount,
    stageStatusNext,
  ];
}

export default useStageStatus;
