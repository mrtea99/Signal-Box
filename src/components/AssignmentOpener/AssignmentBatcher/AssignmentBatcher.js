import React from "react";
import PropTypes from "prop-types";

import AssignmentOpener from "../AssignmentOpener.js";
import Button from "../../Button/Button.js";

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

    newBatchStage = newBatchStage.filter((batchedSession, index) => batchedSession.sessionId !== sessionId);

    newBatch[stageNumber] = newBatchStage;
    props.setBatchedAssignments(newBatch);
  };

  return (
    <>
      <h3>Assignments:</h3>
      <ul>
        {stageNames.map((stageName, stageNumber) => (
          <li key={`assign-${stageName}`}>
            <h4>{stageName}</h4>
            <AssignmentOpener
              activeUser={props.activeUser}
              thisStage={stageNumber}
              addSession={addAssignment}
            />
            <ul>
              {props.batchedAssignments[stageNumber].map(
                (assignmentSession) => (
                  <li key={`assignment-${assignmentSession.sessionId}`}>
                    {assignmentSession.secondaryUser || "None"}
                    <Button
                      onClick={() =>
                        removeAssignment(
                          assignmentSession.sessionId,
                          stageNumber
                        )
                      }
                      color="delete"
                    >
                      Delete
                    </Button>
                  </li>
                )
              )}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

AssignmentBatcher.propTypes = {
  batchedAssignments: PropTypes.array.isRequired,
  setBatchedAssignments: PropTypes.func.isRequired,
  activeUser: PropTypes.string.isRequired,
};

export default AssignmentBatcher;
