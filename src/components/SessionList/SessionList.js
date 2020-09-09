import React from 'react';

function SessionList(props) {
  return (
    <>
      <h3>Session List</h3>
      <table>
        <thead>
          <tr>
            <th>Start Time</th>
            <th>Finish Time</th>
          </tr>
        </thead>
        <tbody>
        {props.thisRunData['stages'][props.thisStage].map((session, index) =>
          <tr key={session.sessionUid}>
            <td>{new Date(session.startTime).toISOString()}</td>
            <td>{session.endTime ? new Date(session.endTime).toISOString() : ''}</td>
          </tr>
        )}
        </tbody>
      </table>
    </>
  )
}

export default SessionList;