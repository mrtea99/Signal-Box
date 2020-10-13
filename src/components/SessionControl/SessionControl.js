import React from "react";

import SessionBefore from "../SessionBefore/SessionBefore.js";
import SessionDuring from "../SessionDuring/SessionDuring.js";

function SessionControl(props) {
  return (
    <>
      {props.activeSessionData ? (
        <SessionDuring
          activeSessionData={props.activeSessionData}
          endSession={props.endSession}
          updateSession={props.updateSession}
          thisStage={props.thisStage}
          thisRunData={props.thisRunData}
        />
      ) : (
        <>
          {props.stageActive ? (
            <div>
              <SessionBefore
                thisStage={props.thisStage}
                addSession={props.addSession}
                activeUser={props.activeUser}
              />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default SessionControl;
