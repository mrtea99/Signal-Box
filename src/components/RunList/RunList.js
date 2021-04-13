import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import TableHeader from "../TableHeader/TableHeader.js";
import RunListAllItem from "./RunListAllItem/RunListAllItem.js";
import RunListStageItem from "./RunListStageItem/RunListStageItem.js";

import styles from "./RunList.module.css";

import { selectAllRuns } from "./runsSlice.js";

import stageNames from "../../data/stageNames.json";

import { useTranslation } from "react-i18next";

function RunList(props) {
  const { t } = useTranslation();

  // Columns
  // --------------------------------
  let columns;
  if (props.stageNum === "all") {
    columns = stageNames.map((stageName) => ({
      copy: stageName,
    }));
  } else {
    columns = [
      { copy: t("Product"), className: styles.colProduct },
      { copy: t("Status"), className: styles.colStatus },
      { copy: t("Progress"), className: styles.colProgress },
      { copy: t("User"), className: styles.colSingle },
      { copy: t("QA"), className: styles.colSingle },
      { copy: t("Flags"), className: styles.colSingle },
      { copy: t("Open"), className: styles.colIconButton },
    ];
  }

  // Filters
  // --------------------------------
  const sessionsList = useSelector((state) => state.sessions.sessionsList);

  const runsList = useSelector(selectAllRuns);
  let filteredRunsList = [...runsList];

  // Only show runs edited by users listed in an array
  if (props.filters.showUser && props.filters.showUser.length) {
    const userRunIds = [];

    sessionsList.forEach((session) => {
      if (
        (props.stageNum === "all" || props.stageNum === session.stage) &&
        props.filters.showUser.includes(session.user)
      ) {
        userRunIds.push(session.runId);
      }
    });

    filteredRunsList = filteredRunsList.filter((run) => {
      return userRunIds.includes(run.id);
    });
  }

  // Only show runs edited by users listed in an array
  if (props.filters.showUnresolvedQa) {
    const unresolvedRunIds = [];

    sessionsList.forEach((session) => {
      if (
        (props.stageNum === "all" || props.stageNum === session.stage) &&
        session.type === "qa" &&
        !session.endTime
      ) {
        unresolvedRunIds.push(session.runId);
      }
    });

    filteredRunsList = filteredRunsList.filter((run) => {
      return unresolvedRunIds.includes(run.id);
    });
  }

  return (
    <div>
      <header className={styles.header}>
        <TableHeader items={columns} />
      </header>
      <div>
        {filteredRunsList.length ? (
          filteredRunsList.map((run, index) =>
            props.stageNum === "all" ? (
              <div className={styles.itemRow} key={run.id}>
                <RunListAllItem currentRunId={run.id} />
              </div>
            ) : (
              <div className={styles.itemRow} key={run.id}>
                <RunListStageItem
                  currentRunId={run.id}
                  stageNum={props.stageNum}
                  columns={columns}
                />
              </div>
            )
          )
        ) : (
          <h3>{t("No Runs Available")}</h3>
        )}
      </div>
    </div>
  );
}

RunList.propTypes = {
  stageNum: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(["all"])])
    .isRequired,
  filters: PropTypes.object.isRequired,
};

export default RunList;
