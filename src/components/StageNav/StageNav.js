import React from 'react';

import styles from './StageNav.module.css';

function StageNav(props) {
  function stageChange(newStageIndex) {
    props.setActiveStage(newStageIndex)
    props.updateRunData(props.currentRunUid, null, 'activeStage', newStageIndex)
  }

  function handleNavList(stageIndex, e) {
    e.preventDefault()
    stageChange(stageIndex)
  }

  return(
    <ul className={styles.progBar}>
      {props.stageNameArr.map((stage, index) => 
        <li key={props.currentRunUid + stage} className={styles.progItem}>
          <button className={props.activeStage !== index ? styles.progBtn : [styles.progBtn, styles.progBtnActive].join(' ')}  onClick={(e) => handleNavList(index, e)}>{stage}</button>
        </li>
      )}
    </ul>
  )
}

export default StageNav;