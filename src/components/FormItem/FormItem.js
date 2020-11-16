import React from "react";

function FormItem(props) {
  const { ident, label, type, ...fieldProps } = props;

  let fieldElem;

  switch (type) {
    case "textarea":
      fieldElem = (
        <textarea
          id={ident}
          name={ident}
          {...fieldProps}
          value={fieldProps.value || ""}
        />
      );
      break;
    case "number":
      fieldElem = (
        <input
          type={type}
          id={ident}
          name={ident}
          {...fieldProps}
          value={fieldProps.value || 0}
        />
      );
      break;
    default:
      fieldElem = null;
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
