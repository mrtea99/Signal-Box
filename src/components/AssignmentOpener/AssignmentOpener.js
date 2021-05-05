import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import AssignmentOpenerForm from "./AssignmentOpenerForm/AssignmentOpenerForm.js";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";

// import stageNames from "../../data/stageNames.json";

import { getShiftTime } from "../../utils/getShiftTime.js";

import { useTranslation } from "react-i18next";

/**
 * Dialog for starting an assignment session
 */

function AssignmentOpener(props) {
  const { t } = useTranslation();

  const activeUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  //Calculate time at midnight, so shift time can be added to it
  const baseDate = props.dateDefault ? new Date(props.dateDefault) : new Date();

  const defaultFormData = {
    description: "",
    assignee: null,
    startDate: baseDate.getTime(),
    startTime: "morning",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleSubmit = function () {
    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      runId: props.currentRunId || null,
      // stage: stageNames[props.thisStage],
      stage: props.thisStage,
      type: "assign",
      startTime: new Date(
        getShiftTime(formData.startTime, formData.startDate)
      ).toISOString(),
      endTime: null,
      user: activeUser,
      secondaryUser: parseInt(formData.assignee) || null,
      notes: formData.description,
      extra: "active",
    };

    if (props.addAssignment) {
      props.addAssignment(newSession, props.thisStage);
    } else {
      dispatch({
        type: "sessions/add",
        payload: {
          sessionData: newSession,
        },
      });
    }

    resetFormData();
  };

  const resetFormData = function () {
    setFormData(defaultFormData);
  };

  return (
    <ModalControl
      title={t("Assign Stage")}
      handleSubmit={handleSubmit}
      handleCancel={resetFormData}
      handleOpen={resetFormData}
      triggerCopy={props.triggerCopy || t("Assign Stage")}
      buttonAttrs={
        props.buttonAttrs || {
          fillWidth: true,
          color: "assign",
          icon: "assign",
        }
      }
    >
      <form>
        <AssignmentOpenerForm
          formData={formData}
          setFormData={setFormData}
          thisStage={props.thisStage}
        />
      </form>
    </ModalControl>
  );
}

AssignmentOpener.propTypes = {
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number,
  addAssignment: PropTypes.func,
  triggerCopy: PropTypes.string,
  buttonAttrs: PropTypes.object,
  dateDefault: PropTypes.string,
};

export default AssignmentOpener;
