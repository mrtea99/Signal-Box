import React, { useContext } from "react";

import TimeFormater from "../TimeFormater/TimeFormater.js";
import Timer from "../Timer/Timer.js";
import FlagCloser from "../FlagCloser/FlagCloser.js";
import CheckCloser from "../CheckCloser/CheckCloser.js";
import ModalControl from "../Modal/ModalControl/ModalControl.js";
import Repeater from "./Repeater/Repeater.js";

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

  return (
    <table className={styles.container}>
      <thead className={styles.header}>
        <tr>
          <th className={styles.headerItem}>№</th>
          <th className={styles.headerItem}>Activity</th>
          <th className={styles.headerItem}>Start Time</th>
          {/* <th className={styles.headerItem}>Finish Time</th> */}
          <th className={styles.headerItem}>Duration</th>
          {props.thisStage === 1 ? (
            <th className={`${styles.headerItem} ${styles.headerItemItems}`}>
              Batches
            </th>
          ) : (
            <></>
          )}
          {props.thisStage === 2 || props.thisStage === 3 ? (
            <th className={`${styles.headerItem} ${styles.headerItemItems}`}>
              Units
            </th>
          ) : (
            <></>
          )}
          {props.thisStage === 1 ||
          props.thisStage === 2 ||
          props.thisStage === 3 ? (
            <th className={styles.headerItem}>Defective</th>
          ) : (
            <></>
          )}
          {/* {props.thisStage === 1 ||
          props.thisStage === 2 ||
          props.thisStage === 3 ? (
            <th className={styles.headerItem}>Data</th>
          ) : (
            <></>
          )} */}
          <th className={styles.headerItem}>Technician</th>
          <th className={styles.headerItem}>Action</th>
          <th className={styles.headerItem}>Note</th>
        </tr>
      </thead>
      <tbody>
        {thisStageData
          .slice(0)
          .reverse()
          .map((session, index) => (
            <tr
              key={session.sessionUid + index}
              className={`${styles.itemRow} ${
                styles["itemRow--" + session.type]
              }`}
            >
              <td className={styles.contentItem}>
                {thisStageData.length - index}
              </td>
              <td className={`${styles.contentItem} ${styles.contentItemName}`}>
                {session.type === "work"
                  ? session.activity.name
                  : formatActivity(session.type)}
              </td>
              <td className={styles.contentItem}>
                <time dateTime={new Date(session.startTime).toISOString()}>
                  <span className={styles.date}>
                    {formatDate(session.startTime)}
                  </span>
                  <br />
                  <span className={styles.time}>
                    {formatTime(session.startTime)}
                  </span>
                </time>
              </td>
              {/* <td className={styles.contentItem}>
                {session.endTime ? (
                  <time dateTime={new Date(session.endTime).toISOString()}>
                    <span className={styles.date}>
                      {formatDate(session.endTime)}
                    </span>
                    <br />
                    <span className={styles.time}>
                      {formatTime(session.endTime)}
                    </span>
                  </time>
                ) : (
                  "-"
                )}
              </td> */}
              <td className={styles.contentItem}>
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
              </td>
              {props.thisStage === 1 ||
              props.thisStage === 2 ||
              props.thisStage === 3 ? (
                <>
                  <td className={styles.contentItem}>
                    {session.amount === undefined || session.amount === null
                      ? "-"
                      : session.amount}
                  </td>
                  <td className={styles.contentItem}>
                    {session.amountBad === undefined || session.amount === null
                      ? "-"
                      : session.amountBad}
                  </td>
                </>
              ) : (
                <></>
              )}
              {/* {props.thisStage === 1 ||
              props.thisStage === 2 ||
              props.thisStage === 3 ? (
                <td className={styles.contentItem}>
                  {session.temperature ? <>Temp: {session.temperature}°C<br /></> : <></>}
                  {session.humidity ? <>Humidity: {session.humidity}%<br /></> : <></>}
                  {session.averageWeight ? <>Avg Weight: {session.averageWeight}<br /></> : <></>}
                </td>
              ) : (
                <></>
              )} */}
              <td className={styles.contentItem}>{session.user}</td>
              <td className={styles.contentItem}>
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
              </td>
              <td className={styles.contentItem}>
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
              </td>
            </tr>
          ))}
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
          {/* <td className={styles.contentItem}>{findTotalEndTime()}</td> */}
          <td className={styles.contentItem}>
            {newestEndTime ? (
              <>{findTotalDuration()}</>
            ) : (
              <Repeater interval={333} callback={findTotalDuration} />
            )}
          </td>
          {props.thisStage === 1 ||
          props.thisStage === 2 ||
          props.thisStage === 3 ? (
            <>
              <td className={styles.contentItem}>
                {/* {findTotalCount("amount")} */}
              </td>
              <td className={styles.contentItem}>
                {/* {findTotalCount("amountBad")} */}
              </td>
            </>
          ) : (
            <></>
          )}
          {/* {props.thisStage === 1 ||
          props.thisStage === 2 ||
          props.thisStage === 3 ? (
            <td className={styles.contentItem}></td>
          ) : (
            <></>
          )} */}
          <td className={styles.contentItem}></td>
          <td className={styles.contentItem}></td>
          <td className={styles.contentItem}></td>
        </tr>
      </tbody>
    </table>
  );
}

export default SessionList;
