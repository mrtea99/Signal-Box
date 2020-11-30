import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";

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
    <ModalControl
      title="Report Issue"
      handleSubmit={handleSubmit}
      triggerCopy={"Report Issue"}
      buttonAttrs={{ fillWidth: true, color: "issue", icon: "issue" }}
    >
      <form>
        <FormItem
          label="Issue Description:"
          type="textarea"
          ident="issue-description"
          updateHandler={(value) => {
            setDescription("Issue: " + value);
          }}
        />

        <FormItem
          label="Blocker"
          type="checkbox"
          ident="issue-blocker"
          updateHandler={(value) => setIsBlocker(value)}
          checked={isBlocker}
        />
      </form>
    </ModalControl>
  );
}

export default FlagOpener;
