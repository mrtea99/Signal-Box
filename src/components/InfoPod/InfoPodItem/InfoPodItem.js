import React from "react";
import PropTypes from "prop-types";

import Icon from "../../Icon/Icon.js";

import styles from "./InfoPodItem.module.css";

function InfoPodItem(props) {
  const showIcon =
    props.icon &&
    ((props.layout === "horiz" && props.priority === "icon") ||
      props.layout === "vert")
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
          props.layout === "vert" ? styles.innerVert : ""
        } ${!showIcon ? styles.innerText : ""}`}
      >
        <span>
          {showIcon ? (
            <Icon
              name={props.icon ? props.icon : null}
              className={`${styles.icon} ${
                props.icon === "user" ? styles.iconUser : ""
              }`}
            ></Icon>
          ) : null}
          {props.layout === "vert" ? (
            <span
              className={`${styles.name} ${
                showIcon ? styles.nameWithIcon : ""
              }`}
            >
              {props.name}:
            </span>
          ) : null}
        </span>
        {(props.layout === "horiz" && props.priority === "value") ||
        props.layout === "vert" ? (
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  priority: PropTypes.oneOf(["icon", "value"]),
};

export default InfoPodItem;
