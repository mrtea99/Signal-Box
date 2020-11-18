import React from "react";

import TableHeader from "../TableHeader/TableHeader.js";
import RunListAllItem from "./RunListAllItem/RunListAllItem.js";

import RunListStageItem from "./RunListStageItem/RunListStageItem.js";

function RunList(props) {
  let columns;
  if (props.stageNum === "all") {
    columns = ["Prep", "Craft", "Package", "Label", "Stock"];
  } else {
    columns = ["Product", "Progress", "User", "QA", "Issues", "Open"];
  }

  return (
    <div>
      <header>
        <TableHeader items={columns} />
      </header>
      <div>
        {props.runData.length ? (
          props.runData.map((run, index) =>
            props.stageNum === "all" ? (
              <RunListAllItem
                key={run.uid}
                runData={run}
                activeUser={props.activeUser}
                setCurrentRunUid={props.setCurrentRunUid}
                setActiveStage={props.setActiveStage}
                stageNameArr={columns}
              />
            ) : (
              <RunListStageItem
                key={run.uid}
                runData={run}
                stageNum={props.stageNum}
                activeUser={props.activeUser}
                setCurrentRunUid={props.setCurrentRunUid}
                setActiveStage={props.setActiveStage}
              />
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
