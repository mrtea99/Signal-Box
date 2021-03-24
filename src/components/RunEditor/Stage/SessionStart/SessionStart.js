import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import SessionStartForm from "./SessionStartForm/SessionStartForm.js";
import Button from "../../../Button/Button.js";
import Modal from "../../../Modal/Modal.js";
import AssignmentList from "../../../AssignmentOpener/AssignmentList/AssignmentList.js";

import stageNames from "../../../../data/stageNames.json";
import activityList from "../../../../data/activities.json";

function SessionStart(props) {
  const activeUser = useSelector((state) => state.users.currentUser);

  const [modalActive, setModalActive] = React.useState(false);

  const [formData, setFormData] = React.useState({
    activity: activityList[props.thisStage][0],
  });

  const dispatch = useDispatch();
  const updateRun = function (runId, dataSection, dataKey, newValue) {
    dispatch({
      type: "runs/update",
      payload: { runId, dataSection, dataKey, newValue },
    });
  };

  const handleOpen = function () {
    setResolvedAssignments(findDefaultResolved());
    setModalActive(true);
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      stage: stageNames[props.thisStage],
      type: "work",
      startTime: Date.now(),
      endTime: null,
      activity: formData.activity,
      user: activeUser,
      secondaryUser: parseInt(formData.assistor),
    };

    props.addSession(newSession, props.thisStage);

    resolvedAssignments.forEach((sessionId) => {
      props.updateSession({ endTime: Date.now() }, props.thisStage, sessionId);
    });

    if (props.thisRunData.status === "Not Started") {
      updateRun(props.thisRunData.id, null, "status", "In Progress");
    }

    setModalActive(false);
  };

  const handleCancel = function () {
    setFormData({ activity: activityList[props.thisStage][0] });
    setModalActive(false);
  };

  const assignSessions = props.thisRunData.stages[
    props.thisStage
  ].sessions.filter((session) => {
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

  const [resolvedAssignments, setResolvedAssignments] = React.useState(
    findDefaultResolved()
  );

  return (
    <div className={props.className}>
      <Button onClick={() => handleOpen()} fillWidth icon="start" featured>
        Start New Session
      </Button>
      {modalActive ? (
        <Modal title="Start New Session">
          <AssignmentList
            assignSessions={assignSessions}
            resolvedAssignments={resolvedAssignments}
            setResolvedAssignments={setResolvedAssignments}
            thisStage={props.thisStage}
            updateSession={props.updateSession}
            endSession={props.endSession}
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
  addSession: PropTypes.func.isRequired,
  updateSession: PropTypes.func.isRequired,
  endSession: PropTypes.func.isRequired,
  thisRunData: PropTypes.object.isRequired,
};

export default SessionStart;
