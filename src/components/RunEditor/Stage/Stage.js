import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import SessionList from "../../SessionList/SessionList.js";
import StageStatus from "../../StageStatus/StageStatus.js";
import SessionControl from "./SessionControl/SessionControl.js";
import StageActions from "./StageActions/StageActions.js";
import SessionDuring from "./SessionDuring/SessionDuring.js";

import styles from "./Stage.module.css";

import ViewModeContext from "../../../contexts/ViewModeContext.js";

function Stage(props) {
  const simpleMode = React.useContext(ViewModeContext) === "simple";

  const dispatch = useDispatch();

  const activeUser = useSelector((state) => state.users.currentUser);

  const thisStageData = props.thisRunData["stages"][props.thisStage];

  // Stage Difficulty
  //-------------------------------------
  const getDifficulty = function (stageNum) {
    let difficulty = "";
    const defaultDifficulty = "N/A";

    switch (stageNum) {
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

  // Active work session
  //-------------------------------------
  const findActiveWorkSession = function () {
    const sessionList = thisStageData["sessions"];

    if (sessionList.length) {
      for (let i = 0; i < sessionList.length; i++) {
        if (
          sessionList[i].user === activeUser &&
          !sessionList[i].endTime &&
          sessionList[i].type === "work"
        ) {
          return sessionList[i];
        }
      }
    }
    return null;
  };
  const activeSessionData = findActiveWorkSession();

  // Find current stage's active status
  //-------------------------------------
  // Prep and Stocking active state are stored in run properties,
  // other stages are always active
  const getStageActiveProp = function (stageNum) {
    switch (stageNum) {
      case 0:
        return "activePrep";
      case 4:
        return "activeStocking";
      default:
        return null;
    }
  };
  const activeProp = getStageActiveProp(props.thisStage);
  const stageActive = activeProp ? props.thisRunData[activeProp] : true;

  // Change a stage's active state
  //-------------------------------------
  const updateRun = function (runId, dataSection, dataKey, newValue) {
    dispatch({
      type: "runs/update",
      payload: { runId, dataSection, dataKey, newValue },
    });
  };

  const updateStageActive = function (newState, stage) {
    // Update correct active stage property in run if there is one
    const activeProperty = getStageActiveProp(stage);
    const stageState = props.thisRunData[activeProperty];

    if (stageState === newState || activeProperty === null) {
      return false;
    } else {
      updateRun(props.currentRunUid, null, activeProperty, newState);
    }

    //Add event item to session list
    const newSession = {
      sessionId: Date.now(),
      type: newState ? "activate" : "deactivate",
      activity: newState,
      startTime: Date.now(),
      endTime: Date.now(),
      user: activeUser,
    };
    addSession(newSession, stage);
  };

  // Session creation and editing functions
  //==============================================================================
  const addSession = function (sessionData, stage) {
    const runId = props.currentRunUid;
    dispatch({
      type: "runs/addSession",
      payload: { runId, stage, sessionData },
    });
  };

  const updateSession = function (extraData, stage, sessionId) {
    const runId = props.currentRunUid;

    dispatch({
      type: "runs/updateSession",
      payload: {
        runId,
        stage,
        sessionId,
        extraData,
      },
    });
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

  // Render
  //==============================================================================

  return (
    <section className={styles.stage}>
      <header className={styles.stageHeader}>
        <div className={styles.stageTitleWrap}>
          <h2 className={styles.stageTitle}>{props.stageName}</h2>
        </div>
        <h4 className={styles.stageDifficulty}>
          Difficulty: {getDifficulty(props.thisStage)}
        </h4>
      </header>
      <div className={styles.sessionHolder}>
        <div className={styles.sessionControl}>
          <SessionControl
            thisStage={props.thisStage}
            stageActive={stageActive}
            currentRunUid={props.currentRunUid}
            thisRunData={props.thisRunData}
            activeSessionData={activeSessionData}
            addSession={addSession}
            updateSession={updateSession}
            endSession={endSession}
          />
        </div>
        <div className={styles.sessionView}>
          {activeSessionData ? (
            <SessionDuring
              key="active"
              thisStage={props.thisStage}
              thisRunData={props.thisRunData}
              activeSessionData={activeSessionData}
              updateSession={updateSession}
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
              layout="vert"
              fullWidth
              viewMode="full"
            />
          )}
          <StageActions
            thisStage={props.thisStage}
            thisRunData={props.thisRunData}
            setCurrentRunUid={props.setCurrentRunUid}
            setActiveStage={props.setActiveStage}
            addSession={addSession}
            updateStageActive={updateStageActive}
          />
        </div>
      </div>
      {simpleMode ? null : (
        <SessionList
          thisStage={props.thisStage}
          thisRunData={props.thisRunData}
          endSession={endSession}
          updateSession={updateSession}
        />
      )}
    </section>
  );
}

Stage.propTypes = {
  thisRunData: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
  currentRunUid: PropTypes.number.isRequired,
  stageName: PropTypes.string.isRequired,
  setCurrentRunUid: PropTypes.func.isRequired,
  setActiveStage: PropTypes.func.isRequired,
};

export default Stage;
