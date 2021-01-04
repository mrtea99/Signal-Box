import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

function Modal(props) {
  const mount = document.getElementById("modal-root");

  return createPortal(
    <div className={styles.modalOuter}>
      <div className={styles.modalInner}>
        {props.title ? <h3 className={styles.title}>{props.title}</h3> : null}
        {props.children}
      </div>
    </div>,
    mount
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default Modal;
