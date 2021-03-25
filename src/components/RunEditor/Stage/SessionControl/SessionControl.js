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
              thisRunData={props.thisRunData}
              className={styles.sessionControl}
              currentRunUid={props.currentRunUid}
            />
          ) : (
            <SessionStart
              thisStage={props.thisStage}
              className={styles.sessionControl}
              thisRunData={props.thisRunData}
              currentRunUid={props.currentRunUid}
            />
          )}
          <ButtonSpacer direction="vert">
            {!simpleMode ? (
              <AssignmentOpener
                thisStage={props.thisStage}
                currentRunUid={props.currentRunUid}
              />
            ) : null}
            <CheckOpener
              thisStage={props.thisStage}
              currentRunUid={props.currentRunUid}
            />
            <FlagOpener
              thisStage={props.thisStage}
              currentRunUid={props.currentRunUid}
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
  thisRunData: PropTypes.object.isRequired,
  currentRunUid: PropTypes.number.isRequired,
};

export default SessionControl;
