import React from "react";
import styles from "./Modal.module.css";

function Modal(props) {
  return (
    <div className={styles.modalOuter}>
      <div className={styles.modalInner}>{props.children}</div>
    </div>
  );
}

export default Modal;
