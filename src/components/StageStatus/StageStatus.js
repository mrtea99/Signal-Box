import React from "react";

import StatusIcon from "../StatusIcon/StatusIcon.js";

import useStageStatus from "../../hooks/useStageStatus.js";

import styles from "./StageStatus.module.css";

function StageStatus(props) {
  const stageStatus = useStageStatus(
    props.runData,
    props.stageNum,
    props.activeUser
  );

  return (
    <>
      {props.button ? (
        <button
          onClick={props.onClick}
          // className={`${styles.button} ${
          //   stageStatus.stageStatusName !== "complete" &&
          //   stageStatus.stageStatusName !== "pending"
          //     ? styles.buttonStageActive
          //     : ""
          // }`}
          className={styles.button}
        >
          <StatusIcon
            {...stageStatus}
            stageNum={props.stageNum}
            label={props.label || false}
          />
        </button>
      ) : (
        <StatusIcon
          {...stageStatus}
          stageNum={props.stageNum}
          label={props.label || false}
        />
      )}
    </>
  );
}

export default StageStatus;
