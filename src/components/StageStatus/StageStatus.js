import React from "react";

function StageStatus(props) {
  const stagesData = props.runData["stages"];
  const stageNumbers = Array.isArray(props.stageNum)
    ? props.stageNum
    : [props.stageNum];

  let count = 0;
  let complete = [];
  let sessionsEnded = [];

  stageNumbers.forEach((item, index) => {
    count = count + getSessionCount(item);
    complete.push(stagesData[item].complete);
    sessionsEnded.push(areSessionsEnded(item));
  });

  function getSessionCount(stage) {
    return stagesData[stage]["sessions"].length;
  }

  function areSessionsEnded(stage) {
    for (let i = 0; i < stagesData[stage]["sessions"].length; i++) {
      if (stagesData[stage]["sessions"][i].endTime === undefined) {
        return false;
      }
    }
    return true;
  }

  return (
    <>
      {complete.includes(true) ? "Complete" : count}
      {sessionsEnded.includes(false) ? "*" : ""}
    </>
  );
}

export default StageStatus;
