import React from "react";

import styles from "./Stopwatch.module.css";

function Stopwatch(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}><span className={styles.labelInner}>Duration:</span></div>
      <div className={styles.time}>{props.children}</div>
    </div>
  );
}

export default Stopwatch;
