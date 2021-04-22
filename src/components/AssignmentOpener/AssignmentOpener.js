import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import AssignmentOpenerForm from "./AssignmentOpenerForm/AssignmentOpenerForm.js";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";

// import stageNames from "../../data/stageNames.json";

import { useTranslation } from "react-i18next";

/**
 * Dialog for starting an assignment session
 */

function AssignmentOpener(props) {
  const { t } = useTranslation();

  const activeUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const millisecondsPerMinute = 60000;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const shiftTimes = [
    millisecondsPerHour * 9,
    millisecondsPerHour * 12,
    millisecondsPerHour * 15,
  ];

  //Calculate time at midnight today, so shift time can be added to it
  const dateNow = new Date();
  const dateToday = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth(),
    dateNow.getDate(),
    0,
    0,
    0
  );

  const timezoneOffset =
    dateToday.getTimezoneOffset() * -1 * millisecondsPerMinute;
  const timeToToday = dateToday.getTime() + timezoneOffset;

  const defaultFormData = {
    description: "",
    assignee: null,
    startDate: timeToToday,
    startTime: shiftTimes[0],
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
        formData.startDate + formData.startTime
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

    handleCancel();
  };

  const handleCancel = function () {
    setFormData(defaultFormData);
  };

  return (
    <ModalControl
      title={t("Assign Stage")}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
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
          shiftTimes={shiftTimes}
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
};

export default AssignmentOpener;
