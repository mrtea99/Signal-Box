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
    <div className={styles.wrapper}>
      <header className={styles.tableHeader}>
        <TableHeader items={columns} />
      </header>
      <div>
        {thisStageData
          .slice(0)
          .reverse()
          .map((session, index) => (
            <div
              className={`${styles.tableItemRow} ${
                styles["tableItemRow--" + session.type]
              } ${
                session.resolved
                  ? styles.tableItemRowResolved
                  : styles.tableItemRowUnresolved
              }`}
              key={index}
            >
              <div className={`${styles.tableContentItem} ${styles.colNumber}`}>
                {thisStageData.length - index}
              </div>
              <div
                className={`${styles.tableContentItem} ${styles.colActivity}`}
              >
                {session.type === "work"
                  ? session.activity.name
                  : formatActivity(session.type)}
              </div>
              <div
                className={`${styles.tableContentItem} ${styles.colStartTime}`}
              >
                <time dateTime={new Date(session.startTime).toISOString()}>
                  <span className={styles.date}>
                    {formatDate(session.startTime)}
                  </span>
                  <br />
                  <span className={styles.time}>
                    {formatTime(session.startTime)}
                  </span>
                </time>
              </div>
              <div
                className={`${styles.tableContentItem} ${styles.colDuration}`}
              >
                {session.endTime ? (
                  session.startTime === session.endTime ? (
                    "-"
                  ) : (
                    <TimeFormater
                      rawTime={
                        new Date(session.endTime) - new Date(session.startTime)
                      }
                    />
                  )
                ) : (
                  <Timer startTime={session.startTime} />
                )}
              </div>
              <div
                className={`${styles.tableContentItem} ${styles.colItemsGood}`}
              >
                {session.amount === undefined || session.amount === null
                  ? "-"
                  : session.amount}
              </div>
              <div
                className={`${styles.tableContentItem} ${styles.colItemsBad}`}
              >
                {session.amountBad === undefined || session.amount === null
                  ? "-"
                  : session.amountBad}
              </div>
              <div className={`${styles.tableContentItem} ${styles.colTech}`}>
                {session.user}
              </div>
              <div className={`${styles.tableContentItem} ${styles.colAction}`}>
                {session.type === "issue" ? (
                  <FlagCloser
                    thisStage={props.thisStage}
                    session={session}
                    endSession={props.endSession}
                  />
                ) : (
                  <></>
                )}
                {session.type === "qa" ? (
                  <CheckCloser
                    thisStage={props.thisStage}
                    session={session}
                    endSession={props.endSession}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className={`${styles.tableContentItem} ${styles.colInfo}`}>
                {session.notes && session.notes.length ? (
                  <ModalControl
                    title="Session Notes"
                    triggerCopy={""}
                    buttonAttrs={{ icon: "details" }}
                  >
                    {session.notes.split("\n").map((item, key) => {
                      return (
                        <span key={key}>
                          {item}
                          <br />
                        </span>
                      );
                    })}
                  </ModalControl>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}

        <div className={`${styles.tableItemRow} ${styles.tableItemRowTotals}`}>
          <div
            className={`${styles.tableContentItem} ${styles.colNumber}`}
          ></div>
          <div className={`${styles.tableContentItem} ${styles.colActivity}`}>
            Overall
          </div>
          <div className={`${styles.tableContentItem} ${styles.colStartTime}`}>
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
          <div className={`${styles.tableContentItem} ${styles.colDuration}`}>
            {newestEndTime ? (
              <>{findTotalDuration()}</>
            ) : (
              <Repeater interval={333} callback={findTotalDuration} />
            )}
          </div>
          <div
            className={`${styles.tableContentItem} ${styles.colItemsGood}`}
          ></div>
          <div
            className={`${styles.tableContentItem} ${styles.colItemsBad}`}
          ></div>
          <div className={`${styles.tableContentItem} ${styles.colTech}`}></div>
          <div
            className={`${styles.tableContentItem} ${styles.colAction}`}
          ></div>
          <div className={`${styles.tableContentItem} ${styles.colInfo}`}></div>
        </div>
      </div>
    </div>
  );
}

export default SessionList;
