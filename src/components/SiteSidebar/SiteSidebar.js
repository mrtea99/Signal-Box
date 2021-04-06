import React from "react";
import PropTypes from "prop-types";

import styles from "./SiteSidebar.module.css";

import Button from "../Button/Button.js";

function SiteSidebar(props) {
  const closeSidebar = function () {
    props.setSidebarActive(false);
  };

  return (
    <div
      className={
        props.sidebarActive
          ? [styles.siteSidebar, styles.siteSidebarActive].join(" ")
          : styles.siteSidebar
      }
    >
      <div className={styles.sidebarControl}>
        <Button onClick={closeSidebar} icon="cross" color="cancel" />
      </div>
      <img className={styles.siteLogo} alt="Mojo Spa Logo" src="/logo.svg" />
      {props.children}
    </div>
  );
}

SiteSidebar.propTypes = {
  setSidebarActive: PropTypes.func.isRequired,
  sidebarActive: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default SiteSidebar;
