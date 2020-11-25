import React from "react";

import styles from "./SiteSidebar.module.css";

import Button from "../Button/Button.js";
import SiteSettings from "./SiteSettings/SiteSettings.js";

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
      <img className={styles.siteLogo} alt="Mojo Spa Logo" src="./logo.svg" />
      <SiteSettings />
    </div>
  );
}

export default SiteSidebar;
