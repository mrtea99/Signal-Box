import React from 'react';
import SessionControl from '../SessionControl/SessionControl.js';
import SessionList from '../SessionList/SessionList.js';


function Stage(props) {
  //Add initial status by checking if there is an incomplete session for this stage
  const [sessionList, setSessionList] = React.useState(props.thisRunData['stages'][props.thisStage])
  const [activeSession, setActiveSession] = React.useState(() => {
    if (sessionList.length) {
      const lastSession = sessionList[sessionList.length - 1];
      if (lastSession.endTime === undefined) {
        return lastSession.sessionUid
      }
      else {
        return null
      }
    }
  })

  React.useEffect(() => {
    setSessionList(props.thisRunData['stages'][props.thisStage])
    setActiveSession(() => {
      if (sessionList.length) {
        const lastSession = sessionList[sessionList.length - 1];
        if (lastSession.endTime === undefined) {
          return lastSession.sessionUid
        }
        else {
          return null
        }
      }
    })
  },[props.thisRunData, props.thisStage, activeSession, sessionList])

  function addSession(sessionData, newSessionUid) {
    const newSessionList = [...sessionList];
    newSessionList.push(sessionData)

    props.updateRunData(props.currentRunUid, 'stages', props.thisStage, newSessionList)
  
    setActiveSession(newSessionUid);
  }

  function endSession() {
    const sessionList = props.thisRunData['stages'][props.thisStage]
    const newSessionList = [...sessionList];

    const activeSessionObj = newSessionList.find(obj => obj.sessionUid === activeSession)
    activeSessionObj.endTime = Date.now();

    props.updateRunData(props.currentRunUid, 'stages', props.thisStage, newSessionList)
  
    setActiveSession(null);
  }

  return (
    <fieldset style={{display: props.thisStage === props.activeStage ? 'block' : 'none' }}>
      <legend>{props.stageName}</legend>
      <SessionControl 
        activeSession={activeSession}
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