import React from "react";

import SessionStart from "../../SessionStart/SessionStart.js";
import SessionEnd from "../../SessionEnd/SessionEnd.js";
import FlagOpener from "../../FlagOpener/FlagOpener.js";
import CheckOpener from "../../CheckOpener/CheckOpener.js";
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
            />
          ) : (
            <SessionStart
              thisStage={props.thisStage}
              addSession={props.addSession}
              activeUser={props.activeUser}
            />
          )}
          <ButtonSpacer direction="vert">
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
      ) : (
        <></>
      )}
    </>
  );
}

export default SessionControl;
