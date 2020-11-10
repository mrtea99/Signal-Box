import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";

function CheckCloser(props) {
  const [description, setDescription] = React.useState("");
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
        //amount: -Math.abs(countBad),
        amountBad: countBad,
      },
      props.thisStage,
      props.session
    );

    setDescription("");
    setCountBad(0);
  };

  return (
    <>
      {props.session.resolved ? (
        <></>
      ) : (
        <ModalControl handleSubmit={handleSubmit} triggerCopy={"Check"} buttonAttrs={{color: "qa"}}>
          <div>
            <p>{props.session.notes}</p>
            <p>Requested by: {props.session.user}</p>
            <p>Assigned to: {props.session.checker}</p>
            <p>Timeframe: {props.session.timeframe}</p>
          </div>
          <div>
            <label htmlFor="check-description">Note:</label>
            <br />
            <textarea
              id="check-description"
              name="check-description"
              onChange={(e) => setDescription("Checked: " + e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="check-count-bad">Defective:</label>
            <br />
            <input
              type="number"
              id="check-count-bad"
              name="check-count-bad"
              onChange={(e) => setCountBad(parseInt(e.target.value))}
              value={countBad}
            />
          </div>
        </ModalControl>
      )}
    </>
  );
}

export default CheckCloser;
