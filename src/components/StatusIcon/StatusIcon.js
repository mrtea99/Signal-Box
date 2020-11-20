import React from "react";

import InfoPod from "../InfoPod/InfoPod.js";
import InfoPodSection from "../InfoPod/InfoPodSection/InfoPodSection.js";
import StatusPodItem from "../StatusPodItem/StatusPodItem.js";

function StatusIcon(props) {
  return (
    <InfoPod>
      {props.label ? (
        <InfoPodSection>
          <StatusPodItem
            coreStyle="label"
            statusField="label"
            stageStatus={props.stageStatus}
          />
        </InfoPodSection>
      ) : null}
      <InfoPodSection
        flags={[
          <StatusPodItem
            key="issue"
            statusField="issue"
            stageStatus={props.stageStatus}
          />,
          <StatusPodItem
            key="qa"
            statusField="qa"
            stageStatus={props.stageStatus}
          />,
          <StatusPodItem
            key="user"
            statusField="user"
            stageStatus={props.stageStatus}
          />,
        ]}
      >
        <StatusPodItem
          key="user"
          statusField="completion"
          stageStatus={props.stageStatus}
          stageNum={props.stageNum}
        />
      </InfoPodSection>
    </InfoPod>
  );
}

export default StatusIcon;
