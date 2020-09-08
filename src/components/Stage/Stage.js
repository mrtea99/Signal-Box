import React from 'react';
import SessionControl from '../SessionControl/SessionControl.js';
import SessionList from '../SessionList/SessionList.js';


function Stage(props) {
  const [activeSession, setActiveSession] = React.useState(null)

  function addSession(sessionData) {
    const sessionList = props.thisRunData['stages'][props.activeStage]
    const newSessionList = [...sessionList];
    newSessionList.push(sessionData)

    props.updateRunData(props.currentRunUid, 'stages', props.activeStage, newSessionList)
  }

  function endSession() {
    const sessionList = props.thisRunData['stages'][props.activeStage]
    const newSessionList = [...sessionList];

    const activeSessionObj = newSessionList.find(obj => obj.sessionUid === activeSession)
    activeSessionObj.endTime = Date.now();

    props.updateRunData(props.currentRunUid, 'stages', props.activeStage, newSessionList)
  }

  return (
    <>
      <legend>{props.stageNameArr[props.activeStage]}</legend>
      <SessionControl 
        activeSession={activeSession}
        setActiveSession={setActiveSession}
        addSession={addSession}
        endSession={endSession}
      />
      <SessionList 
        activeStage={props.activeStage}
        thisRunData={props.thisRunData}
      />
      </>
  )
}
  
export default Stage;