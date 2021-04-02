import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Modal from "../Modal/Modal.js";
import RunInfoForm from "./RunInfoForm/RunInfoForm.js";
import RunDelete from "./RunDelete/RunDelete.js";
import Button from "../Button/Button.js";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer.js";
import AssignmentBatcher from "../AssignmentOpener/AssignmentBatcher/AssignmentBatcher.js";
import FormItem from "../FormItem/FormItem.js";

import productTemplates from "../../data/productTemplates.json";

function RunInfoNew(props) {
  const mode = props.currentRunUid ? "change" : "new";
  const runStatuses = ["Not Started", "In Progress", "Complete", "Archived"];
  const modalTitle = mode === "new" ? "Create New Run" : "Edit Run Info";

  const [active, setActive] = React.useState(false);

  // Redux
  //----------------------------------------
  const dispatch = useDispatch();
  const createRun = function (newRunData) {
    dispatch({ type: "runs/create", payload: newRunData });
  };
  const updateRun = function (runId, dataSection, dataKey, newValue) {
    dispatch({
      type: "runs/update",
      payload: { runId, dataSection, dataKey, newValue },
    });
  };
  const addSession = function (sessionData) {
    dispatch({
      type: "sessions/add",
      payload: {
        sessionData,
      },
    });
  };

  // Form State
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
      ? createRunInfo(productInfo, batchQuantity)
      : updateRunInfo(productInfo, batchQuantity);
  };

  const handleCancel = function () {
    closeModal();
  };

  const closeModal = function () {
    setActive(false);
  };

  const buildRun = function (productTemplateData, batchQuantity) {
    const newRunId = Date.now();

    return {
      id: newRunId,
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
      stages: [{}, {}, {}, {}, {}],
    };
  };

  const createRunInfo = function (productTemplateData, batchQuantity) {
    const newRun = buildRun(productTemplateData, batchQuantity);

    createRun(newRun);

    batchedAssignments.forEach((stage) =>
      stage.forEach((assignment) => {
        const updatedAssignment = { ...assignment, runId: newRun.id };

        addSession(updatedAssignment);
      })
    );

    closeModal();
  };

  const updateRunInfo = function (productTemplateData, batchQuantity) {
    updateRun(props.currentRunUid, null, "productInfo", productTemplateData);
    updateRun(props.currentRunUid, null, "batchQuantity", batchQuantity);
    updateRun(props.currentRunUid, null, "status", runStatus);

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
  thisRunData: PropTypes.object,
  currentRunUid: PropTypes.number,
};

export default RunInfoNew;
