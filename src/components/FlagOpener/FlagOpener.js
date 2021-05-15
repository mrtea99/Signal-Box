import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";
import UserSelect from "../FormItem/UserSelect/UserSelect.js";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";

// import stageNames from "../../data/stageNames.json";

import { useTranslation } from "react-i18next";

/**
 * Dialog for creating a flag session
 */

function FlagOpener(props) {
  const { t } = useTranslation();

  const activeUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const defultFormState = {
    description: "",
    priority: 1,
    fixer: null,
  };

  // const [description, setDescription] = useState("");
  // const [priority, setPriority] = useState(1);
  const [formState, setFormState] = useState(defultFormState);

  const handleSubmit = function () {
    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      runId: props.currentRunId,
      // stage: stageNames[props.thisStage],
      stage: props.thisStage,
      type: "flag",
      startTime: new Date().toISOString(),
      endTime: null,
      user: activeUser,
      secondaryUser: formState.fixer,
      amount: formState.priority,
      amountType: "Priority",
      notes: formState.description,
      extra: "active",
    };

    dispatch({
      type: "sessions/add",
      payload: {
        sessionData: newSession,
      },
    });

    handleCancel();
  };

  const handleCancel = function () {
    setFormState(defultFormState);
  };

  return (
    <ModalControl
      title={t("Raise Flag")}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      triggerCopy={t("Flag Problem")}
      buttonAttrs={{ fillWidth: true, color: "issue", icon: "issue" }}
    >
      <form>
        <FormItem
          label={`${t("Priority")}:`}
          type="toggleButton"
          ident="flag-priority"
          itemLabels={["Note", "Issue", "Blocker"]}
          itemValues={["0", "1", "2"]}
          value={formState.priority.toString()}
          updateHandler={(value) => {
            setFormState({ ...formState, priority: parseInt(value) });
          }}
        />
        <UserSelect
          label={`${t("Assignee")}:`}
          ident={"sess-fixer-stage-" + props.thisStage}
          updateHandler={(value) =>
            setFormState({
              ...formState,
              fixer: parseInt(value),
            })
          }
          value={formState.fixer}
        />

        <FormItem
          label={`${t("Description")}:`}
          type="textarea"
          ident="issue-description"
          updateHandler={(value) => {
            setFormState({
              ...formState,
              description: `${t("Reported")}: ${value}`,
            });
          }}
        />
      </form>
    </ModalControl>
  );
}

FlagOpener.propTypes = {
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default FlagOpener;
