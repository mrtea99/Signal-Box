import React from "react";

import SessionList from "../SessionList/SessionList.js";
import StageStatus from "../StageStatus/StageStatus.js";

function StageOverview(props) {
  const stageNameArr = [
    "Preparation",
    "Manufacturing",
    "Packaging",
    "Labeling",
    "Stocking",
  ];

  return (
    <article>
      <h2>
        Run status:{" "}
        <StageStatus
          runData={props.thisRunData}
          stageNum={[1, 2, 3, 4]}
          label={true}
        />
      </h2>
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
