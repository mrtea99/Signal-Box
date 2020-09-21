import React from 'react';
import styles from './RunList.module.css';

import Button from '../Button/Button.js'

function RunList(props) {
  return (
    <table className={styles.container}>
      <thead className={styles.header}>
        <tr>
          <th className={[styles.headerItem, styles.alignLeft].join(' ')}>Product</th>
          <th className={styles.headerItem}>Run ID</th>
          <th className={styles.headerItem}>Stage</th>
          <th className={styles.headerItem}>Batches</th>
          <th className={styles.headerItem}></th>
          <th className={styles.headerItem}></th>
        </tr>
      </thead>
      <tbody>
        { props.runData.map((run, index) => 
          <tr key={run.uid} className={styles.itemRow}>
            <td className={[styles.itemTitle, styles.runItem, styles.alignLeft].join(' ')}>{run.productInfo.productName}</td>
            <td className={styles.runItem}>{run.runInfo.runId}</td>
            <td className={styles.runItem}>{run.activeStage}</td>
            <td className={styles.runItem}>{run.productInfo.quantity}</td>
            <td className={styles.runItem}>
              <Button text="Edit" clickHandler={() => props.setCurrentRunUid(run.uid)} />
            </td>
            <td className={styles.runItem}>
              <Button text="Delete" clickHandler={() => props.deleteRun(run.uid)} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default RunList;