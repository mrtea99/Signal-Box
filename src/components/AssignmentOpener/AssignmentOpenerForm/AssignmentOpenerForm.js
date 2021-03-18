import React from "react";
import PropTypes from "prop-types";

import FormItem from "../../FormItem/FormItem.js";
import UserSelect from "../../FormItem/UserSelect/UserSelect.js";

function AssignmentOpenerForm(props) {
  return (
    <>
      <UserSelect
        label="Assignee:"
        ident={"assignee-" + props.thisStage}
        updateHandler={(value) =>
          props.setFormData({ ...props.formData, assignee: parseInt(value) })
        }
        value={props.formData.assignee}
      />
      <FormItem
        label="Notes:"
        type="textarea"
        ident="assignment-notes"
        updateHandler={(value) => {
          props.setFormData({ ...props.formData, description: value });
        }}
        value={props.formData.description}
      />
      <FormItem
        label="Planned Start Date:"
        type="date"
        ident="assignment-date"
        updateHandler={(value) => {
          props.setFormData({ ...props.formData, startDate: value });
        }}
        value={props.formData.startDate}
      />
      <FormItem
        label="Planned Start Time:"
        type="toggleButton"
        ident="assignment-time"
        itemLabels={["Morning", "Noon", "Afternoon"]}
        itemValues={props.shiftTimes}
        value={props.formData.startTime}
        updateHandler={(value) => {
          props.setFormData({ ...props.formData, startTime: parseInt(value) });
        }}
      />
    </>
  );
}

AssignmentOpenerForm.propTypes = {
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
};

export default AssignmentOpenerForm;
