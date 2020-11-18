import React from "react";

import useStageStatus from "../../../hooks/useStageStatus.js";

import InfoPod from "../../InfoPod/InfoPod.js";
import InfoPodSection from "../../InfoPod/InfoPodSection/InfoPodSection.js";
import InfoPodItem from "../../InfoPod/InfoPodItem/InfoPodItem.js";
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

  return (
    <ul className={styles.line}>
      <li className={styles.lineItem}>
        <RunTitle>{props.runData.productInfo.productName}</RunTitle>
      </li>
      <li className={styles.lineItem}>
        <InfoPod>
          <InfoPodSection
            flags={
              <InfoPodItem type="flag" active>
                {stageStatus.completionPercentage}%
              </InfoPodItem>
            }
          >
            <InfoPodItem>{stageStatus.completionFraction}</InfoPodItem>
          </InfoPodSection>
        </InfoPod>
      </li>
      <li className={styles.lineItem}>
        {stageStatus.userTotal ? (
          <InfoPod>
            <InfoPodSection>
              <InfoPodItem>U</InfoPodItem>
            </InfoPodSection>
          </InfoPod>
        ) : null}
      </li>
      <li className={styles.lineItem}>
        {stageStatus.qaActive ? (
          <InfoPod>
            <InfoPodSection>
              <InfoPodItem>?</InfoPodItem>
            </InfoPodSection>
          </InfoPod>
        ) : null}
      </li>
      <li className={styles.lineItem}>
        {stageStatus.issueActive ? (
          <InfoPod>
            <InfoPodSection>
              <InfoPodItem>!</InfoPodItem>
            </InfoPodSection>
          </InfoPod>
        ) : null}
      </li>
      <li className={styles.lineItem}>
        <Button
          onClick={() => (
            openEditor(props.runData.uid, props.stageNum)
          )}
          icon="start"
        ></Button>
      </li>
    </ul>
  );
}

export default RunListStageItem;
