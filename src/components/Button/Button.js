import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import styles from "./Button.module.css";

/**
 * Standard large button, designed for touch interaction
 *
 */

function Button(props) {
  let styleClasses = props.className
    ? props.className + " " + styles.button
    : styles.button;

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

  if (props.featured) {
    styleClasses += " " + styles.featured;
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
      {props.children ? <span>{props.children}</span> : null}
      {props.icon ? (
        <span className={styles.iconWrapper}>
          <Icon name={props.icon} className={styles.icon}></Icon>
        </span>
      ) : null}
    </OuterElem>
  );
}

Button.propTypes = {
  /** Make the button stretch to fill hontainer horizontaly */
  fillWidth: PropTypes.bool,
  /** Show the icon underneath the text */
  featured: PropTypes.bool,
  /** Show the icon on the left side and text on the right side */
  iconFirst: PropTypes.bool,
  /** Background color name */
  color: PropTypes.string,
  /** Name of icon */
  icon: PropTypes.string,
  /** Text copy */
  children: PropTypes.node,
  /** Link location */
  href: PropTypes.string,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Click handler function */
  onClick: PropTypes.func,
};

export default Button;
