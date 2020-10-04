import React from "react";

import TimeFormater from "../TimeFormater/TimeFormater.js";
import Timer from "../Timer/Timer.js";

import styles from "./SessionList.module.css";

function SessionList(props) {
  function addLeadingZero(number) {
    if (number < 10) {
      number = "0" + number;
    }

    return number;
  }

  function formatDate(time) {
    const dateObj = new Date(time);

    const year = dateObj.getFullYear();
    const month = addLeadingZero(dateObj.getMonth() + 1);
    const day = addLeadingZero(dateObj.getDate());

    const dateString = `${year}-${month}-${day}`;

    return dateString;
  }

  function formatTime(time) {
    const dateObj = new Date(time);

    const hour = addLeadingZero(dateObj.getHours());
    const min = addLeadingZero(dateObj.getMinutes());
    const sec = addLeadingZero(dateObj.getSeconds());

    return `${hour}:${min}:${sec}`;
  }

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
        {props.thisRunData["stages"][props.thisStage].map((session, index) => (
          <tr key={session.sessionUid} className={styles.itemRow}>
            <td className={styles.contentItem}>{session.activity}</td>
            <td className={styles.contentItem}>
              <time dateTime={new Date(session.startTime).toISOString()}>
                {formatDate(session.startTime)}
                <br />
                {formatTime(session.startTime)}
              </time>
            </td>
            <td className={styles.contentItem}>
              {session.endTime ? (
                <time dateTime={new Date(session.endTime).toISOString()}>
                  {formatDate(session.endTime)}
                  <br />
                  {formatTime(session.endTime)}
                </time>
              ) : (
                <></>
              )}
            </td>
            <td className={styles.contentItem}>
              {session.endTime ? (
                <TimeFormater
                  rawTime={
                    new Date(session.endTime) - new Date(session.startTime)
                  }
                />
              ) : (
                <Timer startTime={session.startTime} />
              )}
            </td>
            <td className={styles.contentItem}>{session.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SessionList;
