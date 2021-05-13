import React from "react";
import PropTypes from "prop-types";

import styles from "./SessionCard.module.css";
import Icon from "../../../Icon/Icon";

function SessionCard(props) {
  let titleTypeClass = null;
  let contentTypeClass = null;
  let iconName = props.type;
  switch (props.type) {
    case "work":
      titleTypeClass = styles.sessionTitleWork;
      contentTypeClass = styles.contentWork;
      iconName = "start";
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
    case "assign":
      titleTypeClass = styles.sessionTitleAssign;
      contentTypeClass = styles.contentAssign;
      break;
    default:
      break;
  }

  return (
    <article className={styles.card}>
      <h4
        className={`${styles.sessionTitle} ${titleTypeClass}`}
        onClick={props.onClick || null}
      >
        {props.title ? (
          <>
            <Icon name={iconName} className={styles.titleIcon} /> {props.title}
          </>
        ) : (
          <>{"\u00A0"}</>
        )}
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
  type: PropTypes.oneOf(["work", "qa", "note", "issue", "blocker", "assign"]),
  padding: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SessionCard;
