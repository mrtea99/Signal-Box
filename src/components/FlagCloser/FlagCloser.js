import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";

function FlagCloser(props) {
  const [description, setDescription] = React.useState("");
  const [resolved, setResolved] = React.useState(false);
  const [priority, setPriority] = React.useState(props.session.amount);

  const handleSubmit = function () {
    const labeledDescription =
      (resolved ? "Fix" : "Update") +
      " [" +
      Date.now() +
      " " +
      props.activeUser +
      "]: " +
      description;
    const newNote =
      props.session.notes && props.session.notes.length
        ? props.session.notes + "\n" + labeledDescription
        : labeledDescription;

    if (resolved) {
      props.endSession(
        { notes: newNote, amount: priority },
        props.thisStage,
        props.session
      );
    } else {
      props.updateSession(
        { notes: newNote, amount: priority },
        props.thisStage,
        props.session.sessionUid
      );
    }

    handleCancel();
  };

  const handleCancel = function () {
    setDescription("");
    setResolved(false);
    setPriority(props.session.amount);
  };

  const translatePriority = function (count, caps) {
    switch (count) {
      case 0:
        return caps ? "Note" : "note";
      case 1:
        return caps ? "Issue" : "issue";
      case 2:
        return caps ? "Blocker" : "blocker";
      default:
        return "N/A";
    }
  };

  return (
    <>
      {props.session.endTime ? null : (
        <ModalControl
          title={"Update " + translatePriority(priority, true)}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          triggerCopy={""}
          buttonAttrs={{
            color: translatePriority(props.session.amount),
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
          </div>

          {/* <FormItem
            label="Blocker"
            type="checkbox"
            ident="fix-blocker"
            updateHandler={(value) => {
              value ? setPriority(1) : setPriority(2) ;
            }}
            checked={priority === 2}
          /> */}

          <FormItem
            label="Priority"
            type="select"
            ident="flag-blocker"
            updateHandler={(value) => {
              setPriority(parseInt(value));
            }}
            value={priority}
          >
            <option value="0">Note</option>
            <option value="1">Issue</option>
            <option value="2">Blocker</option>
          </FormItem>

          <FormItem
            label="Resolved"
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
            ident="flag-note"
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
