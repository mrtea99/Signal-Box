import React from "react";

import StageStatus from "../StageStatus/StageStatus.js";

import styles from "./StageNav.module.css";

function StageNav(props) {
  function stageChange(newStageIndex) {
    props.setActiveStage(newStageIndex);
  }

  function handleNavList(stageIndex, e) {
    e.preventDefault();
    stageChange(stageIndex);
  }

  function getButtonClasses(index) {
    let className = "";

    if (props.activeStage === index) {
      className = [styles.progBtn, styles.progBtnActive].join(" ");
    } else {
      className = styles.progBtn;
    }

    if (props.thisRunData["stages"][index]["sessions"]) {
      className = className + " " + styles.progBtnStarted;
    }

    return className;
  }

  return (
    <ul className={styles.progBar}>
      {props.stageNameArr.map((stage, index) => (
        <li key={props.currentRunUid + stage} className={styles.progItem}>
          <button
            className={getButtonClasses(index)}
            onClick={(e) => handleNavList(index, e)}
          >
            {stage} (<StageStatus runData={props.thisRunData} stageNum={index} />)
          </button>
        </li>
      ))}
    </ul>
  );
}

export default StageNav;
