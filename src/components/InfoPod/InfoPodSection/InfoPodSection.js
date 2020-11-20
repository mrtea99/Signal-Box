import React from "react";

import styles from "./InfoPodSection.module.css";

function InfoPodSection(props) {
  return (
    <span className={styles.wrapper}>
      {props.children
        ? React.Children.toArray(props.children).map((child, index) =>
            React.cloneElement(child, { type: "core" })
          )
        : ""}
      <span className={styles.flags}>
        {props.flags
          ? props.flags.map((flag, index) =>
              React.cloneElement(flag, { type: "flag" })
            )
          : ""}
      </span>
    </span>
  );
}

export default InfoPodSection;
