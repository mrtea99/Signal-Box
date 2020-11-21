import React from "react";

import StageNav from "../../StageNav/StageNav";
import RunTitle from "../RunTitle/RunTitle.js";

import styles from "./RunListAllItem.module.css";

function RunListAllItem(props) {
  const run = props.runData;

  const openEditor = function (runUid, stageNum) {
    props.setCurrentRunUid(runUid);
    props.setActiveStage(stageNum);
  };

  return (
    <div>
      <header
        // onClick={() => setModalOverviewActive(run.uid)}
        className={styles.itemHeader}
      >
        <RunTitle runData={props.runData}>{run.productInfo.productName}</RunTitle>
      </header>

      <StageNav
        stageNameArr={props.stageNameArr}
        currentRunUid={props.currentRunUid}
        activeStage={props.activeStage}
        buttonCallback={(newIndex) => openEditor(run.uid, newIndex)}
        updateRunData={props.updateRunData}
        thisRunData={run}
        activeUser={props.activeUser}
        sessionLabels
        syntax="list"
      ></StageNav>
    </div>
  );
}

export default RunListAllItem;
