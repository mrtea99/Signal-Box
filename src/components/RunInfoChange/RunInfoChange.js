import React from "react";

import Modal from "../Modal/Modal.js";
import RunInfoForm from "../RunInfoForm/RunInfoForm.js";
import RunDelete from "../RunDelete/RunDelete.js";

function RunInfoChange(props) {
  const updateRunInfo = function(productTemplateData) {
    props.updateRunData(
      props.currentRunUid,
      null,
      "productInfo",
      productTemplateData
    );

    props.setActive(false);
  }

  const handleCancel = function() {
    props.setActive(false);
  }

  return (
    <>
      {props.active ? (
        <Modal>
          <RunDelete
            updateRunData={props.updateRunData}
            uid={props.currentRunUid}
            successCallback={() => props.setActive(false)}
          />
          <RunInfoForm
            runData={props.runData}
            currentRunUid={props.currentRunUid}
            handleSave={updateRunInfo}
            handleCancel={handleCancel}
          />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default RunInfoChange;
