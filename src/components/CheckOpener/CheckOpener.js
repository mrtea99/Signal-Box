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
      user: props.activeUser,
      resolved: false,
      ...formData,
    };

    props.addSession(newSession, newSessionUid, props.thisStage);
  };

  return (
    <ModalControl handleSubmit={handleSubmit} triggerCopy={"Request QA Check"}>
      <form>
        <CheckOpenerForm formData={formData} setFormData={setFormData} />
      </form>
    </ModalControl>
  );
}

export default CheckOpener;
