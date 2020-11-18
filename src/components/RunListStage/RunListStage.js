import React from "react";

import RunListStageItem from "./RunListStageItem/RunListStageItem.js";

function RunListStage(props) {
  return (
    <>
      {props.runData.length ? (
        props.runData.map((run, index) => (
          <RunListStageItem
            key={run.uid}
            runData={run}
            stageNum={props.stageNum}
          />
        ))
      ) : (
        <h3>No Runs Available</h3>
      )}
    </>
  );
}

export default RunListStage;
