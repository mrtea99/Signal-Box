import React from 'react';

import TimeFormater from '../TimeFormater/TimeFormater.js';
import Timer from '../Timer/Timer.js';

import styles from './SessionList.module.css';

function SessionList(props) {
  return (
    <table className={styles.container}>
      <thead className={styles.header}>
        <tr>
          <th className={styles.headerItem}>Activity</th>
          <th className={styles.headerItem}>Start Time</th>
          <th className={styles.headerItem}>Finish Time</th>
          <th className={styles.headerItem}>Duration</th>
          <th className={styles.headerItem}>Note</th>
        </tr>
      </thead>
      <tbody>
      {props.thisRunData['stages'][props.thisStage].map((session, index) =>
        <tr key={session.sessionUid} className={styles.itemRow}>
          <td className={styles.contentItem}>{session.activity}</td>
          <td className={styles.contentItem}>{new Date(session.startTime).toISOString()}</td>
          <td className={styles.contentItem}>{session.endTime ? new Date(session.endTime).toISOString() : ''}</td>
          <td className={styles.contentItem}>
            {session.endTime ? 
              <TimeFormater rawTime={new Date(session.endTime) - new Date(session.startTime)} />
              : <Timer startTime={session.startTime} />
            }
          </td>
          <td className={styles.contentItem}>{session.notes}</td>
        </tr>
      )}
      </tbody>
    </table>
  )
}

export default SessionList;