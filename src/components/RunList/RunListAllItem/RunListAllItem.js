import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import StageNav from "../../StageNav/StageNav";
import RunTitle from "../RunTitle/RunTitle.js";

import styles from "./RunListAllItem.module.css";

import { selectRun } from "../runsSlice";

function RunListAllItem(props) {
  const thisRunData = useSelector((state) =>
    selectRun(state, props.currentRunId)
  );

  const openEditor = function (runUid, stageNum) {
    props.setCurrentRunId(runUid);
    props.setActiveStage(stageNum);
  };

  return (
    <div>
      <header
        // onClick={() => setModalOverviewActive(run.id)}
        className={styles.itemHeader}
      >
        <RunTitle currentRunId={props.currentRunId}>
          {thisRunData.productInfo.productName}
        </RunTitle>
      </header>

      <StageNav
        currentRunId={props.currentRunId}
        activeStage={props.activeStage}
        buttonCallback={(newIndex) => openEditor(props.currentRunId, newIndex)}
        sessionLabels
        syntax="list"
      ></StageNav>
    </div>
  );
}

RunListAllItem.propTypes = {
  setCurrentRunId: PropTypes.func.isRequired,
  setActiveStage: PropTypes.func.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default RunListAllItem;
