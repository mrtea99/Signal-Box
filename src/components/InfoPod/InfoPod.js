import React from "react";
import PropTypes from "prop-types";

import styles from "./InfoPod.module.css";

/**
 * Parent wrapper for InfoPods
 */

function InfoPod(props) {
  return (
    <span
      className={`${styles.module} ${
        props.fullWidth ? styles.moduleFullWidth : ""
      }`}
    >
      {props.children}
    </span>
  );
}

InfoPod.propTypes = {
  fullWidth: PropTypes.bool,
  children: PropTypes.node,
};

export default InfoPod;
