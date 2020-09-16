import React from 'react';

function SessionList(props) {
  return (
    <>
      <h3>Session List</h3>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Start Time</th>
            <th>Finish Time</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
        {props.thisRunData['stages'][props.thisStage].map((session, index) =>
          <tr key={session.sessionUid}>
            <td>{session.activity}</td>
            <td>{new Date(session.startTime).toISOString()}</td>
            <td>{session.endTime ? new Date(session.endTime).toISOString() : ''}</td>
            <td>{session.notes}</td>
          </tr>
        )}
        </tbody>
      </table>
    </>
  )
}

export default SessionList;