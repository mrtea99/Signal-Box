import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import Button from "../Button/Button";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer";

import styles from "./Modal.module.css";

/**
 * Uses a portal to make a dialog box
 */

function Modal(props) {
  const mount = document.getElementById("modal-root");

  const outerClickClose = function (e) {
    // if (e.target === e.currentTarget) {
    //   closeModal();
    // }
  };

  const closeModal = function () {
    if (props.setActive) {
      props.setActive(false);
    }
    if (props.handleCancel) {
      props.handleCancel();
    }
  };

  return createPortal(
    <div className={styles.modalOuter} onClick={(e) => outerClickClose(e)}>
      <div className={styles.modalInner}>
        {props.title ? (
          <header className={styles.titleHeader}>
            <h3 className={styles.title}>{props.title}</h3>
            <Button
              color="cancel"
              className={styles.titleClose}
              onClick={() => closeModal()}
              icon={"cross"}
            />
          </header>
        ) : null}
        <div
          className={`${styles.content} ${
            props.title ? styles.contentWithTitle : null
          }`}
        >
          {props.children}
        </div>
        {props.controls ? (
          <footer className={styles.controlsFooter}>
            <ButtonSpacer align="right">{props.controls}</ButtonSpacer>
          </footer>
        ) : null}
      </div>
    </div>,
    mount
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  controls: PropTypes.node,
  setActive: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default Modal;
