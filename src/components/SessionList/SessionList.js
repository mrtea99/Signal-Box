import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import TableHeader from "../TableHeader/TableHeader.js";
import SessionItem from "./SessionItem/SessionItem.js";

import getItemType from "../../utils/getItemType.js";

import styles from "./SessionList.module.css";

import { selectStageSessions } from "../RunList/runsSlice.js";

function SessionList(props) {
  const thisStageData = useSelector((state) =>
    selectStageSessions(state, props.currentRunUid, props.thisStage)
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
                thisStageData={thisStageData}
                itemCount={thisStageData.length - index}
                thisStage={props.thisStage}
                columns={columns}
                currentRunUid={props.currentRunUid}
              />
            </li>
          ))}

        <SessionItem
          overview
          thisStageData={thisStageData}
          currentRunUid={props.currentRunUid}
          columns={columns}
        />
      </ul>
    </div>
  );
}

SessionList.propTypes = {
  thisRunData: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
  currentRunUid: PropTypes.number.isRequired,
};

export default SessionList;
