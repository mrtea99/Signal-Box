import React from "react";

import SessionBefore from "./SessionStartForm/SessionStartForm.js";
import Button from "../Button/Button.js";
import Modal from "../Modal/Modal.js";

function SessionStart(props) {
  const [modalActive, setModalActive] = React.useState(false);

  return (
    <>
      <Button onClick={() => setModalActive(true)}>Start New Session</Button>
      {modalActive ? (
        <Modal>
          <SessionBefore
            thisStage={props.thisStage}
            addSession={props.addSession}
            activeUser={props.activeUser}
            setFormActive={setModalActive}
          />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default SessionStart;
