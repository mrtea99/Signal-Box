import React from "react";
import PropTypes from "prop-types";

import SessionControl from "./SessionControl/SessionControl.js";
import SessionList from "../SessionList/SessionList.js";
import StageStatus from "../StageStatus/StageStatus.js";
import StageActions from "./StageActions/StageActions.js";
import SessionDuring from "./SessionDuring/SessionDuring.js";

import styles from "./Stage.module.css";

import ViewModeContext from "../../contexts/ViewModeContext.js";

function Stage(props) {
  const viewMode = React.useContext(ViewModeContext);
  const simpleMode = viewMode === "simple";

  const thisStageData = props.thisRunData["stages"][props.thisStage];

  // const stageActive = thisStageData.active;
  let activeProp;
  switch (props.thisStage) {
    case 0:
      activeProp = "activePrep";
      break;
    case 4:
      activeProp = "activeStocking";
      break;
    default:
      break;
  }
  const stageActive = activeProp ? props.thisRunData[activeProp] : true;

  const findActiveSession = function () {
    const sessionList = thisStageData["sessions"];

    if (sessionList.length) {
      for (let i = 0; i < sessionList.length; i++) {
        if (
          sessionList[i].user === props.activeUser &&
          !sessionList[i].endTime &&
          sessionList[i].type === "work"
        ) {
          return sessionList[i];
        }
      }
    }
    return null;
  };
  const activeSessionData = findActiveSession();

  const updateStageActive = function (newState, stage) {
    // const stageData = props.thisRunData["stages"][stage];

    // if (stageData.active === newState) {
    //   return false;
    // }

    // let newStageObj = { ...stageData };

    // newStageObj.active = newState;

    // props.updateRunData(props.currentRunUid, "stages", stage, newStageObj);

    let activeProperty;
    switch (props.thisStage) {
      case 0:
        activeProperty = "activePrep";
        break;
      case 4:
        activeProperty = "activeStocking";
        break;
      default:
        return false;
    }
    const stageState = props.thisRunData[activeProperty];

    if (stageState === newState) {
      return false;
    } else {
      props.updateRunData(props.currentRunUid, null, activeProp, newState);
    }

    //Add event item to sessionlist
    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      type: newState ? "activate" : "deactivate",
      activity: newState,
      startTime: Date.now(),
      endTime: Date.now(),
      user: props.activeUser,
    };

    addSession(newSession, stage);
  };

  const addSession = function (sessionData, stage) {
    const stageData = props.thisRunData["stages"][stage];
    const sessionList = stageData["sessions"];

    let newStageObj = { ...stageData };
    let newSessionList = [...sessionList];

    newSessionList.push(sessionData);
    newStageObj["sessions"] = newSessionList;

    props.updateRunData(props.currentRunUid, "stages", stage, newStageObj);
  };

  const updateSession = function (extraData, stage, sessionId) {
    const stageData = props.thisRunData["stages"][stage];
    const sessionList = stageData["sessions"];

    let newStageObj = { ...stageData };
    let newSessionList = [...sessionList];

    const activeSessionObj = newSessionList.find(
      (obj) => obj.sessionId === sessionId
    );

    Object.assign(activeSessionObj, extraData);

    newStageObj["sessions"] = newSessionList;

    props.updateRunData(props.currentRunUid, "stages", stage, newStageObj);
  };

  const endSession = function (extraData, stage, sessionData) {
    const endTime = { endTime: Date.now() };

    if (extraData) {
      Object.assign(extraData, endTime);
      updateSession(extraData, stage, sessionData.sessionId);
    } else {
      updateSession(endTime, stage, sessionData.sessionId);
    }
  };

  const getDifficulty = function () {
    let difficulty = "";
    const defaultDifficulty = "N/A";

    switch (props.thisStage) {
      case 0:
        difficulty = props.thisRunData.productInfo.prepDifficulty;
        break;
      case 1:
        difficulty = props.thisRunData.productInfo.manufacturingDifficulty;
        break;
      case 2:
        difficulty = props.thisRunData.productInfo.packagingDifficulty;
        break;
      case 3:
        difficulty = props.thisRunData.productInfo.labelingDifficulty;
        break;
      case 4:
        difficulty = props.thisRunData.productInfo.stockDifficulty;
        break;
      default:
        difficulty = defaultDifficulty;
    }

    difficulty =
      difficulty && difficulty.length ? difficulty : defaultDifficulty;

    return difficulty;
  };

  return (
    <section className={styles.stage}>
      <header className={styles.stageHeader}>
        <div className={styles.stageTitleWrap}>
          <h2 className={styles.stageTitle}>{props.stageName}</h2>
        </div>
        <h4 className={styles.stageDifficulty}>
          Difficulty: {getDifficulty()}
        </h4>
      </header>
      <div className={styles.sessionHolder}>
        <div className={styles.sessionControl}>
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
        </div>
        <div className={styles.sessionView}>
          {activeSessionData ? (
            <SessionDuring
              key="active"
              activeSessionData={activeSessionData}
              updateSession={updateSession}
              thisStage={props.thisStage}
              thisRunData={props.thisRunData}
            />
          ) : (
            <SessionDuring key="placeholder" />
          )}
        </div>
        <div className={styles.stageControl}>
          {simpleMode ? null : (
            <StageStatus
              runData={props.thisRunData}
              stageNum={props.thisStage}
              label
              activeUser={props.activeUser}
              layout="vert"
              fullWidth
              viewMode="full"
            />
          )}
          <StageActions
            updateStageActive={updateStageActive}
            thisRunData={props.thisRunData}
            thisStage={props.thisStage}
            setCurrentRunUid={props.setCurrentRunUid}
            setActiveStage={props.setActiveStage}
            updateRunData={props.updateRunData}
            addSession={addSession}
            activeUser={props.activeUser}
          />
        </div>
      </div>
      {simpleMode ? null : (
        <SessionList
          thisStage={props.thisStage}
          thisRunData={props.thisRunData}
          endSession={endSession}
          updateSession={updateSession}
          activeUser={props.activeUser}
        />
      )}
    </section>
  );
}

Stage.propTypes = {
  thisRunData: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
  activeUser: PropTypes.string.isRequired,
  currentRunUid: PropTypes.number.isRequired,
  updateRunData: PropTypes.func.isRequired,
  stageName: PropTypes.string.isRequired,
  setCurrentRunUid: PropTypes.func.isRequired,
  setActiveStage: PropTypes.func.isRequired,
};

export default Stage;
