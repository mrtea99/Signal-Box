import React from "react";
import PropTypes from "prop-types";

import SessionStart from "../SessionStart/SessionStart.js";
import SessionEnd from "../SessionEnd/SessionEnd.js";
import FlagOpener from "../../../FlagOpener/FlagOpener.js";
import CheckOpener from "../../../CheckOpener/CheckOpener.js";
import AssignmentOpener from "../../../AssignmentOpener/AssignmentOpener.js";
import ButtonSpacer from "../../../Button/ButtonSpacer/ButtonSpacer.js";

import styles from "./SessionControl.module.css";

import ViewModeContext from "../../../../contexts/ViewModeContext.js";

function SessionControl(props) {
  const viewMode = React.useContext(ViewModeContext);
  const simpleMode = viewMode === "simple";

  return (
    <>
      {props.stageActive ? (
        <div className={styles.sessionActions}>
          {props.activeSessionData ? (
            <SessionEnd
              addSession={props.addSession}
              endSession={props.endSession}
              thisStage={props.thisStage}
              activeSessionData={props.activeSessionData}
              thisRunData={props.thisRunData}
              className={styles.sessionControl}
            />
          ) : (
            <SessionStart
              thisStage={props.thisStage}
              addSession={props.addSession}
              updateSession={props.updateSession}
              className={styles.sessionControl}
              thisRunData={props.thisRunData}
              endSession={props.endSession}
              updateRunData={props.updateRunData}
            />
          )}
          <ButtonSpacer direction="vert">
            {!simpleMode ? (
              <AssignmentOpener
                addSession={props.addSession}
                thisStage={props.thisStage}
              />
            ) : null}
            <CheckOpener
              addSession={props.addSession}
              thisStage={props.thisStage}
            />
            <FlagOpener
              addSession={props.addSession}
              thisStage={props.thisStage}
            />
          </ButtonSpacer>
        </div>
      ) : null}
    </>
  );
}

SessionControl.propTypes = {
  stageActive: PropTypes.bool.isRequired,
  activeSessionData: PropTypes.object,
  addSession: PropTypes.func.isRequired,
  endSession: PropTypes.func.isRequired,
  updateSession: PropTypes.func.isRequired,
  thisStage: PropTypes.number.isRequired,
  thisRunData: PropTypes.object.isRequired,
  updateRunData: PropTypes.func.isRequired,
};

export default SessionControl;
