import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import AssignmentOpenerForm from "../AssignmentOpener/AssignmentOpenerForm/AssignmentOpenerForm.js";
import FormItem from "../FormItem/FormItem.js";
import UserName from "../UserSwitcher/UserName/UserName.js";
import Button from "../Button/Button.js";

import { getShiftName, getShiftTime } from "../../utils/getShiftTime.js";

import { useTranslation } from "react-i18next";

/**
 * Dialog for editing / ending an assignment session
 */

function AssignmentCloser(props) {
  const { t } = useTranslation();

  const defaultFormData = {
    description: props.session.notes,
    assignee: props.session.secondaryUser,
    startDate: props.session.startTime,
    startTime: getShiftName(props.session.startTime),
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
              getShiftTime(formData.startTime, formData.startDate)
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
            startTime: new Date(
              getShiftTime(formData.startTime, formData.startDate)
            ).toISOString(),
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
            {t("Delete")}
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
