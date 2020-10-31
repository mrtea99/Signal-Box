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

  const getLabel = function () {
    if (stageStatus.workActive) {
      return stageStatus.workActiveNames;
    } else {
      return (
        stageStatus.stageStatusName.charAt(0).toUpperCase() +
        stageStatus.stageStatusName.slice(1)
      );
    }
  };

  return (
    <>
      {props.button ? (
        <button
          onClick={props.onClick}
          className={`${styles.button} ${
            stageStatus.stageStatusName !== "complete" &&
            stageStatus.stageStatusName !== "pending"
              ? styles.buttonStageActive
              : ""
          }`}
        >
          {props.label ? (
            <span className={styles.label}>{getLabel() + " "}</span>
          ) : (
            <></>
          )}
          <StatusIcon {...stageStatus} stageNum={props.stageNum} />
        </button>
      ) : (
        <>
          <StatusIcon {...stageStatus} stageNum={props.stageNum} />{" "}
          {props.label ? getLabel() + " " : <></>}{" "}
          {/* {stageStatus.completion ? <>({stageStatus.completion})</> : ""} */}
        </>
      )}
    </>
  );
}

export default StageStatus;
