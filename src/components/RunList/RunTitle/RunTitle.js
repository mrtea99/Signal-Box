import React from "react";
import PropTypes from "prop-types";

import Button from "../../Button/Button.js";
import StageOverview from "../../StageOverview/StageOverview.js";
import Modal from "../../Modal/Modal.js";

import styles from "./RunTitle.module.css";

function RunTitle(props) {
  const [modalOverviewActive, setModalOverviewActive] = React.useState(null);

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
        {/* todo: remove this temp data */}
        {/* {props.children} -{" "} */}
        {exampleProducts[props.currentRunUid.toString().charAt(12)]}
      </h3>
      <Button
        onClick={() => setModalOverviewActive(props.currentRunUid)}
        icon="details"
      />
      {modalOverviewActive === props.currentRunUid ? (
        <Modal title="Run Overview">
          <Button onClick={() => setModalOverviewActive(null)}>Close</Button>
          <StageOverview
            currentRunUid={props.currentRunUid}
          ></StageOverview>
        </Modal>
      ) : null}
    </div>
  );
}

RunTitle.propTypes = {
  currentRunUid: PropTypes.number.isRequired,
};

export default RunTitle;
