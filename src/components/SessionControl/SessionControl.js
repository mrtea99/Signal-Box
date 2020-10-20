import React from "react";

import SessionBefore from "../SessionBefore/SessionBefore.js";
import SessionDuring from "../SessionDuring/SessionDuring.js";
import FlagOpener from "../FlagOpener/FlagOpener.js";
import CheckOpener from "../CheckOpener/CheckOpener.js";

function SessionControl(props) {
  return (
    <>
      {props.stageActive ? (
        <>
          <FlagOpener
            addSession={props.addSession}
            thisStage={props.thisStage}
            activeUser={props.activeUser}
          />
          <CheckOpener
            addSession={props.addSession}
            thisStage={props.thisStage}
            activeUser={props.activeUser}
          />
          {props.activeSessionData ? (
            <SessionDuring
              activeSessionData={props.activeSessionData}
              endSession={props.endSession}
              updateSession={props.updateSession}
              thisStage={props.thisStage}
              thisRunData={props.thisRunData}
            />
          ) : (
            <SessionBefore
              thisStage={props.thisStage}
              addSession={props.addSession}
              activeUser={props.activeUser}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default SessionControl;
