import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";

function FlagCloser(props) {
  const [description, setDescription] = React.useState("");

  const handleSubmit = function () {
    const newNote =
      props.session.notes && props.session.notes.length
        ? props.session.notes + "\n" + description
        : description;

    props.endSession(
      { resolved: true, notes: newNote },
      props.thisStage,
      props.session
    );

    setDescription("");
  };

  return (
    <>
      {props.session.resolved ? null : (
        <ModalControl
          title="Fix Issue"
          handleSubmit={handleSubmit}
          triggerCopy={""}
          buttonAttrs={{ color: "issue", icon: "fix" }}
        >
          <div>
            <p>{props.session.notes}</p>
            <p>Raised by: {props.session.user}</p>
            <p>{props.session.blocker ? "Blocker" : ""}</p>
          </div>

          <FormItem
            label="Fix Description:"
            type="textarea"
            ident="fix-description"
            updateHandler={(value) => {
              setDescription("Fix: " + value);
            }}
          />
        </ModalControl>
      )}
    </>
  );
}

export default FlagCloser;
