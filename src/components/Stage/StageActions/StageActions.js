import React from "react";
import PropTypes from "prop-types";

import getStageStatus from "../../../utils/getStageStatus.js";

import Button from "../../Button/Button.js";
import Modal from "../../Modal/Modal.js";
import ConsignItems from "../../ConsignItems/ConsignItems.js";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer.js";

import styles from "./StageActions.module.css";

function StageActions(props) {
  const stageStatus = getStageStatus(props.thisRunData, props.thisStage);

  const [modalActive, setModalActive] = React.useState(false);

  const inactiveMessage = function (status) {
    switch (status) {
      case "complete":
        return "End stage";
      case "skipped":
        return "Skip stage";
      case "paused":
        return "Pause stage";
      case "pending":
        return "Set stage to pending";
      default:
        return "Complete Stage";
    }
  };

  const completeStage = function () {
    props.updateStageActive(false, props.thisStage);
    setModalActive(false);
  };
  return (
    <div className={styles.stageActions}>
      {props.thisStage === 0 || props.thisStage === 4 ? (
        stageStatus.stageActive ? (
          <>
            {stageStatus.stageStatusName !== "working" ? (
              <div>
                {stageStatus.issueActive ||
                stageStatus.blockerActive ||
                stageStatus.qaActive ? (
                  <p>
                    Cannot complete stage until qa is complete and issues are
                    resolved
                  </p>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setModalActive(true);
                      }}
                      fillWidth
                      color="complete"
                      icon="tick"
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
                          ) : null}
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
                    ) : null}
                  </>
                )}
              </div>
            ) : null}
          </>
        ) : (
          <div>
            {stageStatus.stageStatusName === "pending" ? (
              <div>
                <Button
                  onClick={() => props.updateStageActive(true, props.thisStage)}
                  fillWidth
                >
                  Start stage
                </Button>
              </div>
            ) : (
              <div>
                <h3>Stage {stageStatus.stageStatusName}</h3>
                <Button
                  onClick={() => props.updateStageActive(true, props.thisStage)}
                  fillWidth
                >
                  Undo
                </Button>
              </div>
            )}
          </div>
        )
      ) : (
        <div>
          <ConsignItems
            thisRunData={props.thisRunData}
            thisStage={props.thisStage}
            updateRunData={props.updateRunData}
            stageStatus={stageStatus}
            updateStageActive={props.updateStageActive}
            addSession={props.addSession}
            activeUser={props.activeUser}
          />
        </div>
      )}
    </div>
  );
}

StageActions.propTypes = {
  thisRunData: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
  updateStageActive: PropTypes.func.isRequired,
  setCurrentRunUid: PropTypes.func.isRequired,
  setActiveStage: PropTypes.func.isRequired,
  updateRunData: PropTypes.func.isRequired,
  addSession: PropTypes.func.isRequired,
  activeUser: PropTypes.string.isRequired,
};

export default StageActions;
