import React from 'react';

import SessionStart from '../SessionStart/SessionStart.js';
import SessionEnd from '../SessionEnd/SessionEnd.js';

function SessionControl(props) {

  return (
    <>
      {props.activeSession ?
        <SessionEnd
          activeSessionData={props.activeSessionData}
          endSession={props.endSession}
          updateSession={props.updateSession}
          activeSession={props.activeSession}
          thisStage={props.thisStage}
        />
      : 
        <SessionStart
          activeSession={props.activeSession}
          thisStage={props.thisStage}
          addSession={props.addSession}
        />
      }
    </>
  )
}


export default SessionControl;