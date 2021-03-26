import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import CheckOpenerForm from "./CheckOpenerForm/CheckOpenerForm.js";

// import stageNames from "../../data/stageNames.json";

function CheckOpener(props) {
  const activeUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    notes: "",
    extra: "now",
  });

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
      type: "runs/addSession",
      payload: {
        runId: props.currentRunUid,
        stage: props.thisStage,
        sessionData: newSession,
      },
    });
  };

  return (
    <ModalControl
      title="Request QA Check"
      handleSubmit={handleSubmit}
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
