import React from "react";

import Icon from "../Icon/Icon";

import styles from "./LoadingScreen.module.css";

import { useTranslation } from "react-i18next";

function LoadingScreen() {
  const { t } = useTranslation();

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <Icon name="spinner" className={styles.spinner}></Icon>
        <h1 className={styles.copy}>{t("Loading")}</h1>
      </div>
    </div>
  );
}

export default LoadingScreen;
