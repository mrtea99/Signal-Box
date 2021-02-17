import React from "react";
import PropTypes from "prop-types";

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

  const handleCancel = function (e) {
    e.preventDefault();

    setModalActive(false);

    if (props.handleCancel) {
      props.handleCancel();
    }
  };

  const { fillWidth, ...saveBtnAttrs } = props.buttonAttrs || false;

  return (
    <>
      <Button {...props.buttonAttrs} onClick={() => setModalActive(true)}>
        {props.triggerCopy}
      </Button>
      {modalActive ? (
        <Modal title={props.title}>
          {props.children}
          {props.handleSubmit ? (
            <ButtonSpacer align="right">
              <Button
                onClick={(e) => {
                  handleCancel(e);
                }}
                color="cancel"
              >
                Cancel
              </Button>
              <Button onClick={(e) => handleSubmit(e)} {...saveBtnAttrs}>
                {props.submitCopy || props.triggerCopy || "Save"}
              </Button>
            </ButtonSpacer>
          ) : (
            <Button
              onClick={(e) => {
                handleCancel(e);
              }}
            >
              Close
            </Button>
          )}
        </Modal>
      ) : null}
    </>
  );
}

ModalControl.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
  buttonAttrs: PropTypes.object,
  triggerCopy: PropTypes.string,
  children: PropTypes.node,
};

export default ModalControl;
