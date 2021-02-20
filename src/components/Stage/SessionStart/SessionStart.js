import React from "react";
import PropTypes from "prop-types";

import SessionStartForm from "./SessionStartForm/SessionStartForm.js";
import Button from "../../Button/Button.js";
import Modal from "../../Modal/Modal.js";
import AssignmentList from "../../AssignmentOpener/AssignmentList/AssignmentList.js";

import stageNames from "../../../data/stageNames.json";
import activityList from "../../../data/activities.json";

function SessionStart(props) {
  const [modalActive, setModalActive] = React.useState(false);

  const [formData, setFormData] = React.useState({
    activity: activityList[props.thisStage][0],
  });

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
      user: props.activeUser,
      secondaryUser: formData.assistor,
    };

    props.addSession(newSession, props.thisStage);

    resolvedAssignments.forEach((sessionId) => {
      props.updateSession({ endTime: Date.now() }, props.thisStage, sessionId);
    });

    setModalActive(false);
  };

  const handleCancel = function () {
    setFormData({ activity: activityList[props.thisStage][0] });
    setResolvedAssignments(defaultResolved);
    setModalActive(false);
  };

  const assignSessions = props.thisRunData.stages[
    props.thisStage
  ].sessions.filter((session) => {
    return (
      session.type === "assign" &&
      !session.endTime &&
      (session.secondaryUser === props.activeUser ||
        session.secondaryUser === null)
    );
  });

  let defaultResolved = [];
  assignSessions.forEach((session) => {
    if (session.secondaryUser === props.activeUser) {
      defaultResolved.push(session.sessionId);
    }
  });
  const [resolvedAssignments, setResolvedAssignments] = React.useState(
    defaultResolved
  );

  return (
    <div className={props.className}>
      <Button
        onClick={() => setModalActive(true)}
        fillWidth
        icon="start"
        featured
      >
        Start New Session
      </Button>
      {modalActive ? (
        <Modal title="Start New Session">
          <AssignmentList
            assignSessions={assignSessions}
            resolvedAssignments={resolvedAssignments}
            setResolvedAssignments={setResolvedAssignments}
          />
          <SessionStartForm
            thisStage={props.thisStage}
            addSession={props.addSession}
            activeUser={props.activeUser}
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
  activeUser: PropTypes.string.isRequired,
  thisRunData: PropTypes.object.isRequired,
};

export default SessionStart;
