import React from 'react';

import styles from './SiteSidebar.module.css';

import Button from '../Button/Button.js';


function SiteSidebar(props) {
  function closeSidebar() {
    props.setSidebarActive(false)
  }

  return(
    <div className={props.sidebarActive ? [styles.siteSidebar, styles.siteSidebarActive].join(' ') : styles.siteSidebar }>
      <h1 className={styles.siteLogo}>Mojo Spa</h1>
      <Button text="Close Sidebar" clickHandler={closeSidebar} />
    </div>
  )
}

export default SiteSidebar;