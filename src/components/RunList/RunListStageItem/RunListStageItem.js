import React from "react";

import useStageStatus from "../../../hooks/useStageStatus.js";

import InfoPod from "../../InfoPod/InfoPod.js";
import InfoPodSection from "../../InfoPod/InfoPodSection/InfoPodSection.js";
import StatusPodItem from "../../StatusPodItem/StatusPodItem.js";
import Button from "../../Button/Button.js";
import RunTitle from "../RunTitle/RunTitle.js";

import styles from "./RunListStageItem.module.css";

function RunListStageItem(props) {
  const stageStatus = useStageStatus(
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
        <RunTitle runData={props.runData}>
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
              flags={[
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
        <span className={styles.cellLabel}>Issues</span>
        <span className={styles.cellContent}>
          {highestFlag(stageStatus) ? (
            <InfoPod>
              <InfoPodSection
                flags={flagFlags(stageStatus, highestFlag(stageStatus))}
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
            onClick={() => openEditor(props.runData.runId, props.stageNum)}
            icon="start"
          ></Button>
        </span>
      </li>
    </ul>
  );
}

export default RunListStageItem;
