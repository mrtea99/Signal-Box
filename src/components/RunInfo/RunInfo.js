import React from "react";
import PropTypes from "prop-types";

import Modal from "../Modal/Modal.js";
import RunInfoForm from "./RunInfoForm/RunInfoForm.js";
import RunDelete from "../RunDelete/RunDelete.js";
import Button from "../Button/Button.js";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer.js";
import AssignmentBatcher from "../AssignmentOpener/AssignmentBatcher/AssignmentBatcher.js";
import FormItem from "../FormItem/FormItem.js";

import productTemplates from "../../data/productTemplates.json";

function RunInfoNew(props) {
  // Temp open on page load for testing
  // props.setActive(true);

  const mode = props.currentRunUid ? "change" : "new";
  const runStatuses = ["Not Started", "In Progress", "Complete", "Archived"];
  const modalTitle = mode === "new" ? "Create New Run" : "Edit Run Info";

  //Form State
  //----------------------------------------
  const defaultCurrentTemplate = () => {
    if (!props.thisRunData) {
      return null;
    }

    return productTemplates.findIndex(
      (obj) => obj.productSKU === props.thisRunData.productInfo.productSKU
    );
  };
  const [currentTemplate, setCurrentTemplate] = React.useState(
    defaultCurrentTemplate
  );

  const defaultBatchQuantity = props.thisRunData
    ? props.thisRunData.batchQuantity
    : 1;
  const [batchQuantity, setBatchQuantity] = React.useState(
    defaultBatchQuantity
  );

  const defaultBatchedAssignments = [[], [], [], [], []];
  const [batchedAssignments, setBatchedAssignments] = React.useState(
    defaultBatchedAssignments
  );

  const defaultRunStatus = props.thisRunData
    ? props.thisRunData.status
    : runStatuses[0];
  const [runStatus, setRunStatus] = React.useState(defaultRunStatus);

  //----------------------------------------

  const handleSubmit = function (e) {
    let productInfo = { ...productTemplates[currentTemplate] };

    mode === "new"
      ? createRun(productInfo, batchQuantity)
      : updateRunInfo(productInfo, batchQuantity);
  };

  const handleCancel = function () {
    props.setActive(false);

    //Reset Form State
    setCurrentTemplate(defaultCurrentTemplate);
    setBatchQuantity(defaultBatchQuantity);
    setBatchedAssignments(defaultBatchedAssignments);
    setRunStatus(defaultRunStatus);
  };

  const createRun = function (productTemplateData, batchQuantity) {
    //Build new run object here
    const newRun = {
      id: Date.now(),
      productName: productTemplateData.productName,
      productSKU: productTemplateData.productSKU,
      status: runStatus,
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
          sessions: batchedAssignments[0],
        },
        {
          sessions: batchedAssignments[1],
        },
        {
          sessions: batchedAssignments[2],
        },
        {
          sessions: batchedAssignments[3],
        },
        {
          sessions: batchedAssignments[4],
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

    props.updateRunData(props.currentRunUid, null, "status", runStatus);

    handleCancel();
  };

  return (
    <>
      {props.active ? (
        <Modal title={modalTitle}>
          <RunInfoForm
            currentTemplate={currentTemplate}
            setCurrentTemplate={setCurrentTemplate}
            batchQuantity={batchQuantity}
            setBatchQuantity={setBatchQuantity}
          />

          {mode === "new" ? (
            <AssignmentBatcher
              batchedAssignments={batchedAssignments}
              setBatchedAssignments={setBatchedAssignments}
              activeUser={props.activeUser}
            />
          ) : null}

          <FormItem
            label="Run Status:"
            type="toggleButton"
            ident="flag-status"
            itemLabels={runStatuses}
            itemValues={runStatuses}
            value={runStatus}
            updateHandler={(value) => {
              setRunStatus(value);
            }}
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
  activeUser: PropTypes.string,
};

export default RunInfoNew;
