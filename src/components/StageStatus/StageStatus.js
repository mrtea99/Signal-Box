import React from "react";

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
      {props.label ? stageStatusName + " " : <></>}
      {"("}
      {stageActive ? stageSessionCount : stageStatusIcon}
      {")"}
    </>
  );
}

export default StageStatus;
