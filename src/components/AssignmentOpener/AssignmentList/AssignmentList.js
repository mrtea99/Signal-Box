import React from "react";
import PropTypes from "prop-types";

import DataList from "../../DataList/DataList";
import DataListItem from "../../DataList/DataListItem/DataListItem";
import FormItem from "../../FormItem/FormItem";

// import styles from "./AssignmentList.module.css";

function AssignmentList(props) {
  const assignSessions = props.runData.stages[props.stageNum].sessions.filter(
    (session) => {
      return session.type === "assign" && !session.endTime;
    }
  );

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
      {assignSessions.map((session) =>
        session.secondaryUser === props.activeUser ||
        session.secondaryUser === null ? (
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
                // checked={session.secondaryUser === props.activeUser ? true : false}
              />
            </form>
          </li>
        ) : null
      )}
    </ul>
  );
}

AssignmentList.propTypes = {
  runData: PropTypes.object.isRequired,
  stageNum: PropTypes.number.isRequired,
  activeUser: PropTypes.string.isRequired,
};

export default AssignmentList;
