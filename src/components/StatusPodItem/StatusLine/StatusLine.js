import React from "react";
import PropTypes from "prop-types";

import Icon from "../../Icon/Icon.js";

import styles from "./StatusLine.module.css";

function StatusLine() {
  return (
    <span className={styles.wrapper}>
      <Icon name="user" className={`${styles.icon} ${styles.iconUser}`}></Icon>
    </span>
  );
}

StatusLine.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default StatusLine;
