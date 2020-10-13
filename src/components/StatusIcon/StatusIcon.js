import React from "react";

import styles from "./StatusIcon.module.css";

import {ReactComponent as Checkmark} from "./checkmark.svg";
import {ReactComponent as Pause} from "./pause.svg";
import {ReactComponent as ArrowRight} from "./arrow-right.svg";

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
        className={`${styles.container} ${
          styles["container--" + props.stageStatusName]
        }`}
      >
        <span className={styles.inner}>{innerContent()}</span>
      </span>
    </span>
  );
}

export default StatusIcon;
