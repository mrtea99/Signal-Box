import React from "react";
import styles from "./RunList.module.css";

import Button from "../Button/Button.js";
// import StageStatus from "../StageStatus/StageStatus";
import StageOverview from "../StageOverview/StageOverview.js";
import Modal from "../Modal/Modal.js";
import StageNav from "../StageNav/StageNav";
// import RunDelete from "../RunDelete/RunDelete.js";

function RunList(props) {
  const [modalOverviewActive, setModalOverviewActive] = React.useState(false);

  const openEditor = function (runUid, stageNum) {
    props.setCurrentRunUid(runUid);
    props.setActiveStage(stageNum);
  };

  // const findManuStage = function (runCompletion) {
  //   if (runCompletion === null) {
  //     return 0;
  //   } else {
  //     if (runCompletion < 1) {
  //       return runCompletion + 1;
  //     } else {
  //       return 1;
  //     }
  //   }
  // };

  return (
    <table className={styles.container}>
      <thead className={styles.header}>
        <tr>
          {/* <th className={[styles.headerItem, styles.alignLeft].join(" ")}>
            Product
          </th> */}
          <th className={styles.headerItem}>Prep</th>
          <th className={styles.headerItem}>Craft</th>
          <th className={styles.headerItem}>Package</th>
          <th className={styles.headerItem}>Label</th>
          <th className={styles.headerItem}>Stock</th>
          {/* <th className={styles.headerItem}>Status</th> */}
          {/* <th className={styles.headerItem}>Delete</th> */}
        </tr>
      </thead>
      <tbody>
        {props.runData.map((run, index) => (
          <React.Fragment key={run.uid}>
            <tr key={run.uid + "_title"}>
              <td
                colSpan="5"
                className={`${styles.itemTitle} ${styles.runItem} ${styles.alignLeft}`}
                onClick={() => setModalOverviewActive(run.uid)}
              >
                {run.productInfo.productName}
              </td>
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
            </tr>

            <StageNav
              stageNameArr={["Prep", "Craft", "Package", "Label", "Stock"]}
              currentRunUid={props.currentRunUid}
              activeStage={props.activeStage}
              buttonCallback={(newIndex) => openEditor(run.uid, newIndex)}
              updateRunData={props.updateRunData}
              thisRunData={run}
              activeUser={props.activeUser}
              sessionLabels
              syntax="table"
            ></StageNav>

            {/* <tr key={run.uid} className={styles.itemRow}>
              <td className={styles.runItem}>
                <StageStatus
                  runData={run}
                  stageNum={0}
                  label={true}
                  button={true}
                  onClick={() => openEditor(run.uid, 0)}
                  activeUser={props.activeUser}
                />
              </td>
              <td className={styles.runItem}>
                <StageStatus
                  runData={run}
                  stageNum={1}
                  label={true}
                  button={true}
                  onClick={() => openEditor(run.uid, 1)}
                  activeUser={props.activeUser}
                />
              </td>
              <td className={styles.runItem}>
                <StageStatus
                  runData={run}
                  stageNum={2}
                  label={true}
                  button={true}
                  onClick={() => openEditor(run.uid, 2)}
                  activeUser={props.activeUser}
                />
              </td>
              <td className={styles.runItem}>
                <StageStatus
                  runData={run}
                  stageNum={3}
                  label={true}
                  button={true}
                  onClick={() => openEditor(run.uid, 3)}
                  activeUser={props.activeUser}
                />
              </td>
              <td className={styles.runItem}>
                <StageStatus
                  runData={run}
                  stageNum={4}
                  label={true}
                  button={true}
                  onClick={() => openEditor(run.uid, 4)}
                  activeUser={props.activeUser}
                />
              </td>
              <td className={styles.runItem}>
                <Button onClick={() => setModalOverviewActive(run.uid)}>
                  X
                </Button>
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
            </tr> */}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default RunList;
