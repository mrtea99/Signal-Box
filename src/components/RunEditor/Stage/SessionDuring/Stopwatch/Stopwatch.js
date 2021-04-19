import React from "react";
import PropTypes from "prop-types";

import styles from "./Stopwatch.module.css";

import { useTranslation } from "react-i18next";

/**
 * Styled wrapper to show children in a 'stopwatch' style.
 */

function Stopwatch(props) {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span className={styles.labelInner}>{t("Duration")}:</span>
      </div>
      <div className={styles.time}>{props.children}</div>
    </div>
  );
}

Stopwatch.propTypes = {
  children: PropTypes.node,
};

export default Stopwatch;
