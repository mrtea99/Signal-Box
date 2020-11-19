import React from "react";

import InfoPod from "../InfoPod/InfoPod.js";
import InfoPodSection from "../InfoPod/InfoPodSection/InfoPodSection.js";
// import InfoPodItem from "../InfoPod/InfoPodItem/InfoPodItem.js";

// import styles from "./StatusIcon.module.css";

// import { ReactComponent as Checkmark } from "./checkmark.svg";
// import { ReactComponent as Pause } from "./pause.svg";
// import { ReactComponent as ArrowRight } from "./arrow-right.svg";
import StatusPodItem from "../StatusPodItem/StatusPodItem.js";

function StatusIcon(props) {
  return (
    <InfoPod>
      {props.label ? (
        <InfoPodSection>
          <StatusPodItem
            type="label"
            statusField="label"
            stageStatus={props.stageStatus}
          />
        </InfoPodSection>
      ) : null}
      <InfoPodSection
        flags={[
          <StatusPodItem
            key="issue"
            type="flag"
            statusField="issue"
            stageStatus={props.stageStatus}
          />,
          <StatusPodItem
            key="qa"
            type="flag"
            statusField="qa"
            stageStatus={props.stageStatus}
          />,
          <StatusPodItem
            key="user"
            type="flag"
            statusField="user"
            stageStatus={props.stageStatus}
          />,
        ]}
      >
        <StatusPodItem
          key="user"
          type="core"
          statusField="completion"
          stageStatus={props.stageStatus}
          stageNum={props.stageNum}
        />
      </InfoPodSection>
    </InfoPod>
  );
}

export default StatusIcon;
