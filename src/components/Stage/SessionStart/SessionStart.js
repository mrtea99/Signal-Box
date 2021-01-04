import React from "react";
import PropTypes from "prop-types";

import SessionStartForm from "./SessionStartForm/SessionStartForm.js";
import Button from "../../Button/Button.js";
import Modal from "../../Modal/Modal.js";

function SessionStart(props) {
  const [modalActive, setModalActive] = React.useState(false);

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
          <SessionStartForm
            thisStage={props.thisStage}
            addSession={props.addSession}
            activeUser={props.activeUser}
            setFormActive={setModalActive}
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
};

export default SessionStart;
