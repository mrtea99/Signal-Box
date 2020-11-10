import React from "react";

import Button from "../Button/Button.js";

import useStageStatus from "../../hooks/useStageStatus.js";
import Modal from "../Modal/Modal.js";
import ConsignItems from "../ConsignItems/ConsignItems.js";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer.js";

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
  };
  return (
    <>
      {props.thisStage === 0 || props.thisStage === 4 ? (
        stageStatus.stageActive ? (
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
                      fillWidth
                      color="complete"
                    >
                      {inactiveMessage(stageStatus.stageStatusNext)}
                    </Button>
                    {modalActive ? (
                      <Modal>
                        <ButtonSpacer direction="vert">
                          <Button onClick={completeStage}>
                            {inactiveMessage(stageStatus.stageStatusNext)}
                          </Button>
                          <br />
                          <Button
                            onClick={() => {
                              completeStage();
                              props.setCurrentRunUid(null);
                            }}
                          >
                            {inactiveMessage(stageStatus.stageStatusNext)} &amp;
                            exit
                          </Button>
                          {props.thisStage !== 4 ? (
                            <>
                              <br />
                              <Button
                                onClick={() => {
                                  completeStage();
                                  props.setActiveStage(props.thisStage + 1);
                                }}
                              >
                                {inactiveMessage(stageStatus.stageStatusNext)}{" "}
                                &amp; go to next stage
                              </Button>
                            </>
                          ) : (
                            <></>
                          )}
                          <br />
                          <Button
                            onClick={() => {
                              setModalActive(false);
                            }}
                            color="cancel"
                          >
                            Cancel
                          </Button>
                        </ButtonSpacer>
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
                  fillWidth
                >
                  Start stage
                </Button>
              </p>
            ) : (
              <p>
                Stage {stageStatus.stageStatusName}
                <Button
                  onClick={() => props.updateStageActive(true, props.thisStage)}
                  fillWidth
                >
                  Undo
                </Button>
              </p>
            )}
          </div>
        )
      ) : (
        <div>
          <ConsignItems
            thisRunData={props.thisRunData}
            thisStage={props.thisStage}
            updateRunData={props.updateRunData}
          />
        </div>
      )}
    </>
  );
}

export default StageActions;
