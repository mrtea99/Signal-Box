import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";

function FlagCloser(props) {
  const [description, setDescription] = React.useState("");
  const [resolved, setResolved] = React.useState(false);
  const [blocker, setBlocker] = React.useState(props.session.blocker);

  const handleSubmit = function () {
    const labeledDescription = (resolved ? "Fix: " : "Update: ") + description;
    const newNote =
      props.session.notes && props.session.notes.length
        ? props.session.notes + "\n" + labeledDescription
        : labeledDescription;

    if (resolved) {
      props.endSession(
        { resolved: true, notes: newNote, blocker: blocker },
        props.thisStage,
        props.session
      );
    } else {
      props.updateSession(
        { notes: newNote, blocker: blocker },
        props.thisStage,
        props.session.sessionUid
      );
    }

    handleCancel();
  };

  const handleCancel = function () {
    setDescription("");
    setResolved(false);
    setBlocker(props.session.blocker);
  };

  return (
    <>
      {props.session.resolved ? null : (
        <ModalControl
          title="Update Issue"
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          triggerCopy={""}
          buttonAttrs={{
            color: props.session.blocker ? "blocker" : "issue",
            icon: "fix",
          }}
        >
          <div>
            <p>Raised by: {props.session.user}</p>
            <p>
              Notes:
              <br />
              {props.session.notes.split("\n").map((item, key) => {
                return (
                  <span key={key}>
                    {item}
                    <br />
                  </span>
                );
              })}
            </p>
            {/* <p>{props.session.blocker ? "Blocker" : ""}</p> */}
          </div>

          <FormItem
            label="Blocker"
            type="checkbox"
            ident="fix-blocker"
            updateHandler={(value) => {
              setBlocker(value);
            }}
            checked={blocker}
          />

          <FormItem
            label="Issue Resolved"
            type="checkbox"
            ident="fix-resolved"
            updateHandler={(value) => {
              setResolved(value);
            }}
            value={resolved}
          />

          <FormItem
            label={resolved ? "Fix Description:" : "Update Note:"}
            type="textarea"
            ident="issue-note"
            updateHandler={(value) => {
              setDescription(value);
            }}
          />
        </ModalControl>
      )}
    </>
  );
}

export default FlagCloser;
