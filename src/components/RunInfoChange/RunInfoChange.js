import React from "react";
import PropTypes from "prop-types";

import Modal from "../Modal/Modal.js";
import RunInfoForm from "../RunInfoForm/RunInfoForm.js";
import RunDelete from "../RunDelete/RunDelete.js";

function RunInfoChange(props) {
  const updateRunInfo = function (productTemplateData, batchQuantity) {
    props.updateRunData(
      props.currentRunUid,
      null,
      "productInfo",
      productTemplateData
    );

    props.updateRunData(
      props.currentRunUid,
      null,
      "batchQuantity",
      batchQuantity
    );

    props.setActive(false);
  };

  const handleCancel = function () {
    props.setActive(false);
  };

  return (
    <>
      {props.active ? (
        <Modal title="Edit Run Info">
          <RunInfoForm
            runData={props.runData}
            currentRunUid={props.currentRunUid}
            handleSave={updateRunInfo}
            handleCancel={handleCancel}
          />
          <RunDelete
            updateRunData={props.updateRunData}
            currentRunUid={props.currentRunUid}
            successCallback={() => props.setActive(false)}
          />
        </Modal>
      ) : null}
    </>
  );
}

RunInfoChange.propTypes = {
  updateRunData: PropTypes.func.isRequired,
  currentRunUid: PropTypes.number,
  setActive: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  runData: PropTypes.array.isRequired,
};

export default RunInfoChange;
