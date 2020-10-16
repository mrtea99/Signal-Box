import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

function Modal(props) {
  const mount = document.getElementById("modal-root");

  return createPortal(
    <div className={styles.modalOuter}>
      <div className={styles.modalInner}>{props.children}</div>
    </div>,
    mount
  );
}

export default Modal;
