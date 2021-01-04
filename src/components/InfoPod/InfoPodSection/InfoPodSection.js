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
            React.cloneElement(child, { type: "core", layout: layout })
          )
        : ""}
      <span
        className={`${styles.flags} ${
          layout === "vert" ? styles.flagsVert : styles.flagsHoriz
        }`}
      >
        {props.flags
          ? props.flags.map((flag, index) =>
              React.cloneElement(flag, { type: "flag", layout: layout })
            )
          : ""}
      </span>
    </span>
  );
}

InfoPodSection.propTypes = {
  layout: PropTypes.oneOf(["vert", "horiz"]),
  flags: PropTypes.array,
  children: PropTypes.node,
};

export default InfoPodSection;
