import React from "react";

import SessionList from "../SessionList/SessionList.js";
import StageStatus from "../StageStatus/StageStatus.js";

function StageOverview(props) {
  const stageNameArr = [
    "Preparation",
    "Manufacture",
    "Packaging",
    "Labeling",
    "Stocking",
  ];

  return (
    <article>
      {stageNameArr.map((stageName, index) => (
        <section key={stageName}>
          <h3>
            {stageName}
            {": "}
            <StageStatus
              runData={props.thisRunData}
              stageNum={index}
              label={true}
            />
          </h3>
          <SessionList thisStage={index} thisRunData={props.thisRunData} />
        </section>
      ))}
    </article>
  );
}

export default StageOverview;
