import React from "react";
import PropTypes from "prop-types";

import DataList from "../../DataList/DataList";
import DataListItem from "../../DataList/DataListItem/DataListItem";
import FormItem from "../../FormItem/FormItem";

// import styles from "./AssignmentList.module.css";

function AssignmentList(props) {
  const markResolved = function (checked, sessionId) {
    if (checked) {
      props.setResolvedAssignments([...props.resolvedAssignments, sessionId]);
    } else {
      const oldAssignments = [...props.resolvedAssignments];
      const index = oldAssignments.indexOf(sessionId);
      if (index > -1) {
        oldAssignments.splice(index, 1);
      }
      props.setResolvedAssignments(oldAssignments);
    }
  };

  return (
    <ul>
      {props.assignSessions.map((session) => (
        <li key={session.sessionId}>
          <DataList>
            <DataListItem
              dataKey="Assignee"
              dataValue={session.secondaryUser || "None"}
            />
            <DataListItem dataKey="Note" dataValue={session.notes} />
          </DataList>
          <form>
            <FormItem
              label="Resolve"
              type="checkbox"
              ident={`resolve-assignment-${session.sessionId}`}
              updateHandler={(value) => {
                markResolved(value, session.sessionId);
              }}
              checked={props.resolvedAssignments.includes(session.sessionId)}
            />
          </form>
        </li>
      ))}
    </ul>
  );
}

AssignmentList.propTypes = {
  assignSessions: PropTypes.array.isRequired,
  resolvedAssignments: PropTypes.array.isRequired,
  setResolvedAssignments: PropTypes.func.isRequired,
};

export default AssignmentList;
