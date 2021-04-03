import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import TableHeader from "../TableHeader/TableHeader.js";
import SessionItem from "./SessionItem/SessionItem.js";

import getItemType from "../../utils/getItemType.js";

import styles from "./SessionList.module.css";

import { selectStageSessions } from "./sessionsSlice.js";

function SessionList(props) {
  const thisStageData = useSelector((state) =>
    selectStageSessions(state, props.currentRunId, props.thisStage)
  );

  const itemName = getItemType(props.thisStage);

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
      <ul className={styles.sessionList}>
        {thisStageData
          .slice(0)
          .reverse()
          .map((session, index) => (
            <li
              className={styles.sessionListItem}
              key={"sli-" + session.sessionId}
            >
              <SessionItem
                session={session}
                itemCount={thisStageData.length - index}
                thisStage={props.thisStage}
                columns={columns}
                currentRunId={props.currentRunId}
              />
            </li>
          ))}

        <SessionItem
          overview
          currentRunId={props.currentRunId}
          thisStage={props.thisStage}
          columns={columns}
        />
      </ul>
    </div>
  );
}

SessionList.propTypes = {
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default SessionList;
