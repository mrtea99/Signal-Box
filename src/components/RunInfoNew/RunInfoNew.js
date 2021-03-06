import React from "react";
import PropTypes from "prop-types";

import Modal from "../Modal/Modal.js";
import RunInfoForm from "./RunInfoForm/RunInfoForm.js";
import RunDelete from "../RunDelete/RunDelete.js";
import Button from "../Button/Button.js";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer.js";

import productTemplates from "../../data/productTemplates.json";

function RunInfoNew(props) {
  const mode = props.currentRunUid ? "change" : "new";

  const [currentTemplate, setCurrentTemplate] = React.useState(() => {
    if (!props.thisRunData) {
      return null;
    }

    return productTemplates.findIndex(
      (obj) => obj.productSKU === props.thisRunData.productInfo.productSKU
    );
  });

  const [batchQuantity, setBatchQuantity] = React.useState(
    props.thisRunData ? props.thisRunData.batchQuantity : 1
  );

  const handleSubmit = function (e) {
    let productInfo = { ...productTemplates[currentTemplate] };

    mode === "new"
      ? createRun(productInfo, batchQuantity)
      : updateRunInfo(productInfo, batchQuantity);
  };

  const createRun = function (productTemplateData, batchQuantity) {
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

    props.createRun(newRun);

    handleCancel();
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

    handleCancel();
  };

  const handleCancel = function () {
    props.setActive(false);
  };

  return (
    <>
      {props.active ? (
        <Modal title="Create New Run">
          <RunInfoForm
            currentTemplate={currentTemplate}
            setCurrentTemplate={setCurrentTemplate}
            batchQuantity={batchQuantity}
            setBatchQuantity={setBatchQuantity}
          />

          <ButtonSpacer align="right">
            {mode === "change" ? (
              <RunDelete
                updateRunData={props.updateRunData}
                currentRunUid={props.currentRunUid}
                successCallback={() => props.setActive(false)}
              />
            ) : null}
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleCancel();
              }}
              color="cancel"
            >
              Cancel
            </Button>
            <Button
              disabled={currentTemplate === null ? true : false}
              onClick={handleSubmit}
            >
              {mode === "new" ? "Create New Run" : "Save"}
            </Button>
          </ButtonSpacer>
        </Modal>
      ) : null}
    </>
  );
}

RunInfoNew.propTypes = {
  setActive: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  createRun: PropTypes.func,
  thisRunData: PropTypes.object,
  updateRunData: PropTypes.func,
  currentRunUid: PropTypes.number,
};

export default RunInfoNew;
