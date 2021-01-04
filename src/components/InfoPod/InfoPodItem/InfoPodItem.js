import React from "react";
import PropTypes from "prop-types";

import styles from "./InfoPodItem.module.css";

function InfoPodItem(props) {
  return (
    <span
      className={`${props.className} ${styles.item} ${
        props.coreStyle === "label" ? styles.itemLabel : ""
      } ${props.type === "flag" ? styles.itemFlag : ""} ${
        props.type === "flag" && props.active ? styles.itemFlagActive : ""
      } ${props.layout === "vert" ? styles.itemVert : styles.itemHoriz}`}
    >
      <span
        className={`${styles.inner} ${
          typeof props.children === "string" ? styles.innerText : ""
        }`}
      >
        {props.children}
      </span>
    </span>
  );
}

InfoPodItem.propTypes = {
  className: PropTypes.string,
  coreStyle: PropTypes.string,
  type: PropTypes.oneOf(["flag", "core"]),
  active: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  layout: PropTypes.oneOf(["horiz", "vert"]),
  children: PropTypes.node,
};

export default InfoPodItem;
