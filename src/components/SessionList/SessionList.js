import React from 'react';

function SessionList(props) {
  return (
    <>
    <h3>Session List</h3>
    <ul>
      {props.thisRunData['stages'][props.activeStage].map((session, index) =>
        <li key={session.sessionUid}>{session.startTime}</li>
      )}
    </ul>
    </>
  )
}

export default SessionList;