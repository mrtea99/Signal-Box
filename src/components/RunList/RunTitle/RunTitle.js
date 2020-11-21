import React from "react";

import Button from "../../Button/Button.js";
import StageOverview from "../../StageOverview/StageOverview.js";
import Modal from "../../Modal/Modal.js";

import styles from "./RunTitle.module.css";

function RunTitle(props) {
  const [modalOverviewActive, setModalOverviewActive] = React.useState(false);

  return (
    <div className={`${styles.itemInfo}`}>
      <h3 className={styles.itemTitle}>{props.children}</h3>
      <Button onClick={() => setModalOverviewActive(props.runData.uid)} icon="details" />
      {modalOverviewActive === props.runData.uid ? (
        <Modal>
          <Button onClick={() => setModalOverviewActive(null)}>Close</Button>
          <StageOverview thisRunData={props.runData}></StageOverview>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}

export default RunTitle;
