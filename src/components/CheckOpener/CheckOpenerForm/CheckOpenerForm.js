import React from "react";

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
        value={props.formData.timeframe}
        updateHandler={(value) =>
          props.setFormData({ ...props.formData, timeframe: value })
        }
      >
        <option value="now">Immediate</option>
        <option value="shift">Before next shift</option>
        <option value="day">Before next day</option>
      </FormItem>
    </>
  );
}

export default CheckOpenerForm;
