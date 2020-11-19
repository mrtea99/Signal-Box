import React from "react";

import styles from "./InfoPodSection.module.css";

function InfoPodSection(props) {
  return (
    <span className={styles.wrapper}>
      {props.children}
      <span className={styles.flags}>
        {props.flags}
        {/* {props.flags
          ? props.flags.map((flag) => {
              return flag;
            })
          : null} */}
      </span>
    </span>
  );
}

export default InfoPodSection;
