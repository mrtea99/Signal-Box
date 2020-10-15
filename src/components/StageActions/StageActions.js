import React from "react";

import Button from "../Button/Button.js";

import useStageStatus from "../../hooks/useStageStatus.js";

function StageActions(props) {
  const [
    stageActive,
    stageStatusName,
    stageStatusIcon,
    stageSessionCount,
    stageStatusNext,
  ] = useStageStatus(props.thisRunData, props.thisStage);

  const inactiveMessage = function (status) {
    switch (status) {
      case "complete":
        return "Complete stage";
      case "skipped":
        return "Skip stage";
      case "paused":
        return "Complete for now";
      case "pending":
        return "Complete for now";
      default:
        return "End Stage";
    }
  };

  return (
    <>
      {stageActive ? (
        <div>
          {stageStatusName !== "working" ? (
            <Button
              onClick={() => {
                props.updateStageActive(false, props.thisStage);
                // if (stageStatusNext !== "pending") {
                //   props.updateStageActive(true, props.thisStage + 1);
                // }
              }}
            >
              {inactiveMessage(stageStatusNext)}
            </Button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div>
          {stageStatusName === "pending"?
        (<p>
          Is there is work to be done?
          <Button
            onClick={() => props.updateStageActive(true, props.thisStage)}
          >
            Yes
          </Button>
        </p>)
        : (<p>
          Stage {stageStatusName}
          <Button
            onClick={() => props.updateStageActive(true, props.thisStage)}
          >
            Undo
          </Button>
        </p>)
        }
          
        </div>
      )}
    </>
  );
}

export default StageActions;
