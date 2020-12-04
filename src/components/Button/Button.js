import React from "react";
import Icon from "../Icon/Icon";
import styles from "./Button.module.css";

function Button(props) {
  let styleClasses = styles.button;

  if (props.fillWidth) {
    styleClasses += " " + styles.buttonFillWidth;
  }

  if (props.color) {
    styleClasses +=
      " " +
      styles[
        "color" + props.color.charAt(0).toUpperCase() + props.color.slice(1)
      ];
  }

  if (props.icon) {
    styleClasses += " " + styles.hasIcon;
  }
  if (props.iconFirst) {
    styleClasses += " " + styles.iconFirst;
  }
  if (!props.children) {
    styleClasses += " " + styles.iconOnly;
  }

  const OuterElem = function (btnProps) {
    if (props.href) {
      return (
        <a
          className={styleClasses}
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {btnProps.children}
        </a>
      );
    } else {
      return (
        <button
          className={styleClasses}
          disabled={props.disabled}
          onClick={(e) => {
            e.preventDefault();
            props.onClick(e);
          }}
        >
          {btnProps.children}
        </button>
      );
    }
  };

  return (
    <OuterElem>
      <span className={styles.copy}>{props.children}</span>
      {props.icon ? (
        <span className={styles.iconWrapper}>
          <Icon name={props.icon} className={styles.icon}></Icon>
        </span>
      ) : null}
    </OuterElem>
  );
}

export default Button;
