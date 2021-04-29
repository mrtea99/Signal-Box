import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";
import UserName from "../UserSwitcher/UserName/UserName.js";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";

import { useTranslation } from "react-i18next";

/**
 * Dialog for editing / ending a flag session.
 */

function FlagCloser(props) {
  const { t } = useTranslation();

  const activeUser = useSelector(selectCurrentUser);

  const defaultFormData = {
    description: props.session.note || "",
    status: props.session.extra,
    priority: props.session.amount,
  };

  const [description, setDescription] = useState(defaultFormData.description);
  const [status, setStatus] = useState(defaultFormData.status);
  const [priority, setPriority] = useState(defaultFormData.priority);

  const resetFormData = function () {
    setDescription(defaultFormData.description);
    setStatus(defaultFormData.status);
    setPriority(defaultFormData.priority);
  };

  const dispatch = useDispatch();

  const handleSubmit = function () {
    const dateNow = new Date().toISOString();

    const labeledDescription =
      (status === "resolved" ? t("Fix") : t("Update")) +
      " [" +
      dateNow +
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
          extraData: { notes: newNote, amount: priority, endTime: dateNow },
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
        return caps ? t("Note") : "note";
      case 1:
        return caps ? t("Issue") : "issue";
      case 2:
        return caps ? t("Blocker") : "blocker";
      default:
        return t("N/A");
    }
  };

  return (
    <>
      {props.session.endTime ? null : (
        <ModalControl
          title={`${t("Update")} ${translatePriority(priority, true)}`}
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
              {t("Raised by")}: <UserName userId={props.session.user} />
            </p>
            <p>
              {t("Notes")}:
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

          <FormItem
            label={`${t("Priority")}:`}
            type="toggleButton"
            ident="flag-priority"
            itemLabels={[t("Note"), t("Issue"), t("Blocker")]}
            itemValues={["0", "1", "2"]}
            value={priority.toString()}
            updateHandler={(value) => {
              setPriority(parseInt(value));
            }}
          />

          <FormItem
            label={`${t("Status")}:`}
            type="toggleButton"
            ident="flag-status"
            itemLabels={[t("Active"), t("Waiting"), t("Resolved")]}
            itemValues={["active", "waiting", "resolved"]}
            value={status}
            updateHandler={(value) => {
              setStatus(value);
            }}
          />

          <FormItem
            label={
              status === "resolved"
                ? t("Fix Description") + ":"
                : t("Update Note") + ":"
            }
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
