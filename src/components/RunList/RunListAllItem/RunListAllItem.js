import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

import StageNav from "../../StageNav/StageNav";
import RunTitle from "../RunTitle/RunTitle.js";

import styles from "./RunListAllItem.module.css";

/**
 * Displays a single run showing the status for all stages
 */

function RunListAllItem(props) {
  let history = useHistory();
  const openEditor = function (runUid, stageNum) {
    window.localStorage.setItem("editorBackLoc", window.location.pathname);
    history.push(`/run/${runUid}/${stageNum}`);
  };

  return (
    <div>
      <header className={styles.itemHeader}>
        <RunTitle currentRunId={props.currentRunId} mini />
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
  currentRunId: PropTypes.number.isRequired,
};

export default RunListAllItem;
