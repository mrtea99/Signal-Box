import React from "react";
import PropTypes from "prop-types";

import InfoPod from "../InfoPod/InfoPod.js";
import InfoPodSection from "../InfoPod/InfoPodSection/InfoPodSection.js";
import StatusPodItem from "../StatusPodItem/StatusPodItem.js";

import getStageStatus from "../../utils/getStageStatus.js";

function StageStatus(props) {
  const stageStatus = getStageStatus(
    props.runData,
    props.stageNum,
    props.activeUser
  );

  return (
    <InfoPod fullWidth={props.fullWidth}>
      {props.label ? (
        <InfoPodSection>
          <StatusPodItem
            key="label"
            coreStyle="label"
            statusField="label"
            stageStatus={stageStatus}
          />
        </InfoPodSection>
      ) : null}
      <InfoPodSection
        layout={props.layout}
        bubbles={[
          <StatusPodItem
            key="note"
            statusField="note"
            stageStatus={stageStatus}
          />,
          <StatusPodItem
            key="issue"
            statusField="issue"
            stageStatus={stageStatus}
          />,
          <StatusPodItem
            key="blocker"
            statusField="blocker"
            stageStatus={stageStatus}
          />,
          <StatusPodItem key="qa" statusField="qa" stageStatus={stageStatus} />,
          <StatusPodItem
            key="user"
            statusField="user"
            stageStatus={stageStatus}
          />,
        ]}
      >
        <StatusPodItem
          key="user"
          statusField="completion"
          stageStatus={stageStatus}
          stageNum={props.stageNum}
        />
      </InfoPodSection>
    </InfoPod>
  );
}

StageStatus.propTypes = {
  runData: PropTypes.object.isRequired,
  stageNum: PropTypes.number.isRequired,
  activeUser: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  label: PropTypes.bool,
  layout: PropTypes.oneOf(["horiz", "vert"]),
};

export default StageStatus;
