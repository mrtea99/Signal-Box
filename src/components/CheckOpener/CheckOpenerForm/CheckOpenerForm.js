import React from "react";
import PropTypes from "prop-types";

import FormItem from "../../FormItem/FormItem.js";
import UserSelect from "../../FormItem/UserSelect/UserSelect.js";

function CheckOpenerForm(props) {
  return (
    <>
      <FormItem
        label="QA Note:"
        type="textarea"
        ident="qa-description"
        updateHandler={(value) => {
          props.setFormData({
            ...props.formData,
            notes: "Requested: " + value,
          });
        }}
      />
      <UserSelect
        label="Checker:"
        ident={"sess-assistor-stage-" + props.thisStage}
        updateHandler={(value) =>
          props.setFormData({
            ...props.formData,
            secondaryUser: parseInt(value),
          })
        }
        value={props.formData.secondaryUser}
      />
      <FormItem
        label="Timeframe:"
        type="toggleButton"
        ident={"sess-timeframe-stage-" + props.thisStage}
        itemLabels={["Immediate", "Before next shift", "Before next day"]}
        itemValues={["now", "shift", "day"]}
        value={props.formData.extra}
        updateHandler={(value) => {
          props.setFormData({ ...props.formData, extra: value });
        }}
      />
    </>
  );
}

CheckOpenerForm.propTypes = {
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
};

export default CheckOpenerForm;
