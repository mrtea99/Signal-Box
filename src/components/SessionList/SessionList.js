import React, { useContext } from "react";

import TimeFormater from "../DurationFormatter/DurationFormatter.js";
import Timer from "../Timer/Timer.js";
import FlagCloser from "../FlagCloser/FlagCloser.js";
import CheckCloser from "../CheckCloser/CheckCloser.js";
import ModalControl from "../Modal/ModalControl/ModalControl.js";
import Repeater from "./Repeater/Repeater.js";
import TableHeader from "../TableHeader/TableHeader.js";
import DateTimeFormatter from "../DateTimeFormatter/DateTimeFormatter.js";

import getItemType from "../../utils/getItemType.js";

import styles from "./SessionList.module.css";

function SessionList(props) {
  const thisStageData =
    props.thisRunData["stages"][props.thisStage]["sessions"];

  const translatePriority = function (count, caps) {
    switch (count) {
      case 0:
        return caps ? "Note" : "note";
      case 1:
        return caps ? "Issue" : "issue";
      case 2:
        return caps ? "Blocker" : "blocker";
      default:
        return "N/A";
    }
  };

  const formatActivity = function (session) {
    switch (session.type) {
      case "work":
        return session.activity.name;
      case "qa":
        return "QA Check";
      case "flag":
        return "Flag: " + translatePriority(session.amount, true);
      case "deactivate":
        return "Complete Stage";
      case "activate":
        return "Undo Complete Stage";
      case "consign":
        return "Consignment";
      case "assign":
        return "Assignment";
      default:
        return "Activity";
    }
  };

  let allResolved = true;
  for (let i = 0; i < thisStageData.length; i++) {
    if (!thisStageData[i].endTime) {
      allResolved = false;
    }
  }

  const findTotalDuration = function () {
    let totalDuration = 0;

    for (let i = 0; i < thisStageData.length; i++) {
      if (thisStageData[i].type !== "assign") {
        if (thisStageData[i].endTime) {
          totalDuration =
            totalDuration +
            (thisStageData[i].endTime - thisStageData[i].startTime);
        } else {
          totalDuration =
            totalDuration + (Date.now() - thisStageData[i].startTime);
        }
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

  let itemName = getItemType(props.thisStage);

  const columns = [
    { copy: "№", className: `${styles.colNumber} ${styles.colFixed}` },
    { copy: "Activity", className: styles.colActivity },
    {
      copy: "Start Time",
      className: `${styles.colStartTime} ${styles.colFixed}`,
    },
    { copy: "Duration", className: `${styles.colDuration} ${styles.colFixed}` },
    { copy: itemName, className: `${styles.colItemsGood} ${styles.colFixed}` },
    {
      copy: "Defective",
      className: `${styles.colItemsBad} ${styles.colFixed}`,
    },
    { copy: "Users", className: `${styles.colTech} ${styles.colFixed}` },
    { copy: "Action", className: `${styles.colAction} ${styles.colFixed}` },
    { copy: "Info", className: `${styles.colInfo} ${styles.colFixed}` },
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
                styles[
                  "itemRow--" +
                    (session.type === "flag"
                      ? translatePriority(session.amount, false)
                      : session.type)
                ]
              } ${
                session.endTime
                  ? styles.itemRowResolved
                  : styles.itemRowUnresolved
              }`}
              key={session.sessionId}
            >
              <li
                className={`${styles.contentItem} ${styles.colNumber} ${styles.colFixed}`}
              >
                {thisStageData.length - index}
              </li>
              <li className={`${styles.contentItem} ${styles.colActivity}`}>
                {formatActivity(session)}
              </li>
              <li
                className={`${styles.contentItem} ${styles.colStartTime} ${styles.colFixed}`}
              >
                <span className={styles.cellLabel}>Start Time:</span>
                <span className={styles.cellContent}>
                  <DateTimeFormatter date={session.startTime} />
                </span>
              </li>
              <li
                className={`${styles.contentItem} ${styles.colDuration} ${styles.colFixed}`}
              >
                <span className={styles.cellLabel}>Duration:</span>
                <span className={styles.cellContent}>
                  {formatDuration(session)}
                </span>
              </li>
              <li
                className={`${styles.contentItem} ${styles.colItemsGood} ${styles.colFixed}`}
              >
                <span className={styles.cellLabel}>{itemName}:</span>
                <span className={styles.cellContent}>
                  {session.amount === undefined ||
                  session.amount === null ||
                  session.type === "flag"
                    ? "-"
                    : session.amount}
                </span>
              </li>
              <li
                className={`${styles.contentItem} ${styles.colItemsBad} ${styles.colFixed}`}
              >
                <span className={styles.cellLabel}>Defective:</span>
                <span className={styles.cellContent}>
                  {session.amountBad === undefined || session.amount === null
                    ? "-"
                    : session.amountBad}
                </span>
              </li>
              <li
                className={`${styles.contentItem} ${styles.colTech} ${styles.colFixed}`}
              >
                <span className={styles.cellLabel}>Users:</span>
                <span className={styles.cellContent}>
                  {/* {session.user} */}
                  {/* todo get actual name */}
                  {session.user === "1" ? "Jesus Sandoval" : "Amanda Kezios"}
                  {session.secondaryUser
                    ? " / " +
                      (session.secondaryUser === "1"
                        ? "Jesus Sandoval"
                        : "Amanda Kezios")
                    : null}
                </span>
              </li>
              <li
                className={`${styles.contentItem} ${styles.colAction} ${styles.colFixed}`}
              >
                {session.type === "flag" ? (
                  <FlagCloser
                    key={session.sessionId}
                    thisStage={props.thisStage}
                    session={session}
                    endSession={props.endSession}
                    updateSession={props.updateSession}
                    activeUser={props.activeUser}
                  />
                ) : null}
                {session.type === "qa" ? (
                  <CheckCloser
                    key={session.sessionId}
                    thisStage={props.thisStage}
                    session={session}
                    endSession={props.endSession}
                  />
                ) : null}
              </li>
              <li
                className={`${styles.contentItem} ${styles.colInfo} ${styles.colFixed}`}
              >
                <ModalControl
                  title="Session Details"
                  triggerCopy={""}
                  buttonAttrs={{
                    icon:
                      session.notes && session.notes.length
                        ? "detailsAlt"
                        : "details",
                  }}
                >
                  <h3>
                    {session.type === "work"
                      ? session.activity.name
                      : formatActivity(session.type)}
                  </h3>
                  <p>Session ID: {session.sessionId}</p>
                  <p>Resolved: {session.endTime ? "Resolved" : "Unresolved"}</p>
                  <p>
                    Start Time: <DateTimeFormatter date={session.startTime} />
                  </p>
                  {session.endTime ? (
                    <p>
                      End Time: <DateTimeFormatter date={session.endTime} />
                    </p>
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
                      <p>Checker: {session.secondaryUser}</p>
                      <p>Timeframe: {session.extra}</p>
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
            <span className={styles.cellLabel}>Start Time:</span>
            <span className={styles.cellContent}>
              {thisStageData.length ? (
                <DateTimeFormatter
                  date={thisStageData[0].startTime}
                  splitLines="true"
                />
              ) : (
                "-"
              )}
            </span>
          </div>
          <div className={`${styles.contentItem} ${styles.colDuration}`}>
            <span className={styles.cellLabel}>Duration:</span>
            <span className={styles.cellContent}>
              {allResolved ? (
                findTotalDuration()
              ) : (
                <Repeater interval={333} callback={findTotalDuration} />
              )}
            </span>
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

SessionList.propTypes = {};

export default SessionList;
