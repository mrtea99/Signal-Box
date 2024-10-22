import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import CheckOpenerForm from "./CheckOpenerForm/CheckOpenerForm.js";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";

// import stageNames from "../../data/stageNames.json";

import { useTranslation } from "react-i18next";

/**
 * Dialog for creating a QA session
 */

function CheckOpener(props) {
  const { t } = useTranslation();

  const activeUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const defaultFormData = {
    notes: "",
    timeframe: "now",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const resetFormData = function () {
    setFormData(defaultFormData);
  };

  const handleSubmit = function () {
    const newsessionId = Date.now();

    const startTime =
      formData.timeframe === "now"
        ? new Date()
        : new Date(parseInt(formData.timeframe));

    const newSession = {
      sessionId: newsessionId,
      runId: props.currentRunId,
      // stage: stageNames[props.thisStage],
      stage: props.thisStage,
      type: "qa",
      startTime: startTime.toISOString(),
      endTime: null,
      user: activeUser,
      secondaryUser: formData.secondaryUser,
      notes: formData.notes,
    };

    dispatch({
      type: "sessions/add",
      payload: {
        sessionData: newSession,
      },
    });

    resetFormData();
  };

  const handleCancel = function () {
    resetFormData();
  };

  return (
    <ModalControl
      title={t("Request QA Check")}
      triggerCopy={t("Request QA Check")}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      buttonAttrs={{ fillWidth: true, color: "qa", icon: "qa" }}
    >
      <form>
        <CheckOpenerForm
          formData={formData}
          setFormData={setFormData}
          thisStage={props.thisStage}
        />
      </form>
    </ModalControl>
  );
}

CheckOpener.propTypes = {
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default CheckOpener;
