import React from "react";
import PropTypes from "prop-types";

import styles from "./QueueWrapper.module.css";

function QueueWrapper(props) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.title}>{props.title}</h3>
      </header>
      <div className={styles.inner}>{props.children}</div>
    </div>
  );
}

QueueWrapper.propTypes = {
  title: PropTypes.string.isRequired,
};

export default QueueWrapper;
