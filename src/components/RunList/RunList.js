import React from "react";

import TableHeader from "../TableHeader/TableHeader.js";
import RunListAllItem from "./RunListAllItem/RunListAllItem.js";
import RunListStageItem from "./RunListStageItem/RunListStageItem.js";

import styles from "./RunList.module.css";

function RunList(props) {
  let columns;
  if (props.stageNum === "all") {
    columns = ["Prep", "Craft", "Package", "Label", "Stock"];
  } else {
    columns = ["Product", "Progress", "User", "QA", "Issues", "Open"];
  }

  return (
    <div>
      <header className={styles.header}>
        <TableHeader items={columns} />
      </header>
      <div>
        {props.runData.length ? (
          props.runData.map((run, index) =>
            props.stageNum === "all" ? (
              <div className={styles.itemRow} key={index}>
                <RunListAllItem
                  runData={run}
                  activeUser={props.activeUser}
                  setCurrentRunUid={props.setCurrentRunUid}
                  setActiveStage={props.setActiveStage}
                  stageNameArr={columns}
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
