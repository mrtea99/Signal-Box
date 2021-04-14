import React from "react";
import PropTypes from "prop-types";

import InfoPodItem from "../../InfoPod/InfoPodItem/InfoPodItem.js";
import Icon from "../../Icon/Icon.js";

import styles from "./StatusPodItem.module.css";

import { useTranslation } from "react-i18next";

function StatusPodItem(props) {
  const { t } = useTranslation();

  const { statusField, stageStatus, stageNum, ...itemProps } = props;

  const getLabel = function () {
    if (props.stageStatus.blockerActive) {
      return t("Blocked");
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
      return <Icon name="tick" className={styles.icon} />;
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
            name={t("Status")}
            value={getLabel()}
            priority="value"
          />
        );
      case "completion":
        return (
          <InfoPodItem
            {...itemProps}
            active
            className={`${
              styles["podItem" + props.stageStatus.stageStatusName]
            }`}
            icon="progress"
            name={t("Progress")}
            value={combinedCompletion()}
            priority="value"
          />
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
              icon="progress"
              name={t("Progress")}
              value={
                props.stageStatus.itemCount +
                "/" +
                props.stageStatus.targetItemCount
              }
              priority="value"
            />
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
              name={t("Your Sessions")}
              value={props.stageStatus.userTotal}
              priority="icon"
            />
          );
        }
        return null;
      case "assign":
        if (props.stageStatus.assignActive || props.type === "bubble") {
          return (
            <InfoPodItem
              {...itemProps}
              active={props.stageStatus.assignActive}
              className={
                props.stageStatus.assignUserActive ? styles.flagAssign : ""
              }
              icon="assign"
              name={t("Assignments")}
              value={props.stageStatus.assignActive}
              priority="icon"
            />
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
              name={t("QA Requests")}
              value={props.stageStatus.qaActive}
              priority="icon"
            />
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
              name={t("Notes")}
              value={props.stageStatus.noteActive}
              priority="icon"
            />
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
              name={t("Issues")}
              value={props.stageStatus.issueActive}
              priority="icon"
            />
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
              name={t("Blockers")}
              value={props.stageStatus.blockerActive}
              priority="icon"
            />
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
    "assign",
    "note",
    "issue",
    "blocker",
  ]),
};

export default StatusPodItem;
