import React, { useState } from "react";
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
  const mode = props.currentRunId ? "change" : "new";
  const runStatuses = ["Not Started", "In Progress", "Complete", "Archived"];
  const modalTitle = mode === "new" ? "Create New Run" : "Edit Run Info";

  const [active, setActive] = useState(false);

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
    if (mode === "new") {
      return null;
    }

    return productTemplates.findIndex(
      (obj) => obj.productSKU === props.thisRunData.productInfo.productSKU
    );
  };
  const [currentTemplate, setCurrentTemplate] = useState(
    defaultCurrentTemplate
  );

  const defaultBatchQuantity =
    mode === "new" ? 1 : props.thisRunData.batchQuantity;
  const [batchQuantity, setBatchQuantity] = useState(
    defaultBatchQuantity
  );

  const defaultBatchedAssignments = [[], [], [], [], []];
  const [batchedAssignments, setBatchedAssignments] = useState(
    defaultBatchedAssignments
  );

  const defaultRunStatus =
    mode === "new" ? runStatuses[0] : props.thisRunData.status;
  const [runStatus, setRunStatus] = useState(defaultRunStatus);

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
    updateRun(props.currentRunId, null, "productInfo", productTemplateData);
    updateRun(props.currentRunId, null, "batchQuantity", batchQuantity);
    updateRun(props.currentRunId, null, "status", runStatus);

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
        <Modal title={modalTitle} handleCancel={handleCancel}>
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
                currentRunId={props.currentRunId}
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
  currentRunId: PropTypes.number,
};

export default RunInfoNew;
