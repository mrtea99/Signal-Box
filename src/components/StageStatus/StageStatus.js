import React from "react";

function StageStatus(props) {
  const stagesData = props.runData["stages"];
  const stageNumbers = Array.isArray(props.stageNum)
    ? props.stageNum
    : [props.stageNum];

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

    if (stageNumber <= props.runData.completion) {
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
      //Active states
      if (sessionCount) {
        if (sessionsEnded.includes(false)) {
          return "Working";
        } else {
          return "Started";
        }
      } else {
        return "Ready";
      }
    } else {
      //Inactive States
      if (allPrevInactive) {
        if (sessionCount) {
          return "Complete";
        } else {
          return "Skipped";
        }
      } else {
        if (sessionCount || prevStarted) {
          return "Paused";
        } else {
          return "Pending";
        }
      }
    }
  }

  function getStatusIcon(status) {
    switch (status) {
      case "Complete":
        return "C";
      case "Skipped":
        return "S";
      case "Paused":
        return "P";
      case "Pending":
        return "-";
      default:
        return "-";
    }
  }

  return (
    <>
      {props.label ? getStatus() + " " : <></>}
      {"("}
      {stageActive.includes(true) ? sessionCount : getStatusIcon(getStatus())}
      {")"}
    </>
  );
}

export default StageStatus;
