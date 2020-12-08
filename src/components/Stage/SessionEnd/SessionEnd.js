import React from "react";

import Button from "../../Button/Button.js";
import Modal from "../../Modal/Modal.js";
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
            addSession={props.addSession}
            endSession={props.endSession}
            thisStage={props.thisStage}
            activeSessionData={props.activeSessionData}
            thisRunData={props.thisRunData}
          />
        </Modal>
      ) : null}
    </div>
  );
}

export default SessionEnd;
