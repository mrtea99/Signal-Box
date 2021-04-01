import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import TableHeader from "../TableHeader/TableHeader.js";
import RunListAllItem from "./RunListAllItem/RunListAllItem.js";
import RunListStageItem from "./RunListStageItem/RunListStageItem.js";

import styles from "./RunList.module.css";

import { selectAllRuns } from "./runsSlice.js";

import stageNames from "../../data/stageNames.json";

function RunList(props) {
  let columns;
  if (props.stageNum === "all") {
    columns = stageNames.map((stageName) => ({
      copy: stageName,
    }));
  } else {
    columns = [
      { copy: "Product", className: styles.colProduct },
      { copy: "Status", className: styles.colStatus },
      { copy: "Progress", className: styles.colProgress },
      { copy: "User", className: styles.colSingle },
      { copy: "QA", className: styles.colSingle },
      { copy: "Flags", className: styles.colSingle },
      { copy: "Open", className: styles.colIconButton },
    ];
  }

  const runsList = useSelector(selectAllRuns);
  let filteredRunsList = [...runsList];

  // Only show runs edited by users listed in an array
  if (props.filters.showUser && props.filters.showUser.length) {
    filteredRunsList = filteredRunsList.filter((run) => {
      let userSession = false;
      const visibleStages =
        props.stageNum === "all" ? run.stages : [run.stages[props.stageNum]];

      visibleStages.forEach((stage) => {
        stage.sessions.forEach((session) => {
          if (props.filters.showUser.includes(session.user)) {
            userSession = true;
          }
        });
      });

      return userSession;
    });
  }

  // Show runs with unresolved QA sessions
  if (props.filters.showUnresolvedQa) {
    filteredRunsList = filteredRunsList.filter((run) => {
      let unresolvedQa = false;
      const visibleStages =
        props.stageNum === "all" ? run.stages : [run.stages[props.stageNum]];

      visibleStages.forEach((stage) => {
        stage.sessions.forEach((session) => {
          if (session.type === "qa" && !session.endTime) {
            unresolvedQa = true;
          }
        });
      });
      return unresolvedQa;
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
                <RunListAllItem
                  runData={run}
                  currentRunUid={run.id}
                  setCurrentRunUid={props.setCurrentRunUid}
                  setActiveStage={props.setActiveStage}
                />
              </div>
            ) : (
              <div className={styles.itemRow} key={run.id}>
                <RunListStageItem
                  runData={run}
                  currentRunUid={run.id}
                  stageNum={props.stageNum}
                  setCurrentRunUid={props.setCurrentRunUid}
                  setActiveStage={props.setActiveStage}
                  columns={columns}
                />
              </div>
            )
          )
        ) : (
          <h3>No Runs Available</h3>
        )}
      </div>
    </div>
  );
}

RunList.propTypes = {
  stageNum: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(["all"])])
    .isRequired,
  filters: PropTypes.object.isRequired,
  setCurrentRunUid: PropTypes.func.isRequired,
  setActiveStage: PropTypes.func.isRequired,
};

export default RunList;
