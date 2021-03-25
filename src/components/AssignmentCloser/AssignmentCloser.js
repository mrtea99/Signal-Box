import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import AssignmentOpenerForm from "../AssignmentOpener/AssignmentOpenerForm/AssignmentOpenerForm.js";
import FormItem from "../FormItem/FormItem.js";
import UserName from "../UserSwitcher/UserName/UserName.js";

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

  const dispatch = useDispatch();

  const handleSubmit = function () {
    if (status === "resolved") {
      dispatch({
        type: "runs/endSession",
        payload: {
          runId: props.currentRunUid,
          stage: props.thisStage,
          sessionId: props.session.sessionId,
          extraData: {
            notes: formData.description,
            secondaryUser: formData.assignee,
            startTime: formData.startDate + formData.startTime,
            extra: status,
          },
        },
      });
    } else {
      dispatch({
        type: "runs/updateSession",
        payload: {
          runId: props.currentRunUid,
          stage: props.thisStage,
          sessionId: props.session.sessionId,
          extraData: {
            notes: formData.description,
            secondaryUser: formData.assignee,
            startTime: formData.startDate + formData.startTime,
          },
        },
      });
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
          <p>
            Assigner: <UserName userId={props.session.user} />
          </p>
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
  thisStage: PropTypes.number.isRequired,
  currentRunUid: PropTypes.number.isRequired,
};

export default AssignmentCloser;
