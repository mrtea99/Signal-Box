import React from "react";
import PropTypes from "prop-types";

import styles from "./Stopwatch.module.css";

function Stopwatch(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span className={styles.labelInner}>Duration:</span>
      </div>
      <div className={styles.time}>{props.children}</div>
    </div>
  );
}

Stopwatch.propTypes = {
  children: PropTypes.node,
};

export default Stopwatch;
