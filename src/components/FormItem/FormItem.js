import React from "react";

import styles from "./FormItem.module.css";

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
          className={`${fieldProps.className} ${styles.field} ${styles.fieldText}`}
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
          className={`${fieldProps.className} ${styles.field} ${styles.fieldNumber}`}
        />
      );
      break;
    default:
      fieldElem = null;
      break;
  }

  return (
    <div className={styles.itemWrap}>
      <label className={styles.label} htmlFor={props.ident}>{props.label}</label>
      {fieldElem}
    </div>
  );
}

export default FormItem;
