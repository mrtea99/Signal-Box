import React from "react";

import StatusIcon from "../StatusIcon/StatusIcon.js";

import useStageStatus from "../../hooks/useStageStatus.js";

function StageStatus(props) {
  const [
    stageActive,
    stageStatusName,
    stageStatusIcon,
    stageSessionCount,
  ] = useStageStatus(props.runData, props.stageNum);

  return (
    <>
      {props.label ? stageStatusName.charAt(0).toUpperCase() + stageStatusName.slice(1) + " " : <></>}
      <StatusIcon
        stageStatusName={stageStatusName}
        stageSessionCount={stageSessionCount}
      />
    </>
  );
}

export default StageStatus;
