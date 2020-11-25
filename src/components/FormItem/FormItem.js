import React from "react";

import Button from "../Button/Button.js";
import Icon from "../Icon/Icon.js";

import styles from "./FormItem.module.css";

function FormItem(props) {
  const { ident, label, type, updateHandler, ...fieldProps } = props;

  let labelElem = (
    <label className={styles.label} htmlFor={props.ident}>
      {props.label}
    </label>
  );

  let fieldElem;

  switch (type) {
    case "textarea":
      fieldElem = (
        <textarea
          id={ident}
          name={ident}
          {...fieldProps}
          onChange={(e) => updateHandler(e.target.value)}
          // value={fieldProps.value || ""}
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
    case "select":
      fieldElem = (
        <div className={styles.fieldWrap}>
          <select
            id={ident}
            name={ident}
            {...fieldProps}
            onChange={(e) => updateHandler(e.target.value)}
            className={`${styles.field} ${styles.fieldSelect}`}
          >
            {props.children}
          </select>
          <span className={styles.fieldSelectBtn}>
            <Icon name="start" className={styles.fieldSelectArrow} />
          </span>
        </div>
      );
      break;
    case "radioGroup":
    case "toggleButton":
      labelElem = <p className={styles.label}>{props.label}</p>;
      fieldElem = props.itemValues.map((itemValue, index) => {
        return (
          <React.Fragment key={ident + index}>
            <label htmlFor={ident + index}>{props.itemLabels[index]}</label>
            <input
              type="radio"
              name={ident}
              id={ident + index}
              value={itemValue}
              checked={props.value === itemValue}
              onChange={(e) => updateHandler(e.target.value)}
            />
          </React.Fragment>
        );
      });
      break;
    default:
      fieldElem = null;
      break;
  }

  return (
    <div className={`${fieldProps.className} ${styles.itemWrap}`}>
      {labelElem}
      {fieldElem}
    </div>
  );
}

export default FormItem;
