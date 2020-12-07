import React from "react";

import TableHeader from "../TableHeader/TableHeader.js";
import RunListAllItem from "./RunListAllItem/RunListAllItem.js";
import RunListStageItem from "./RunListStageItem/RunListStageItem.js";

// import useStageStatus from "../../hooks/useStageStatus.js";

import styles from "./RunList.module.css";

function RunList(props) {
  let columns;
  if (props.stageNum === "all") {
    columns = [
      { copy: "Prep" },
      { copy: "Craft" },
      { copy: "Package" },
      { copy: "Label" },
      { copy: "Stock" },
    ];
  } else {
    columns = [
      { copy: "Product", className: styles.colProduct },
      { copy: "Status", className: styles.colStatus },
      { copy: "Progress", className: styles.colProgress },
      { copy: "User", className: styles.colSingle },
      { copy: "QA", className: styles.colSingle },
      { copy: "Issues", className: styles.colSingle },
      { copy: "Open", className: styles.colIconButton },
    ];
  }

  let filteredRunData = props.runData;

  // Only show runs edited by users listed in an array
  if (props.filters.showUser && props.stageNum !== "all") {
    filteredRunData = filteredRunData.filter((run) => {
      let userSession = false;
      run.stages[props.stageNum].sessions.forEach((session) => {
        if (props.filters.showUser.includes(session.user)) {
          userSession = true;
        }
      });
      return userSession;
    });
  }

  // Show runs with unresolved QA sessions
  if (props.filters.showUnresolvedQa && props.stageNum !== "all") {
    filteredRunData = filteredRunData.filter((run) => {
      let unresolvedQa = false;

      run.stages[props.stageNum].sessions.forEach((session) => {
        if (session.type === "qa" && !session.resolved) {
          unresolvedQa = true;
        }
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
        {filteredRunData.length ? (
          filteredRunData.map((run, index) =>
            props.stageNum === "all" ? (
              <div className={styles.itemRow} key={index}>
                <RunListAllItem
                  runData={run}
                  activeUser={props.activeUser}
                  setCurrentRunUid={props.setCurrentRunUid}
                  setActiveStage={props.setActiveStage}
                  stageNameArr={columns.map((col) => {
                    return col.copy;
                  })}
                />
              </div>
            ) : (
              <div className={styles.itemRow} key={index}>
                <RunListStageItem
                  runData={run}
                  stageNum={props.stageNum}
                  activeUser={props.activeUser}
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

export default RunList;
