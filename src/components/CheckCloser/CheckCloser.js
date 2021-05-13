import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
// import { useHistory, useParams } from "react-router";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";
import UserName from "../UserSwitcher/UserName/UserName.js";
import UserSelect from "../FormItem/UserSelect/UserSelect.js";
import FormLayout from "../FormItem/FormLayout/FormLayout.js";
import DateTimeFormatter from "../DateTimeFormatter/DateTimeFormatter.js";
import DataList from "../DataList/DataList.js";
import DataListItem from "../DataList/DataListItem/DataListItem.js";
// import SessionCard from "../RunEditor/Stage/SessionCard/SessionCard.js";

import getItemType from "../../utils/getItemType.js";

import { useTranslation } from "react-i18next";

/**
 * Dialog for editing / ending a QA session
 */

function CheckCloser(props) {
  const { t } = useTranslation();

  const defaultFormState = {
    description: "",
    count: props.session.amount || 0,
    countBad: props.session.amountBad || 0,
    assignee: props.session.secondaryUser,
    status: "active",
  };

  const [description, setDescription] = useState(defaultFormState.description);
  const [count, setCount] = useState(defaultFormState.count);
  const [countBad, setCountBad] = useState(defaultFormState.countBad);
  const [assignee, setAssignee] = useState(defaultFormState.assignee);
  const [status, setStatus] = useState(defaultFormState.status);

  const resetFormState = function () {
    setDescription(defaultFormState.description);
    setCount(defaultFormState.count);
    setCountBad(defaultFormState.countBad);
    setAssignee(defaultFormState.assignee);
    setStatus(defaultFormState.status);
  };

  // const { runId, stageNum, sessionId } = useParams();
  // let history = useHistory();

  // const startOpen = parseInt(sessionId) === props.session.sessionId;

  const closeModal = function () {
    resetFormState();

    // history.push(`/run/${runId}/${stageNum}`);
  };

  const dispatch = useDispatch();

  const handleSubmit = function () {
    const newNote =
      props.session.notes && props.session.notes.length
        ? props.session.notes + "\n" + description
        : description;

    const extraData = {
      notes: newNote,
      amount: count,
      amountType: getItemType(props.thisStage),
      amountBad: countBad,
      secondaryUser: assignee,
    };

    if (status === "resolved") {
      Object.assign(extraData, { endTime: new Date().toISOString() });

      dispatch({
        type: "sessions/end",
        payload: {
          sessionId: props.session.sessionId,
          extraData,
        },
      });
    } else {
      dispatch({
        type: "sessions/update",
        payload: {
          sessionId: props.session.sessionId,
          extraData,
        },
      });
    }

    closeModal();
  };

  const handleCancel = function () {
    closeModal();
  };

  const handleOpen = function () {
    resetFormState();

    // history.push(`/run/${runId}/${stageNum}/${props.session.sessionId}`);
  };

  return (
    <>
      {props.session.endTime ? null : (
        <ModalControl
          title={t("QA Check")}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleOpen={handleOpen}
          triggerCopy={""}
          submitCopy={t("Save")}
          buttonAttrs={{ color: "qa", icon: "qa" }}
          // startOpen={startOpen}
        >
          {/* <SessionCard type="qa" padding title={t("QA Check")}> */}
          <DataList>
            <DataListItem
              dataKey={t("Creator")}
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
            {/* <DataListItem
                dataKey={t("Duration")}
                dataValue={<Timer startTime={props.session.startTime}></Timer>}
              /> */}
          </DataList>
          <UserSelect
            label={`${t("Assignee")}:`}
            ident={"assignee-" + props.thisStage}
            updateHandler={(value) => setAssignee(parseInt(value))}
            value={assignee}
            spacing="both"
          />

          <p>
            {t("Raising Note")}: {props.session.notes || "None"}
          </p>

          <FormItem
            label={`${t("Checker Note")}:`}
            type="textarea"
            ident="check-description"
            updateHandler={(value) => {
              setDescription(`${t("Checked")}: ${value}`);
            }}
          />
          <FormLayout>
            <FormItem
              label={`${t("Passed")}:`}
              type="number"
              ident={"check-count"}
              updateHandler={(value) => setCount(parseInt(value))}
              value={count}
              min="0"
            />
            <FormItem
              label={`${t("Failed")}:`}
              type="number"
              ident={"check-count-bad"}
              updateHandler={(value) => setCountBad(parseInt(value))}
              value={countBad}
              min="0"
            />
          </FormLayout>
          <FormItem
            label={`${t("Status")}:`}
            type="toggleButton"
            ident="assignment-status"
            itemLabels={[t("Active"), t("Resolved")]}
            itemValues={["active", "resolved"]}
            value={status}
            updateHandler={(value) => {
              setStatus(value);
            }}
          />
          {/* </SessionCard> */}
        </ModalControl>
      )}
    </>
  );
}

CheckCloser.propTypes = {
  session: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default CheckCloser;
