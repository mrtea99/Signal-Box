import React from "react";

import Stage from "../Stage/Stage.js";
import StageNav from "../StageNav/StageNav.js";
// import TableHeader from "../TableHeader/TableHeader.js";

function StageControl(props) {
  const stageNameArr = ["Prep", "Craft", "Package", "Label", "Stock"];

  return (
    <>
      {/* <TableHeader
        items={[
          { copy: "Prep" },
          { copy: "Craft" },
          { copy: "Package" },
          { copy: "Label" },
          { copy: "Stock" },
        ]}
      /> */}

      <StageNav
        stageNameArr={stageNameArr}
        currentRunUid={props.currentRunUid}
        activeStage={props.activeStage}
        buttonCallback={props.setActiveStage}
        updateRunData={props.updateRunData}
        thisRunData={props.thisRunData}
        activeUser={props.activeUser}
        stageLabels
        showActive
      />

      <Stage
        key={props.currentRunUid + stageNameArr[props.activeStage]}
        thisStage={props.activeStage}
        stageName={stageNameArr[props.activeStage]}
        activeStage={props.activeStage}
        thisRunData={props.thisRunData}
        currentRunUid={props.currentRunUid}
        updateRunData={props.updateRunData}
        activeUser={props.activeUser}
        setCurrentRunUid={props.setCurrentRunUid}
        setActiveStage={props.setActiveStage}
      />
    </>
  );
}

export default StageControl;
