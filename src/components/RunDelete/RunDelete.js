import React from "react";

import Button from "../Button/Button.js";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer.js";
import Modal from "../Modal/Modal.js";

function RunDelete(props) {
  const [modalActive, setModalActive] = React.useState(false);

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
                props.updateRunData(props.uid, "delete");
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
      ) : (
        <></>
      )}
    </>
  );
}

export default RunDelete;
