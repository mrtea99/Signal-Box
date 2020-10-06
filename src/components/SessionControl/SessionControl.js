import React from "react";

import SessionStart from "../SessionStart/SessionStart.js";
import SessionEnd from "../SessionEnd/SessionEnd.js";

function SessionControl(props) {
  return (
    <>
      {!props.activeSessionData ? (
        <SessionStart
          thisStage={props.thisStage}
          addSession={props.addSession}
          activeUser={props.activeUser}
        />
      ) : (
        <SessionEnd
          activeSessionData={props.activeSessionData}
          endSession={props.endSession}
          updateSession={props.updateSession}
          activeSession={props.activeSession}
          thisStage={props.thisStage}
        />
      )}
    </>
  );
}

export default SessionControl;
