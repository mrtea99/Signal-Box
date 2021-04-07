import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import getStageStatus from "../../../../utils/getStageStatus.js";

import Button from "../../../Button/Button.js";
import Modal from "../../../Modal/Modal.js";
import ConsignItems from "../../../ConsignItems/ConsignItems.js";
import ButtonSpacer from "../../../Button/ButtonSpacer/ButtonSpacer.js";

import styles from "./StageActions.module.css";

import { selectRun } from "../../../RunList/runsSlice.js";
import { selectStageSessions } from "../../../SessionList/sessionsSlice.js";

function StageActions(props) {
  const thisRunData = useSelector((state) =>
    selectRun(state, props.currentRunId)
  );
  const thisStageSessions = useSelector((state) =>
    selectStageSessions(state, props.currentRunId, props.thisStage)
  );
  const stageStatus = getStageStatus(
    thisRunData,
    thisStageSessions,
    props.thisStage
  );

  const [modalActive, setModalActive] = useState(false);

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

  let history = useHistory();
  const completeStageAndExit = function () {
    completeStage();
    history.push("/");
  };

  const completeStageAndNext = function () {
    completeStage();
    history.push(`/run/${props.currentRunId}/${props.thisStage + 1}`);
  };

  const blockComplete = Boolean(
    stageStatus.issueActive ||
      stageStatus.blockerActive ||
      stageStatus.qaActive ||
      stageStatus.assignActive
  );

  return (
    <div className={styles.stageActions}>
      {props.thisStage === 0 || props.thisStage === 4 ? (
        stageStatus.stageActive ? (
          <>
            {stageStatus.stageStatusName !== "working" ? (
              <div>
                {blockComplete ? (
                  <p>
                    Cannot complete stage until all QA, Assignment, and Flag
                    sessions are resolved.
                  </p>
                ) : null}
                <>
                  <Button
                    onClick={() => {
                      setModalActive(true);
                    }}
                    fillWidth
                    color="complete"
                    icon="tick"
                    disabled={blockComplete}
                  >
                    {inactiveMessage(stageStatus.stageStatusNext)}
                  </Button>
                  {modalActive ? (
                    <Modal setActive={setModalActive}>
                      <ButtonSpacer direction="vert">
                        <Button onClick={completeStage}>
                          {inactiveMessage(stageStatus.stageStatusNext)}
                        </Button>
                        <br />
                        <Button
                          onClick={() => {
                            completeStageAndExit();
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
                                completeStageAndNext();
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
                  Undo Complete Stage
                </Button>
              </div>
            )}
          </div>
        )
      ) : (
        <div>
          <ConsignItems
            currentRunId={props.currentRunId}
            thisStage={props.thisStage}
            stageStatus={stageStatus}
            updateStageActive={props.updateStageActive}
          />
        </div>
      )}
    </div>
  );
}

StageActions.propTypes = {
  thisStage: PropTypes.number.isRequired,
  updateStageActive: PropTypes.func.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default StageActions;
