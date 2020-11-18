import React from "react";

import useStageStatus from "../../../hooks/useStageStatus.js";

function RunListStageItem(props) {
  const stageStatus = useStageStatus(
    props.runData,
    props.stageNum,
    props.activeUser
  );

  return (
    <ul>
      <li>
        <h3>{props.runData.productInfo.productName}</h3>
      </li>
      <li>
        {stageStatus.completionFraction} {stageStatus.completionPercentage}%
      </li>
    </ul>
  );
}

export default RunListStageItem;
