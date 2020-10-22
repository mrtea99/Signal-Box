import React from "react";

import Button from "../Button/Button.js";

import useStageStatus from "../../hooks/useStageStatus.js";

function StageActions(props) {
  const stageStatus = useStageStatus(props.thisRunData, props.thisStage);

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
      {stageStatus.stageIsActive ? (
        <>
          {stageStatus.stageStatusName !== "working" ? (
            <div>
              {stageStatus.issueActive || stageStatus.qaActive ? (
                <p>
                  Cannot complete until qa is complete and issues are resolved
                </p>
              ) : (
                <Button
                  onClick={() => {
                    props.updateStageActive(false, props.thisStage);

                    // if (stageStatus.stageStatusNext !== "pending") {
                    //   props.updateStageActive(true, props.thisStage + 1);
                    // }
                  }}
                >
                  {inactiveMessage(stageStatus.stageStatusNext)}
                </Button>
              )}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div>
          {stageStatus.stageStatusName === "pending" ? (
            <p>
              There is no work ready to be done for this stage
              <Button
                onClick={() => props.updateStageActive(true, props.thisStage)}
              >
                Start anyway
              </Button>
            </p>
          ) : (
            <p>
              Stage {stageStatus.stageStatusName}
              <Button
                onClick={() => props.updateStageActive(true, props.thisStage)}
              >
                Undo
              </Button>
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default StageActions;
