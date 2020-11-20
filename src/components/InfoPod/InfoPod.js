import React from "react";

import styles from "./InfoPod.module.css";

function InfoPod(props) {
  return <span className={`${styles.module} ${props.fullWidth ? styles.moduleFullWidth : ""}`}>{props.children}</span>;
}

export default InfoPod;
