import React from "react";
import PropTypes from "prop-types";

import FormItem from "../../FormItem/FormItem.js";
import UserSelect from "../../FormItem/UserSelect/UserSelect.js";

import { useTranslation } from "react-i18next";

/**
 * Form for editing an assignment session
 */

function AssignmentOpenerForm(props) {
  const { t } = useTranslation();

  return (
    <>
      <UserSelect
        label={`${t("Assignee")}:`}
        ident={"assignee-" + props.thisStage}
        updateHandler={(value) =>
          props.setFormData({
            ...props.formData,
            assignee: parseInt(value) || null,
          })
        }
        value={props.formData.assignee}
      />
      <FormItem
        label={`${t("Notes")}:`}
        type="textarea"
        ident="assignment-notes"
        updateHandler={(value) => {
          props.setFormData({ ...props.formData, description: value });
        }}
        value={props.formData.description}
      />
      <FormItem
        label={`${t("Planned Start Date")}:`}
        type="date"
        ident="assignment-date"
        updateHandler={(value) => {
          props.setFormData({ ...props.formData, startDate: value });
        }}
        value={props.formData.startDate}
      />
      <FormItem
        label={`${t("Planned Start Time")}:`}
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
