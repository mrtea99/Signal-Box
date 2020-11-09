import React from "react";
import styles from "./ButtonSpacer.module.css";

function ButtonSpacer(props) {
  return <div className={`${styles.wrapper} ${props.direction === 'vert' ? styles.wrapperVert : ''}`}>{props.children}</div>;
}

export default ButtonSpacer;
