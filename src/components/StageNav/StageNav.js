import React from "react";

import StageStatus from "../StageStatus/StageStatus.js";

import styles from "./StageNav.module.css";

function StageNav(props) {
  const handleNavList = function (stageIndex, e) {
    e.preventDefault();
    props.buttonCallback(stageIndex);
  };

  return (
    <ul className={styles.progBar}>
      {props.stageNameArr.map((stage, index) => (
        <li key={props.currentRunUid + stage} className={styles.progItem}>
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

            <span className={styles.status}>
              <StageStatus
                runData={props.thisRunData}
                stageNum={index}
                activeUser={props.activeUser}
                label={props.sessionLabels}
              />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default StageNav;
