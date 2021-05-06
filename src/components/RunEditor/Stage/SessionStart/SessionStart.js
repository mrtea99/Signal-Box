import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";

import SessionStartForm from "./SessionStartForm/SessionStartForm.js";
import Button from "../../../Button/Button.js";
import Modal from "../../../Modal/Modal.js";
import AssignmentList from "../../../AssignmentOpener/AssignmentList/AssignmentList.js";

import { selectRun } from "../../../RunList/runsSlice.js";
import { selectStageSessions } from "../../../SessionList/sessionsSlice.js";
import { selectCurrentUser } from "../../../UserSwitcher/usersSlice.js";

// import stageNames from "../../../../data/stageNames.json";
import activityList from "../../../../data/activities.json";

import { useTranslation } from "react-i18next";

/**
 * Dialog to start a work session.
 */

function SessionStart(props) {
  const { t } = useTranslation();

  const activeUser = useSelector(selectCurrentUser);

  const thisRunData = useSelector((state) =>
    selectRun(state, props.currentRunId)
  );

  const { runId, stageNum, sessionId } = useParams();
  let history = useHistory();

  const [modalActive, setModalActive] = useState(sessionId === "start");

  const defaultFormData = {
    activity: activityList[props.thisStage][0],
    atmosData: [],
  };

  const [formData, setFormData] = useState(defaultFormData);

  const resetFormData = function () {
    setFormData(defaultFormData);
  };

  const closeModal = function () {
    setModalActive(false);

    history.push(`/run/${runId}/${stageNum}`);
  };

  const handleOpen = function () {
    setResolvedAssignments(findDefaultResolved());
    resetFormData();
    setModalActive(true);
  };

  const dispatch = useDispatch();

  const handleSubmit = function () {
    const newsessionId = Date.now();

    // Dispatch new session
    //---------------------------------
    const newSession = {
      sessionId: newsessionId,
      runId: props.currentRunId,
      // stage: stageNames[props.thisStage],
      stage: props.thisStage,
      type: "work",
      startTime: new Date().toISOString(),
      endTime: null,
      activity: formData.activity,
      user: activeUser,
      secondaryUser: parseInt(formData.assistor),
    };

    dispatch({
      type: "sessions/add",
      payload: {
        sessionData: newSession,
      },
    });

    // Dispatch resolved assignments
    //---------------------------------
    resolvedAssignments.forEach((sessionId) => {
      dispatch({
        type: "sessions/update",
        payload: {
          sessionId: sessionId,
          extraData: { endTime: new Date().toISOString() },
        },
      });
    });

    // Dispatch batched Atmos Data
    //---------------------------------
    if (formData.atmosData.length) {
      formData.atmosData.forEach((atmosItem) => {
        const newAtmosItem = {
          ...atmosItem,
          sessionId: newsessionId,
          runId: props.currentRunId,
        };

        dispatch({
          type: "atmos/add",
          payload: newAtmosItem,
        });
      });
    }

    // If the run has "Not Started" staus then change it to "In Progress"
    //---------------------------------
    if (thisRunData.status === "Not Started") {
      dispatch({
        type: "runs/update",
        payload: {
          runId: props.currentRunId,
          dataSection: null,
          dataKey: "status",
          newValue: "In Progress",
        },
      });
    }

    // Close modal
    //---------------------------------
    closeModal();
  };

  const handleCancel = function () {
    resetFormData();
    closeModal();
  };

  const stageSessions = useSelector((state) =>
    selectStageSessions(state, props.currentRunId, props.thisStage)
  );
  const assignSessions = stageSessions.filter((session) => {
    return (
      session.type === "assign" &&
      !session.endTime &&
      (session.secondaryUser === activeUser || session.secondaryUser === null)
    );
  });

  const findDefaultResolved = function () {
    let defaultResolved = [];
    assignSessions.forEach((session) => {
      if (session.secondaryUser === activeUser) {
        defaultResolved.push(session.sessionId);
      }
    });
    return defaultResolved;
  };

  const [resolvedAssignments, setResolvedAssignments] = useState(
    findDefaultResolved()
  );

  return (
    <div className={props.className}>
      <Button onClick={() => handleOpen()} fillWidth icon="start" featured>
        {t("Start New Session")}
      </Button>
      {modalActive ? (
        <Modal
          title={t("Start New Session")}
          handleCancel={handleCancel}
          controls={
            <>
              <Button onClick={() => handleCancel()} color="cancel">
                {t("Cancel")}
              </Button>
              <Button onClick={() => handleSubmit()} icon="start">
                {t("Start New Session")}
              </Button>
            </>
          }
        >
          <AssignmentList
            assignSessions={assignSessions}
            resolvedAssignments={resolvedAssignments}
            setResolvedAssignments={setResolvedAssignments}
            thisStage={props.thisStage}
            currentRunId={props.currentRunId}
          />
          <SessionStartForm
            thisStage={props.thisStage}
            handleCancel={handleCancel}
            handleNewClick={handleSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        </Modal>
      ) : null}
    </div>
  );
}

SessionStart.propTypes = {
  className: PropTypes.string,
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default SessionStart;
