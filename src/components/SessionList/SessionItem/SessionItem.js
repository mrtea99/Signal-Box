import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import DateTimeFormatter from "../../DateTimeFormatter/DateTimeFormatter.js";
import SessionDuration from "../SessionDuration/SessionDuration.js";
import FlagCloser from "../../FlagCloser/FlagCloser.js";
import AssignmentCloser from "../../AssignmentCloser/AssignmentCloser.js";
import CheckCloser from "../../CheckCloser/CheckCloser.js";
import ModalControl from "../../Modal/ModalControl/ModalControl.js";
import SessionDetails from "../SessionDetails/SessionDetails.js";
import DurationFormatter from "../../DurationFormatter/DurationFormatter.js";
import Repeater from "../Repeater/Repeater.js";
import UserName from "../../UserSwitcher/UserName/UserName.js";

import getFlagName from "../../../utils/getFlagName.js";
import getSessionName from "../../../utils/getSessionName.js";

import styles from "./SessionItem.module.css";

import ViewModeContext from "../../../contexts/ViewModeContext.js";

import { selectStageSessions } from "../../SessionList/sessionsSlice.js";

import { useTranslation } from "react-i18next";

/**
 * Displays a session item for the session list.
 */

function SessionItem({
  session,
  itemCount,
  overview,
  thisStage,
  columns,
  currentRunId,
}) {
  const { t } = useTranslation();

  const viewMode = useContext(ViewModeContext);
  const simpleMode = viewMode === "simple";

  const thisStageData = useSelector((state) =>
    selectStageSessions(state, currentRunId, thisStage)
  );

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
            (new Date(thisStageData[i].endTime) -
              new Date(thisStageData[i].startTime));
        } else {
          totalDuration =
            totalDuration + (Date.now() - new Date(thisStageData[i].startTime));
        }
      }
    }

    return <DurationFormatter rawTime={totalDuration} ticking={!allResolved} />;
  };

  return (
    <>
      {!overview ? (
        <ul
          className={`${styles.itemRow} ${
            styles[
              "itemRow--" +
                (session.type === "flag"
                  ? getFlagName(session.amount, false)
                  : session.type)
            ]
          } ${
            session.endTime ? styles.itemRowResolved : styles.itemRowUnresolved
          }`}
          key={session.sessionId}
        >
          {/* count ---------- */}
          <li
            className={`${styles.contentItem} ${styles.colNumber} ${styles.colFixed} ${columns[0].className}`}
          >
            {itemCount}
          </li>
          {/* name ---------- */}
          <li
            className={`${styles.contentItem} ${styles.colActivity} ${columns[1].className}`}
          >
            {getSessionName(session)}
          </li>
          {/* start time ---------- */}
          <li
            className={`${styles.contentItem} ${styles.colStartTime} ${columns[2].className}`}
          >
            <span className={styles.cellLabel}>{columns[2].copy}:</span>
            <span className={styles.cellContent}>
              <DateTimeFormatter date={session.startTime} />
            </span>
          </li>
          {/* duration ---------- */}
          <li
            className={`${styles.contentItem} ${styles.colDuration} ${columns[3].className} `}
          >
            <span className={styles.cellLabel}>{columns[3].copy}:</span>
            <span className={styles.cellContent}>
              <SessionDuration session={session} />
            </span>
          </li>
          {/* items ---------- */}
          <li
            className={`${styles.contentItem} ${styles.colItemsGood} ${columns[4].className}`}
          >
            <span className={styles.cellLabel}>{columns[4].copy}:</span>
            <span className={styles.cellContent}>
              {session.amount === undefined ||
              session.amount === null ||
              session.type === "flag"
                ? "-"
                : session.amount}
            </span>
          </li>
          {/* defective items ---------- */}
          <li
            className={`${styles.contentItem} ${styles.colItemsBad} ${columns[5].className}`}
          >
            <span className={styles.cellLabel}>{columns[5].copy}:</span>
            <span className={styles.cellContent}>
              {session.amountBad === undefined || session.amount === null
                ? "-"
                : session.amountBad}
            </span>
          </li>
          {/* users ---------- */}
          <li
            className={`${styles.contentItem} ${styles.colTech} ${columns[6].className}`}
          >
            <span className={styles.cellLabel}>{columns[6].copy}:</span>
            <span className={styles.cellContent}>
              <UserName userId={session.user} />
              {session.secondaryUser ? (
                <>
                  {" / "}
                  <UserName userId={session.secondaryUser} />
                </>
              ) : null}
            </span>
          </li>
          {/* action ---------- */}
          <li
            className={`${styles.contentItem} ${styles.colAction} ${columns[7].className}`}
          >
            {session.type === "flag" ? (
              <FlagCloser
                key={session.sessionId}
                thisStage={thisStage}
                session={session}
                currentRunId={currentRunId}
              />
            ) : null}
            {session.type === "assign" && !simpleMode ? (
              <AssignmentCloser
                key={session.sessionId}
                thisStage={thisStage}
                session={session}
                currentRunId={currentRunId}
              />
            ) : null}
            {session.type === "qa" ? (
              <CheckCloser
                key={session.sessionId}
                thisStage={thisStage}
                session={session}
                currentRunId={currentRunId}
              />
            ) : null}
          </li>
          {/* details ---------- */}
          <li
            className={`${styles.contentItem} ${styles.colInfo} ${columns[8].className}`}
          >
            <ModalControl
              title={t("Session Details")}
              triggerCopy={""}
              buttonAttrs={{
                icon:
                  session.notes && session.notes.length
                    ? "detailsAlt"
                    : "details",
              }}
            >
              <SessionDetails session={session} />
            </ModalControl>
          </li>
        </ul>
      ) : (
        <ul className={`${styles.itemRow} ${styles.itemRowTotals}`}>
          <li
            className={`${styles.contentItem} ${styles.colNumber} ${columns[0].className}`}
          ></li>
          <li
            className={`${styles.contentItem} ${styles.colActivity} ${columns[1].className}`}
          >
            {t("Overall")}
          </li>
          <li
            className={`${styles.contentItem} ${styles.colStartTime} ${columns[2].className}`}
          >
            <span className={styles.cellLabel}>{columns[2].copy}:</span>
            <span className={styles.cellContent}>
              {thisStageData.length ? (
                <DateTimeFormatter
                  date={thisStageData[0].startTime}
                  splitLines
                />
              ) : (
                "-"
              )}
            </span>
          </li>
          <li
            className={`${styles.contentItem} ${styles.colDuration} ${columns[3].className}`}
          >
            <span className={styles.cellLabel}>{columns[3].copy}:</span>
            <span className={styles.cellContent}>
              {allResolved ? (
                findTotalDuration()
              ) : (
                <Repeater interval={333} callback={findTotalDuration} />
              )}
            </span>
          </li>
          <li
            className={`${styles.contentItem} ${styles.colItemsGood} ${columns[4].className}`}
          ></li>
          <li
            className={`${styles.contentItem} ${styles.colItemsBad} ${columns[5].className}`}
          ></li>
          <li
            className={`${styles.contentItem} ${styles.colTech} ${columns[6].className}`}
          ></li>
          <li
            className={`${styles.contentItem} ${styles.colAction} ${columns[7].className}`}
          ></li>
          <li
            className={`${styles.contentItem} ${styles.colInfo} ${columns[8].className}`}
          ></li>
        </ul>
      )}
    </>
  );
}

SessionItem.propTypes = {
  session: PropTypes.object,
  itemCount: PropTypes.number,
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  overview: PropTypes.bool,
};

export default SessionItem;
