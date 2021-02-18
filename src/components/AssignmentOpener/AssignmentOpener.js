import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";
import UserSelect from "../FormItem/UserSelect/UserSelect.js";
import PagedModal from "../Modal/PagedModal/PagedModal.js";

function AssignmentOpener(props) {
  const millisecondsPerHour = 3600000;
  const shiftTimes = [
    millisecondsPerHour * 9,
    millisecondsPerHour * 12,
    millisecondsPerHour * 15,
  ];

  const [description, setDescription] = React.useState("");
  const [assignee, setAssignee] = React.useState(null);
  const [startDate, setStartDate] = React.useState(Date.now());
  const [startTime, setStartTime] = React.useState(shiftTimes[0]);

  const handleSubmit = function () {
    //basic validation
    if (assignee === null || startDate === null) {
      return false;
    }

    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      type: "assign",
      startTime: startDate + startTime,
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
    setAssignee(null);
    setStartDate(Date.now());
    setStartTime(shiftTimes[0]);
  };

  return (
    <>
      <PagedModal
        title="Assign Stage"
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        triggerCopy={"Assign Stage"}
        buttonAttrs={{ fillWidth: true, color: "assign", icon: "assign" }}
        pages={[
          <React.Fragment key="key1">Page1</React.Fragment>,
          <React.Fragment key="key2">Page2</React.Fragment>,
          <React.Fragment key="key3">Page3</React.Fragment>,
          <React.Fragment key="key4">Page4 </React.Fragment>,
        ]}
      ></PagedModal>

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
            value={description}
          />
          <FormItem
            label="Planned Start Date:"
            type="date"
            ident="assignment-date"
            updateHandler={(value) => {
              setStartDate(value);
            }}
            value={startDate}
          />

          <FormItem
            label="Planned Start Time:"
            type="toggleButton"
            ident="assignment-time"
            itemLabels={["Morning", "Noon", "Afternoon"]}
            itemValues={shiftTimes}
            value={startTime}
            updateHandler={(value) => {
              setStartTime(parseInt(value));
            }}
          />
        </form>
      </ModalControl>
    </>
  );
}

export default AssignmentOpener;
