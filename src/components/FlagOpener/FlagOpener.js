import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ModalControl from "../Modal/ModalControl/ModalControl.js";
import FormItem from "../FormItem/FormItem.js";

// import stageNames from "../../data/stageNames.json";

function FlagOpener(props) {
  const activeUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState(1);

  const handleSubmit = function () {
    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      runId: props.currentRunId,
      // stage: stageNames[props.thisStage],
      stage: props.thisStage,
      type: "flag",
      startTime: Date.now(),
      endTime: null,
      user: activeUser,
      amount: priority,
      amountType: "Priority",
      notes: description,
      extra: "active",
    };

    dispatch({
      type: "sessions/add",
      payload: {
        sessionData: newSession,
      },
    });

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
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default FlagOpener;
