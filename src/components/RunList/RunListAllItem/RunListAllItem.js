import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import StageNav from "../../StageNav/StageNav";
import RunTitle from "../RunTitle/RunTitle.js";

import styles from "./RunListAllItem.module.css";

import { selectRun } from "../runsSlice";

function RunListAllItem(props) {
  const thisRunData = useSelector((state) =>
    selectRun(state, props.currentRunUid)
  );

  const openEditor = function (runUid, stageNum) {
    props.setCurrentRunUid(runUid);
    props.setActiveStage(stageNum);
  };

  return (
    <div>
      <header
        // onClick={() => setModalOverviewActive(run.id)}
        className={styles.itemHeader}
      >
        <RunTitle currentRunUid={props.currentRunUid}>
          {thisRunData.productInfo.productName}
        </RunTitle>
      </header>

      <StageNav
        currentRunUid={props.currentRunUid}
        activeStage={props.activeStage}
        buttonCallback={(newIndex) => openEditor(props.currentRunUid, newIndex)}
        sessionLabels
        syntax="list"
      ></StageNav>
    </div>
  );
}

RunListAllItem.propTypes = {
  setCurrentRunUid: PropTypes.func.isRequired,
  setActiveStage: PropTypes.func.isRequired,
  currentRunUid: PropTypes.number.isRequired,
};

export default RunListAllItem;
