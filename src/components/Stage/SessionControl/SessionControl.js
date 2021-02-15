import React from "react";
import PropTypes from "prop-types";

import SessionStart from "../SessionStart/SessionStart.js";
import SessionEnd from "../SessionEnd/SessionEnd.js";
import FlagOpener from "../../FlagOpener/FlagOpener.js";
import CheckOpener from "../../CheckOpener/CheckOpener.js";
import AssignmentOpener from "../../AssignmentOpener/AssignmentOpener.js";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer.js";

import styles from "./SessionControl.module.css";

function SessionControl(props) {
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
              activeUser={props.activeUser}
            />
          ) : (
            <SessionStart
              thisStage={props.thisStage}
              addSession={props.addSession}
              activeUser={props.activeUser}
              className={styles.sessionControl}
            />
          )}
          <ButtonSpacer direction="vert">
            <AssignmentOpener
              addSession={props.addSession}
              thisStage={props.thisStage}
              activeUser={props.activeUser}
            />
            <CheckOpener
              addSession={props.addSession}
              thisStage={props.thisStage}
              activeUser={props.activeUser}
            />
            <FlagOpener
              addSession={props.addSession}
              thisStage={props.thisStage}
              activeUser={props.activeUser}
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
  thisStage: PropTypes.number.isRequired,
  thisRunData: PropTypes.object.isRequired,
  activeUser: PropTypes.string.isRequired,
};

export default SessionControl;
