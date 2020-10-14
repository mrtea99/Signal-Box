import React from "react";

import StatusIcon from "../StatusIcon/StatusIcon.js";

import useStageStatus from "../../hooks/useStageStatus.js";

import styles from "./StageStatus.module.css";

function StageStatus(props) {
  const [
    stageActive,
    stageStatusName,
    stageStatusIcon,
    stageSessionCount,
  ] = useStageStatus(props.runData, props.stageNum);

  const capsLabel =
    stageStatusName.charAt(0).toUpperCase() + stageStatusName.slice(1);

  return (
    <>
      {props.button ? (
        <button onClick={props.onClick} className={`${styles.button} ${stageActive ? styles.buttonStageActive : ''}`}>
          <StatusIcon
            stageStatusName={stageStatusName}
            stageSessionCount={stageSessionCount}
          />
          {props.label ? <span className={styles.label}>{capsLabel + " "}</span> : <></>}
        </button>
      ) : (
        <>
          <StatusIcon
            stageStatusName={stageStatusName}
            stageSessionCount={stageSessionCount}
          />{" "}
          {props.label ? capsLabel + " " : <></>}
        </>
      )}
    </>
  );
}

export default StageStatus;
