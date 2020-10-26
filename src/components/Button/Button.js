import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  return (
    <button
      {...props}
      className={styles.button}
      onClick={(e) => {
        e.preventDefault();
        props.onClick(e);
      }}
    >
      {props.children}
    </button>
  );
}

export default Button;
