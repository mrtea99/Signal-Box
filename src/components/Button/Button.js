import React from 'react';
import styles from './Button.module.css';

function Button(props) {
  return(
    <button className={styles.button} onClick={props.clickHandler}>{props.text}</button>
  )
}

export default Button