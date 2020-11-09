import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  let styleClasses = styles.button;

  styleClasses += props.fillWidth ? " " + styles.buttonFillWidth : "";

  return (
    <button
      // {...props}
      className={styleClasses}
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
