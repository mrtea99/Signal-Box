import React from 'react';
import styles from './RunList.module.css';

function RunList(props) {

  const runItems = props.runData.map((run, index) =>
    <tr key={run.uid}>
      <td>{run.runInfo.runId}</td>
      <td>{run.productInfo.productName}</td>
      <td>{run.activeStage}</td>
      <td>{run.productInfo.quantity}</td>
      <td><button onClick={(e) => props.setCurrentRunUid(run.uid)}>Edit</button></td>
      <td><button onClick={(e) => props.deleteRun(run.uid)}>Delete</button></td>
    </tr>
  )

  return (
    <>
      <h2>Run List:</h2>
      <table className={styles.container}>
        <thead className={styles.header}>
          <tr>
            <th>Run ID</th>
            <th>Product</th>
            <th>Stage</th>
            <th>Batches</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {runItems}
        </tbody>
      </table>
    </>
  )
}

export default RunList;