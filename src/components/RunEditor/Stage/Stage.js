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

import stageNames from "../../../data/stageNames.json";

import { selectStageSessions } from "../../RunList/runsSlice.js";

function Stage(props) {
  const simpleMode = React.useContext(ViewModeContext) === "simple";

  const dispatch = useDispatch();

  const activeUser = useSelector((state) => state.users.currentUser);

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
  const stageSessions = useSelector((state) =>
    selectStageSessions(state, props.currentRunUid, props.thisStage)
  );

  const findActiveWorkSession = function () {
    if (stageSessions.length) {
      for (let i = 0; i < stageSessions.length; i++) {
        if (
          stageSessions[i].user === activeUser &&
          !stageSessions[i].endTime &&
          stageSessions[i].type === "work"
        ) {
          return stageSessions[i];
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
  const updateStageActive = function (newState, stage) {
    // Update correct active stage property in run if there is one
    const activeProperty = getStageActiveProp(stage);
    const stageState = props.thisRunData[activeProperty];

    if (stageState === newState || activeProperty === null) {
      return false;
    } else {
      dispatch({
        type: "runs/update",
        payload: {
          runId: props.currentRunUid,
          dataSection: null,
          dataKey: activeProperty,
          newValue: newState,
        },
      });
    }

    //Add event item to session list
    const newSession = {
      sessionId: Date.now(),
      runId: props.currentRunUid,
      // stage: stageNames[stage],
      stage: stage,
      type: newState ? "activate" : "deactivate",
      activity: newState,
      startTime: Date.now(),
      endTime: Date.now(),
      user: activeUser,
    };
    dispatch({
      type: "runs/addSession",
      payload: {
        runId: props.currentRunUid,
        stage: stage,
        sessionData: newSession,
      },
    });
  };

  // Render
  //==============================================================================

  return (
    <section className={styles.stage}>
      <header className={styles.stageHeader}>
        <div className={styles.stageTitleWrap}>
          <h2 className={styles.stageTitle}>{stageNames[props.thisStage]}</h2>
        </div>
        <h4 className={styles.stageDifficulty}>
          Difficulty: {getDifficulty(props.thisStage)}
        </h4>
      </header>
      <div className={styles.sessionHolder}>
        <div className={styles.sessionControl}>
          <SessionControl
            currentRunUid={props.currentRunUid}
            thisStage={props.thisStage}
            stageActive={stageActive}
            thisRunData={props.thisRunData}
            activeSessionData={activeSessionData}
          />
        </div>
        <div className={styles.sessionView}>
          {activeSessionData ? (
            <SessionDuring
              key="active"
              currentRunUid={props.currentRunUid}
              thisStage={props.thisStage}
              thisRunData={props.thisRunData}
              activeSessionData={activeSessionData}
            />
          ) : (
            <SessionDuring key="placeholder" />
          )}
        </div>
        <div className={styles.stageControl}>
          {simpleMode ? null : (
            <StageStatus
              currentRunUid={props.currentRunUid}
              stageNum={props.thisStage}
              label
              layout="vert"
              fullWidth
              viewMode="full"
            />
          )}
          <StageActions
            currentRunUid={props.currentRunUid}
            setCurrentRunUid={props.setCurrentRunUid}
            thisStage={props.thisStage}
            setActiveStage={props.setActiveStage}
            updateStageActive={updateStageActive}
          />
        </div>
      </div>
      {simpleMode ? null : (
        <SessionList
          thisStage={props.thisStage}
          currentRunUid={props.currentRunUid}
        />
      )}
    </section>
  );
}

Stage.propTypes = {
  currentRunUid: PropTypes.number.isRequired,
  setCurrentRunUid: PropTypes.func.isRequired,
  thisStage: PropTypes.number.isRequired,
  setActiveStage: PropTypes.func.isRequired,
  thisRunData: PropTypes.object.isRequired,
};

export default Stage;
