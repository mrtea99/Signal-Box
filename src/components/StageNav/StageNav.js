import React from "react";
import PropTypes from "prop-types";

import StageStatus from "../StageStatus/StageStatus.js";

import styles from "./StageNav.module.css";

import stageNames from "../../data/stageNames.json";

/**
 * Displays all the stages for a run with status.
 */

function StageNav(props) {
  const handleNavList = function (stageIndex, e) {
    e.preventDefault();
    props.buttonCallback(stageIndex);
  };

  return (
    <ul className={styles.progBar}>
      {stageNames.map((stage, index) => (
        <li key={props.currentRunId + stage} className={styles.progItem}>
          <button
            className={`${styles.progBtn} ${
              props.activeStage === index && props.showActive
                ? styles.progBtnActive
                : ""
            }`}
            onClick={(e) => handleNavList(index, e)}
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
          </button>
        </li>
      ))}
    </ul>
  );
}

StageNav.propTypes = {
  buttonCallback: PropTypes.func.isRequired,
  currentRunId: PropTypes.number,
  activeStage: PropTypes.number,
  showActive: PropTypes.bool,
  stageLabels: PropTypes.bool,
  sessionLabels: PropTypes.bool,
  hideStatus: PropTypes.bool,
};

export default StageNav;
