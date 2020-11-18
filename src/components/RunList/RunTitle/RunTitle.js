import React from "react";

import styles from "./RunTitle.module.css";

function RunTitle(props) {
  return (
    <div className={`${styles.itemInfo}`}>
      <h3 className={styles.itemTitle}>{props.children}</h3>
    </div>
  );
}

export default RunTitle;
