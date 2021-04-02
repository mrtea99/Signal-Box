import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";
import UserName from "../UserSwitcher/UserName/UserName.js";
import UserSelect from "../FormItem/UserSelect/UserSelect.js";

import getItemType from "../../utils/getItemType.js";

function CheckCloser(props) {
  const defaultFormState = {
    description: "",
    count: props.session.amount || 0,
    countBad: props.session.amountBad || 0,
    assignee: props.session.secondaryUser,
    status: "active",
  };

  const [description, setDescription] = React.useState(
    defaultFormState.description
  );
  const [count, setCount] = React.useState(defaultFormState.count);
  const [countBad, setCountBad] = React.useState(defaultFormState.countBad);
  const [assignee, setAssignee] = React.useState(defaultFormState.assignee);
  const [status, setStatus] = React.useState(defaultFormState.status);

  const resetFormState = function () {
    setDescription(defaultFormState.description);
    setCount(defaultFormState.count);
    setCountBad(defaultFormState.countBad);
    setAssignee(defaultFormState.assignee);
    setStatus(defaultFormState.status);
  };

  const dispatch = useDispatch();

  const handleSubmit = function () {
    const newNote =
      props.session.notes && props.session.notes.length
        ? props.session.notes + "\n" + description
        : description;

    const extraData = {
      notes: newNote,
      amount: count,
      amountType: getItemType(props.thisStage),
      amountBad: countBad,
      secondaryUser: assignee,
    };

    if (status === "resolved") {
      dispatch({
        type: "sessions/end",
        payload: {
          sessionId: props.session.sessionId,
          extraData,
          endTime: Date.now(),
        },
      });
    } else {
      dispatch({
        type: "sessions/update",
        payload: {
          sessionId: props.session.sessionId,
          extraData,
        },
      });
    }

    resetFormState();
  };

  const handleCancel = function () {
    resetFormState();
  };

  const handleOpen = function () {
    resetFormState();
  };

  return (
    <>
      {props.session.endTime ? null : (
        <ModalControl
          title="QA Check"
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleOpen={handleOpen}
          triggerCopy={""}
          submitCopy={"Save"}
          buttonAttrs={{ color: "qa", icon: "qa" }}
        >
          <div>
            <p>{props.session.notes}</p>
            <p>
              Creator: <UserName userId={props.session.user} />
            </p>
            <UserSelect
              label="Assignee:"
              ident={"assignee-" + props.thisStage}
              updateHandler={(value) => setAssignee(parseInt(value))}
              value={assignee}
            />
            <p>Timeframe: {props.session.extra}</p>
            <p>Raising Note: {props.session.notes}</p>
          </div>

          <FormItem
            label="Checker Note:"
            type="textarea"
            ident="check-description"
            updateHandler={(value) => {
              setDescription("Checked: " + value);
            }}
          />

          <FormItem
            type="number"
            ident={"check-count"}
            label={"Passed:"}
            updateHandler={(value) => setCount(parseInt(value))}
            value={count}
            min="0"
          />
          <FormItem
            type="number"
            ident={"check-count-bad"}
            label={"Failed:"}
            updateHandler={(value) => setCountBad(parseInt(value))}
            value={countBad}
            min="0"
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

CheckCloser.propTypes = {
  session: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
  currentRunUid: PropTypes.number.isRequired,
};

export default CheckCloser;
