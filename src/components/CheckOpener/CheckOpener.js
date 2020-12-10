import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import CheckOpenerForm from "./CheckOpenerForm/CheckOpenerForm.js";

function CheckOpener(props) {
  // const [description, setDescription] = React.useState("");
  // const [checker, setChecker] = React.useState(1);
  // const [timeframe, setTimeframe] = React.useState("now");

  const [formData, setFormData] = React.useState({
    notes: "",
    checker: 1,
    timeframe: "now",
  });

  const handleSubmit = function () {
    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      type: "qa",
      startTime: Date.now(),
      endTime: null,
      user: props.activeUser,
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
        <CheckOpenerForm formData={formData} setFormData={setFormData} />
      </form>
    </ModalControl>
  );
}

export default CheckOpener;
