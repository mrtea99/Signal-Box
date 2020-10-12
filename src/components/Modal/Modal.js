import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

function Modal(props) {
  const mount = document.getElementById("modal-root");
  const el = document.createElement("div");

  React.useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  return createPortal(
    <div className={styles.modalOuter}>
      <div className={styles.modalInner}>{props.children}</div>
    </div>,
    el
  );
}

export default Modal;
