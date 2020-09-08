import React from 'react';
import SessionControl from '../SessionControl/SessionControl.js';
import SessionList from '../SessionList/SessionList.js';


function Stage(props) {
  const [activeSession, setActiveSession] = React.useState(null)

  function addSession(sessionData) {
    const sessionList = props.thisRunData['stages'][props.thisStage]
    const newSessionList = [...sessionList];
    newSessionList.push(sessionData)

    props.updateRunData(props.currentRunUid, 'stages', props.thisStage, newSessionList)
  }

  function endSession() {
    const sessionList = props.thisRunData['stages'][props.thisStage]
    const newSessionList = [...sessionList];

    const activeSessionObj = newSessionList.find(obj => obj.sessionUid === activeSession)
    activeSessionObj.endTime = Date.now();

    props.updateRunData(props.currentRunUid, 'stages', props.thisStage, newSessionList)
  }

  return (
    <fieldset style={{display: props.thisStage === props.activeStage ? 'block' : 'none' }}>
      <legend>{props.stageName}</legend>
      <SessionControl 
        activeSession={activeSession}
        setActiveSession={setActiveSession}
        addSession={addSession}
        endSession={endSession}
      />
      <SessionList 
        thisStage={props.thisStage}
        thisRunData={props.thisRunData}
      />
    </fieldset>
  )
}
  
export default Stage;