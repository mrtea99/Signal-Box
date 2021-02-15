import React from "react";

import ModalControl from "../Modal/ModalControl/ModalControl.js";

function AssignmentOpener() {
  return (
    <ModalControl
      title="Assign Stage"
      // handleSubmit={}
      // handleCancel={}
      triggerCopy={"Assign Stage"}
      buttonAttrs={{ fillWidth: true, color: "assign", icon: "assign" }}
    ></ModalControl>
  );
}

export default AssignmentOpener;
