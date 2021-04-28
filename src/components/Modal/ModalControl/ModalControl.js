import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "../../Button/Button.js";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer.js";
import Modal from "../../Modal/Modal.js";
import Pager from "../../Pager/Pager.js";

import { useTranslation } from "react-i18next";

/**
 * Makes a dialog box and handles active state, and pagination state.
 */

function ModalControl(props) {
  const { t } = useTranslation();

  const [modalActive, setModalActive] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const handleSubmit = function () {
    setModalActive(false);

    if (props.handleSubmit) {
      props.handleSubmit();
    }
  };

  const handleCancel = function () {
    setModalActive(false);
    setPageNumber(0);

    if (props.handleCancel) {
      props.handleCancel();
    }
  };

  const handleOpen = function () {
    setModalActive(true);

    if (props.handleOpen) {
      props.handleOpen();
    }
  };

  const { fillWidth, ...saveBtnAttrs } = props.buttonAttrs || false;

  const submitButton = function () {
    return (
      <Button {...saveBtnAttrs} onClick={(e) => handleSubmit(e)}>
        {props.submitCopy || props.triggerCopy || t("Save")}
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
        {t("Cancel")}
      </Button>
    );
  };

  /* <ModalControl
        title="Assign Stage"
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        triggerCopy={"Assign Stage"}
        buttonAttrs={{ fillWidth: true, color: "assign", icon: "assign" }}
        pages={[
          <React.Fragment key="key1">Page1</React.Fragment>,
          <React.Fragment key="key2">Page2</React.Fragment>,
          <React.Fragment key="key3">Page3</React.Fragment>,
          <React.Fragment key="key4">Page4 </React.Fragment>,
        ]}
      /> */

  return (
    <>
      <Button {...props.buttonAttrs} onClick={(e) => handleOpen(e)}>
        {props.triggerCopy}
      </Button>
      {modalActive ? (
        <Modal
          title={props.title}
          handleCancel={handleCancel}
          controls={
            props.pages ? (
              <ButtonSpacer align="right">
                <>{cancelButton()}</>
                {props.handleSubmit && pageNumber === props.pages.length - 1 ? (
                  <>{submitButton()}</>
                ) : null}
              </ButtonSpacer>
            ) : (
              <ButtonSpacer align="right">
                <>{cancelButton()}</>
                {props.handleSubmit ? <>{submitButton()}</> : null}
              </ButtonSpacer>
            )
          }
        >
          {props.pages ? (
            <>
              <Pager
                pages={props.pages}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              >
                Test
              </Pager>
            </>
          ) : (
            <>{props.children}</>
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
