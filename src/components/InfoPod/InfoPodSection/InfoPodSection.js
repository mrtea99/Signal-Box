import React from "react";
import PropTypes from "prop-types";

import styles from "./InfoPodSection.module.css";

function InfoPodSection(props) {
  const layout = props.layout || "horiz";

  return (
    <span
      className={`${styles.wrapper} ${
        layout === "vert" ? styles.wrapperVert : styles.wrapperHoriz
      }`}
    >
      {props.children
        ? React.Children.toArray(props.children).map((child, index) =>
            React.cloneElement(child, { type: "core", layout: layout, viewMode: props.viewMode })
          )
        : ""}
      <span
        className={`${styles.bubbles} ${
          layout === "vert" ? styles.bubblesVert : styles.bubblesHoriz
        }`}
      >
        {props.bubbles
          ? props.bubbles.map((bubble, index) =>
              React.cloneElement(bubble, { type: "bubble", layout: layout, viewMode: props.viewMode })
            )
          : ""}
      </span>
    </span>
  );
}

InfoPodSection.propTypes = {
  layout: PropTypes.oneOf(["vert", "horiz"]),
  bubbles: PropTypes.array,
  children: PropTypes.node,
};

export default InfoPodSection;
