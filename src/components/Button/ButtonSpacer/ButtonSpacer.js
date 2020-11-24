import React from "react";
import styles from "./ButtonSpacer.module.css";

function ButtonSpacer(props) {
  return (
    <div
      className={`${styles.wrapper} ${
        props.direction === "vert" ? styles.wrapperVert : ""
      } ${props.align === "right" ? styles.wrapperRight : ""}`}
    >
      {props.children}
    </div>
  );
}

export default ButtonSpacer;
