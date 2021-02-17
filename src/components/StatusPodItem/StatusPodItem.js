import React from "react";
import PropTypes from "prop-types";

import InfoPodItem from "../InfoPod/InfoPodItem/InfoPodItem.js";

import styles from "./StatusPodItem.module.css";

import { ReactComponent as Checkmark } from "./checkmark.svg";

function StatusPodItem(props) {
  const { statusField, stageStatus, stageNum, ...itemProps } = props;

  const getLabel = function () {
    if (props.stageStatus.blockerActive) {
      return "Blocked";
    } else {
      if (props.stageStatus.workActive) {
        return props.stageStatus.workActiveNames;
      } else {
        return (
          props.stageStatus.stageStatusName.charAt(0).toUpperCase() +
          props.stageStatus.stageStatusName.slice(1)
        );
      }
    }
  };

  const combinedCompletion = function () {
    if (props.stageStatus.stageStatusName === "complete") {
      return <Checkmark className={styles.icon} />;
    } else {
      if (
        props.stageStatus.stageStatusName !== "pending" ||
        props.stageStatus.workTotal > 0 ||
        props.stageStatus.completionPercentage > 0
      ) {
        if (props.stageNum === 0 || props.stageNum === 4) {
          return props.stageStatus.workTotal;
        } else {
          return props.stageStatus.completionPercentage + "%";
        }
      }
    }

    return "";
  };

  const findElem = function () {
    switch (props.statusField) {
      case "label":
        return (
          <InfoPodItem
            {...itemProps}
            active
            className={`${
              styles["podItem" + props.stageStatus.stageStatusName]
            }`}
            icon="settings"
            name="Status"
            value={getLabel()}
            priority="value"
          >
            {/* {getLabel()} */}
          </InfoPodItem>
        );
      case "completion":
        return (
          <InfoPodItem
            {...itemProps}
            active
            className={`${
              styles["podItem" + props.stageStatus.stageStatusName]
            }`}
            icon="settings"
            name="Progress"
            value={combinedCompletion()}
            priority="value"
          >
            {/* {combinedCompletion()} */}
          </InfoPodItem>
        );
      case "completionFraction":
        if (
          (props.stageStatus.stageStatusName === "ready" ||
            props.stageStatus.stageStatusName === "started" ||
            props.stageStatus.stageStatusName === "working") &&
          props.stageNum !== 0 &&
          props.stageNum !== 4
        ) {
          return (
            <InfoPodItem
              {...itemProps}
              active
              className={`${
                styles["podItem" + props.stageStatus.stageStatusName]
              }`}
              icon="settings"
              name="Progress"
              value={
                props.stageStatus.itemCount +
                "/" +
                props.stageStatus.targetItemCount
              }
              priority="value"
            >
              {/* {props.stageStatus.itemCount +
                "/" +
                props.stageStatus.targetItemCount} */}
            </InfoPodItem>
          );
        }
        return null;
      case "user":
        if (props.stageStatus.userTotal || props.type === "bubble") {
          return (
            <InfoPodItem
              {...itemProps}
              active={props.stageStatus.userTotal}
              className={`${
                props.stageStatus.userActive ? styles.podItemworking : ""
              } ${
                props.stageStatus.stageStatusName === "complete"
                  ? styles.podItemcomplete
                  : ""
              }`}
              icon="user"
              name="Your Sessions"
              value={props.stageStatus.userTotal}
              priority="icon"
            >
              {/* <Icon
                name="user"
                className={`${styles.icon} ${styles.iconUser}`}
              ></Icon> */}
            </InfoPodItem>
          );
        }
        return null;
      case "qa":
        if (props.stageStatus.qaActive || props.type === "bubble") {
          return (
            <InfoPodItem
              {...itemProps}
              active={props.stageStatus.qaActive}
              className={styles.flagQa}
              icon="qa"
              name="QA Requests"
              value={props.stageStatus.qaActive}
              priority="icon"
            >
              {/* <Icon name="qa" className={styles.icon}></Icon> */}
            </InfoPodItem>
          );
        }
        return null;
      case "note":
        if (props.stageStatus.noteActive || props.type === "bubble") {
          return (
            <InfoPodItem
              {...itemProps}
              active={props.stageStatus.noteActive}
              className={styles.flagNote}
              icon="details"
              name="Notes"
              value={props.stageStatus.noteActive}
              priority="icon"
            >
              {/* <Icon name="details" className={styles.icon}></Icon> */}
            </InfoPodItem>
          );
        }
        return null;
      case "issue":
        if (props.stageStatus.issueActive || props.type === "bubble") {
          return (
            <InfoPodItem
              {...itemProps}
              active={props.stageStatus.issueActive}
              className={styles.flagIssue}
              icon="issue"
              name="Issues"
              value={props.stageStatus.issueActive}
              priority="icon"
            >
              {/* <Icon name="issue" className={styles.icon}></Icon> */}
            </InfoPodItem>
          );
        }
        return null;
      case "blocker":
        if (props.stageStatus.blockerActive || props.type === "bubble") {
          return (
            <InfoPodItem
              {...itemProps}
              active={props.stageStatus.blockerActive}
              className={styles.flagBlocker}
              icon="blocker"
              name="Blockers"
              value={props.stageStatus.blockerActive}
              priority="icon"
            >
              {/* <Icon name="blocker" className={styles.icon}></Icon> */}
            </InfoPodItem>
          );
        }
        return null;
      default:
        return null;
    }
  };

  return <>{findElem()}</>;
}

StatusPodItem.propTypes = {
  stageStatus: PropTypes.object.isRequired,
  stageNum: PropTypes.number,
  statusField: PropTypes.oneOf([
    "label",
    "completion",
    "completionFraction",
    "user",
    "qa",
    "note",
    "issue",
    "blocker",
  ]),
};

export default StatusPodItem;
