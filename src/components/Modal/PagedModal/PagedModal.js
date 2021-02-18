import React from "react";
import PropTypes from "prop-types";

import Modal from "../Modal.js";
import Pager from "../../Pager/Pager.js";
import Button from "../../Button/Button.js";

function PagedModal(props) {
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
        <Modal title="Test321">
          <Pager
            pages={props.pages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          >
            Test
          </Pager>
          {pageNumber === props.pages.length - 1 ? (
            <Button onClick={(e) => handleSubmit(e)} {...saveBtnAttrs}>
              {props.submitCopy || props.triggerCopy || "Save"}
            </Button>
          ) : null}
          <Button
            onClick={(e) => {
              handleCancel(e);
            }}
            color="cancel"
          >
            Cancel
          </Button>
        </Modal>
      ) : null}
    </>
  );
}

export default PagedModal;

PagedModal.propTypes = {};
