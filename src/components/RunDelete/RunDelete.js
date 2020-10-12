import React from "react";

import Button from "../Button/Button.js";
import Modal from "../Modal/Modal.js";

function RunDelete(props) {
  const [modalActive, setModalActive] = React.useState(false);

  return (
    <>
      <Button onClick={() => setModalActive(true)}>Delete</Button>
      {modalActive ? (
        <Modal>
          <h3>Confirm Delete Run</h3>
          <Button onClick={() => setModalActive(false)}>Cancel</Button>
          <Button
            onClick={() => {
              props.updateRunData(props.uid, "delete");
              setModalActive(false);
              if(props.successCallback) {
                props.successCallback()
              }
            }}
          >
            Delete
          </Button>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default RunDelete;
