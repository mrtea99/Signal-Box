import React from "react";

import InfoPod from "../InfoPod/InfoPod.js";
import InfoPodSection from "../InfoPod/InfoPodSection/InfoPodSection.js";
import InfoPodItem from "../InfoPod/InfoPodItem/InfoPodItem.js";

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
    <InfoPod>
      {props.label ? (
        <InfoPodSection>
          <InfoPodItem
            type="label"
            className={`${styles["podItem" + props.stageStatusName]}`}
            stageStatusName={props.stageStatusName}
          >
            {getLabel()}
          </InfoPodItem>
        </InfoPodSection>
      ) : null}
      <InfoPodSection
        flags={[
          <InfoPodItem
            type="flag"
            key="issue"
            active={props.issueActive}
            className={styles.flagIssue}
          >
            !
          </InfoPodItem>,
          <InfoPodItem
            type="flag"
            key="qa"
            active={props.qaActive}
            className={styles.flagQa}
          >
            ?
          </InfoPodItem>,
          <InfoPodItem
            type="flag"
            key="user"
            active={props.userTotal}
            className={`${props.userActive ? styles.podItemworking : ""} ${
              props.stageStatusName === "complete" ? styles.podItemcomplete : ""
            }`}
          >
            U
          </InfoPodItem>,
        ]}
      >
        <InfoPodItem
          type="core"
          className={`${styles["podItem" + props.stageStatusName]}`}
        >
          {innerContent()}
        </InfoPodItem>
      </InfoPodSection>
    </InfoPod>
  );
}

export default StatusIcon;
