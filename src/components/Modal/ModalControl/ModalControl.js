import React from "react";

import Button from "../../Button/Button.js";
import Modal from "../../Modal/Modal.js";

function ModalControl(props) {
  const [modalActive, setModalActive] = React.useState(false);

  const handleSubmit = function (e) {
    e.preventDefault();

    setModalActive(false);

    props.handleSubmit();
  };

  return (
    <>
      <Button onClick={() => setModalActive(true)}>{props.triggerCopy}</Button>
      {modalActive ? (
        <Modal>
          {props.children}
          {props.handleSubmit ? (
            <>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setModalActive(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={(e) => handleSubmit(e)}>Save</Button>
            </>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setModalActive(false);
              }}
            >
              Close
            </Button>
          )}
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default ModalControl;
