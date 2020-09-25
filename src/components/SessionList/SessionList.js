import React from 'react';

import TimeFormater from '../TimeFormater/TimeFormater.js';
import Timer from '../Timer/Timer.js';

function SessionList(props) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Start Time</th>
            <th>Finish Time</th>
            <th>Duration</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
        {props.thisRunData['stages'][props.thisStage].map((session, index) =>
          <tr key={session.sessionUid}>
            <td>{session.activity}</td>
            <td>{new Date(session.startTime).toISOString()}</td>
            <td>{session.endTime ? new Date(session.endTime).toISOString() : ''}</td>
            <td>
              {session.endTime ? 
                <TimeFormater rawTime={new Date(session.endTime) - new Date(session.startTime)} />
                : <Timer startTime={session.startTime} />
              }
            </td>
            <td>{session.notes}</td>
          </tr>
        )}
        </tbody>
      </table>
    </>
  )
}

export default SessionList;