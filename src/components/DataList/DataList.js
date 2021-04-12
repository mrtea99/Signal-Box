import React from "react";
import PropTypes from "prop-types";

import styles from "./DataList.module.css";

/**
 * Display table for key value data
 */

function DataList(props) {
  return (
    <ul {...props} className={`${styles.list} ${props.className}`}>
      {props.children}
    </ul>
  );
}

DataList.propTypes = {
  children: PropTypes.node,
};

export default DataList;
