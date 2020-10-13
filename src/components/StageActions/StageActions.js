import React from "react";

import Button from "../Button/Button.js";

// import useStageStatus from "../../hooks/useStageStatus.js";

function StageActions(props) {
  // const [
  //   stageActive,
  //   stageStatusName,
  //   stageStatusIcon,
  //   stageSessionCount,
  // ] = useStageStatus(props.thisRunData, props.thisStage);

  return (
    <>
      {!props.stageActive ? (
        <div>
          <p>
            Stage complete
            <Button
              onClick={() => props.updateStageActive(true, props.thisStage)}
            >
              Undo
            </Button>
          </p>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => {
              props.updateStageActive(false, props.thisStage);
              props.updateStageActive(true, props.thisStage + 1);
            }}
          >
            Complete Stage
          </Button>
        </div>
      )}
    </>
  );
}

export default StageActions;
