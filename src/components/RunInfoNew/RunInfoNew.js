import React from "react";
import PropTypes from "prop-types";

import Modal from "../Modal/Modal.js";
import RunInfoForm from "../RunInfoForm/RunInfoForm.js";

function RunInfoNew(props) {
  const createRun = function (productTemplateData, batchQuantity) {
    let newData = [...props.runData];

    //Build new run object here
    const newRun = {
      id: Date.now(),
      productName: productTemplateData.productName,
      productSKU: productTemplateData.productSKU,
      status: "Not Started",
      outputType: "Product",
      priority: 1,
      targetStartDate: 0,
      batchQuantity: batchQuantity,
      activePrep: true,
      consignedManufacturing: 0,
      defectiveManufacturing: 0,
      consignedPackaging: 0,
      defectivePackaging: 0,
      consignedLabeling: 0,
      defectiveLabeling: 0,
      activeStocking: true,
      archived: 0,
      productInfo: productTemplateData,
      stages: [
        {
          sessions: [],
        },
        {
          sessions: [],
        },
        {
          sessions: [],
        },
        {
          sessions: [],
        },
        {
          sessions: [],
        },
      ],
    };

    newData.push(newRun);
    props.setRunData(newData);
    props.setActive(false);
  };

  const handleCancel = function () {
    props.setActive(false);
  };

  return (
    <>
      {props.active ? (
        <Modal title="Create New Run">
          <RunInfoForm handleSave={createRun} handleCancel={handleCancel} />
        </Modal>
      ) : null}
    </>
  );
}

RunInfoNew.propTypes = {
  runData: PropTypes.array.isRequired,
  setRunData: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default RunInfoNew;
