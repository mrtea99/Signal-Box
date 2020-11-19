import React from "react";

import styles from "./TableHeader.module.css";

function TableHeader(props) {
  return (
    <ul className={styles.headerList}>
      {props.items.map((item, index) => (
        <li key={index} className={`${styles.headerItem} ${item.className ? item.className : ''}`}>{item.copy}</li>
      ))}
    </ul>
  );
}

export default TableHeader;
