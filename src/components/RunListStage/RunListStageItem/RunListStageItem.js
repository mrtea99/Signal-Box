import React from "react";

import useStageStatus from "../../../hooks/useStageStatus.js";

import styles from "./RunListStageItem.module.css";

function RunListStageItem(props) {
  const stageStatus = useStageStatus(
    props.runData,
    props.stageNum,
    props.activeUser
  );

  return (
    <ul className={styles.line}>
      <li className={styles.lineItem}>
        <h3 className={styles.itemTitle}>{props.runData.productInfo.productName}</h3>
      </li>
      <li className={styles.lineItem}>
        {stageStatus.completionFraction} {stageStatus.completionPercentage}%
      </li>
    </ul>
  );
}

export default RunListStageItem;
