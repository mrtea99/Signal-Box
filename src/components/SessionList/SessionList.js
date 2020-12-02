import React, { useContext } from "react";

import TimeFormater from "../TimeFormater/TimeFormater.js";
import Timer from "../Timer/Timer.js";
import FlagCloser from "../FlagCloser/FlagCloser.js";
import CheckCloser from "../CheckCloser/CheckCloser.js";
import ModalControl from "../Modal/ModalControl/ModalControl.js";
import Repeater from "./Repeater/Repeater.js";
import TableHeader from "../TableHeader/TableHeader.js";

import styles from "./SessionList.module.css";

import TimeFormatContext from "../../contexts/TimeFormatContext.js";
import DateFormatContext from "../../contexts/DateFormatContext.js";

function SessionList(props) {
  const timeFormat = useContext(TimeFormatContext);
  const dateFormat = useContext(DateFormatContext);

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

    const fullYear = dateObj.getFullYear();
    const shortYear = fullYear.toString().slice(-2);
    const month = addLeadingZero(dateObj.getMonth() + 1);
    const day = addLeadingZero(dateObj.getDate());

    let dateString;
    switch (dateFormat) {
      default:
      case "ymd":
        dateString = `${fullYear}-${month}-${day}`;
        break;
      case "mdy":
        dateString = `${month}/${day}/${shortYear}`;
        break;
    }

    return dateString;
  };

  const formatTime = function (time) {
    const dateObj = new Date(time);

    const dateHours = dateObj.getHours();
    let hour;
    let afterWords = "";

    switch (timeFormat) {
      default:
      case "24h":
        hour = addLeadingZero(dateHours);
        break;
      case "12h":
        if (dateHours < 12) {
          afterWords = "am";
        } else {
          afterWords = "pm";
        }

        if (dateHours > 12) {
          hour = dateHours - 12;
        } else {
          hour = dateHours;
        }

        if (dateHours === 0) {
          hour = 12;
        }
        break;
    }

    const min = addLeadingZero(dateObj.getMinutes());
    const sec = addLeadingZero(dateObj.getSeconds());

    return `${hour}:${min}:${sec}${afterWords}`;
  };

  const formatDateTime = function (date) {
    return (
      <time dateTime={new Date(date).toISOString()}>
        <span className={styles.date}>{formatDate(date)}</span>
        <br />
        <span className={styles.time}>{formatTime(date)}</span>
      </time>
    );
  };

  const formatActivity = function (name) {
    switch (name) {
      case "qa":
        return "QA Check";
      case "issue":
        return "Issue";
      case "deactivate":
        return "Complete Stage";
      case "activate":
        return "Undo Complete Stage";
      case "consign":
        return "Consignment";
      default:
        return "Activity";
    }
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

  // const findTotalEndTime = function () {
  //   if (newestEndTime === 0) {
  //     return "-";
  //   } else {
  //     return (
  //       <>
  //         {formatDate(newestEndTime)}
  //         <br />
  //         {formatTime(newestEndTime)}
  //       </>
  //     );
  //   }
  // };

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

  const formatDuration = function (session) {
    return (
      <>
        {session.endTime ? (
          session.startTime === session.endTime ? (
            "-"
          ) : (
            <TimeFormater
              rawTime={new Date(session.endTime) - new Date(session.startTime)}
            />
          )
        ) : (
          <Timer startTime={session.startTime} />
        )}
      </>
    );
  };

  // const findTotalCount = function (propertyName) {
  //   let total = 0;

  //   for (let i = 0; i < thisStageData.length; i++) {
  //     const sessionValue = thisStageData[i][propertyName];

  //     if (sessionValue) {
  //       total = total + sessionValue;
  //     }
  //   }

  //   return total;
  // };

  // const itemName = props.thisStage === 1 ? "Batches" : "Units";
  let itemName;
  switch (props.thisStage) {
    case 1:
      itemName = "Batches";
      break;
    case 2:
    case 3:
      itemName = "Units";
      break;
    default:
      itemName = "Items";
      break;
  }

  const columns = [
    { copy: "№", className: styles.colNumber },
    { copy: "Activity", className: styles.colActivity },
    { copy: "Start Time", className: styles.colStartTime },
    { copy: "Duration", className: styles.colDuration },
    { copy: itemName, className: styles.colItemsGood },
    { copy: "Defective", className: styles.colItemsBad },
    { copy: "Technician", className: styles.colTech },
    { copy: "Action", className: styles.colAction },
    { copy: "Info", className: styles.colInfo },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <TableHeader items={columns} />
      </header>
      <div>
        {thisStageData
          .slice(0)
          .reverse()
          .map((session, index) => (
            <ul
              className={`${styles.itemRow} ${
                styles["itemRow--" + session.type]
              } ${
                session.resolved
                  ? styles.itemRowResolved
                  : styles.itemRowUnresolved
              }`}
              key={index}
            >
              <li className={`${styles.contentItem} ${styles.colNumber}`}>
                {thisStageData.length - index}
              </li>
              <li className={`${styles.contentItem} ${styles.colActivity}`}>
                {session.type === "work"
                  ? session.activity.name
                  : formatActivity(session.type)}
              </li>
              <li className={`${styles.contentItem} ${styles.colStartTime}`}>
                <span className={styles.cellLabel}>Start Time:</span>
                <span className={styles.cellContent}>
                  {formatDateTime(session.startTime)}
                </span>
              </li>
              <li className={`${styles.contentItem} ${styles.colDuration}`}>
                <span className={styles.cellLabel}>Duration:</span>
                <span className={styles.cellContent}>
                  {formatDuration(session)}
                </span>
              </li>
              <li className={`${styles.contentItem} ${styles.colItemsGood}`}>
                <span className={styles.cellLabel}>{itemName}:</span>
                <span className={styles.cellContent}>
                  {session.amount === undefined || session.amount === null
                    ? "-"
                    : session.amount}
                </span>
              </li>
              <li className={`${styles.contentItem} ${styles.colItemsBad}`}>
                <span className={styles.cellLabel}>Defective:</span>
                <span className={styles.cellContent}>
                  {session.amountBad === undefined || session.amount === null
                    ? "-"
                    : session.amountBad}
                </span>
              </li>
              <li className={`${styles.contentItem} ${styles.colTech}`}>
                <span className={styles.cellLabel}>Technician:</span>
                <span className={styles.cellContent}>{session.user}</span>
              </li>
              <li className={`${styles.contentItem} ${styles.colAction}`}>
                {session.type === "issue" ? (
                  <FlagCloser
                    thisStage={props.thisStage}
                    session={session}
                    endSession={props.endSession}
                  />
                ) : null}
                {session.type === "qa" ? (
                  <CheckCloser
                    thisStage={props.thisStage}
                    session={session}
                    endSession={props.endSession}
                  />
                ) : null}
              </li>
              <li className={`${styles.contentItem} ${styles.colInfo}`}>
                <ModalControl
                  title="Session Details"
                  triggerCopy={""}
                  buttonAttrs={{ icon: "details" }}
                >
                  <h3>
                    {session.type === "work"
                      ? session.activity.name
                      : formatActivity(session.type)}
                  </h3>
                  <p>Session ID: {session.sessionUid}</p>
                  <p>
                    Resolved: {session.resolved ? "Resolved" : "Unresolved"}
                  </p>
                  <p>Start Time: {formatDateTime(session.startTime)}</p>
                  {session.endTime ? (
                    <p>End Time: {formatDateTime(session.startTime)}</p>
                  ) : null}
                  <p>Duration: {formatDuration(session)}</p>
                  <p>Technician: {session.user}</p>
                  <p>
                    {itemName}: {session.amount}
                  </p>
                  <p>Defective: {session.amountBad}</p>
                  {/* <p>averageweight</p> */}
                  {session.notes && session.notes.length ? (
                    <p>
                      Notes:
                      <br />
                      {session.notes.split("\n").map((item, key) => {
                        return (
                          <span key={key}>
                            {item}
                            <br />
                          </span>
                        );
                      })}
                    </p>
                  ) : null}
                  {session.type === "qa" ? (
                    <>
                      <p>Checker: {session.checker}</p>
                      <p>Timeframe: {session.timeframe}</p>
                    </>
                  ) : null}
                </ModalControl>
              </li>
            </ul>
          ))}

        <div className={`${styles.itemRow} ${styles.itemRowTotals}`}>
          <div className={`${styles.contentItem} ${styles.colNumber}`}></div>
          <div className={`${styles.contentItem} ${styles.colActivity}`}>
            Overall
          </div>
          <div className={`${styles.contentItem} ${styles.colStartTime}`}>
            {thisStageData.length ? (
              <>
                {formatDate(thisStageData[0].startTime)}
                <br />
                {formatTime(thisStageData[0].startTime)}
              </>
            ) : (
              "-"
            )}
          </div>
          <div className={`${styles.contentItem} ${styles.colDuration}`}>
            {newestEndTime ? (
              <>{findTotalDuration()}</>
            ) : (
              <Repeater interval={333} callback={findTotalDuration} />
            )}
          </div>
          <div className={`${styles.contentItem} ${styles.colItemsGood}`}></div>
          <div className={`${styles.contentItem} ${styles.colItemsBad}`}></div>
          <div className={`${styles.contentItem} ${styles.colTech}`}></div>
          <div className={`${styles.contentItem} ${styles.colAction}`}></div>
          <div className={`${styles.contentItem} ${styles.colInfo}`}></div>
        </div>
      </div>
    </div>
  );
}

export default SessionList;
