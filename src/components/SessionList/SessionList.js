import React from 'react';

function SessionList(props) {
  return (
    <>
      <h3>Session List</h3>
      <table>
        <tbody>
        {props.thisRunData['stages'][props.thisStage].map((session, index) =>
          <tr key={session.sessionUid}>
            <td>{session.startTime}</td>
            <td>{session.endTime ? session.endTime : ''}</td>
          </tr>
        )}
        </tbody>
      </table>
    </>
  )
}

export default SessionList;