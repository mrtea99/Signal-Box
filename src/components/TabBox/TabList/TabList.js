import React from "react";

import styles from "./TabList.module.css";

function TabList(props) {
  return (
    <ul className={styles.list}>
      {props.tabs.map((tabName, index) => (
        <li
          key={tabName}
          className={`${styles.item} ${
            props.activeTab === index ? styles.itemActive : ""
          }`}
        >
          <button
            onClick={() => props.indexCallback(index)}
            className={styles.button}
          >
            {tabName}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TabList;
