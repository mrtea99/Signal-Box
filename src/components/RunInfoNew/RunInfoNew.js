import React from "react";
import PropTypes from "prop-types";

import Modal from "../Modal/Modal.js";
import RunInfoForm from "../RunInfoForm/RunInfoForm.js";
import RunDelete from "../RunDelete/RunDelete.js";

function RunInfoNew(props) {
  const mode = props.currentRunUid ? "change" : "new";

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
        <Modal title="Create New Run">
          {mode === "new" ? (
            <RunInfoForm handleSave={createRun} handleCancel={handleCancel} />
          ) : (
            <>
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
            </>
          )}
        </Modal>
      ) : null}
    </>
  );
}

RunInfoNew.propTypes = {
  setActive: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  runData: PropTypes.array.isRequired,
  setRunData: PropTypes.func,
  updateRunData: PropTypes.func,
  currentRunUid: PropTypes.number,
};

export default RunInfoNew;
