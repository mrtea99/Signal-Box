import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";
import UserName from "../UserSwitcher/UserName/UserName.js";

function FlagCloser(props) {
  const activeUser = useSelector((state) => state.users.currentUser);

  const defaultFormData = {
    description: props.session.note || "",
    status: props.session.extra,
    priority: props.session.amount,
  };

  const [description, setDescription] = useState(
    defaultFormData.description
  );
  const [status, setStatus] = useState(defaultFormData.status);
  const [priority, setPriority] = useState(defaultFormData.priority);

  const resetFormData = function () {
    setDescription(defaultFormData.description);
    setStatus(defaultFormData.status);
    setPriority(defaultFormData.priority);
  };

  const dispatch = useDispatch();

  const handleSubmit = function () {
    const labeledDescription =
      (status === "resolved" ? "Fix" : "Update") +
      " [" +
      Date.now() +
      " " +
      activeUser +
      "]: " +
      description;
    const newNote =
      props.session.notes && props.session.notes.length
        ? props.session.notes + "\n" + labeledDescription
        : labeledDescription;

    if (status === "resolved") {
      dispatch({
        type: "sessions/end",
        payload: {
          sessionId: props.session.sessionId,
          extraData: { notes: newNote, amount: priority },
          endTime: Date.now(),
        },
      });
    } else {
      dispatch({
        type: "sessions/update",
        payload: {
          sessionId: props.session.sessionId,
          extraData: { notes: newNote, amount: priority, extra: status },
        },
      });
    }

    resetFormData();
  };

  const handleCancel = function () {
    resetFormData();
  };

  const handleOpen = function () {
    resetFormData();
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
          handleOpen={handleOpen}
          triggerCopy={""}
          buttonAttrs={{
            color: translatePriority(props.session.amount),
            icon: translatePriority(props.session.amount),
          }}
        >
          <div>
            <p>
              Raised by: <UserName userId={props.session.user} />
            </p>
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
            label="Priority:"
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
          </FormItem> */}

          <FormItem
            label="Priority:"
            type="toggleButton"
            ident="flag-priority"
            itemLabels={["Note", "Issue", "Blocker"]}
            itemValues={["0", "1", "2"]}
            value={priority.toString()}
            updateHandler={(value) => {
              setPriority(parseInt(value));
            }}
          />

          {/* <FormItem
            label="Resolved"
            type="checkbox"
            ident="fix-resolved"
            updateHandler={(value) => {
              setResolved(value);
            }}
            value={resolved}
          /> */}

          <FormItem
            label="Status:"
            type="toggleButton"
            ident="flag-status"
            itemLabels={["Active", "Waiting", "Resolved"]}
            itemValues={["active", "waiting", "resolved"]}
            value={status}
            updateHandler={(value) => {
              setStatus(value);
            }}
          />

          <FormItem
            label={status === "resolved" ? "Fix Description:" : "Update Note:"}
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

FlagCloser.propTypes = {
  session: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default FlagCloser;
