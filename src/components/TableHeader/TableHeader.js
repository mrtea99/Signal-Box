import React from "react";
import PropTypes from "prop-types";

import styles from "./TableHeader.module.css";

/**
 * Styled table header
 */

function TableHeader(props) {
  return (
    <ul className={styles.headerList}>
      {props.items.map((item, index) => (
        <li
          key={index}
          className={`${styles.headerItem} ${
            item.className ? item.className : ""
          }`}
        >
          {item.copy}
        </li>
      ))}
    </ul>
  );
}

TableHeader.propTypes = {
  items: PropTypes.array.isRequired,
};

export default TableHeader;
