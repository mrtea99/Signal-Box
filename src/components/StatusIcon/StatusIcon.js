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
      return props.stageSessionCount;
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

  return (
    <span className={styles.wrapper}>
      <span
        className={`${styles.core} ${styles["core--" + props.stageStatusName]}`}
      >
        <span className={styles.inner}>{innerContent()}</span>
      </span>
      <span className={styles.flags}>
        <span
          className={`${styles.core} ${styles.flag} ${styles.flagIssue} ${styles.flagActive}`}
        >
          <span className={styles.inner}>1</span>
        </span>
        <span className={`${styles.core} ${styles.flag} ${styles.flagQa}`}>
          <span className={styles.inner}>2</span>
        </span>
        <span className={`${styles.core} ${styles.flag} ${styles.flagUser}`}>
          <span className={styles.inner}>3</span>
        </span>
      </span>
    </span>
  );
}

export default StatusIcon;
