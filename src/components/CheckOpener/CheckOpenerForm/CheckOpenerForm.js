import React from "react";

import FormItem from "../../FormItem/FormItem";

function CheckOpenerForm(props) {
  return (
    <>
      <FormItem
        label="QA Note:"
        type="textarea"
        ident="qa-description"
        updateHandler={(value) => {
          console.log(value);
          props.setFormData({
            ...props.formData,
            notes: "Requested: " + value,
          });
        }}
      ></FormItem>
      <div>
        <select
          value={props.formData.checker}
          onChange={(e) =>
            props.setFormData({
              ...props.formData,
              checker: parseInt(e.target.value),
            })
          }
        >
          <option value="1">User 1</option>
          <option value="2">User 2</option>
        </select>
      </div>
      <div>
        <select
          value={props.formData.timeframe}
          onChange={(e) =>
            props.setFormData({ ...props.formData, timeframe: e.target.value })
          }
        >
          <option value="now">Immediate</option>
          <option value="shift">Before next shift</option>
          <option value="day">Before next day</option>
        </select>
      </div>
    </>
  );
}

export default CheckOpenerForm;
