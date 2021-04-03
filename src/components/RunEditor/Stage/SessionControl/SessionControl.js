import React from "react";
import PropTypes from "prop-types";

import SessionStart from "../SessionStart/SessionStart.js";
import SessionEnd from "../SessionEnd/SessionEnd.js";
import FlagOpener from "../../../FlagOpener/FlagOpener.js";
import CheckOpener from "../../../CheckOpener/CheckOpener.js";
import AssignmentOpener from "../../../AssignmentOpener/AssignmentOpener.js";
import ButtonSpacer from "../../../Button/ButtonSpacer/ButtonSpacer.js";

import styles from "./SessionControl.module.css";

import ViewModeContext from "../../../../contexts/ViewModeContext.js";

function SessionControl(props) {
  const viewMode = React.useContext(ViewModeContext);
  const simpleMode = viewMode === "simple";

  return (
    <>
      {props.stageActive ? (
        <div className={styles.sessionActions}>
          {props.activeSessionData ? (
            <SessionEnd
              thisStage={props.thisStage}
              activeSessionData={props.activeSessionData}
              className={styles.sessionControl}
              currentRunId={props.currentRunId}
            />
          ) : (
            <SessionStart
              thisStage={props.thisStage}
              className={styles.sessionControl}
              currentRunId={props.currentRunId}
            />
          )}
          <ButtonSpacer direction="vert">
            {!simpleMode ? (
              <AssignmentOpener
                thisStage={props.thisStage}
                currentRunId={props.currentRunId}
              />
            ) : null}
            <CheckOpener
              thisStage={props.thisStage}
              currentRunId={props.currentRunId}
            />
            <FlagOpener
              thisStage={props.thisStage}
              currentRunId={props.currentRunId}
            />
          </ButtonSpacer>
        </div>
      ) : null}
    </>
  );
}

SessionControl.propTypes = {
  stageActive: PropTypes.bool.isRequired,
  activeSessionData: PropTypes.object,
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default SessionControl;
