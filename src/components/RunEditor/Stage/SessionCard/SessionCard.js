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
  padding: PropTypes.bool,
};

export default SessionCard;
