import React from "react";
import styles from "./RunList.module.css";

import Button from "../Button/Button.js";

function RunList(props) {
  function openEditor(runUid, stageNum) {
    props.setCurrentRunUid(runUid);
    props.setActiveStage(stageNum);
  }

  return (
    <table className={styles.container}>
      <thead className={styles.header}>
        <tr>
          <th className={[styles.headerItem, styles.alignLeft].join(" ")}>
            Product
          </th>
          <th className={styles.headerItem}>Manufacturing</th>
          <th className={styles.headerItem}>Packaging</th>
          <th className={styles.headerItem}>Labeling</th>
          <th className={styles.headerItem}>Status</th>
          <th className={styles.headerItem}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.runData.map((run, index) => (
          <tr key={run.uid} className={styles.itemRow}>
            <td
              className={`${styles.itemTitle} ${styles.runItem} ${styles.alignLeft}`}
            >
              {run.productInfo.productName}
            </td>
            <td className={styles.runItem}>
              <Button onClick={() => openEditor(run.uid, 1)}>Edit ({run['stages'][0].length + run['stages'][1].length + run['stages'][2].length})</Button>
            </td>
            <td className={styles.runItem}>
              <Button onClick={() => openEditor(run.uid, 3)}>Edit ({run['stages'][3].length})</Button>
            </td>
            <td className={styles.runItem}>
              <Button onClick={() => openEditor(run.uid, 4)}>Edit ({run['stages'][4].length})</Button>
            </td>
            <td className={styles.runItem}>
              <Button>X</Button>
            </td>
            <td className={styles.runItem}>
              <Button onClick={() => props.deleteRun(run.uid)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RunList;
