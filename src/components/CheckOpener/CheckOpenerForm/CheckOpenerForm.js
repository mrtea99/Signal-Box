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
            secondaryUser: value,
          })
        }
        value={props.formData.secondaryUser}
      />
      <FormItem
        type="select"
        label="Timeframe:"
        ident={"sess-timeframe-stage-" + props.thisStage}
        value={props.formData.extra}
        updateHandler={(value) =>
          props.setFormData({ ...props.formData, extra: value })
        }
      >
        <option value="now">Immediate</option>
        <option value="shift">Before next shift</option>
        <option value="day">Before next day</option>
      </FormItem>
    </>
  );
}

CheckOpenerForm.propTypes = {
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
};

export default CheckOpenerForm;

