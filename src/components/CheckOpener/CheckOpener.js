import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";

function CheckOpener(props) {
  const [description, setDescription] = React.useState("");
  const [checker, setChecker] = React.useState(1);
  const [timeframe, setTimeframe] = React.useState("now");

  const handleSubmit = function () {
    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      type: "qa",
      startTime: Date.now(),
      user: props.activeUser,
      resolved: false,
      notes: description,
      checker: checker,
      timeframe: timeframe,
    };

    props.addSession(newSession, newSessionUid, props.thisStage);

    setDescription("");
    setChecker("");
    setTimeframe("now");
  };

  return (
    <ModalControl handleSubmit={handleSubmit} triggerCopy={"Request QA Check"}>
      <form>
        <div>
          <label htmlFor="qa-description">Note:</label>
          <textarea
            id="qa-description"
            name="qa-description"
            onChange={(e) => setDescription("Requested: " + e.target.value)}
          ></textarea>
        </div>
        <div>
          <select
            value={checker}
            onChange={(e) => setChecker(parseInt(e.target.value))}
          >
            <option value="1">User 1</option>
            <option value="2">User 2</option>
          </select>
        </div>
        <div>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="now">Immediate</option>
            <option value="shift">Before next shift</option>
            <option value="day">Before next day</option>
          </select>
        </div>
      </form>
    </ModalControl>
  );
}

export default CheckOpener;
