import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";

function FlagOpener(props) {
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState(0);

  const handleSubmit = function () {
    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      type: "issue",
      startTime: Date.now(),
      endTime: null,
      user: props.activeUser,
      amount: priority,
      notes: description,
    };

    props.addSession(newSession, props.thisStage);

    setDescription("");
    setPriority(0);
  };

  const handleCancel = function() {
    setDescription("");
    setPriority(0);
  }

  // const translatePriority = function (count) {
  //   switch (count) {
  //     case 0:
  //       return "note";
  //     case 1:
  //       return "issue";
  //     case 2:
  //       return "blocker";
  //     default:
  //       return "N/A";
  //   }
  // };

  return (
    <ModalControl
      title="Raise Flag"
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      triggerCopy={"Flag Problem"}
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

        {/* <FormItem
          label="Blocker"
          type="checkbox"
          ident="issue-blocker"
          updateHandler={(value) => {value ? setIsBlocker(2) : setIsBlocker(3)}}
          checked={isBlocker}
        /> */}

        <FormItem
          label="Priority"
          type="select"
          ident="flag-blocker"
          updateHandler={(value) => {
            setPriority(parseInt(value));
          }}
        >
          <option value="0">Note</option>
          <option value="1">Issue</option>
          <option value="2">Blocker</option>
        </FormItem>
      </form>
    </ModalControl>
  );
}

export default FlagOpener;
