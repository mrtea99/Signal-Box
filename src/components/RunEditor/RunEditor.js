import React from "react";

import Stage from "../Stage/Stage.js";
import StageNav from "../StageNav/StageNav.js";
// import TableHeader from "../TableHeader/TableHeader.js";
import StageOverview from "../StageOverview/StageOverview.js";
import Modal from "../Modal/Modal.js";
import Button from "../Button/Button.js";

import styles from "./RunEditor.module.css";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer.js";
import UserSwitcher from "../UserSwitcher/UserSwitcher.js";

function RunEditor(props) {
  const [modalOverviewActive, setModalOverviewActive] = React.useState(false);

  const thisRunData = props.runData.find(
    (obj) => obj.uid === props.currentRunUid
  );

  const handleEditInfoClick = function (e) {
    e.preventDefault();

    props.setModalActive(true);
  };

  const handleExitClick = function (e) {
    e.preventDefault();

    props.setCurrentRunUid(null);
    props.setActiveStage(0);
  };

  const stageNameArr = ["Prep", "Craft", "Package", "Label", "Stock"];

  return (
    <>
      {thisRunData ? (
        <div className={`${styles.runEditor} ${styles.runEditorActive}`}>
          <div className={styles.inner}>
            <header className={styles.controlBar}>
              <Button
                onClick={(e) => handleExitClick(e)}
                icon="cross"
                iconFirst
              >
                Close
              </Button>
              <UserSwitcher
                activeUser={props.activeUser}
                setActiveUser={props.setActiveUser}
              />
            </header>
            <div>
              <section className={styles.runInfo}>
                <div className={`${styles.runInfoSec} ${styles.runInfoProd}`}>
                  <h2 className={styles.runInfoTitle}>Production Run of:</h2>
                  <h3 className={styles.runInfoName}>
                    {thisRunData.productInfo.productName}
                  </h3>
                  <h4 className={styles.runInfoItem}>
                    Run ID: {thisRunData.runInfo.runId}
                  </h4>
                </div>
                <div className={`${styles.runInfoSec} ${styles.runInfoRun}`}>
                  <div className={styles.infoBox}>
                    <h4 className={styles.runInfoItem}>Status: In Progress</h4>
                    <h4 className={styles.runInfoItem}>
                      Batches: {thisRunData.batchQuantity}
                    </h4>
                  </div>
                  <ButtonSpacer>
                    <Button onClick={handleEditInfoClick}>Info</Button>
                    <Button
                      onClick={() => setModalOverviewActive(true)}
                      icon="details"
                    />
                  </ButtonSpacer>
                  {modalOverviewActive ? (
                    <Modal title="Run Overview">
                      <Button onClick={() => setModalOverviewActive(false)}>
                        Close
                      </Button>
                      <StageOverview thisRunData={thisRunData}></StageOverview>
                    </Modal>
                  ) : null}
                </div>
              </section>

              {/* <TableHeader
                items={[
                  { copy: "Prep" },
                  { copy: "Craft" },
                  { copy: "Package" },
                  { copy: "Label" },
                  { copy: "Stock" },
                ]}
              /> */}

              <StageNav
                stageNameArr={stageNameArr}
                currentRunUid={props.currentRunUid}
                activeStage={props.activeStage}
                buttonCallback={props.setActiveStage}
                updateRunData={props.updateRunData}
                thisRunData={thisRunData}
                activeUser={props.activeUser}
                stageLabels
                showActive
              />

              <Stage
                key={props.currentRunUid + stageNameArr[props.activeStage]}
                thisStage={props.activeStage}
                stageName={stageNameArr[props.activeStage]}
                activeStage={props.activeStage}
                thisRunData={thisRunData}
                currentRunUid={props.currentRunUid}
                updateRunData={props.updateRunData}
                activeUser={props.activeUser}
                setCurrentRunUid={props.setCurrentRunUid}
                setActiveStage={props.setActiveStage}
              />
            </div>
            <pre>{JSON.stringify(thisRunData)}</pre>
          </div>
        </div>
      ) : (
        <div className={styles.runEditor}>
          <p>No Run loaded</p>
        </div>
      )}
    </>
  );
}

export default RunEditor;
