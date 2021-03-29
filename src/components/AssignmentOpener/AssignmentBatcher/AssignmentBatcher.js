import React from "react";
import PropTypes from "prop-types";

import AssignmentOpener from "../AssignmentOpener.js";
import Button from "../../Button/Button.js";
import UserName from "../../UserSwitcher/UserName/UserName.js";

import styles from "./AssignmentBatcher.module.css";

import stageNames from "../../../data/stageNames.json";

function AssignmentBatcher(props) {
  const addAssignment = function (sessionData, stageNumber) {
    let newBatch = [...props.batchedAssignments];
    let newBatchStage = [...newBatch[stageNumber]];

    newBatchStage.push(sessionData);

    newBatch[stageNumber] = newBatchStage;
    props.setBatchedAssignments(newBatch);
  };

  const removeAssignment = function (sessionId, stageNumber) {
    let newBatch = [...props.batchedAssignments];
    let newBatchStage = [...newBatch[stageNumber]];

    newBatchStage = newBatchStage.filter(
      (batchedSession, index) => batchedSession.sessionId !== sessionId
    );

    newBatch[stageNumber] = newBatchStage;
    props.setBatchedAssignments(newBatch);
  };

  return (
    <>
      <h3>Assignments:</h3>
      <ul className={styles.stageList}>
        {stageNames.map((stageName, stageNumber) => (
          <li key={`assign-${stageName}`} className={styles.stageItem}>
            <h4 className={styles.stageName}>{stageName}</h4>
            <ul className={styles.assList}>
              {props.batchedAssignments[stageNumber].map(
                (assignmentSession) => (
                  <li
                    key={`assignment-${assignmentSession.sessionId}`}
                    className={styles.assignment}
                  >
                    <h5 className={styles.assName}>
                      {assignmentSession.secondaryUser ? (
                        <UserName userId={assignmentSession.secondaryUser} />
                      ) : (
                        "No Assignee"
                      )}
                    </h5>
                    <Button
                      onClick={() =>
                        removeAssignment(
                          assignmentSession.sessionId,
                          stageNumber
                        )
                      }
                      color="delete"
                      icon="cross"
                      className={styles.assDelete}
                    />
                  </li>
                )
              )}
            </ul>
            <AssignmentOpener
              thisStage={stageNumber}
              addAssignment={addAssignment}
              triggerCopy={"Add"}
              buttonAttrs={{
                color: "assign",
                icon: "plus",
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

AssignmentBatcher.propTypes = {
  batchedAssignments: PropTypes.array.isRequired,
  setBatchedAssignments: PropTypes.func.isRequired,
};

export default AssignmentBatcher;
