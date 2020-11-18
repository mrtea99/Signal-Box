import React from "react";

import styles from "./InfoPodItem.module.css";

function InfoPodItem(props) {
  return (
    <span
      className={`${props.className} ${styles.core} ${
        props.type === "label" ? styles.coreLabel : ""
      } ${props.type === "flag" ? styles.flag : ""} ${
        props.type === "flag" && props.active ? styles.flagActive : ""
      }`}
    >
      <span className={styles.inner}>{props.children}</span>
    </span>
  );
}

export default InfoPodItem;
