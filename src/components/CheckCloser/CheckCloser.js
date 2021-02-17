import React from "react";
import PropTypes from "prop-types";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";

import getItemType from "../../utils/getItemType.js";

function CheckCloser(props) {
  const [description, setDescription] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [countBad, setCountBad] = React.useState(0);

  const handleSubmit = function () {
    const newNote =
      props.session.notes && props.session.notes.length
        ? props.session.notes + "\n" + description
        : description;

    props.endSession(
      {
        notes: newNote,
        amount: count,
        amountType: getItemType(props.thisStage),
        amountBad: countBad,
      },
      props.thisStage,
      props.session
    );

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
          submitCopy={"Complete"}
          buttonAttrs={{ color: "qa", icon: "check" }}
        >
          <div>
            <p>{props.session.notes}</p>
            <p>Creator: {props.session.user}</p>
            <p>Assignee: {props.session.secondaryUser}</p>
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
  endSession: PropTypes.func.isRequired,
  thisStage: PropTypes.number.isRequired,
};

export default CheckCloser;
