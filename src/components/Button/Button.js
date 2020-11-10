import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  let styleClasses = styles.button;

  styleClasses += props.fillWidth ? " " + styles.buttonFillWidth : "";

  if (props.color) {
    styleClasses += " " + styles['color' + props.color.charAt(0).toUpperCase() + props.color.slice(1)];
  }

  return (
    <button
      className={styleClasses}
      disabled={props.disabled}
      // {...props}
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
