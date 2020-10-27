import React from "react";

import Button from "../Button/Button.js";

import useStageStatus from "../../hooks/useStageStatus.js";
import Modal from "../Modal/Modal.js";

function StageActions(props) {
  const stageStatus = useStageStatus(props.thisRunData, props.thisStage);

  const [modalActive, setModalActive] = React.useState(false);

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

  const completeStage = function () {
    props.updateStageActive(false, props.thisStage);
    setModalActive(false);

    // if (stageStatus.stageStatusNext !== "pending") {
    //   props.updateStageActive(true, props.thisStage + 1);
    // }
  };
  //updateStageActive={updateStageActive}
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
                <>
                  <Button
                    onClick={() => {
                      setModalActive(true);
                    }}
                  >
                    {inactiveMessage(stageStatus.stageStatusNext)}
                  </Button>
                  {modalActive ? (
                    <Modal>
                      {/* <Button onClick={completeStage}>
                        {inactiveMessage(stageStatus.stageStatusNext)}
                      </Button>
                      <br /> */}
                      <Button
                        onClick={() => {
                          completeStage();
                          props.setCurrentRunUid(null);
                        }}
                      >
                        {inactiveMessage(stageStatus.stageStatusNext)} &amp;
                        exit
                      </Button>
                      {props.thisStage !== 5 ? (
                        <>
                          <br />
                          <Button
                            onClick={() => {
                              completeStage();
                              props.setActiveStage(props.thisStage + 1);
                            }}
                          >
                            {inactiveMessage(stageStatus.stageStatusNext)} &amp;
                            go to next stage
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </Modal>
                  ) : (
                    <></>
                  )}
                </>
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
              <Button
                onClick={() => props.updateStageActive(true, props.thisStage)}
              >
                Start stage
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
