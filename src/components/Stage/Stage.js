import React from "react";

import SessionControl from "../SessionControl/SessionControl.js";
import SessionList from "../SessionList/SessionList.js";
import StageStatus from "../StageStatus/StageStatus.js";

import styles from "./Stage.module.css";

function Stage(props) {
  const stageData = props.thisRunData["stages"][props.thisStage];
  const sessionList = stageData["sessions"];

  // const [stageComplete, setStageComplete] = React.useState(stageData.complete);
  const stageComplete = stageData.complete;

  const [activeSessionData, setActiveSessionData] = React.useState(() =>
    findActiveSession()
  );

  function updateStageCompletion(newState) {
    let newStageObj = { ...stageData };

    newStageObj.complete = newState;

    props.updateRunData(
      props.currentRunUid,
      "stages",
      props.thisStage,
      newStageObj
    );
  }

  function findActiveSession() {
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

  function addSession(sessionData, newSessionUid) {
    let newStageObj = { ...stageData };
    let newSessionList = [...sessionList];

    newSessionList.push(sessionData);
    newStageObj["sessions"] = newSessionList;

    props.updateRunData(
      props.currentRunUid,
      "stages",
      props.thisStage,
      newStageObj
    );

    setActiveSessionData(sessionData);
  }

  function updateSession(extraData) {
    let newStageObj = { ...stageData };
    let newSessionList = [...sessionList];

    const activeSessionObj = newSessionList.find(
      (obj) => obj.sessionUid === activeSessionData.sessionUid
    );

    Object.assign(activeSessionObj, extraData);

    newStageObj["sessions"] = newSessionList;

    props.updateRunData(
      props.currentRunUid,
      "stages",
      props.thisStage,
      newStageObj
    );
  }

  function endSession(extraData) {
    const endTime = { endTime: Date.now() };

    if (extraData) {
      Object.assign(extraData, endTime);
      updateSession(extraData);
    } else {
      updateSession(endTime);
    }

    setActiveSessionData(null);
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
          stageComplete={stageComplete}
          updateStageCompletion={updateStageCompletion}
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
