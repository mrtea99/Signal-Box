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
        // <Button disabled="disabled">Fixed</Button>
        <></>
      ) : (
        <ModalControl handleSubmit={handleSubmit} triggerCopy={"Check"}>
          <div>
            <p>{props.session.notes}</p>
            <p>Raised by: {props.session.user}</p>
            <p>{props.session.blocker ? "Blocker" : ""}</p>
          </div>
          <div>
            <label htmlFor="fix-description">Fix Description:</label>
            <textarea
              id="fix-description"
              name="fix-description"
              onChange={(e) => setDescription("Fix: " + e.target.value)}
            ></textarea>
          </div>
        </ModalControl>
      )}
    </>
  );
}

export default CheckCloser;
