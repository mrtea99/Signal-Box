import React from "react";
import PropTypes from "prop-types";

import FormItem from "../../FormItem/FormItem";
import TableHeader from "../../TableHeader/TableHeader.js";

import styles from "./AssignmentList.module.css";
import AssignmentCloser from "../../AssignmentCloser/AssignmentCloser";
import UserName from "../../UserSwitcher/UserName/UserName";

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
    { copy: "Edit", className: styles.colAction },
    { copy: "Resolve", className: styles.colResolve },
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
                  <h3 className={styles.itemTitle}>
                    Assignee:{" "}
                    {session.secondaryUser ? (
                      <UserName userId={session.secondaryUser} />
                    ) : (
                      "None"
                    )}
                  </h3>
                  <p className={styles.itemNote}>{session.notes}</p>
                </div>
                <div className={`${styles.colAction} ${styles.resolve}`}>
                  <AssignmentCloser
                    session={session}
                    thisStage={props.thisStage}
                    currentRunId={props.currentRunId}
                  />
                </div>
                <div className={`${styles.colResolve} ${styles.resolve}`}>
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
                      hideLabel
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
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default AssignmentList;
