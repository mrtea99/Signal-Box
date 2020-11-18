import React from "react";

import TableHeader from "../TableHeader/TableHeader.js";
import RunListAllItem from "./RunListAllItem/RunListAllItem.js";

import RunListStageItem from "./RunListStageItem/RunListStageItem.js";

function RunListStage(props) {
  return (
    <div>
      <header>
        <TableHeader
          items={props.columns}
        />
      </header>
      {props.runData.length ? (
        props.runData.map((run, index) =>
          props.stageNum === "all" ? (
            <RunListAllItem
              key={run.uid}
              runData={run}
              activeUser={props.activeUser}
              setCurrentRunUid={props.setCurrentRunUid}
              setActiveStage={props.setActiveStage}
              stageNameArr={props.columns}
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
  );
}

export default RunListStage;
