import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Stage from "./Stage/Stage.js";
import StageNav from "../StageNav/StageNav.js";
import RunInfo from "../RunInfo/RunInfo.js";
import StageOverview from "../StageOverview/StageOverview.js";
import Modal from "../Modal/Modal.js";
import Button from "../Button/Button.js";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer.js";
// import UserSwitcher from "../UserSwitcher/UserSwitcher.js";
// import TableHeader from "../TableHeader/TableHeader.js";

import styles from "./RunEditor.module.css";

import stageNames from "../../data/stageNames.json";

import ViewModeContext from "../../contexts/ViewModeContext.js";

function RunEditor(props) {
  const viewMode = React.useContext(ViewModeContext);
  const simpleMode = viewMode === "simple";

  const [modalOverviewActive, setModalOverviewActive] = React.useState(false);

  const runsList = useSelector((state) => state.runs.runsList);
  const thisRunData = runsList.find((obj) => obj.id === props.currentRunUid);

  const handleExitClick = function (e) {
    e.preventDefault();

    props.setCurrentRunUid(null);
    props.setActiveStage(0);
  };

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
              {/* {simpleMode ? null : <UserSwitcher />} */}
            </header>
            <div>
              <section className={styles.runInfo}>
                <div className={`${styles.runInfoSec} ${styles.runInfoProd}`}>
                  <h2 className={styles.runInfoTitle}>Production Run of:</h2>
                  <h3 className={styles.runInfoName}>
                    {thisRunData.productInfo.productName}
                  </h3>
                  {simpleMode ? null : (
                    <h4 className={styles.runInfoItem}>
                      Run ID: {thisRunData.id}
                    </h4>
                  )}
                </div>
                {simpleMode ? null : (
                  <div className={`${styles.runInfoSec} ${styles.runInfoRun}`}>
                    <div className={styles.infoBox}>
                      <h4 className={styles.runInfoItem}>
                        Status: {thisRunData.status}
                      </h4>
                      <h4 className={styles.runInfoItem}>
                        Batches: {thisRunData.batchQuantity}
                      </h4>
                    </div>
                    <ButtonSpacer>
                      <RunInfo
                        currentRunUid={props.currentRunUid}
                        thisRunData={thisRunData}
                      />

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
                        <StageOverview
                          thisRunData={thisRunData}
                          currentRunUid={props.currentRunUid}
                        ></StageOverview>
                      </Modal>
                    ) : null}
                  </div>
                )}
              </section>

              {/* <TableHeader
                items={stageNames.map((stageName) => ({
                  copy: stageName,
                }))}
              /> */}

              <StageNav
                currentRunUid={props.currentRunUid}
                activeStage={props.activeStage}
                buttonCallback={props.setActiveStage}
                thisRunData={thisRunData}
                stageLabels
                showActive
                hideStatus={simpleMode}
              />

              <Stage
                key={props.currentRunUid + stageNames[props.activeStage]}
                thisStage={props.activeStage}
                stageName={stageNames[props.activeStage]}
                thisRunData={thisRunData}
                currentRunUid={props.currentRunUid}
                setCurrentRunUid={props.setCurrentRunUid}
                setActiveStage={props.setActiveStage}
              />
            </div>
            {/* <pre>{JSON.stringify(thisRunData)}</pre> */}
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

RunEditor.propTypes = {
  currentRunUid: PropTypes.number,
  setCurrentRunUid: PropTypes.func.isRequired,
  setActiveStage: PropTypes.func.isRequired,
  activeStage: PropTypes.number.isRequired,
};

export default RunEditor;
