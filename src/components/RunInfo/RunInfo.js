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
  // setActive(true);

  const mode = props.currentRunUid ? "change" : "new";
  const runStatuses = ["Not Started", "In Progress", "Complete", "Archived"];
  const modalTitle = mode === "new" ? "Create New Run" : "Edit Run Info";

  const [active, setActive] = React.useState(false);

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

  const resetFormState = function () {
    setCurrentTemplate(defaultCurrentTemplate);
    setBatchQuantity(defaultBatchQuantity);
    setBatchedAssignments(defaultBatchedAssignments);
    setRunStatus(defaultRunStatus);
  };

  //----------------------------------------

  const handleOpen = function () {
    resetFormState();
    setActive(true);
  };

  const handleSubmit = function () {
    let productInfo = { ...productTemplates[currentTemplate] };

    mode === "new"
      ? createRun(productInfo, batchQuantity)
      : updateRunInfo(productInfo, batchQuantity);
  };

  const handleCancel = function () {
    closeModal();
  };

  const closeModal = function () {
    setActive(false);
  };

  const createRun = function (productTemplateData, batchQuantity) {
    //Build new run object here
    const newRun = {
      id: Date.now(),
      productName: productTemplateData.productName,
      productSKU: productTemplateData.productSKU,
      status: runStatus,
      outputType: productTemplateData.outputType,
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

    closeModal();
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

    closeModal();
  };

  return (
    <>
      {mode === "new" ? (
        <Button onClick={() => handleOpen()} icon="plus">
          New Run
        </Button>
      ) : (
        <Button onClick={() => handleOpen()}>Info</Button>
      )}
      {active ? (
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
                successCallback={() => closeModal()}
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
  createRun: PropTypes.func,
  thisRunData: PropTypes.object,
  updateRunData: PropTypes.func,
  currentRunUid: PropTypes.number,
  activeUser: PropTypes.string,
};

export default RunInfoNew;
