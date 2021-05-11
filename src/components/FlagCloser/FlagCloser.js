import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";
import UserName from "../UserSwitcher/UserName/UserName.js";
import DataList from "../DataList/DataList.js";
import DataListItem from "../DataList/DataListItem/DataListItem.js";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";

import { useTranslation } from "react-i18next";
import SessionCard from "../RunEditor/Stage/SessionCard/SessionCard.js";

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

    let newNote = "";
    if (description.length) {
      newNote =
        props.session.notes && props.session.notes.length
          ? props.session.notes + "\n" + labeledDescription
          : labeledDescription;
    } else {
      newNote = props.session.notes || "";
    }

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
  };

  const handleCancel = function () {
    // resetFormData();
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
            color: translatePriority(priority),
            icon: translatePriority(priority),
          }}
        >
          <SessionCard
            type={translatePriority(priority)}
            padding
            title={t(translatePriority(priority, true))}
          >
            <DataList>
              <DataListItem
                dataKey={t("Raised by")}
                dataValue={<UserName userId={props.session.user} />}
              ></DataListItem>
            </DataList>

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
              spacing="both"
            />
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
          </SessionCard>
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
