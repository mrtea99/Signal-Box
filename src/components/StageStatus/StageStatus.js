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

  const Status = () => {
    return (
      <StatusIcon
        {...stageStatus}
        stageNum={props.stageNum}
        label={props.label || false}
      />
    );
  };

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
          <Status />
        </button>
      ) : (
        <Status />
      )}
    </>
  );
}

export default StageStatus;
