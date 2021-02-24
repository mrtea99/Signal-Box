import React from "react";
import PropTypes from "prop-types";

import DataList from "../../DataList/DataList";
import DataListItem from "../../DataList/DataListItem/DataListItem";
import FormItem from "../../FormItem/FormItem";
import TableHeader from "../../TableHeader/TableHeader.js";

import styles from "./AssignmentList.module.css";

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

  const columns = [
    { copy: "Assignment", className: styles.colMain },
    { copy: "Resolve", className: styles.colAction },
  ];

  return (
    <>
      {props.assignSessions.length ? (
        <>
          <TableHeader items={columns} />

          <ul className={styles.assList}>
            {props.assignSessions.map((session) => (
              <li key={session.sessionId} className={styles.assItem}>
                <div className={`${styles.colMain} ${styles.main}`}>
                  <DataList>
                    <DataListItem
                      dataKey="Assignee"
                      dataValue={
                        // `John Smith (${session.secondaryUser})`
                        session.secondaryUser || "None"
                      }
                    />
                    <DataListItem dataKey="Note" dataValue={session.notes} />
                  </DataList>
                </div>
                <div className={`${styles.colAction} ${styles.action}`}>
                  <form>
                    <FormItem
                      label="Resolve"
                      type="checkbox"
                      ident={`resolve-assignment-${session.sessionId}`}
                      updateHandler={(value) => {
                        markResolved(value, session.sessionId);
                      }}
                      checked={props.resolvedAssignments.includes(
                        session.sessionId
                      )}
                      hideLabel={true}
                      className={styles.checkbox}
                    />
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}

AssignmentList.propTypes = {
  assignSessions: PropTypes.array.isRequired,
  resolvedAssignments: PropTypes.array.isRequired,
  setResolvedAssignments: PropTypes.func.isRequired,
};

export default AssignmentList;
