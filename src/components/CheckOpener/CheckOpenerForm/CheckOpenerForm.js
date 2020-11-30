import React from "react";

import FormItem from "../../FormItem/FormItem.js";

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
      <FormItem
        type="select"
        label="Asignee:"
        value={props.formData.checker}
        updateHandler={(value) =>
          props.setFormData({
            ...props.formData,
            checker: parseInt(value),
          })
        }
      >
        <option value="1">User 1</option>
        <option value="2">User 2</option>
      </FormItem>
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
