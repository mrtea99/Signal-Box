import React from "react";

import StageControl from "../StageControl/StageControl.js";
import StageOverview from "../StageOverview/StageOverview.js";
import Modal from "../Modal/Modal.js";
import Button from "../Button/Button.js";
// import FormItem from "../FormItem/FormItem.js";

import styles from "./RunEditor.module.css";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer.js";

function RunEditor(props) {
  const [modalOverviewActive, setModalOverviewActive] = React.useState(false);

  const thisRunData = props.runData.find(
    (obj) => obj.uid === props.currentRunUid
  );

  // const handleChange = function (dataSection, dataKey, e) {
  //   props.updateRunData(
  //     props.currentRunUid,
  //     dataSection,
  //     dataKey,
  //     e.target.value
  //   );
  // };

  const handleEditInfoClick = function (e) {
    e.preventDefault();

    props.setModalActive(true);
  };

  const handleExitClick = function (e) {
    e.preventDefault();

    props.setCurrentRunUid(null);
    props.setActiveStage(0);
  };

  return (
    <>
      {thisRunData ? (
        <div className={`${styles.runEditor} ${styles.runEditorActive}`}>
          <header>
            <Button onClick={(e) => handleExitClick(e)}>Exit</Button>
          </header>
          <div>
            <section className={styles.runInfo}>
              <div className={`${styles.runInfoSec} ${styles.runInfoProd}`}>
                <h2 className={styles.runInfoTitle}>Production Run of:</h2>
                <h3 className={styles.runInfoName}>
                  {thisRunData.productInfo.productName}
                </h3>
                <h4 className={styles.runInfoId}>
                  Run ID:{thisRunData.runInfo.runId}
                </h4>
              </div>
              <div className={`${styles.runInfoSec}, ${styles.runInfoRun}`}>
                <h4 className={styles.runInfoQuantity}>
                  Batch Quantity: {thisRunData.productInfo.batchQuantity}
                </h4>
                <ButtonSpacer>
                  <Button onClick={handleEditInfoClick}>Info</Button>
                  <Button onClick={() => setModalOverviewActive(true)}>
                    Status
                  </Button>
                </ButtonSpacer>
                {modalOverviewActive ? (
                  <Modal>
                    <Button onClick={() => setModalOverviewActive(false)}>
                      Close
                    </Button>
                    <StageOverview thisRunData={thisRunData}></StageOverview>
                  </Modal>
                ) : (
                  <></>
                )}
              </div>
            </section>

            <StageControl
              thisRunData={thisRunData}
              runData={props.runData}
              currentRunUid={props.currentRunUid}
              updateRunData={props.updateRunData}
              activeStage={props.activeStage}
              setActiveStage={props.setActiveStage}
              activeUser={props.activeUser}
              setCurrentRunUid={props.setCurrentRunUid}
            />
          </div>
          <pre>{JSON.stringify(thisRunData)}</pre>
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
