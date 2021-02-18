import React from "react";
import PropTypes from "prop-types";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import AssignmentOpenerForm from "../AssignmentOpener/AssignmentOpenerForm/AssignmentOpenerForm.js";
import FormItem from "../FormItem/FormItem.js";

function AssignmentCloser(props) {
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

  const [formData, setFormData] = React.useState(defaultFormData);
  const [status, setStatus] = React.useState(props.session.extra);

  const handleSubmit = function () {
    if (status === "resolved") {
      props.endSession(
        {
          notes: formData.notes,
          secondaryUser: formData.assignee,
          startTime: formData.startDate + formData.startTime,
          extra: status,
        },
        props.thisStage,
        props.session
      );
    } else {
      props.updateSession(
        {
          notes: formData.notes,
          secondaryUser: formData.assignee,
          startTime: formData.startDate + formData.startTime,
        },
        props.thisStage,
        props.session.sessionId
      );
    }

    // handleCancel();
  };

  const handleCancel = function () {
    setFormData(defaultFormData);
    setStatus(props.session.extra);
  };

  return (
    <>
      {props.session.endTime ? null : (
        <ModalControl
          title="Edit Assignment"
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          triggerCopy={""}
          submitCopy={"Save"}
          buttonAttrs={{ color: "assign", icon: "assign" }}
        >
          <AssignmentOpenerForm
            formData={formData}
            setFormData={setFormData}
            thisStage={props.thisStage}
            shiftTimes={shiftTimes}
          />
          <FormItem
            label="Status:"
            type="toggleButton"
            ident="assignment-status"
            itemLabels={["Active", "Resolved"]}
            itemValues={["active", "resolved"]}
            value={status}
            updateHandler={(value) => {
              setStatus(value);
            }}
          />
        </ModalControl>
      )}
    </>
  );
}

AssignmentCloser.propTypes = {
  session: PropTypes.object.isRequired,
  updateSession: PropTypes.func.isRequired,
  endSession: PropTypes.func.isRequired,
  thisStage: PropTypes.number.isRequired,
};

export default AssignmentCloser;
