import React from "react";

import styles from "./FormLayout.module.css";

function FormLayout(props) {
  return <div className={`${styles.layout}`}>{props.children}</div>;
}

export default FormLayout;
