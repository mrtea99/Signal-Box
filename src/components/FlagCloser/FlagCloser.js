import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";
import UserName from "../UserSwitcher/UserName/UserName.js";
import DataList from "../DataList/DataList.js";
import DataListItem from "../DataList/DataListItem/DataListItem.js";
// import SessionCard from "../RunEditor/Stage/SessionCard/SessionCard.js";
import DateTimeFormatter from "../DateTimeFormatter/DateTimeFormatter.js";

import getFlagName from "../../utils/getFlagName.js";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";

import { useTranslation } from "react-i18next";
import UserSelect from "../FormItem/UserSelect/UserSelect.js";
// import { useHistory, useParams } from "react-router";

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
    fixer: props.session.secondaryUser,
  };

  const [formData, setFormData] = useState(defaultFormData);

  const resetFormData = function () {
    setFormData(defaultFormData);
  };

  // const { runId, stageNum, sessionId } = useParams();
  // let history = useHistory();

  // const startOpen = parseInt(sessionId) === props.session.sessionId;

  const closeModal = function () {
    resetFormData();

    // history.push(`/run/${runId}/${stageNum}`);
  };

  const dispatch = useDispatch();

  const handleSubmit = function () {
    const dateNow = new Date().toISOString();

    const labeledDescription =
      (formData.status === "resolved" ? t("Fix") : t("Update")) +
      " [" +
      dateNow +
      " " +
      activeUser +
      "]: " +
      formData.description;

    let newNote = "";
    if (formData.description.length) {
      newNote =
        props.session.notes && props.session.notes.length
          ? props.session.notes + "\n" + labeledDescription
          : labeledDescription;
    } else {
      newNote = props.session.notes || "";
    }

    if (formData.status === "resolved") {
      dispatch({
        type: "sessions/end",
        payload: {
          sessionId: props.session.sessionId,
          extraData: {
            notes: newNote,
            amount: formData.priority,
            endTime: dateNow,
            secondaryUser: formData.fixer,
          },
        },
      });
    } else {
      dispatch({
        type: "sessions/update",
        payload: {
          sessionId: props.session.sessionId,
          extraData: {
            notes: newNote,
            amount: formData.priority,
            extra: formData.status,
            secondaryUser: formData.fixer,
          },
        },
      });
    }
  };

  const handleCancel = function () {
    // closeModal();
  };

  const handleOpen = function () {
    closeModal();

    // history.push(`/run/${runId}/${stageNum}/${props.session.sessionId}`);
  };

  return (
    <>
      {props.session.endTime ? null : (
        <ModalControl
          title={`${t("Update")} ${getFlagName(formData.priority, true)}`}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleOpen={handleOpen}
          triggerCopy={""}
          buttonAttrs={{
            color: getFlagName(formData.priority),
            icon: getFlagName(formData.priority),
          }}
          // startOpen={startOpen}
        >
          {/* <SessionCard
            type={getFlagName(priority)}
            padding
            title={t(getFlagName(priority, true))}
          > */}
          <DataList>
            <DataListItem
              dataKey={t("Raised by")}
              dataValue={<UserName userId={props.session.user} />}
            />
            <DataListItem
              dataKey={t("Start Time")}
              dataValue={
                <DateTimeFormatter
                  date={props.session.startTime}
                ></DateTimeFormatter>
              }
            />
          </DataList>

          <FormItem
            label={`${t("Priority")}:`}
            type="toggleButton"
            ident="flag-priority"
            itemLabels={[t("Note"), t("Issue"), t("Blocker")]}
            itemValues={["0", "1", "2"]}
            value={formData.priority.toString()}
            updateHandler={(value) => {
              setFormData({ ...formData, priority: parseInt(value) });
            }}
            spacing="both"
          />
          <UserSelect
            label={`${t("Assignee")}:`}
            ident={"sess-fixer-stage-" + props.thisStage}
            updateHandler={(value) =>
              setFormData({
                ...formData,
                fixer: parseInt(value),
              })
            }
            value={formData.fixer}
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
              formData.status === "resolved"
                ? t("Fix Description") + ":"
                : t("Update Note") + ":"
            }
            type="textarea"
            ident="flag-note"
            updateHandler={(value) => {
              setFormData({ ...formData, description: value });
            }}
          />
          <FormItem
            label={`${t("Status")}:`}
            type="toggleButton"
            ident="flag-status"
            itemLabels={[t("Active"), t("Waiting"), t("Resolved")]}
            itemValues={["active", "waiting", "resolved"]}
            value={formData.status}
            updateHandler={(value) => {
              setFormData({ ...formData, status: value });
            }}
          />
          {/* </SessionCard> */}
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
