import React from "react";
import PropTypes from "prop-types";

import ModalControl from "../Modal/ModalControl/ModalControl.js";

function AssignmentCloser(props) {
  return (
    <>
      {props.session.endTime ? null : (
        <ModalControl
          title="Edit Assignment"
          // handleSubmit={handleSubmit}
          triggerCopy={""}
          // submitCopy={"Save"}
          buttonAttrs={{ color: "assign", icon: "assign" }}
        ></ModalControl>
      )}
    </>
  );
}

AssignmentCloser.propTypes = {
  session: PropTypes.object.isRequired,
  endSession: PropTypes.func.isRequired,
  thisStage: PropTypes.number.isRequired,
};

export default AssignmentCloser;
