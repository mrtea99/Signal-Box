import React from "react";

import styles from "./StatusIcon.module.css";

import { ReactComponent as Checkmark } from "./checkmark.svg";
import { ReactComponent as Pause } from "./pause.svg";
import { ReactComponent as ArrowRight } from "./arrow-right.svg";

function StatusIcon(props) {
  const innerContent = function () {
    if (
      props.stageStatusName === "ready" ||
      props.stageStatusName === "started" ||
      props.stageStatusName === "working"
    ) {
      if (props.stageNum === 0 || props.stageNum === 4) {
        return props.workTotal;
      } else {
        return props.completionPercentage + "%";
        // return props.completion;
      }
    }

    if (props.stageStatusName === "complete") {
      return <Checkmark className={styles.icon} />;
    }

    if (props.stageStatusName === "paused") {
      return <Pause className={styles.icon} />;
    }

    if (props.stageStatusName === "skipped") {
      return <ArrowRight className={styles.icon} />;
    }

    return "";
  };

  const getLabel = function () {
    if (props.workActive) {
      return props.workActiveNames;
    } else {
      return (
        props.stageStatusName.charAt(0).toUpperCase() +
        props.stageStatusName.slice(1)
      );
    }
  };

  return (
    <span className={styles.module}>
      {props.label ? (
        <span className={styles.wrapper}>
          <span
            className={`${styles.core} ${styles.coreLabel} ${
              styles["core--" + props.stageStatusName]
            }`}
          >
            <span className={styles.inner}>{getLabel()}</span>
          </span>
        </span>
      ) : (
        <></>
      )}
      <span className={styles.wrapper}>
        <span
          className={`${styles.core} ${
            styles["core--" + props.stageStatusName]
          }`}
        >
          <span className={styles.inner}>{innerContent()}</span>
        </span>
        <span className={styles.flags}>
          <span
            className={`${styles.core} ${styles.flag} ${styles.flagIssue} ${
              props.issueActive ? styles.flagActive : ""
            }`}
          >
            <span className={styles.inner}>!</span>
          </span>
          <span
            className={`${styles.core} ${styles.flag} ${styles.flagQa} ${
              props.qaActive ? styles.flagActive : ""
            }`}
          >
            <span className={styles.inner}>?</span>
          </span>
          <span
            className={`${styles.core} ${styles.flag} ${
              props.userTotal ? styles.flagActive : ""
            } ${props.userActive ? styles.flagUserWorking : ""} ${
              props.stageStatusName === "complete"
                ? styles.flagUserComplete
                : ""
            }`}
          >
            <span className={styles.inner}>U</span>
          </span>
        </span>
      </span>
    </span>
  );
}

export default StatusIcon;
