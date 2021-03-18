import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import AssignmentOpenerForm from "./AssignmentOpenerForm/AssignmentOpenerForm.js";

function AssignmentOpener(props) {
  const activeUser = useSelector((state) => state.users.currentUser);

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

  const [formData, setFormData] = React.useState(defaultFormData);

  const handleSubmit = function () {
    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      type: "assign",
      startTime: formData.startDate + formData.startTime,
      endTime: null,
      user: activeUser,
      secondaryUser: formData.assignee,
      notes: formData.description,
      extra: "active",
    };

    props.addSession(newSession, props.thisStage);

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
      triggerCopy={"Assign Stage"}
      buttonAttrs={{ fillWidth: true, color: "assign", icon: "assign" }}
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
  addSession: PropTypes.func.isRequired,
};

export default AssignmentOpener;
