import React from "react";

import TimeFormater from "../TimeFormater/TimeFormater.js";
import Timer from "../Timer/Timer.js";

import styles from "./SessionList.module.css";

function SessionList(props) {
  const thisStageData = props.thisRunData["stages"][props.thisStage];

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

  let newestEndTime = 0;
  for (let i = 0; i < thisStageData.length; i++) {
    if (thisStageData[i].endTime === undefined) {
      newestEndTime = 0;
      break;
    } else {
      if (thisStageData[i].endTime > newestEndTime) {
        newestEndTime = thisStageData[i].endTime;
      }
    }
  }

  function findTotalEndTime() {
    if (newestEndTime === 0) {
      return "-";
    } else {
      return (
        <>
          {formatDate(newestEndTime)}
          <br />
          {formatTime(newestEndTime)}
        </>
      );
    }
  }

  function findTotalDuration() {
    let totalDuration = 0;

    for (let i = 0; i < thisStageData.length; i++) {
      if (thisStageData[i].endTime === undefined) {
        totalDuration =
          totalDuration + (Date.now() - thisStageData[i].startTime);
      } else {
        totalDuration =
          totalDuration +
          (thisStageData[i].endTime - thisStageData[i].startTime);
      }
    }

    return <TimeFormater rawTime={totalDuration} />;
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
        {thisStageData.map((session, index) => (
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
                "-"
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
        <tr className={`${styles.itemRow} ${styles.itemRowTotals}`}>
          <td className={styles.contentItem}>Overall</td>
          <td className={styles.contentItem}>
            {thisStageData.length ? (
              <>
                {formatDate(thisStageData[0].startTime)}
                <br />
                {formatTime(thisStageData[0].startTime)}
              </>
            ) : (
              "-"
            )}
          </td>
          <td className={styles.contentItem}>{findTotalEndTime()}</td>
          <td className={styles.contentItem}>
            {newestEndTime ? (
              <>{findTotalDuration()}</>
            ) : (
              <Repeater interval={333} callback={findTotalDuration} />
            )}
          </td>
          <td className={styles.contentItem}></td>
        </tr>
      </tbody>
    </table>
  );
}

function Repeater(props) {
  const [returnValue, setReturnValue] = React.useState(props.callback());

  React.useEffect(() => {
    const timerInterval = setInterval(() => {
      setReturnValue(props.callback());
    }, props.interval);

    return () => {
      clearInterval(timerInterval);
    };
  });

  return returnValue;
}

export default SessionList;
