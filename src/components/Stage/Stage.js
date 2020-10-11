import React from "react";

import SessionControl from "../SessionControl/SessionControl.js";
import SessionList from "../SessionList/SessionList.js";
import StageStatus from "../StageStatus/StageStatus.js";

import styles from "./Stage.module.css";

function Stage(props) {
  const thisStageData = props.thisRunData["stages"][props.thisStage];

  const stageActive = thisStageData.active;

  const [activeSessionData, setActiveSessionData] = React.useState(() =>
    findActiveSession()
  );

  function findActiveSession() {
    const sessionList = thisStageData["sessions"];

    if (sessionList.length) {
      for (let i = 0; i < sessionList.length; i++) {
        if (
          sessionList[i].user === props.activeUser &&
          sessionList[i].endTime === undefined
        ) {
          return sessionList[i];
        }
      }
    }
    return null;
  }

  function updateStageActive(newState, stage) {
    const stageData = props.thisRunData["stages"][stage];

    let newStageObj = { ...stageData };

    newStageObj.active = newState;

    props.updateRunData(props.currentRunUid, "stages", stage, newStageObj);

    //Update run completion
    let chainInactive = 0;
    for (let i = 0; i < props.thisRunData["stages"].length; i++) {
      if (!props.thisRunData["stages"][i].active) {
        chainInactive = i;
      } else {
        if ((i === 0)) {
          chainInactive = null;
        } else {
          chainInactive = i - 1;
        }
        break;
      }
    }

    props.updateRunData(
      props.currentRunUid,
      null,
      "completion",
      chainInactive
    );
  }

  function addSession(sessionData, newSessionUid, stage) {
    const stageData = props.thisRunData["stages"][stage];
    const sessionList = stageData["sessions"];

    let newStageObj = { ...stageData };
    let newSessionList = [...sessionList];

    newSessionList.push(sessionData);
    newStageObj["sessions"] = newSessionList;

    props.updateRunData(props.currentRunUid, "stages", stage, newStageObj);

    setActiveSessionData(sessionData);
  }

  function updateSession(extraData, stage) {
    const stageData = props.thisRunData["stages"][stage];
    const sessionList = stageData["sessions"];

    let newStageObj = { ...stageData };
    let newSessionList = [...sessionList];

    const activeSessionObj = newSessionList.find(
      (obj) => obj.sessionUid === activeSessionData.sessionUid
    );

    Object.assign(activeSessionObj, extraData);

    newStageObj["sessions"] = newSessionList;

    props.updateRunData(props.currentRunUid, "stages", stage, newStageObj);
  }

  function endSession(extraData, stage) {
    const endTime = { endTime: Date.now() };

    if (extraData) {
      Object.assign(extraData, endTime);
      updateSession(extraData, stage);
    } else {
      updateSession(endTime, stage);
    }

    setActiveSessionData(null);

    updateStageActive(true, stage + 1);
  }

  function getDifficulty() {
    let difficulty = "";

    switch (props.thisStage) {
      case 0:
        difficulty = props.thisRunData.productInfo.prepDiffilculty;
        break;
      case 1:
        difficulty = props.thisRunData.productInfo.manufacturingDifficulty;
        break;
      case 3:
        difficulty = props.thisRunData.productInfo.packagingDiffilculty;
        break;
      case 4:
        difficulty = props.thisRunData.productInfo.labelingDifficulty;
        break;
      default:
        difficulty = "N/A";
    }

    return difficulty;
  }

  return (
    <section
      className={styles.stage}
      style={{
        display: props.thisStage === props.activeStage ? "block" : "none",
      }}
    >
      <header className={styles.stageHeader}>
        <h2 className={styles.stageTitle}>{props.stageName}</h2>
        <h3>
          <StageStatus
            runData={props.thisRunData}
            stageNum={props.thisStage}
            label={true}
          />
        </h3>
        <h4 className={styles.stageDifficulty}>
          Difficulty: {getDifficulty()}
        </h4>
      </header>
      <div className={styles.sessionControl}>
        <SessionControl
          addSession={addSession}
          updateSession={updateSession}
          endSession={endSession}
          thisStage={props.thisStage}
          activeSessionData={activeSessionData}
          activeUser={props.activeUser}
          stageActive={stageActive}
          updateStageActive={updateStageActive}
          thisRunData={props.thisRunData}
        />
      </div>
      <SessionList
        thisStage={props.thisStage}
        thisRunData={props.thisRunData}
      />
    </section>
  );
}

export default Stage;
