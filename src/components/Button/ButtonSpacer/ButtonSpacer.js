import React from "react";
import PropTypes from "prop-types";
import styles from "./ButtonSpacer.module.css";

/**
 * Wrapper to align button elements
 */

function ButtonSpacer(props) {
  return (
    <div
      className={`${styles.wrapper} ${
        props.direction === "vert" ? styles.wrapperVert : ""
      } ${props.align === "right" ? styles.wrapperRight : ""}`}
    >
      {props.children}
    </div>
  );
}

ButtonSpacer.propTypes = {
  /** Direction of the flow of children */
  direction: PropTypes.oneOf(["vert", "horiz"]),
  /**  Which side to align the parent element */
  align: PropTypes.oneOf(["left", "right"]),
};

export default ButtonSpacer;
