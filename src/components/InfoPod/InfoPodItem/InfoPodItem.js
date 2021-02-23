import React from "react";
import PropTypes from "prop-types";

import Icon from "../../Icon/Icon.js";

import styles from "./InfoPodItem.module.css";

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
        className={`${styles.inner} ${
          fullViewMode ? styles.innerVert : ""
        } ${!showIcon ? styles.innerText : ""}`}
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
          <span>{props.value}</span>
        ) : null}
      </span>
    </span>
  );
}

InfoPodItem.propTypes = {
  className: PropTypes.string,
  coreStyle: PropTypes.string,
  type: PropTypes.oneOf(["bubble", "core"]),
  active: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  layout: PropTypes.oneOf(["horiz", "vert"]),
  icon: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
  priority: PropTypes.oneOf(["icon", "value"]),
  viewMode: PropTypes.oneOf(["full", "basic"]),
};

export default InfoPodItem;
