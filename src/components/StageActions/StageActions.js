import React from "react";

import Button from "../Button/Button.js";

import useStageStatus from "../../hooks/useStageStatus.js";

function StageActions(props) {
  const [
    stageActive,
    stageStatusName,
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
        return "Pause stage";
      case "pending":
        return "Set stage to pending";
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
          There is no work ready to be done for this stage
          <Button
            onClick={() => props.updateStageActive(true, props.thisStage)}
          >
            Start anyway
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
