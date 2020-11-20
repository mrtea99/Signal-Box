import React from "react";

import styles from "./InfoPodItem.module.css";

function InfoPodItem(props) {
  return (
    <span
      className={`${props.className} ${styles.item} ${
        props.coreStyle === "label" ? styles.itemLabel : ""
      } ${props.type === "flag" ? styles.itemFlag : ""} ${
        props.type === "flag" && props.active ? styles.itemFlagActive : ""
      }`}
    >
      <span
        className={`${styles.inner} ${
          typeof props.children === "string" ? styles.innerText : ""
        }`}
      >
        {props.children}
      </span>
    </span>
  );
}

export default InfoPodItem;
