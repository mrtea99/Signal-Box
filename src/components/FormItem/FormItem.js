import React from "react";
import Button from "../Button/Button";

import styles from "./FormItem.module.css";

function FormItem(props) {
  const { ident, label, type, updateHandler, ...fieldProps } = props;

  let fieldElem;

  switch (type) {
    case "textarea":
      fieldElem = (
        <textarea
          id={ident}
          name={ident}
          {...fieldProps}
          onChange={(e) => updateHandler(e.target.value)}
          value={fieldProps.value || ""}
          className={`${styles.field} ${styles.fieldText}`}
        />
      );
      break;
    case "number":
      fieldElem = (
        <div className={styles.fieldWrap}>
          <Button
            className={styles.fieldButton}
            icon={"minus"}
            onClick={(e) =>
              updateHandler(
                fieldProps.value !== parseInt(fieldProps.min)
                  ? fieldProps.value - 1
                  : fieldProps.value
              )
            }
          ></Button>
          <input
            type={type}
            id={ident}
            name={ident}
            {...fieldProps}
            onChange={(e) => updateHandler(parseInt(e.target.value || 0))}
            value={fieldProps.value || 0}
            className={`${styles.field} ${styles.fieldNumber}`}
          />
          <Button
            className={styles.fieldButton}
            icon={"plus"}
            onClick={(e) =>
              updateHandler(
                fieldProps.value !== parseInt(fieldProps.max)
                  ? fieldProps.value + 1
                  : fieldProps.value
              )
            }
          ></Button>
        </div>
      );
      break;
    default:
      fieldElem = null;
      break;
  }

  return (
    <div className={`${fieldProps.className} ${styles.itemWrap}`}>
      <label className={styles.label} htmlFor={props.ident}>
        {props.label}
      </label>
      {fieldElem}
    </div>
  );
}

export default FormItem;
