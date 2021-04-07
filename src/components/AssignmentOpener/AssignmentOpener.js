import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import AssignmentOpenerForm from "./AssignmentOpenerForm/AssignmentOpenerForm.js";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";

// import stageNames from "../../data/stageNames.json";

function AssignmentOpener(props) {
  const activeUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const millisecondsPerHour = 3600000;
  const shiftTimes = [
    millisecondsPerHour * 9,
    millisecondsPerHour * 12,
    millisecondsPerHour * 15,
  ];

  //Calculate time at midnight today, so shift time can be added to it
  const dateNow = new Date();
  const timeToToday = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth(),
    dateNow.getDate(),
    0,
    0,
    0
  ).getTime();

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
      title="Assign Stage"
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      triggerCopy={props.triggerCopy || "Assign Stage"}
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
