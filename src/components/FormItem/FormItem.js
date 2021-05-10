import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button.js";
import Icon from "../Icon/Icon.js";

import styles from "./FormItem.module.css";

/**
 * Component for displaying multiple form element types
 */

function FormItem(props) {
  const { ident, label, type, updateHandler, hideLabel, ...fieldProps } = props;

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
        <div className={`${styles.fieldWrap} ${styles.fieldWrapNumber}`}>
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
          <span className={styles.fieldExtraBtn}>
            <Icon name="start" className={styles.fieldSelectArrow} />
          </span>
        </div>
      );
      break;
    case "radioGroup":
    case "toggleButton":
      labelElem = <p className={styles.label}>{props.label}</p>;
      fieldElem = (
        <div
          className={
            type === "toggleButton" ? styles.toggleButton : styles.radioGroup
          }
        >
          {props.itemValues.map((itemValue, index) => {
            return (
              <div key={ident + index} className={styles.radioItem}>
                <input
                  type="radio"
                  name={ident}
                  id={ident + index}
                  value={itemValue}
                  checked={props.value === itemValue}
                  onChange={(e) => updateHandler(e.target.value)}
                  className={styles.radioInput}
                />
                <label htmlFor={ident + index} className={styles.radioLabel}>
                  <span className={styles.radioLabelText}>
                    {props.itemLabels[index]}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      );
      break;
    case "checkbox":
      labelElem = null;
      fieldElem = (
        <div className={styles.fieldWrap}>
          <input
            type="checkbox"
            name={ident}
            id={ident}
            onChange={(e) => updateHandler(e.target.checked)}
            {...fieldProps}
            className={`${styles.checkboxInput} ${fieldProps.className}`}
          />
          {!props.hideLabel ? (
            <label htmlFor={ident} className={styles.radioLabel}>
              <span className={styles.radioLabelText}>{props.label}</span>
            </label>
          ) : null}
        </div>
      );
      break;
    case "date":
      fieldElem = (
        <div className={styles.fieldWrap}>
          <input
            type="date"
            name={ident}
            id={ident}
            onChange={(e) => updateHandler(e.target.valueAsNumber)}
            className={`${styles.field} ${styles.fieldDate}`}
            required
            {...fieldProps}
            value={new Date(fieldProps.value).toISOString().substr(0, 10)}
          />
          <span className={styles.fieldExtraBtn}>
            <Icon name="calendar" />
          </span>
        </div>
      );
      break;
    default:
      fieldElem = null;
      break;
  }

  let itemSpacing = null;

  switch (props.spacing) {
    case "none":
      itemSpacing = styles.itemWrapSpaceNone;
      break;
    case "top":
      itemSpacing = styles.itemWrapSpaceTop;
      break;
    case "both":
      itemSpacing = styles.itemWrapSpaceBoth;
      break;
    default:
      break;
  }

  return (
    <div
      className={`${fieldProps.className || ""} ${
        styles.itemWrap
      } ${itemSpacing}`}
    >
      {!props.hideLabel ? labelElem : null}
      {fieldElem}
    </div>
  );
}

FormItem.propTypes = {
  /** ID and Name of form item */
  ident: PropTypes.string.isRequired,
  /** Label */
  label: PropTypes.string,
  /** Type of element */
  type: PropTypes.string.isRequired,
  /** Callback for when form item value changes */
  updateHandler: PropTypes.func.isRequired,
  /** Value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Minimum Number */
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Maximum Number */
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** className to add */
  className: PropTypes.string,
  /** Do not display label */
  hideLabel: PropTypes.bool,
  /** Add spacing above whole item */
  spacing: PropTypes.oneOf(["top", "both"]),
};

export default FormItem;
