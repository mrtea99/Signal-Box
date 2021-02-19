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

  const [resolvedAssignments, setResolvedAssignments] = React.useState([])

  const handleNewClick = function (e) {
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

    //todo: update to atmos table
    // if (props.thisStage === 1) {
    //   newSession.temperature = temperature;
    //   newSession.humidity = humidity;
    // }

    props.addSession(newSession, props.thisStage);

    setModalActive(false);
  };

  const handleCancel = function () {
    setFormData({ activity: activityList[props.thisStage][0] });
    setModalActive(false);
  };

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
            runData={props.thisRunData}
            stageNum={props.thisStage}
            activeUser={props.activeUser}
            resolvedAssignments={resolvedAssignments}
            setResolvedAssignments={setResolvedAssignments}
          />
          <SessionStartForm
            thisStage={props.thisStage}
            addSession={props.addSession}
            activeUser={props.activeUser}
            handleCancel={handleCancel}
            handleNewClick={handleNewClick}
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
  activeUser: PropTypes.string.isRequired,
  thisRunData: PropTypes.object.isRequired,
};

export default SessionStart;
