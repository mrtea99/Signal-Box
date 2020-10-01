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
  const [activeSessionData, setActiveSessionData] = React.useState(sessionList.find(obj => obj.sessionUid === activeSession));

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

  React.useEffect(() => {
    setActiveSessionData(sessionList.find(obj => obj.sessionUid === activeSession));
  }, [activeSession, sessionList, props.currentRunUid])

  function addSession(sessionData, newSessionUid) {
    const newSessionList = [...sessionList];
    newSessionList.push(sessionData)

    props.updateRunData(props.currentRunUid, 'stages', props.thisStage, newSessionList)
    
    setActiveSession(newSessionUid);
  }

  function updateSession(extraData) {
    let newSessionList = [...sessionList];

    const activeSessionObj = newSessionList.find(obj => obj.sessionUid === activeSession)
    
    Object.assign(activeSessionObj, extraData)

    props.updateRunData(props.currentRunUid, 'stages', props.thisStage, newSessionList)
  }

  function endSession(extraData) {
    const endTime = { endTime: Date.now() }

    if (extraData) {
      Object.assign(extraData, endTime)
      updateSession(extraData)
    } else {
      updateSession(endTime)
    }

    setActiveSession(null);
  }

  function getDifficulty() {
    let difficulty = '';

    switch(props.thisStage) {
      case 0:
        difficulty = props.thisRunData.productInfo.prepDiffilculty
        break;
      case 1:
        difficulty = props.thisRunData.productInfo.manufacturingDifficulty
        break;
      case 3:
        difficulty = props.thisRunData.productInfo.packagingDiffilculty
        break;
      case 4:
        difficulty = props.thisRunData.productInfo.labelingDifficulty
        break;
      default:
        difficulty = 'N/A'
        // code block
    }

    return difficulty;
  }

  return (
    <section style={{display: props.thisStage === props.activeStage ? 'block' : 'none' }}>
      <h2>{props.stageName}</h2>
      <h4>Difficulty: {getDifficulty()}</h4>
      <SessionControl 
        activeSession={activeSession}
        addSession={addSession}
        updateSession={updateSession}
        endSession={endSession}
        thisStage={props.thisStage}
        activeSessionData={activeSessionData}
      />
      <SessionList 
        thisStage={props.thisStage}
        thisRunData={props.thisRunData}
      />
    </section>
  )
}
  
export default Stage;