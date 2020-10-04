import React from "react";

import Modal from "../Modal/Modal.js";
import RunInfoForm from "../RunInfoForm/RunInfoForm.js";

function RunInfoChange(props) {
  function updateRunInfo(productTemplateData) {
    props.updateRunData(
      props.currentRunUid,
      null,
      "productInfo",
      productTemplateData
    );
    // props.updateRunData(props.currentRunUid, 'productInfo', 'batchQuantity', batchQuantity)

    props.setActive(false);
  }

  function handleCancel() {
    props.setActive(false);
  }

  return (
    <>
      {props.active ? (
        <Modal>
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
