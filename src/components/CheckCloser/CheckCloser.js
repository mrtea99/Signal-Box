import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";

function CheckCloser(props) {
  const [description, setDescription] = React.useState("");

  const handleSubmit = function () {
    props.endSession(
      { resolved: true, notes: props.session.notes + "\n" + description },
      props.thisStage,
      props.session
    );

    setDescription("");
  };

  return (
    <>
      {props.session.resolved ? (
        <></>
      ) : (
        <ModalControl handleSubmit={handleSubmit} triggerCopy={"Check"}>
          <div>
            <p>{props.session.notes}</p>
            <p>Requested by: {props.session.user}</p>
            <p>Assigned to: {props.session.checker}</p>
            <p>Timeframe: {props.session.timeframe}</p>
          </div>
          <div>
            <label htmlFor="fix-description">Note:</label>
            <br />
            <textarea
              id="check-description"
              name="check-description"
              onChange={(e) => setDescription("Checked: " + e.target.value)}
            ></textarea>
          </div>
        </ModalControl>
      )}
    </>
  );
}

export default CheckCloser;
