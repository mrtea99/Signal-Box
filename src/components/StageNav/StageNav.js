import React from "react";
import PropTypes from "prop-types";

import StageStatus from "../StageStatus/StageStatus.js";

import styles from "./StageNav.module.css";

import stageNames from "../../data/stageNames.json";
import { Link } from "react-router-dom";

/**
 * Displays all the stages for a run with status.
 */

function StageNav(props) {
  const handleNavList = function () {
    const leavingPath = window.location.pathname;
    if (!leavingPath.includes("/run/")) {
      window.localStorage.setItem("editorBackLoc", window.location.pathname);
    }
  };

  return (
    <ul className={styles.progBar}>
      {stageNames.map((stage, index) => (
        <li key={props.currentRunId + stage} className={styles.progItem}>
          <Link
            className={`${styles.progBtn} ${
              props.activeStage === index && props.showActive
                ? styles.progBtnActive
                : ""
            }`}
            onClick={() => handleNavList()}
            to={`/run/${props.currentRunId}/${index}`}
          >
            <span
              className={`${styles.btnLabel} ${
                props.stageLabels ? styles.showLabel : ""
              }`}
            >
              {stage}
            </span>
            {props.hideStatus}
            {props.hideStatus ? null : (
              <span className={styles.status}>
                <StageStatus
                  currentRunId={props.currentRunId}
                  stageNum={index}
                  label={props.sessionLabels}
                />
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

StageNav.propTypes = {
  currentRunId: PropTypes.number,
  activeStage: PropTypes.number,
  showActive: PropTypes.bool,
  stageLabels: PropTypes.bool,
  sessionLabels: PropTypes.bool,
  hideStatus: PropTypes.bool,
};

export default StageNav;
