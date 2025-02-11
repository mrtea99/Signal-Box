import React, { useContext } from "react";
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

import { selectRun } from "../../RunList/runsSlice.js";
import { selectStageSessions } from "../../SessionList/sessionsSlice.js";
import { selectCurrentUser } from "../../UserSwitcher/usersSlice.js";

import { useTranslation } from "react-i18next";

/**
 * Displays a single run stage.
 * Includes the controls to edit the stage, the stage status,
 * any active work session, and lists all sessions for this stage.
 */

function Stage(props) {
  const { t } = useTranslation();

  const simpleMode = useContext(ViewModeContext) === "simple";

  const dispatch = useDispatch();

  const activeUser = useSelector(selectCurrentUser);

  const thisRunData = useSelector((state) =>
    selectRun(state, props.currentRunId)
  );

  // Stage Difficulty
  //-------------------------------------
  const getDifficulty = function (stageNum) {
    let difficulty = "";
    const defaultDifficulty = "N/A";
    const productInfo = thisRunData.productInfo;

    switch (stageNum) {
      case 0:
        difficulty = productInfo.prepDifficulty;
        break;
      case 1:
        difficulty = productInfo.manufacturingDifficulty;
        break;
      case 2:
        difficulty = productInfo.packagingDifficulty;
        break;
      case 3:
        difficulty = productInfo.labelingDifficulty;
        break;
      case 4:
        difficulty = productInfo.stockDifficulty;
        break;
      default:
        difficulty = defaultDifficulty;
    }

    difficulty =
      difficulty && difficulty.length ? difficulty : defaultDifficulty;

    return t(difficulty);
  };

  // Active work session
  //-------------------------------------
  const stageSessions = useSelector((state) =>
    selectStageSessions(state, props.currentRunId, props.thisStage)
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
  const stageActive = activeProp ? thisRunData[activeProp] : true;

  // Change a stage's active state
  //-------------------------------------
  const updateStageActive = function (newState, stage) {
    // Update correct active stage property in run if there is one
    const activeProperty = getStageActiveProp(stage);
    const stageState = thisRunData[activeProperty];

    if (stageState === newState || activeProperty === null) {
      return false;
    } else {
      dispatch({
        type: "runs/update",
        payload: {
          runId: props.currentRunId,
          dataSection: null,
          dataKey: activeProperty,
          newValue: newState,
        },
      });
    }

    //Add event item to session list
    const newSession = {
      sessionId: Date.now(),
      runId: props.currentRunId,
      // stage: stageNames[stage],
      stage: stage,
      type: newState ? "activate" : "deactivate",
      activity: newState,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      user: activeUser,
    };
    dispatch({
      type: "sessions/add",
      payload: {
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
          {t("Difficulty")}: {getDifficulty(props.thisStage)}
        </h4>
      </header>
      <div className={styles.sessionHolder}>
        <div className={styles.sessionControl}>
          <SessionControl
            currentRunId={props.currentRunId}
            thisStage={props.thisStage}
            stageActive={stageActive}
            activeSessionData={activeSessionData}
          />
        </div>
        <div className={styles.sessionView}>
          {activeSessionData ? (
            <SessionDuring
              key="active"
              currentRunId={props.currentRunId}
              thisStage={props.thisStage}
              activeSessionData={activeSessionData}
            />
          ) : (
            <SessionDuring key="placeholder" />
          )}
        </div>
        <div className={styles.stageControl}>
          {simpleMode ? null : (
            <StageStatus
              currentRunId={props.currentRunId}
              stageNum={props.thisStage}
              label
              layout="vert"
              fullWidth
              viewMode="full"
            />
          )}
          <StageActions
            currentRunId={props.currentRunId}
            thisStage={props.thisStage}
            updateStageActive={updateStageActive}
          />
        </div>
      </div>
      {simpleMode ? null : (
        <SessionList
          thisStage={props.thisStage}
          currentRunId={props.currentRunId}
        />
      )}
    </section>
  );
}

Stage.propTypes = {
  currentRunId: PropTypes.number.isRequired,
  thisStage: PropTypes.number.isRequired,
};

export default Stage;
