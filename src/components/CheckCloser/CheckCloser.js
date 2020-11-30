import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";

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
        resolved: true,
        notes: newNote,
        amount: count,
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
      {props.session.resolved ? (
        <></>
      ) : (
        <ModalControl
          title="QA Check"
          handleSubmit={handleSubmit}
          triggerCopy={""}
          buttonAttrs={{ color: "qa", icon: "check" }}
        >
          <div>
            <p>{props.session.notes}</p>
            <p>Requested by: {props.session.user}</p>
            <p>Assigned to: {props.session.checker}</p>
            <p>Timeframe: {props.session.timeframe}</p>
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

export default CheckCloser;
