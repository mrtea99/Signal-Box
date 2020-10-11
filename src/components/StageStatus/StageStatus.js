import React from "react";

function StageStatus(props) {
  const stagesData = props.runData["stages"];
  const stageNumbers = Array.isArray(props.stageNum)
    ? props.stageNum
    : [props.stageNum];

  let count = 0;
  let active = [];
  let sessionsEnded = [];
  let prevStarted = false;

  stageNumbers.forEach((stageNumber, index) => {
    count = count + stagesData[stageNumber]["sessions"].length;
    active.push(stagesData[stageNumber].active);
    sessionsEnded.push(areSessionsEnded(stagesData[stageNumber]["sessions"]));
    if (stageNumber === 0) {
      prevStarted = true;
    } else {
      if (
        stagesData[stageNumber - 1]["sessions"].length ||
        !stagesData[stageNumber - 1].active
      ) {
        prevStarted = true;
      }
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

  function getStatusName() {
    if (active.includes(true)) {
      if (prevStarted || count) {
        if (count) {
          if (sessionsEnded.includes(false)) {
            return "Working";
          } else {
            return "Started";
          }
        } else {
          return "Ready";
        }
      } else {
        return "Pending";
      }
    } else {
      return "Complete";
    }
  }

  return (
    <>
      {props.label ? getStatusName() + " " : <></>}
      {"("}
      {prevStarted || count ? (active.includes(true) ? count : "C") : "-"}
      {")"}
      {sessionsEnded.includes(false) ? "*" : ""}
    </>
  );
}

export default StageStatus;
