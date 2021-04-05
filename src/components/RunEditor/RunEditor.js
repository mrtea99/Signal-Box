import React from "react";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

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

import { selectRun } from "../RunList/runsSlice.js";

// import stageNames from "../../data/stageNames.json";

import ViewModeContext from "../../contexts/ViewModeContext.js";

function RunEditor(props) {
  let { runId, stageNum } = useParams();
  runId = parseInt(runId);
  stageNum = parseInt(stageNum);

  const viewMode = React.useContext(ViewModeContext);
  const simpleMode = viewMode === "simple";

  const [modalOverviewActive, setModalOverviewActive] = React.useState(false);

  const thisRunData = useSelector((state) => selectRun(state, runId));

  let history = useHistory();
  const handleExitClick = function () {
    history.push("/");
  };

  const changeStage = function (runId, newIndex) {
    history.push(`/run/${runId}/${newIndex}`);
  };

  return (
    <>
      {thisRunData ? (
        <div className={`${styles.runEditor} ${styles.runEditorActive}`}>
          <div className={styles.inner}>
            <header className={styles.controlBar}>
              <Button onClick={() => handleExitClick()} icon="cross" iconFirst>
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
                      <RunInfo currentRunId={runId} thisRunData={thisRunData} />

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
                        <StageOverview currentRunId={runId}></StageOverview>
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
                currentRunId={runId}
                activeStage={stageNum}
                buttonCallback={(newIndex) => changeStage(runId, newIndex)}
                stageLabels
                showActive
                hideStatus={simpleMode}
              />

              <Stage
                key={runId + stageNum}
                currentRunId={runId}
                thisStage={stageNum}
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

// RunEditor.propTypes = {};

export default RunEditor;
