import React from "react";

import Button from "../../Button/Button.js";
import StageOverview from "../../StageOverview/StageOverview.js";
import Modal from "../../Modal/Modal.js";
import StageNav from "../../StageNav/StageNav";

import styles from "./RunListAllItem.module.css";

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
        className={`${styles.itemInfo} ${styles.runItem} ${styles.alignLeft}`}
        onClick={() => setModalOverviewActive(run.uid)}
      >
        <h3 className={styles.itemTitle}>{run.productInfo.productName}</h3>
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
