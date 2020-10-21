import React from "react";

import StatusIcon from "../StatusIcon/StatusIcon.js";

import useStageStatus from "../../hooks/useStageStatus.js";

import styles from "./StageStatus.module.css";

function StageStatus(props) {
  const stageStatus = useStageStatus(props.runData, props.stageNum);

  const capsLabel =
    stageStatus.stageStatusName.charAt(0).toUpperCase() +
    stageStatus.stageStatusName.slice(1);

  return (
    <>
      {props.button ? (
        <button
          onClick={props.onClick}
          className={`${styles.button} ${
            stageStatus.stageIsActive ? styles.buttonStageActive : ""
          }`}
        >
          <StatusIcon
            stageStatusName={stageStatus.stageStatusName}
            stageSessionCount={stageStatus.workTotal}
          />
          {props.label ? (
            <span className={styles.label}>{capsLabel + " "}</span>
          ) : (
            <></>
          )}
        </button>
      ) : (
        <>
          <StatusIcon
            stageStatusName={stageStatus.stageStatusName}
            stageSessionCount={stageStatus.workTotal}
          />{" "}
          {props.label ? capsLabel + " " : <></>}
        </>
      )}
    </>
  );
}

export default StageStatus;
