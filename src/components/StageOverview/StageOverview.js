import React from "react";
import PropTypes from "prop-types";

import SessionList from "../SessionList/SessionList.js";
import StageStatus from "../StageStatus/StageStatus.js";

import stageNames from "../../data/stageNames.json";

function StageOverview(props) {
  return (
    <article>
      {stageNames.map((stageName, index) => (
        <section key={stageName}>
          <h3>
            {stageName}
            {": "}
            <StageStatus
              currentRunId={props.currentRunId}
              stageNum={index}
              label
            />
          </h3>
          <SessionList
            thisStage={index}
            currentRunId={props.currentRunId}
          />
        </section>
      ))}
    </article>
  );
}

StageOverview.propTypes = {
  currentRunId: PropTypes.number.isRequired,
};

export default StageOverview;
