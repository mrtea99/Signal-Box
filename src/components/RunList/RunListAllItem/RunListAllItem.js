import React from "react";

import Button from "../../Button/Button.js";
import StageOverview from "../../StageOverview/StageOverview.js";
import Modal from "../../Modal/Modal.js";
import StageNav from "../../StageNav/StageNav";

import styles from "./RunListAllItem.module.css";
import RunTitle from "../RunTitle/RunTitle.js";

function RunListAllItem(props) {
  const [modalOverviewActive, setModalOverviewActive] = React.useState(false);

  const run = props.runData;

  const openEditor = function (runUid, stageNum) {
    props.setCurrentRunUid(runUid);
    props.setActiveStage(stageNum);
  };

  return (
    <div>
      <header
        onClick={() => setModalOverviewActive(run.uid)}
      >
        <RunTitle>{run.productInfo.productName}</RunTitle>
      </header>

      {modalOverviewActive === run.uid ? (
        <Modal>
          <Button onClick={() => setModalOverviewActive(null)}>Close</Button>
          <StageOverview thisRunData={run}></StageOverview>
        </Modal>
      ) : (
        <></>
      )}

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
