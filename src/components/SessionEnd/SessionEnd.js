import React from "react";

import Button from "../Button/Button.js";
import Modal from "../Modal/Modal.js";
import SessionEndForm from "./SessionEndForm/SessionEndForm.js";

function SessionEnd(props) {
  const [modalActive, setModalActive] = React.useState(false);

  return (
    <>
      <Button onClick={() => setModalActive(true)}>End Session</Button>
      {modalActive ? (
        <Modal>
          <SessionEndForm
            setFormActive={setModalActive}
            addSession={props.addSession}
            endSession={props.endSession}
            thisStage={props.thisStage}
            activeSessionData={props.activeSessionData}
            thisRunData={props.thisRunData}
          />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default SessionEnd;
