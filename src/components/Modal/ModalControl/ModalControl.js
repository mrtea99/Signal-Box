import React from "react";

import Button from "../../Button/Button.js";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer.js";
import Modal from "../../Modal/Modal.js";

function ModalControl(props) {
  const [modalActive, setModalActive] = React.useState(false);

  const handleSubmit = function (e) {
    e.preventDefault();

    setModalActive(false);

    props.handleSubmit();
  };

  const {fillWidth, ...saveBtnAttrs} = props.buttonAttrs;

  return (
    <>
      <Button {...props.buttonAttrs} onClick={() => setModalActive(true)}>{props.triggerCopy}</Button>
      {modalActive ? (
        <Modal title={props.title}>
          {props.children}
          {props.handleSubmit ? (
            <ButtonSpacer align="right">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setModalActive(false);
                }}
                color="cancel"
              >
                Cancel
              </Button>
              <Button onClick={(e) => handleSubmit(e)} {...saveBtnAttrs}>{props.triggerCopy || "Save"}</Button>
            </ButtonSpacer>
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
