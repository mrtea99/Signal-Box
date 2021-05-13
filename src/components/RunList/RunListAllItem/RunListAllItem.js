import React from "react";
import PropTypes from "prop-types";

import StageNav from "../../StageNav/StageNav";
import RunTitle from "../RunTitle/RunTitle.js";

import styles from "./RunListAllItem.module.css";

/**
 * Displays a single run showing the status for all stages
 */

function RunListAllItem(props) {
  return (
    <div>
      <header className={styles.itemHeader}>
        <RunTitle currentRunId={props.currentRunId} mini />
      </header>

      <StageNav
        currentRunId={props.currentRunId}
        activeStage={props.activeStage}
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
