import React from "react";

import SessionBefore from "../SessionBefore/SessionBefore.js";
import SessionDuring from "../SessionDuring/SessionDuring.js";
import Button from "../Button/Button.js";

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
          {props.stageComplete ? (
            <div>
              <p>
                Stage complete 
                <Button onClick={() => props.updateStageCompletion(false, props.thisStage)}>
                  Undo
                </Button>
              </p>
            </div>
          ) : (
            <div>
              {/* todo: dont show completion button if there are any open sessions */}
              {/* todo: if there are no sessions then button should 'skip stage', and make a dummy session */}
              <Button onClick={() => props.updateStageCompletion(true, props.thisStage)}>
                Complete Stage
              </Button>
              <SessionBefore
                thisStage={props.thisStage}
                addSession={props.addSession}
                activeUser={props.activeUser}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SessionControl;
