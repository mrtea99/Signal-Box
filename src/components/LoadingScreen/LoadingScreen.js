import React from "react";

import Icon from "../Icon/Icon";

import styles from "./LoadingScreen.module.css";

function LoadingScreen() {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <Icon name="spinner" className={styles.spinner}></Icon>
        <h1 className={styles.copy}>Loading</h1>
      </div>
    </div>
  );
}

export default LoadingScreen;
