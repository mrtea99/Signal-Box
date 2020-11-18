import React from "react";
import styles from "./RunList.module.css";

import TableHeader from "../TableHeader/TableHeader.js";

function RunList(props) {

  const stageNameArr = ["Prep", "Craft", "Package", "Label", "Stock"];

  const openEditor = function (runUid, stageNum) {
    props.setCurrentRunUid(runUid);
    props.setActiveStage(stageNum);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <TableHeader items={stageNameArr} />
      </header>
      <div>
        {props.runData.length ? (
          props.runData.map((run, index) => (
            <></>
          ))
        ) : (
          <h3>No Runs Available</h3>
        )}
      </div>
    </div>
  );
}

export default RunList;
