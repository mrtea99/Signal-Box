import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import AssignmentOpenerForm from "../AssignmentOpener/AssignmentOpenerForm/AssignmentOpenerForm.js";
import FormItem from "../FormItem/FormItem.js";
import UserName from "../UserSwitcher/UserName/UserName.js";

import { useTranslation } from "react-i18next";
import Button from "../Button/Button.js";

/**
 * Dialog for editing / ending an assignment session
 */

function AssignmentCloser(props) {
  const { t } = useTranslation();

  const millisecondsPerHour = 3600000;
  const shiftTimes = [
    millisecondsPerHour * 9,
    millisecondsPerHour * 12,
    millisecondsPerHour * 15,
  ];

  const dateStart = new Date(props.session.startTime);
  const dateStartRounded = new Date(
    dateStart.getFullYear(),
    dateStart.getMonth(),
    dateStart.getDate(),
    0,
    0,
    0
  ).getTime();

  const defaultFormData = {
    description: props.session.notes,
    assignee: props.session.secondaryUser,
    startDate: dateStartRounded,
    startTime: dateStart - dateStartRounded,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [status, setStatus] = useState(props.session.extra);

  const resetFormData = function () {
    setFormData(defaultFormData);
    setStatus(props.session.extra);
  };

  const dispatch = useDispatch();

  const handleSubmit = function () {
    if (status === "resolved") {
      dispatch({
        type: "sessions/end",
        payload: {
          sessionId: props.session.sessionId,
          extraData: {
            notes: formData.description,
            secondaryUser: formData.assignee,
            startTime: new Date(
              formData.startDate + formData.startTime
            ).toISOString(),
            endTime: new Date().toISOString(),
            extra: status,
          },
        },
      });
    } else {
      dispatch({
        type: "sessions/update",
        payload: {
          sessionId: props.session.sessionId,
          extraData: {
            notes: formData.description,
            secondaryUser: formData.assignee,
            startTime: formData.startDate + formData.startTime,
          },
        },
      });
    }

    resetFormData();
  };

  const handleCancel = function () {
    resetFormData();
  };

  const handleOpen = function () {
    resetFormData();
  };

  const handleDelete = function () {
    dispatch({ type: "sessions/delete", payload: props.session.sessionId });
  };

  return (
    <>
      {props.session.endTime ? null : (
        <ModalControl
          title={t("Edit Assignment")}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleOpen={handleOpen}
          triggerCopy={""}
          submitCopy={t("Save")}
          buttonAttrs={{ color: "assign", icon: "assign" }}
        >
          <p>
            {t("Assigner")}: <UserName userId={props.session.user} />
          </p>
          <AssignmentOpenerForm
            formData={formData}
            setFormData={setFormData}
            thisStage={props.thisStage}
            shiftTimes={shiftTimes}
          />
          <FormItem
            label={`${t("Status")}:`}
            type="toggleButton"
            ident="assignment-status"
            itemLabels={["Active", "Resolved"]}
            itemValues={["active", "resolved"]}
            value={status}
            updateHandler={(value) => {
              setStatus(value);
            }}
          />
          <Button color="delete" onClick={() => handleDelete()}>
            Delete
          </Button>
        </ModalControl>
      )}
    </>
  );
}

AssignmentCloser.propTypes = {
  session: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default AssignmentCloser;
