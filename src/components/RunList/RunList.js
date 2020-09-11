import React from 'react';
import styles from './RunList.module.css';

function RunList(props) {
  return (
    <table className={styles.container}>
      <thead className={styles.header}>
        <tr>
          <th className={styles.headerItem}>Run ID</th>
          <th className={styles.headerItem}>Product</th>
          <th className={styles.headerItem}>Stage</th>
          <th className={styles.headerItem}>Batches</th>
          <th className={styles.headerItem}></th>
          <th className={styles.headerItem}></th>
        </tr>
      </thead>
      <tbody>
        { props.runData.map((run, index) => 
          <tr key={run.uid} className={styles.itemRow}>
            <td>{run.runInfo.runId}</td>
            <td className={styles.itemTitle}>{run.productInfo.productName}</td>
            <td>{run.activeStage}</td>
            <td>{run.productInfo.quantity}</td>
            <td><button onClick={() => props.setCurrentRunUid(run.uid)}>Edit</button></td>
            <td><button onClick={() => props.deleteRun(run.uid)}>Delete</button></td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default RunList;