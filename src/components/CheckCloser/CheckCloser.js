import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";
import UserName from "../UserSwitcher/UserName/UserName.js";

import getItemType from "../../utils/getItemType.js";

function CheckCloser(props) {
  const [description, setDescription] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [countBad, setCountBad] = React.useState(0);

  const dispatch = useDispatch();

  const handleSubmit = function () {
    const newNote =
      props.session.notes && props.session.notes.length
        ? props.session.notes + "\n" + description
        : description;

    dispatch({
      type: "runs/endSession",
      payload: {
        runId: props.currentRunUid,
        stage: props.thisStage,
        sessionId: props.session.sessionId,
        extraData: {
          notes: newNote,
          amount: count,
          amountType: getItemType(props.thisStage),
          amountBad: countBad,
        },
      },
    });

    setDescription("");
    setCountBad(0);
    setCount(0);
  };

  return (
    <>
      {props.session.endTime ? null : (
        <ModalControl
          title="QA Check"
          handleSubmit={handleSubmit}
          triggerCopy={""}
          submitCopy={"Resolve"}
          buttonAttrs={{ color: "qa", icon: "qa" }}
        >
          <div>
            <p>{props.session.notes}</p>
            <p>
              Creator: <UserName userId={props.session.user} />
            </p>
            <p>
              Assignee:{" "}
              {props.session.secondaryUser ? (
                <UserName userId={props.session.secondaryUser} />
              ) : (
                "None"
              )}
            </p>
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
