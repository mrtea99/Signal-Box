import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";

function FlagOpener(props) {
  const [description, setDescription] = React.useState("");
  const [isBlocker, setIsBlocker] = React.useState(false);

  const handleSubmit = function () {
    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      type: "issue",
      startTime: Date.now(),
      user: props.activeUser,
      resolved: false,
      blocker: isBlocker,
      notes: description,
    };

    props.addSession(newSession, newSessionUid, props.thisStage);

    setDescription("");
    setIsBlocker(false);
  };

  return (
    <ModalControl handleSubmit={handleSubmit} triggerCopy={"Raise Issue"} buttonAttrs={{fillWidth: true}}>
      <form>
        <div>
          <label htmlFor="issue-description">Issue Description:</label>
          <textarea
            id="issue-description"
            name="issue-description"
            onChange={(e) => setDescription("Issue: " + e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="issue-blocker">Blocker:</label>
          <input
            onChange={(e) => setIsBlocker(e.target.checked)}
            type="checkbox"
            id="issue-blocker"
            name="issue-blocker"
          />
        </div>
      </form>
    </ModalControl>
  );
}

export default FlagOpener;
