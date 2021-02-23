import React from "react";
import PropTypes from "prop-types";

import Button from "../../Button/Button.js";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer.js";
import Modal from "../../Modal/Modal.js";
import Pager from "../../Pager/Pager.js";

function ModalControl(props) {
  const [modalActive, setModalActive] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);

  const handleSubmit = function (e) {
    e.preventDefault();

    setModalActive(false);

    props.handleSubmit();
  };

  const handleCancel = function (e) {
    e.preventDefault();

    setModalActive(false);
    setPageNumber(0);

    if (props.handleCancel) {
      props.handleCancel();
    }
  };

  const { fillWidth, ...saveBtnAttrs } = props.buttonAttrs || false;

  const submitButton = function () {
    return (
      <Button onClick={(e) => handleSubmit(e)} {...saveBtnAttrs}>
        {props.submitCopy || props.triggerCopy || "Save"}
      </Button>
    );
  };

  const cancelButton = function () {
    return (
      <Button
        onClick={(e) => {
          handleCancel(e);
        }}
        color="cancel"
      >
        Cancel
      </Button>
    );
  };

  return (
    <>
      <Button {...props.buttonAttrs} onClick={() => setModalActive(true)}>
        {props.triggerCopy}
      </Button>
      {modalActive ? (
        <Modal title={props.title}>
          {props.pages ? (
            <>
              <Pager
                pages={props.pages}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              >
                Test
              </Pager>
              {props.handleSubmit && pageNumber === props.pages.length - 1 ? (
                <>{submitButton()}</>
              ) : null}
              <>{cancelButton()}</>
            </>
          ) : (
            <>
              {props.children}
              {props.handleSubmit ? (
                <ButtonSpacer align="right">
                  <>{cancelButton()}</>
                  <>{submitButton()}</>
                </ButtonSpacer>
              ) : (
                <>{cancelButton()}</>
              )}
            </>
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
  pages: PropTypes.array,
};

export default ModalControl;
