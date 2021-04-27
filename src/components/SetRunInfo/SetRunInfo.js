import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

import Modal from "../Modal/Modal.js";
import RunInfoForm from "./SetRunInfoForm/SetRunInfoForm.js";
import RunDelete from "./RunDelete/RunDelete.js";
import Button from "../Button/Button.js";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer.js";
import AssignmentBatcher from "../AssignmentOpener/AssignmentBatcher/AssignmentBatcher.js";
import FormItem from "../FormItem/FormItem.js";

import { selectAllProductTemplates } from "./productTemplatesSlice.js";

/**
 * Dialog to create / edit a run.
 */

function SetRunInfo(props) {
  const { t } = useTranslation();

  const mode = props.currentRunId ? "change" : "new";
  const runStatuses = ["Not Started", "In Progress", "Complete", "Archived"];
  const modalTitle = mode === "new" ? "Create New Run" : "Edit Run Info";

  const [active, setActive] = useState(false);

  const productTemplates = useSelector(selectAllProductTemplates);

  // Run Redux
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

  const defaultBatchQuantity =
    mode === "new" ? 1 : props.thisRunData.batchQuantity;

  const defaultPriority = mode === "new" ? 1 : props.thisRunData.priority;

  const defaultTargetStartDate =
    mode === "new"
      ? new Date().toISOString()
      : props.thisRunData.targetStartDate;

  const defaultFormData = {
    currentTemplate: defaultCurrentTemplate(),
    batchQuantity: defaultBatchQuantity,
    priority: defaultPriority,
    targetStartDate: defaultTargetStartDate,
  };

  const [formData, setFormData] = useState(defaultFormData);

  const defaultBatchedAssignments = [[], [], [], [], []];
  const [batchedAssignments, setBatchedAssignments] = useState(
    defaultBatchedAssignments
  );

  const defaultRunStatus =
    mode === "new" ? runStatuses[0] : props.thisRunData.status;
  const [runStatus, setRunStatus] = useState(defaultRunStatus);

  const resetFormState = function () {
    setFormData(defaultFormData);
    setBatchedAssignments(defaultBatchedAssignments);
    setRunStatus(defaultRunStatus);
  };

  //----------------------------------------

  const handleOpen = function () {
    resetFormState();
    setActive(true);
  };

  const handleSubmit = function () {
    let productInfo = { ...productTemplates[formData.currentTemplate] };

    mode === "new"
      ? createRunInfo(productInfo, formData)
      : updateRunInfo(productInfo, formData);
  };

  const handleCancel = function () {
    closeModal();
  };

  const closeModal = function () {
    setActive(false);
  };

  let history = useHistory();
  const deleteSuccess = function () {
    closeModal();

    history.push("/");
  };

  const buildRun = function (productTemplateData, formData) {
    const newRunId = Date.now();

    return {
      id: newRunId,
      productName: productTemplateData.productName,
      productSKU: productTemplateData.productSKU,
      status: runStatus,
      outputType: productTemplateData.outputType,
      priority: formData.priority,
      targetStartDate: formData.targetStartDate,
      batchQuantity: formData.batchQuantity,
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
    };
  };

  const createRunInfo = function (productTemplateData, formData) {
    const newRun = buildRun(productTemplateData, formData);

    createRun(newRun);

    batchedAssignments.forEach((stage) =>
      stage.forEach((assignment) => {
        const updatedAssignment = { ...assignment, runId: newRun.id };

        addSession(updatedAssignment);
      })
    );

    closeModal();
  };

  const updateRunInfo = function (productTemplateData, formData) {
    updateRun(props.currentRunId, null, "productInfo", productTemplateData);
    updateRun(
      props.currentRunId,
      null,
      "batchQuantity",
      formData.batchQuantity
    );
    updateRun(props.currentRunId, null, "priority", formData.priority);
    updateRun(
      props.currentRunId,
      null,
      "targetStartDate",
      formData.targetStartDate
    );
    updateRun(props.currentRunId, null, "status", runStatus);

    closeModal();
  };

  return (
    <>
      {mode === "new" ? (
        <Button onClick={() => handleOpen()} icon="plus">
          {t("New Run")}
        </Button>
      ) : (
        <Button onClick={() => handleOpen()}>{t("Info")}</Button>
      )}
      {active ? (
        <Modal title={modalTitle} handleCancel={handleCancel}>
          <RunInfoForm formData={formData} setFormData={setFormData} />

          {mode === "new" ? (
            <AssignmentBatcher
              batchedAssignments={batchedAssignments}
              setBatchedAssignments={setBatchedAssignments}
            />
          ) : null}

          <FormItem
            label={`${t("Run Status")}:`}
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
                successCallback={() => {
                  deleteSuccess();
                }}
              />
            ) : null}
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleCancel();
              }}
              color="cancel"
            >
              {t("Cancel")}
            </Button>
            <Button
              disabled={formData.currentTemplate === null ? true : false}
              onClick={handleSubmit}
            >
              {mode === "new" ? t("Create New Run") : t("Save")}
            </Button>
          </ButtonSpacer>
        </Modal>
      ) : null}
    </>
  );
}

SetRunInfo.propTypes = {
  thisRunData: PropTypes.object,
  currentRunId: PropTypes.number,
};

export default SetRunInfo;
