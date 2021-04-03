import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import getStageStatus from "../../../utils/getStageStatus.js";

import InfoPod from "../../InfoPod/InfoPod.js";
import InfoPodSection from "../../InfoPod/InfoPodSection/InfoPodSection.js";
import StatusPodItem from "../../StageStatus/StatusPodItem/StatusPodItem.js";
import Button from "../../Button/Button.js";
import RunTitle from "../RunTitle/RunTitle.js";

import styles from "./RunListStageItem.module.css";
import { selectRun } from "../runsSlice.js";
import { selectStageSessions } from "../../SessionList/sessionsSlice.js";

function RunListStageItem(props) {
  const activeUser = useSelector((state) => state.users.currentUser);

  const thisRunData = useSelector((state) =>
    selectRun(state, props.currentRunId)
  );
  const thisStageSessions = useSelector((state) =>
    selectStageSessions(state, props.currentRunId, props.stageNum)
  );

  const stageStatus = getStageStatus(
    thisRunData,
    thisStageSessions,
    props.stageNum,
    activeUser
  );

  const openEditor = function (runUid, stageNum) {
    props.setCurrentRunId(runUid);
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
        <RunTitle currentRunId={props.currentRunId}>
          {thisRunData.productInfo.productName}
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
            {stageStatus.userTotal ? (
              <InfoPodSection
                layout="vert"
                bubbles={
                  stageStatus.assignActive
                    ? [
                        <StatusPodItem
                          key="assign"
                          statusField="assign"
                          stageStatus={stageStatus}
                        />,
                      ]
                    : null
                }
              >
                <StatusPodItem statusField="user" stageStatus={stageStatus} />
              </InfoPodSection>
            ) : (
              <StatusPodItem
                key="assign"
                statusField="assign"
                stageStatus={stageStatus}
              />
            )}
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
            onClick={() => openEditor(props.setCurrentRunId, props.stageNum)}
            icon="start"
          ></Button>
        </span>
      </li>
    </ul>
  );
}

RunListStageItem.propTypes = {
  stageNum: PropTypes.number.isRequired,
  setCurrentRunId: PropTypes.func.isRequired,
  setActiveStage: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default RunListStageItem;
