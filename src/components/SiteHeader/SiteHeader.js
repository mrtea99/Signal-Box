import React from "react";

import Button from "../Button/Button.js";
import FormItem from "../FormItem/FormItem";

import styles from "./SiteHeader.module.css";

function SiteHeader(props) {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.inner}>
        <div className={styles.sidebarTrigger}>
          <Button onClick={() => props.setSidebarActive(true)} icon="fix" />
        </div>
        <img className={styles.siteLogo} alt="Mojo Spa Logo" src="./logo.svg" />
        <div>
          <FormItem
            type="select"
            value={props.activeUser}
            updateHandler={(value) => props.setActiveUser(parseInt(value))}
          >
            <option value="1">User 1</option>
            <option value="2">User 2</option>
          </FormItem>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
