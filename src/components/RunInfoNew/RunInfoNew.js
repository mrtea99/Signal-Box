import React from "react";

import Modal from "../Modal/Modal.js";
import RunInfoForm from "../RunInfoForm/RunInfoForm.js";

function RunInfoNew(props) {
  const createRun = function (productTemplateData, batchQuantity) {
    let newData = [...props.runData];

    //Build new run object here
    const newRun = {
      runId: Date.now(),
      activeStage: 0,
      consignedManufacturing: 0,
      defectiveManufacturing: 0,
      consignedPackaging: 0,
      defectivePackaging: 0,
      consignedLabeling: 0,
      defectiveLabeling: 0,
      productInfo: productTemplateData,
      stages: [
        {
          sessions: [],
          active: true,
        },
        {
          sessions: [],
          active: true,
        },
        {
          sessions: [],
          active: true,
        },
        {
          sessions: [],
          active: true,
        },
        {
          sessions: [],
          active: true,
        },
      ],
      batchQuantity: batchQuantity,
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

export default RunInfoNew;
