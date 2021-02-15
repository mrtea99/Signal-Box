import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";
import UserSelect from "../FormItem/UserSelect/UserSelect.js";

function AssignmentOpener(props) {
  const [description, setDescription] = React.useState("");
  const [assignee, setAssignee] = React.useState(null);

  const handleSubmit = function () {
    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      type: "assign",
      startTime: Date.now(),
      endTime: null,
      user: props.activeUser,
      secondaryUser: assignee,
      notes: description,
    };

    props.addSession(newSession, props.thisStage);

    handleCancel();
  };

  const handleCancel = function () {
    setDescription("");
  };

  return (
    <ModalControl
      title="Assign Stage"
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      triggerCopy={"Assign Stage"}
      buttonAttrs={{ fillWidth: true, color: "assign", icon: "assign" }}
    >
      <form>
        <UserSelect
          label="Assignee:"
          ident={"assignee-" + props.thisStage}
          updateHandler={(value) => setAssignee(value)}
          value={assignee}
        />
        <FormItem
          label="Notes:"
          type="textarea"
          ident="assignment-notes"
          updateHandler={(value) => {
            setDescription(value);
          }}
        />
      </form>
    </ModalControl>
  );
}

export default AssignmentOpener;
