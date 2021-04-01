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
              currentRunUid={props.currentRunUid}
              stageNum={index}
              label
            />
          </h3>
          <SessionList
            thisStage={index}
            thisRunData={props.thisRunData}
            endSession={props.endSession}
            updateSession={props.updateSession}
            currentRunUid={props.currentRunUid}
          />
        </section>
      ))}
    </article>
  );
}

StageOverview.propTypes = {
  thisRunData: PropTypes.object.isRequired,
  currentRunUid: PropTypes.number.isRequired,
};

export default StageOverview;
