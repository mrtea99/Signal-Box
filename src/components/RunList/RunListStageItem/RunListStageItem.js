import React from "react";
import PropTypes from "prop-types";

import getStageStatus from "../../../utils/getStageStatus.js";

import InfoPod from "../../InfoPod/InfoPod.js";
import InfoPodSection from "../../InfoPod/InfoPodSection/InfoPodSection.js";
import StatusPodItem from "../../StatusPodItem/StatusPodItem.js";
import Button from "../../Button/Button.js";
import RunTitle from "../RunTitle/RunTitle.js";

import styles from "./RunListStageItem.module.css";

function RunListStageItem(props) {
  const stageStatus = getStageStatus(
    props.runData,
    props.stageNum,
    props.activeUser
  );

  const openEditor = function (runUid, stageNum) {
    props.setCurrentRunUid(runUid);
    props.setActiveStage(stageNum);
  };

  const highestFlag = function (stageStatus) {
    if (stageStatus.blockerActive) {
      return "blocker";
    }
    if (stageStatus.issueActive) {
      return "issue";
    }
    if (stageStatus.noteActive) {
      return "note";
    }
    return false;
  };

  const flagFlags = function (stageStatus, highestFlag) {
    let flagArr = [];

    if (stageStatus.noteActive && highestFlag !== "note") {
      flagArr.push(
        <StatusPodItem
          key="note"
          statusField="note"
          stageStatus={stageStatus}
        />
      );
    }
    if (stageStatus.issueActive && highestFlag !== "issue") {
      flagArr.push(
        <StatusPodItem
          key="issue"
          statusField="issue"
          stageStatus={stageStatus}
        />
      );
    }

    return flagArr;
  };

  return (
    <ul className={styles.line}>
      <li
        className={`${styles.lineItem} ${styles.lineItemFull} ${props.columns[0].className}`}
      >
        <RunTitle runData={props.runData} activeUser={props.activeUser}>
          {props.runData.productInfo.productName}
        </RunTitle>
      </li>
      <li className={`${styles.lineItem} ${props.columns[1].className}`}>
        <span className={styles.cellLabel}>Status</span>
        <span className={styles.cellContent}>
          <InfoPod>
            <InfoPodSection>
              <StatusPodItem
                coreStyle="label"
                statusField="label"
                stageStatus={stageStatus}
              />
            </InfoPodSection>
          </InfoPod>
        </span>
      </li>
      <li className={`${styles.lineItem} ${props.columns[2].className}`}>
        <span className={styles.cellLabel}>Progress</span>
        <span className={styles.cellContent}>
          <InfoPod>
            <InfoPodSection
              bubbles={[
                <StatusPodItem
                  key="progress"
                  statusField="completionFraction"
                  stageStatus={stageStatus}
                  stageNum={props.stageNum}
                />,
              ]}
            >
              <StatusPodItem
                key="progress"
                statusField="completion"
                stageStatus={stageStatus}
                stageNum={props.stageNum}
              />
            </InfoPodSection>
          </InfoPod>
        </span>
      </li>
      <li className={`${styles.lineItem} ${props.columns[3].className}`}>
        <span className={styles.cellLabel}>User</span>
        <span className={styles.cellContent}>
          <InfoPod>
            <InfoPodSection>
              <StatusPodItem statusField="user" stageStatus={stageStatus} />
            </InfoPodSection>
          </InfoPod>
        </span>
      </li>
      <li className={`${styles.lineItem} ${props.columns[4].className}`}>
        <span className={styles.cellLabel}>QA</span>
        <span className={styles.cellContent}>
          <InfoPod>
            <InfoPodSection>
              <StatusPodItem statusField="qa" stageStatus={stageStatus} />
            </InfoPodSection>
          </InfoPod>
        </span>
      </li>
      <li className={`${styles.lineItem} ${props.columns[5].className}`}>
        <span className={styles.cellLabel}>Flags</span>
        <span className={styles.cellContent}>
          {highestFlag(stageStatus) ? (
            <InfoPod>
              <InfoPodSection
                bubbles={flagFlags(stageStatus, highestFlag(stageStatus))}
                layout="vert"
              >
                <StatusPodItem
                  statusField={highestFlag(stageStatus)}
                  stageStatus={stageStatus}
                />
              </InfoPodSection>
            </InfoPod>
          ) : null}
        </span>
      </li>
      <li className={`${styles.lineItem} ${props.columns[6].className}`}>
        <span className={styles.cellLabel}>Open</span>
        <span className={styles.cellContent}>
          <Button
            onClick={() => openEditor(props.runData.id, props.stageNum)}
            icon="start"
          ></Button>
        </span>
      </li>
    </ul>
  );
}

RunListStageItem.propTypes = {
  runData: PropTypes.object.isRequired,
  stageNum: PropTypes.number.isRequired,
  activeUser: PropTypes.string.isRequired,
  setCurrentRunUid: PropTypes.func.isRequired,
  setActiveStage: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
};

export default RunListStageItem;
