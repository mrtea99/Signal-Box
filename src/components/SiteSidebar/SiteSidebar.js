import React from "react";

import styles from "./SiteSidebar.module.css";

import Button from "../Button/Button.js";

function SiteSidebar(props) {
  const closeSidebar = function() {
    props.setSidebarActive(false);
  }

  return (
    <div
      className={
        props.sidebarActive
          ? [styles.siteSidebar, styles.siteSidebarActive].join(" ")
          : styles.siteSidebar
      }
    >
      <img className={styles.siteLogo} alt="Mojo Spa Logo" src="./logo.svg" />
      <div className={styles.sidebarControl}>
        <Button onClick={closeSidebar}>Close Sidebar</Button>
      </div>
    </div>
  );
}

export default SiteSidebar;
