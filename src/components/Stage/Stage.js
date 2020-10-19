import React from "react";

import SessionControl from "../SessionControl/SessionControl.js";
import SessionList from "../SessionList/SessionList.js";
import StageStatus from "../StageStatus/StageStatus.js";
import StageActions from "../StageActions/StageActions.js";
import FlagOpener from "../FlagOpener/FlagOpener.js";

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
          sessionList[i].endTime === undefined &&
          sessionList[i].type === "work"
        ) {
          return sessionList[i];
        }
      }
    }
    return null;
  }

  const updateStageActive = function (newState, stage) {
    const stageData = props.thisRunData["stages"][stage];

    let newStageObj = { ...stageData };

    newStageObj.active = newState;

    props.updateRunData(props.currentRunUid, "stages", stage, newStageObj);

    //Add event item to sessionlist
    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      type: "event",
      activity: newState,
      startTime: Date.now(),
      endTime: Date.now(),
      user: props.activeUser,
      notes: newState ? "Activate" : "Deactivate",
    };

    addSession(newSession, newSessionUid, stage);

    //Update run completion
    let chainInactive = 0;
    for (let i = 0; i < props.thisRunData["stages"].length; i++) {
      if (!props.thisRunData["stages"][i].active) {
        chainInactive = i;
      } else {
        if (i === 0) {
          chainInactive = null;
        } else {
          chainInactive = i - 1;
        }
        break;
      }
    }

    props.updateRunData(props.currentRunUid, null, "completion", chainInactive);
  };

  const addSession = function (sessionData, newSessionUid, stage) {
    const stageData = props.thisRunData["stages"][stage];
    const sessionList = stageData["sessions"];

    let newStageObj = { ...stageData };
    let newSessionList = [...sessionList];

    newSessionList.push(sessionData);
    newStageObj["sessions"] = newSessionList;

    props.updateRunData(props.currentRunUid, "stages", stage, newStageObj);

    if (
      sessionData.user === props.activeUser &&
      sessionData.endTime === undefined &&
      sessionData.type === "work"
    ) {
      setActiveSessionData(sessionData);
    }
  };

  const updateSession = function (extraData, stage, sessionUid) {
    const stageData = props.thisRunData["stages"][stage];
    const sessionList = stageData["sessions"];

    let newStageObj = { ...stageData };
    let newSessionList = [...sessionList];

    const activeSessionObj = newSessionList.find(
      (obj) => obj.sessionUid === sessionUid
    );

    Object.assign(activeSessionObj, extraData);

    newStageObj["sessions"] = newSessionList;

    props.updateRunData(props.currentRunUid, "stages", stage, newStageObj);
  };

  const endSession = function (extraData, stage, sessionData) {
    const endTime = { endTime: Date.now() };

    if (extraData) {
      Object.assign(extraData, endTime);
      updateSession(extraData, stage, sessionData.sessionUid);
    } else {
      updateSession(endTime, stage, sessionData.sessionUid);
    }

    if (sessionData.user === props.activeUser) {
      setActiveSessionData(null);
    }
    // updateStageActive(true, stage + 1);
  };

  const getDifficulty = function () {
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
  };

  return (
    <section
      className={styles.stage}
      style={{
        display: props.thisStage === props.activeStage ? "block" : "none",
      }}
    >
      <header className={styles.stageHeader}>
        <div className={styles.stageTitleWrap}>
          <h2 className={styles.stageTitle}>{props.stageName}:</h2>
          <h3 className={styles.stageStatus}>
            <StageStatus
              runData={props.thisRunData}
              stageNum={props.thisStage}
              label={true}
            />
          </h3>
        </div>
        <h4 className={styles.stageDifficulty}>
          Difficulty: {getDifficulty()}
        </h4>
      </header>
      <div className={styles.sessionControl}>
        <StageActions
          updateStageActive={updateStageActive}
          thisRunData={props.thisRunData}
          thisStage={props.thisStage}
        />
        <SessionControl
          addSession={addSession}
          updateSession={updateSession}
          endSession={endSession}
          thisStage={props.thisStage}
          activeSessionData={activeSessionData}
          activeUser={props.activeUser}
          stageActive={stageActive}
          thisRunData={props.thisRunData}
        />
        <FlagOpener
          flagType="issue"
          addSession={addSession}
          thisStage={props.thisStage}
          activeUser={props.activeUser}
        />
        <FlagOpener
          flagType="qa"
          addSession={addSession}
          thisStage={props.thisStage}
          activeUser={props.activeUser}
        />
      </div>
      <SessionList
        thisStage={props.thisStage}
        thisRunData={props.thisRunData}
        endSession={endSession}
      />
    </section>
  );
}

export default Stage;
