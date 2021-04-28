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

import { useTranslation } from "react-i18next";

/**
 * Controls to update stage state.
 */

function StageActions(props) {
  const { t } = useTranslation();

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

  const completeStage = function () {
    props.updateStageActive(false, props.thisStage);
    setModalActive(false);
  };

  let history = useHistory();
  const completeStageAndExit = function () {
    completeStage();

    const backLoc = window.localStorage.getItem("editorBackLoc") || "/";
    history.push(backLoc);
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
                {blockComplete ? <p>{t("Completion not possible")}</p> : null}
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
                    {t("Complete Stage")}
                  </Button>
                  {modalActive ? (
                    <Modal
                      setActive={setModalActive}
                      title={t("Complete Stage")}
                      controls={
                        <Button
                          onClick={() => {
                            setModalActive(false);
                          }}
                          color="cancel"
                        >
                          {t("Cancel")}
                        </Button>
                      }
                    >
                      <ButtonSpacer direction="vert">
                        <Button onClick={completeStage}>
                          {t("Complete Stage")}
                        </Button>
                        <br />
                        <Button
                          onClick={() => {
                            completeStageAndExit();
                          }}
                        >
                          {t("Complete Stage and Exit")}
                        </Button>
                        {props.thisStage !== 4 ? (
                          <>
                            <br />
                            <Button
                              onClick={() => {
                                completeStageAndNext();
                              }}
                            >
                              {t("Complete Stage and go to next stage")}
                            </Button>
                          </>
                        ) : null}
                      </ButtonSpacer>
                    </Modal>
                  ) : null}
                </>
              </div>
            ) : null}
          </>
        ) : (
          <div>
            <div>
              <h3>
                {t("Stage Status")}: {stageStatus.stageStatusName}
              </h3>
              <Button
                onClick={() => props.updateStageActive(true, props.thisStage)}
                fillWidth
              >
                {t("Undo Complete Stage")}
              </Button>
            </div>
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
