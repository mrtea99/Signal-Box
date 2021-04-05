import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button.js";
import UserSwitcher from "../UserSwitcher/UserSwitcher.js";

import styles from "./SiteHeader.module.css";

function SiteHeader(props) {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.inner}>
        <div className={styles.sidebarTrigger}>
          <Button onClick={() => props.setSidebarActive(true)} icon="menu" />
        </div>
        <div className={styles.siteLogoWrapper}>
          <img
            className={styles.siteLogo}
            alt="Mojo Spa Logo"
            src="/logo.svg"
          />
        </div>
        <div>
          <UserSwitcher />
        </div>
      </div>
    </header>
  );
}

SiteHeader.propTypes = {
  setSidebarActive: PropTypes.func,
};

SiteHeader.propTypes = {};

export default SiteHeader;
