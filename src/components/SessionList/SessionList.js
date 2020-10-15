import React from "react";

import TimeFormater from "../TimeFormater/TimeFormater.js";
import Timer from "../Timer/Timer.js";
import Button from "../Button/Button.js";

import styles from "./SessionList.module.css";

function SessionList(props) {
  const thisStageData =
    props.thisRunData["stages"][props.thisStage]["sessions"];

  const addLeadingZero = function (number) {
    if (number < 10) {
      number = "0" + number;
    }

    return number;
  };

  const formatDate = function (time) {
    const dateObj = new Date(time);

    const year = dateObj.getFullYear();
    const month = addLeadingZero(dateObj.getMonth() + 1);
    const day = addLeadingZero(dateObj.getDate());

    const dateString = `${year}-${month}-${day}`;

    return dateString;
  };

  const formatTime = function (time) {
    const dateObj = new Date(time);

    const hour = addLeadingZero(dateObj.getHours());
    const min = addLeadingZero(dateObj.getMinutes());
    const sec = addLeadingZero(dateObj.getSeconds());

    return `${hour}:${min}:${sec}`;
  };

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

  const findTotalEndTime = function () {
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
  };

  const findTotalDuration = function () {
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
  };

  const findTotalCount = function (propertyName) {
    let total = 0;

    for (let i = 0; i < thisStageData.length; i++) {
      const sessionValue = thisStageData[i][propertyName];

      if (sessionValue) {
        total = total + sessionValue;
      }
    }

    return total;
  };

  return (
    <table className={styles.container}>
      <thead className={styles.header}>
        <tr>
          <th className={styles.headerItem}>№</th>
          <th className={styles.headerItem}>Activity</th>
          <th className={styles.headerItem}>Start Time</th>
          <th className={styles.headerItem}>Finish Time</th>
          <th className={styles.headerItem}>Duration</th>
          {props.thisStage === 1 ? (
            <th className={styles.headerItem}>Batches</th>
          ) : (
            <></>
          )}
          {props.thisStage === 3 || props.thisStage === 4 ? (
            <th className={styles.headerItem}>Units</th>
          ) : (
            <></>
          )}
          {props.thisStage === 1 ||
          props.thisStage === 3 ||
          props.thisStage === 4 ? (
            <th className={styles.headerItem}>Defective</th>
          ) : (
            <></>
          )}
          {props.thisStage === 1 ||
          props.thisStage === 2 ||
          props.thisStage === 3 ? (
            <th className={styles.headerItem}>Data</th>
          ) : (
            <></>
          )}
          <th className={styles.headerItem}>Technician</th>
          <th className={styles.headerItem}>Note</th>
        </tr>
      </thead>
      <tbody>
        <tr className={`${styles.itemRow} ${styles.itemRowTotals}`}>
          <td className={styles.contentItem}></td>
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
          {props.thisStage === 1 ||
          props.thisStage === 3 ||
          props.thisStage === 4 ? (
            <>
              <td className={styles.contentItem}>{findTotalCount("amount")}</td>
              <td className={styles.contentItem}>
                {findTotalCount("amountBad")}
              </td>
            </>
          ) : (
            <></>
          )}
          {props.thisStage === 1 ||
          props.thisStage === 2 ||
          props.thisStage === 3 ? (
            <td className={styles.contentItem}></td>
          ) : (
            <></>
          )}
          <td className={styles.contentItem}></td>
          <td className={styles.contentItem}></td>
        </tr>
        {thisStageData
          .slice(0)
          .reverse()
          .map((session, index) => (
            <tr key={session.sessionUid} className={styles.itemRow}>
              <td className={styles.contentItem}>
                {thisStageData.length - index}
              </td>
              <td className={styles.contentItem}>
                {session.type === "work" ? session.activity : session.type}
              </td>
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
              {props.thisStage === 1 ||
              props.thisStage === 3 ||
              props.thisStage === 4 ? (
                <>
                  <td className={styles.contentItem}>
                    {session.amount === undefined ? "-" : session.amount}
                  </td>
                  <td className={styles.contentItem}>
                    {session.amountBad === undefined ? "-" : session.amountBad}
                  </td>
                </>
              ) : (
                <></>
              )}
              {props.thisStage === 1 ||
              props.thisStage === 2 ||
              props.thisStage === 3 ? (
                <td className={styles.contentItem}>
                  {props.thisStage === 1 || props.thisStage === 2 ? (
                    <>
                      Temp:{session.temperature}
                      <br />
                      Humidity:{session.humidity}%
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  Avg Weight:{session.averageWeight}
                </td>
              ) : (
                <></>
              )}
              <td className={styles.contentItem}>{session.user}</td>
              <td className={styles.contentItem}>
                {/* {session.notes ? <Button>N</Button> : ""} */}
                <div>{session.notes}</div>
                {session.type === "issue" ? (
                  session.resolved === false ? (
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        props.endSession(
                          { resolved: true },
                          props.thisStage,
                          session
                        );
                      }}
                    >
                      Resolve
                    </Button>
                  ) : (
                    <span>Resolved</span>
                  )
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
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
