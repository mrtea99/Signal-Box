import React from 'react';

import styles from './SiteSidebar.module.css';

import Button from '../Button/Button.js';


function SiteSidebar(props) {
  function closeSidebar() {
    props.setSidebarActive(false)
  }

  return(
    <div className={props.sidebarActive ? [styles.siteSidebar, styles.siteSidebarActive].join(' ') : styles.siteSidebar }>
      <img className={styles.siteLogo} alt="Mojo Spa Logo" src="./logo.svg" />
      <Button text="Close Sidebar" clickHandler={closeSidebar} />
    </div>
  )
}

export default SiteSidebar;