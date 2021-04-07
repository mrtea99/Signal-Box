import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Button from "../../Button/Button.js";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer.js";
import Modal from "../../Modal/Modal.js";

function RunDelete(props) {
  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();
  const deleteRun = function (runId) {
    dispatch({
      type: "runs/delete",
      payload: runId,
    });

    dispatch({
      type: "sessions/deleteAllInRun",
      payload: runId,
    });
  };

  return (
    <>
      <Button onClick={() => setModalActive(true)} color="delete">
        Delete
      </Button>
      {modalActive ? (
        <Modal title="Confirm Delete Run" setActive={setModalActive}>
          <p>Are you sure you want to permanently delete this run?</p>
          <ButtonSpacer align="right">
            <Button onClick={() => setModalActive(false)} color="cancel">
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteRun(props.currentRunId);
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
  currentRunId: PropTypes.number.isRequired,
  successCallback: PropTypes.func,
};

export default RunDelete;
