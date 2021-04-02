import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import CheckOpenerForm from "./CheckOpenerForm/CheckOpenerForm.js";

// import stageNames from "../../data/stageNames.json";

function CheckOpener(props) {
  const activeUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const defaultFormData = {
    notes: "",
    extra: "now",
  };

  const [formData, setFormData] = React.useState(defaultFormData);

  const resetFormData = function () {
    setFormData(defaultFormData);
  };

  const handleSubmit = function () {
    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      runId: props.currentRunUid,
      // stage: stageNames[props.thisStage],
      stage: props.thisStage,
      type: "qa",
      startTime: Date.now(),
      endTime: null,
      user: activeUser,
      ...formData,
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
      title="Request QA Check"
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      triggerCopy={"Request QA Check"}
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
  currentRunUid: PropTypes.number.isRequired,
};

export default CheckOpener;
