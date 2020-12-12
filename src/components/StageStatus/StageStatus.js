import React from "react";

import InfoPod from "../InfoPod/InfoPod.js";
import InfoPodSection from "../InfoPod/InfoPodSection/InfoPodSection.js";
import StatusPodItem from "../StatusPodItem/StatusPodItem.js";

import useStageStatus from "../../hooks/useStageStatus.js";

function StageStatus(props) {


  const stageStatus = useStageStatus(
    props.runData,
    props.stageNum,
    props.activeUser
  );

  return (
    <InfoPod fullWidth={props.fullWidth}>
      {props.label ? (
        <InfoPodSection>
          <StatusPodItem
            coreStyle="label"
            statusField="label"
            stageStatus={stageStatus}
          />
        </InfoPodSection>
      ) : null}
      <InfoPodSection layout={props.layout}
        flags={[
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

export default StageStatus;
