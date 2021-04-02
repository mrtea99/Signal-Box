import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import InfoPod from "../InfoPod/InfoPod.js";
import InfoPodSection from "../InfoPod/InfoPodSection/InfoPodSection.js";
import StatusPodItem from "./StatusPodItem/StatusPodItem.js";

import getStageStatus from "../../utils/getStageStatus.js";

import { selectRun } from "../RunList/runsSlice.js";
import { selectStageSessions } from "../SessionList/sessionsSlice.js";

function StageStatus(props) {
  const activeUser = useSelector((state) => state.users.currentUser);

  const thisStageData = useSelector((state) =>
    selectRun(state, props.currentRunUid)
  );
  const thisStageSessions = useSelector((state) =>
    selectStageSessions(state, props.currentRunUid, props.stageNum)
  );

  const stageStatus = getStageStatus(
    thisStageData,
    thisStageSessions,
    props.stageNum,
    activeUser
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
        viewMode={props.viewMode}
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
            key="assign"
            statusField="assign"
            stageStatus={stageStatus}
          />,
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
  stageNum: PropTypes.number.isRequired,
  fullWidth: PropTypes.bool,
  label: PropTypes.bool,
  layout: PropTypes.oneOf(["horiz", "vert"]),
  currentRunUid: PropTypes.number.isRequired,
};

export default StageStatus;
