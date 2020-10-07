import React from "react";

import SessionBefore from "../SessionBefore/SessionBefore.js";
import SessionDuring from "../SessionDuring/SessionDuring.js";

function SessionControl(props) {
  return (
    <>
      {!props.activeSessionData ? (
        <SessionBefore
          thisStage={props.thisStage}
          addSession={props.addSession}
          activeUser={props.activeUser}
        />
      ) : (
        <SessionDuring
          activeSessionData={props.activeSessionData}
          endSession={props.endSession}
          updateSession={props.updateSession}
          thisStage={props.thisStage}
        />
      )}
    </>
  );
}

export default SessionControl;
