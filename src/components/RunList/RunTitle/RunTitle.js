import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "../../Button/Button.js";
import StageOverview from "../../StageOverview/StageOverview.js";
import Modal from "../../Modal/Modal.js";

import styles from "./RunTitle.module.css";

/**
 * Displays the title of a run with a button to see the run overview.
 */

function RunTitle(props) {
  const [modalOverviewActive, setModalOverviewActive] = useState(null);

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
        {exampleProducts[props.currentRunId.toString().charAt(12)]}
      </h3>
      <Button
        onClick={() => setModalOverviewActive(props.currentRunId)}
        icon="details"
      />
      {modalOverviewActive === props.currentRunId ? (
        <Modal title="Run Overview" setActive={setModalOverviewActive}>
          <Button onClick={() => setModalOverviewActive(null)}>Close</Button>
          <StageOverview currentRunId={props.currentRunId}></StageOverview>
        </Modal>
      ) : null}
    </div>
  );
}

RunTitle.propTypes = {
  currentRunId: PropTypes.number.isRequired,
};

export default RunTitle;
