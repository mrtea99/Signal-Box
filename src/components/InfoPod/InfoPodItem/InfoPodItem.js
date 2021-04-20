import React from "react";
import PropTypes from "prop-types";

import Icon from "../../Icon/Icon.js";

import styles from "./InfoPodItem.module.css";

/**
 * Single infopod item, shows a value wih an optional key and icon label
 */

function InfoPodItem(props) {
  const fullViewMode = props.viewMode === "full";

  const showIcon =
    props.icon && ((!fullViewMode && props.priority === "icon") || fullViewMode)
      ? true
      : false;

  return (
    <span
      className={`
      ${props.className} ${styles.item} 
      ${props.coreStyle === "label" ? styles.itemLabel : ""}
      ${props.type === "bubble" ? styles.itemBubble : ""}
      ${props.type === "bubble" && props.active ? styles.itemBubbleActive : ""}
      ${props.layout === "vert" ? styles.itemVert : styles.itemHoriz}
      `}
    >
      <span
        className={`${styles.inner} ${fullViewMode ? styles.innerVert : ""} ${
          !showIcon ? styles.innerText : ""
        }`}
      >
        <span className={styles.key}>
          {showIcon ? (
            <Icon
              name={props.icon ? props.icon : null}
              className={`${styles.icon} ${
                props.icon === "user" ? styles.iconUser : ""
              }`}
            ></Icon>
          ) : null}
          {fullViewMode ? (
            <span
              className={`${styles.name} ${
                showIcon ? styles.nameWithIcon : ""
              }`}
            >
              {props.name}:
            </span>
          ) : null}
        </span>
        {(!fullViewMode && props.priority === "value") || fullViewMode ? (
          <span className={styles.value}>{props.value}</span>
        ) : null}
      </span>
    </span>
  );
}

InfoPodItem.propTypes = {
  /** Extra classname to add for styling */
  className: PropTypes.string,
  /** If this is to be a label pod */
  coreStyle: PropTypes.string,
  /** If this is a round pod or a bubble to the side of another */
  type: PropTypes.oneOf(["bubble", "core"]),
  /** Visible state */
  active: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  /** Direction of bubbles from a core */
  layout: PropTypes.oneOf(["horiz", "vert"]),
  /** Icon to show with label */
  icon: PropTypes.string,
  /** Text for label */
  name: PropTypes.string,
  /** Main value to display */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  /** Which part should be hidden if there is not enough room when resizing */
  priority: PropTypes.oneOf(["icon", "value"]),
  /** Wether to show labels and icons */
  viewMode: PropTypes.oneOf(["full", "basic"]),
};

export default InfoPodItem;
