import React from "react";
import PropTypes from "prop-types";

import FormItem from "../../FormItem/FormItem";
import TableHeader from "../../TableHeader/TableHeader.js";

import styles from "./AssignmentList.module.css";
import AssignmentCloser from "../../AssignmentCloser/AssignmentCloser";
import UserName from "../../UserSwitcher/UserName/UserName";

import { useTranslation } from "react-i18next";

/**
 * Displays a list of assignment sessions, with edit button and checkbox to mark each as resolved
 */

function AssignmentList(props) {
  const { t } = useTranslation();

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
    { copy: t("Assignment"), className: styles.colMain },
    { copy: t("Edit"), className: styles.colAction },
    { copy: t("Resolve"), className: styles.colResolve },
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
                    {`${t("Assignee")}:`}
                    {session.secondaryUser ? (
                      <UserName userId={session.secondaryUser} />
                    ) : (
                      t("None")
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
