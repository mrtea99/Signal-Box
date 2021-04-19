import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import TableHeader from "../TableHeader/TableHeader.js";
import SessionItem from "./SessionItem/SessionItem.js";

import getItemType from "../../utils/getItemType.js";

import styles from "./SessionList.module.css";

import { selectStageSessions } from "./sessionsSlice.js";

import { useTranslation } from "react-i18next";

/**
 * Displays a list of all sessions in a stage.
 * Also shows an 'overview' with totals.
 */

function SessionList(props) {
  const { t } = useTranslation();

  const thisStageData = useSelector((state) =>
    selectStageSessions(state, props.currentRunId, props.thisStage)
  );

  const itemName = getItemType(props.thisStage);

  const columns = [
    { copy: t("№"), className: `${styles.colNumber} ${styles.colFixed}` },
    { copy: t("Activity"), className: styles.colActivity },
    {
      copy: t("Start Time"),
      className: `${styles.colStartTime} ${styles.colFixed}`,
    },
    {
      copy: t("Duration"),
      className: `${styles.colDuration} ${styles.colFixed}`,
    },
    { copy: itemName, className: `${styles.colItemsGood} ${styles.colFixed}` },
    {
      copy: t("Defective"),
      className: `${styles.colItemsBad} ${styles.colFixed}`,
    },
    { copy: t("Users"), className: `${styles.colTech} ${styles.colFixed}` },
    { copy: t("Action"), className: `${styles.colAction} ${styles.colFixed}` },
    { copy: t("Info"), className: `${styles.colInfo} ${styles.colFixed}` },
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
