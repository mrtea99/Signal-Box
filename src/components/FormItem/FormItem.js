import React from "react";

function FormItem(props) {
  let fieldElem;

  switch (props.type) {
    case "textarea":
      fieldElem = (
        <textarea
          id={props.ident}
          name={props.ident}
          onChange={props.onChange}
          value={props.value}
          {...props.fieldProps}
        />
      );
      break;
    case "number":
      fieldElem = (
        <input
          type="number"
          id={props.ident}
          name={props.ident}
          onChange={props.onChange}
          value={props.value}
          {...props.fieldProps}
        />
      );
      break;
    default:
      fieldElem = <></>;
      break;
  }

  return (
    <div>
      <label htmlFor={props.ident}>{props.label}:</label>
      {fieldElem}
    </div>
  );
}

export default FormItem;
