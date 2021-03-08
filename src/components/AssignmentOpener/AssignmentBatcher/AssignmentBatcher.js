import React from "react";
import PropTypes from "prop-types";

import AssignmentOpener from "../AssignmentOpener";

import stageNames from "../../../data/stageNames.json";

function AssignmentBatcher(props) {
  const addAssignment = function (sessionData, stageNumber) {
    let newBatch = [...props.batchedAssignments];
    let newBatchStage = [...newBatch[stageNumber]];

    newBatchStage.push(sessionData);

    newBatch[stageNumber] = newBatchStage;

    props.setBatchedAssignments(newBatch);
  };

  return (
    <ul>
      {stageNames.map((stageName, stageNumber) => (
        <li key={`assign-${stageName}`}>
          <h3>{stageName}</h3>
          <AssignmentOpener
            activeUser={props.activeUser}
            thisStage={stageNumber}
            addSession={addAssignment}
          />
          <ul>
            {props.batchedAssignments[stageNumber].map((assignmentSession) => (
              <li key={`assignment-${assignmentSession.sessionId}`}>{assignmentSession.secondaryUser || 'None'}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

AssignmentBatcher.propTypes = {
  batchedAssignments: PropTypes.array.isRequired,
  setBatchedAssignments: PropTypes.func.isRequired,
  activeUser: PropTypes.string.isRequired,
};

export default AssignmentBatcher;
