import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";

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

  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);

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
      amount: priority,
      amountType: "Priority",
      notes: description,
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
    setDescription("");
    setPriority(1);
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
          value={priority.toString()}
          updateHandler={(value) => {
            setPriority(parseInt(value));
          }}
        />

        <FormItem
          label={`${t("Description")}:`}
          type="textarea"
          ident="issue-description"
          updateHandler={(value) => {
            setDescription(`${t("Reported")}: ${value}`);
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
