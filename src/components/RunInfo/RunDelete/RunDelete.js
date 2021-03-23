import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Button from "../../Button/Button.js";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer.js";
import Modal from "../../Modal/Modal.js";

function RunDelete(props) {
  const [modalActive, setModalActive] = React.useState(false);

  const dispatch = useDispatch();
  const deleteRun = function (runId) {
    const dataSection = "delete";
    dispatch({
      type: "runs/update",
      payload: { runId, dataSection },
    });
  };

  return (
    <>
      <Button onClick={() => setModalActive(true)} color="delete">
        Delete
      </Button>
      {modalActive ? (
        <Modal title="Confirm Delete Run">
          <p>Are you sure you want to permanently delete this run?</p>
          <ButtonSpacer align="right">
            <Button onClick={() => setModalActive(false)} color="cancel">
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteRun(props.currentRunUid);
                setModalActive(false);
                if (props.successCallback) {
                  props.successCallback();
                }
              }}
              color="delete"
            >
              Delete
            </Button>
          </ButtonSpacer>
        </Modal>
      ) : null}
    </>
  );
}

RunDelete.propTypes = {
  currentRunUid: PropTypes.number.isRequired,
  successCallback: PropTypes.func,
};

export default RunDelete;
