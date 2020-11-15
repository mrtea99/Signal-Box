import React from "react";

import StageStatus from "../StageStatus/StageStatus.js";

import styles from "./StageNav.module.css";

function StageNav(props) {
  const handleNavList = function (stageIndex, e) {
    e.preventDefault();
    props.buttonCallback(stageIndex);
  };

  let WrapperElem = "ul";
  let wrapperClasses = styles.progBar;
  let InnerElem = "li";
  let innerClasses = styles.progItem;

  if (props.syntax === "table") {
    WrapperElem = "tr";
    wrapperClasses = `${styles.progBar} ${styles.progBarTable} `;
    InnerElem = "td";
  }

  return (
    <WrapperElem className={wrapperClasses}>
      {props.stageNameArr.map((stage, index) => (
        <InnerElem
          key={props.currentRunUid + stage}
          className={innerClasses}
        >
          <button
            className={`${styles.progBtn} ${
              props.activeStage === index && props.showActive
                ? styles.progBtnActive
                : ""
            }`}
            onClick={(e) => handleNavList(index, e)}
          >
            {props.stageLabels ? (
              <>
                <span className={styles.btnLabel}>{stage}</span>
                <br />
              </>
            ) : (
              <></>
            )}

            <StageStatus
              runData={props.thisRunData}
              stageNum={index}
              activeUser={props.activeUser}
              label={props.sessionLabels}
            />
          </button>
        </InnerElem>
      ))}
    </WrapperElem>
  );
}

export default StageNav;
