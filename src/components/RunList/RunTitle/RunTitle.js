import React from "react";

import Button from "../../Button/Button.js";
import StageOverview from "../../StageOverview/StageOverview.js";
import Modal from "../../Modal/Modal.js";

import styles from "./RunTitle.module.css";

function RunTitle(props) {
  const [modalOverviewActive, setModalOverviewActive] = React.useState(false);

  const exampleProducts = [
    "Bombshell Clarifying Facial Soap",
    "Ambrosia Anti-Aging Night Serum",
    "Lemon Lust Face & Body Scrub",
    "Zero F*cks Stress Relief Balm",
    "Illuminata Illuminating Herbal Makeup",
    "Light Twinkle Color Adjusting Mineral Makeup",
    "Amazing Shaving Soap For Women",
    "Go Green Healing Facial Serum",
    "Dr. Feel Good Natural Relief Cream",
    "Midas Touch Healing Hand Balm",
  ];

  return (
    <div className={`${styles.itemInfo}`}>
      <h3 className={styles.itemTitle}>
        {/* {props.children} -{" "} */}
        {exampleProducts[props.runData.uid.toString().charAt(12)]}
      </h3>
      <Button
        onClick={() => setModalOverviewActive(props.runData.uid)}
        icon="details"
      />
      {modalOverviewActive === props.runData.uid ? (
        <Modal title="Run Overview">
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
