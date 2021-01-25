import React from "react";
import PropTypes from "prop-types";

import StageNav from "../../StageNav/StageNav";
import RunTitle from "../RunTitle/RunTitle.js";

import styles from "./RunListAllItem.module.css";

function RunListAllItem(props) {
  const run = props.runData;

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
        <RunTitle runData={props.runData}>
          {run.productInfo.productName}
        </RunTitle>
      </header>

      <StageNav
        currentRunUid={props.currentRunUid}
        activeStage={props.activeStage}
        buttonCallback={(newIndex) => openEditor(run.id, newIndex)}
        thisRunData={run}
        activeUser={props.activeUser}
        sessionLabels
        syntax="list"
      ></StageNav>
    </div>
  );
}

RunListAllItem.propTypes = {
  runData: PropTypes.object.isRequired,
  setCurrentRunUid: PropTypes.func.isRequired,
  setActiveStage: PropTypes.func.isRequired,
  currentRunUid: PropTypes.number,
  activeUser: PropTypes.string.isRequired,
};

export default RunListAllItem;
