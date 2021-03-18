import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import CheckOpenerForm from "./CheckOpenerForm/CheckOpenerForm.js";

function CheckOpener(props) {
  const activeUser = useSelector((state) => state.users.currentUser);

  const [formData, setFormData] = React.useState({
    notes: "",
    extra: "now",
  });

  const handleSubmit = function () {
    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      type: "qa",
      startTime: Date.now(),
      endTime: null,
      user: activeUser,
      ...formData,
    };

    props.addSession(newSession, props.thisStage);
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
  addSession: PropTypes.func.isRequired,
  thisStage: PropTypes.number.isRequired,
};

export default CheckOpener;
