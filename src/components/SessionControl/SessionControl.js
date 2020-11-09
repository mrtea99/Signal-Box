import React from "react";

import SessionStart from "../SessionStart/SessionStart.js";
import SessionEnd from "../SessionEnd/SessionEnd.js";
import FlagOpener from "../FlagOpener/FlagOpener.js";
import CheckOpener from "../CheckOpener/CheckOpener.js";

function SessionControl(props) {
  return (
    <>
      {props.stageActive ? (
        <>
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
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default SessionControl;
