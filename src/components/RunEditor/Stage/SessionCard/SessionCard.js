import React from "react";
import PropTypes from "prop-types";

import styles from "./SessionCard.module.css";

function SessionCard(props) {
  let titleTypeClass = null;
  let contentTypeClass = null;
  switch (props.type) {
    case "working":
      titleTypeClass = styles.sessionTitleWorking;
      contentTypeClass = styles.contentWorking;
      break;
    case "qa":
      titleTypeClass = styles.sessionTitleQa;
      contentTypeClass = styles.contentQa;
      break;
    case "note":
      titleTypeClass = styles.sessionTitleNote;
      contentTypeClass = styles.contentNote;
      break;
    case "issue":
      titleTypeClass = styles.sessionTitleIssue;
      contentTypeClass = styles.contentIssue;
      break;
    case "blocker":
      titleTypeClass = styles.sessionTitleBlocker;
      contentTypeClass = styles.contentBlocker;
      break;
    case "assignment":
      titleTypeClass = styles.sessionTitleAssignment;
      contentTypeClass = styles.contentAssignment;
      break;
    default:
      break;
  }

  return (
    <article className={styles.card}>
      <h4 className={`${styles.sessionTitle} ${titleTypeClass}`}>
        {props.title || "\u00A0"}
        {/* \u00A0 aka &nbsp; */}
      </h4>
      <div
        className={`${styles.content} ${contentTypeClass} ${
          props.padding ? styles.contentPadded : null
        }`}
      >
        {props.children}
      </div>
    </article>
  );
}

SessionCard.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf([
    "working",
    "qa",
    "note",
    "issue",
    "blocker",
    "assignment",
  ]),
  padding: PropTypes.bool,
};

export default SessionCard;
