import React from "react";
import PropTypes from "prop-types";
import styles from "./ButtonSpacer.module.css";

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
  direction: PropTypes.oneOf(["vert", "horiz"]),
  align: PropTypes.oneOf(["left", "right"])
};

export default ButtonSpacer;
