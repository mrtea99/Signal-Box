import React from "react";

import styles from "./InfoPodSection.module.css";

function InfoPodSection(props) {
  return (
    <span className={styles.wrapper}>
      {props.children}
      <span className={styles.flags}>{props.flags}</span>
    </span>
  );
}

export default InfoPodSection;
