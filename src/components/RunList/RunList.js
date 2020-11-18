import React from "react";
import styles from "./RunList.module.css";

import Button from "../Button/Button.js";
import StageOverview from "../StageOverview/StageOverview.js";
import Modal from "../Modal/Modal.js";
import StageNav from "../StageNav/StageNav";

function RunList(props) {
  const [modalOverviewActive, setModalOverviewActive] = React.useState(false);

  const stageNameArr = ["Prep", "Craft", "Package", "Label", "Stock"];

  const openEditor = function (runUid, stageNum) {
    props.setCurrentRunUid(runUid);
    props.setActiveStage(stageNum);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ul className={styles.headerList}>
          <li className={styles.headerItem}>Prep</li>
          <li className={styles.headerItem}>Craft</li>
          <li className={styles.headerItem}>Package</li>
          <li className={styles.headerItem}>Label</li>
          <li className={styles.headerItem}>Stock</li>
        </ul>
      </div>
      <div>
        {props.runData.length ? (
          props.runData.map((run, index) => (
            <React.Fragment key={run.uid}>
              <div key={run.uid + "_info"}>
                <div
                  className={`${styles.itemInfo} ${styles.runItem} ${styles.alignLeft}`}
                  onClick={() => setModalOverviewActive(run.uid)}
                >
                  <h3 className={styles.itemTitle}>
                    {run.productInfo.productName}
                  </h3>
                </div>
                {modalOverviewActive === run.uid ? (
                  <Modal>
                    <Button onClick={() => setModalOverviewActive(null)}>
                      Close
                    </Button>
                    <StageOverview thisRunData={run}></StageOverview>
                  </Modal>
                ) : (
                  <></>
                )}
              </div>

              <StageNav
                stageNameArr={stageNameArr}
                currentRunUid={props.currentRunUid}
                activeStage={props.activeStage}
                buttonCallback={(newIndex) => openEditor(run.uid, newIndex)}
                updateRunData={props.updateRunData}
                thisRunData={run}
                activeUser={props.activeUser}
                sessionLabels
                syntax="list"
              ></StageNav>
            </React.Fragment>
          ))
        ) : (
          <h3>No Runs Available</h3>
        )}
      </div>
    </div>
  );
}

export default RunList;
