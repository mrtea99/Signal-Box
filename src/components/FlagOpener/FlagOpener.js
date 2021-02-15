import React from "react";
import PropTypes from "prop-types";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";

function FlagOpener(props) {
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState(1);

  const handleSubmit = function () {
    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      type: "flag",
      startTime: Date.now(),
      endTime: null,
      user: props.activeUser,
      amount: priority,
      amountType: "Priority",
      notes: description,
      extra: "active",
    };

    props.addSession(newSession, props.thisStage);

    handleCancel();
  };

  const handleCancel = function () {
    setDescription("");
    setPriority(1);
  };

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
        {/* <FormItem
          label="Blocker"
          type="checkbox"
          ident="issue-blocker"
          updateHandler={(value) => {value ? setIsBlocker(2) : setIsBlocker(3)}}
          checked={isBlocker}
        /> */}

        {/* <FormItem
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
        </FormItem> */}

        <FormItem
          label="Priority:"
          type="toggleButton"
          ident="flag-priority"
          itemLabels={["Note", "Issue", "Blocker"]}
          itemValues={["0", "1", "2"]}
          value={priority.toString()}
          updateHandler={(value) => {
            setPriority(parseInt(value));
          }}
        />

        <FormItem
          label="Description:"
          type="textarea"
          ident="issue-description"
          updateHandler={(value) => {
            setDescription("Reported: " + value);
          }}
        />
      </form>
    </ModalControl>
  );
}

FlagOpener.propTypes = {
  activeUser: PropTypes.string.isRequired,
  addSession: PropTypes.func.isRequired,
  thisStage: PropTypes.number.isRequired,
};

export default FlagOpener;
