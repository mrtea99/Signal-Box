import React from "react";

import styles from "./InfoPod.module.css";

function InfoPod(props) {
  return <span className={styles.module}>{props.children}</span>;
}

export default InfoPod;
