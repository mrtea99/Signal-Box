import React from "react";
import styles from "./RunList.module.css";

import Button from "../Button/Button.js";
import StageStatus from "../StageStatus/StageStatus";
import StageOverview from "../StageOverview/StageOverview.js";
import Modal from "../Modal/Modal.js";
import RunDelete from "../RunDelete/RunDelete.js";

function RunList(props) {
  const [modalOverviewActive, setModalOverviewActive] = React.useState(false);

  const openEditor = function(runUid, stageNum) {
    props.setCurrentRunUid(runUid);
    props.setActiveStage(stageNum);
  }

  const findManuStage = function(runCompletion) {
    if (runCompletion === null) {
      return 0;
    } else {
      if (runCompletion < 2) {
        return runCompletion + 1;
      } else {
        return 2;
      }
    }
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
          <th className={styles.headerItem}>Stocking</th>
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
              <Button
                onClick={() =>
                  openEditor(run.uid, findManuStage(run.completion))
                }
              >
                <StageStatus runData={run} stageNum={[0, 1, 2]} label={true} />
              </Button>
            </td>
            <td className={styles.runItem}>
              <Button onClick={() => openEditor(run.uid, 3)}>
                <StageStatus runData={run} stageNum={3} label={true} />
              </Button>
            </td>
            <td className={styles.runItem}>
              <Button onClick={() => openEditor(run.uid, 4)}>
                <StageStatus runData={run} stageNum={4} label={true} />
              </Button>
            </td>
            <td className={styles.runItem}>
              <Button onClick={() => openEditor(run.uid, 5)}>
                <StageStatus runData={run} stageNum={5} label={true} />
              </Button>
            </td>
            <td className={styles.runItem}>
              <Button onClick={() => setModalOverviewActive(run.uid)}>X</Button>
              {modalOverviewActive === run.uid ? (
                <Modal>
                  <Button onClick={() => setModalOverviewActive(null)}>
                    Close
                  </Button>
                  <StageOverview thisRunData={run}></StageOverview>
                </Modal>
              ) : (
                <></>
              )}
            </td>
            <td className={styles.runItem}>
              <RunDelete updateRunData={props.updateRunData} uid={run.uid} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RunList;
