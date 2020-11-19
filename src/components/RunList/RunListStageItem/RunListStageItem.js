import React from "react";

import useStageStatus from "../../../hooks/useStageStatus.js";

import InfoPod from "../../InfoPod/InfoPod.js";
import InfoPodSection from "../../InfoPod/InfoPodSection/InfoPodSection.js";
// import InfoPodItem from "../../InfoPod/InfoPodItem/InfoPodItem.js";
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

  return (
    <ul className={styles.line}>
      <li
        className={`${styles.lineItem} ${styles.lineItemFull} ${props.columns[0].className}`}
      >
        <RunTitle>{props.runData.productInfo.productName}</RunTitle>
      </li>
      <li className={`${styles.lineItem} ${props.columns[1].className}`}>
        <InfoPod>
          <InfoPodSection>
            <StatusPodItem
              type="label"
              statusField="label"
              stageStatus={stageStatus}
            />
          </InfoPodSection>
        </InfoPod>
      </li>
      <li className={`${styles.lineItem} ${props.columns[2].className}`}>
        <InfoPod>
          <InfoPodSection>
            <StatusPodItem
              key="user"
              type="core"
              statusField="completion"
              stageStatus={stageStatus}
              stageNum={props.stageNum}
            />
          </InfoPodSection>
        </InfoPod>
      </li>
      <li className={`${styles.lineItem} ${props.columns[3].className}`}>
        <InfoPod>
          <InfoPodSection>
            <StatusPodItem statusField="user" stageStatus={stageStatus} />
          </InfoPodSection>
        </InfoPod>
      </li>
      <li className={`${styles.lineItem} ${props.columns[4].className}`}>
        <InfoPod>
          <InfoPodSection>
            <StatusPodItem statusField="qa" stageStatus={stageStatus} />
          </InfoPodSection>
        </InfoPod>
      </li>
      <li className={`${styles.lineItem} ${props.columns[5].className}`}>
        <InfoPod>
          <InfoPodSection>
            <StatusPodItem statusField="issue" stageStatus={stageStatus} />
          </InfoPodSection>
        </InfoPod>
      </li>
      <li className={`${styles.lineItem} ${props.columns[6].className}`}>
        <Button
          onClick={() => openEditor(props.runData.uid, props.stageNum)}
          icon="start"
        ></Button>
      </li>
    </ul>
  );
}

export default RunListStageItem;
