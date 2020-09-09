import React from 'react';

function SessionControl(props) {

  function handleNewClick(e) {
    e.preventDefault();

    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      startTime: Date.now()
    }

    props.addSession(newSession, newSessionUid)
  }

  function handleEndClick(e) {
    e.preventDefault();

    props.endSession();
  }

  return (
    <>
      <h3>Session Control</h3>

      <h4>Session: { props.activeSession !== null ? props.activeSession : '' }</h4>

      <button disabled={props.activeSession ? 'disabled' : '' } onClick={handleNewClick}>Start New Session</button>
      <button disabled={props.activeSession ? '' : 'disabled' } onClick={handleEndClick}>End Session</button>
    </>
  )
}

export default SessionControl;