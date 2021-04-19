import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

/**
 * Uses a portal to make a dialog box
 */

function Modal(props) {
  const mount = document.getElementById("modal-root");

  const outerClickClose = function (e) {
    if (e.target === e.currentTarget) {
      if (props.setActive) {
        props.setActive(false);
      }
      if (props.handleCancel) {
        props.handleCancel();
      }
    }
  };

  return createPortal(
    <div className={styles.modalOuter} onClick={(e) => outerClickClose(e)}>
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
  children: PropTypes.node,
  setActive: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default Modal;
