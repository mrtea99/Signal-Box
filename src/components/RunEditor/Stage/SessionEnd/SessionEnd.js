import React from "react";
import PropTypes from "prop-types";

import Button from "../../../Button/Button.js";
import Modal from "../../../Modal/Modal.js";
import SessionEndForm from "./SessionEndForm/SessionEndForm.js";

function SessionEnd(props) {
  const [modalActive, setModalActive] = React.useState(false);

  return (
    <div className={props.className}>
      <Button
        onClick={() => setModalActive(true)}
        fillWidth
        icon="stop"
        featured
      >
        End Session
      </Button>
      {modalActive ? (
        <Modal title={`End ${props.activeSessionData.activity.name} Session`}>
          <SessionEndForm
            setFormActive={setModalActive}
            endSession={props.endSession}
            thisStage={props.thisStage}
            activeSessionData={props.activeSessionData}
            thisRunData={props.thisRunData}
            currentRunUid={props.currentRunUid}
          />
        </Modal>
      ) : null}
    </div>
  );
}

SessionEnd.propTypes = {
  className: PropTypes.string,
  activeSessionData: PropTypes.object.isRequired,
  endSession: PropTypes.func.isRequired,
  thisStage: PropTypes.number.isRequired,
  thisRunData: PropTypes.object.isRequired,
  currentRunUid: PropTypes.number.isRequired,
};

export default SessionEnd;
