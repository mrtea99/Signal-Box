import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Button from "../../Button/Button.js";
import StageOverview from "../../StageOverview/StageOverview.js";
import Modal from "../../Modal/Modal.js";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer.js";
import SetRunInfo from "../../SetRunInfo/SetRunInfo.js";

import styles from "./RunTitle.module.css";

import ViewModeContext from "../../../contexts/ViewModeContext";

import { selectRun } from "../runsSlice.js";

import { useTranslation } from "react-i18next";

/**
 * Displays the title of a run with a button to see the run overview.
 */

function RunTitle(props) {
  const { t } = useTranslation();

  const viewMode = useContext(ViewModeContext);
  const simpleMode = viewMode === "simple";
  const miniMode = props.mini;

  const [modalOverviewActive, setModalOverviewActive] = useState(false);

  //Temp example product names
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

  const thisRunData = useSelector((state) =>
    selectRun(state, props.currentRunId)
  );

  return (
    <section
      className={`${styles.runInfo} ${miniMode ? styles.runInfoMini : ""}`}
    >
      <div className={`${styles.runInfoSec} ${styles.runInfoProd}`}>
        {miniMode ? null : (
          <h2 className={styles.runInfoTitle}>{t("Production Run of")}:</h2>
        )}
        <h3 className={styles.runInfoName}>
          {/* {thisRunData.productInfo.productName} */}
          {/* todo: remove temp names */}
          {exampleProducts[props.currentRunId.toString().charAt(12)]}
        </h3>
        {simpleMode || miniMode ? null : (
          <h4 className={styles.runInfoItem}>
            {t("Run ID")}: {thisRunData.id}
          </h4>
        )}
      </div>
      {simpleMode ? null : (
        <div className={`${styles.runInfoSec} ${styles.runInfoRun}`}>
          {miniMode ? null : (
            <div className={styles.infoBox}>
              <h4 className={styles.runInfoItem}>
                {t("Status")}: {thisRunData.status}
              </h4>
              <h4 className={styles.runInfoItem}>
                {t("Batches")}: {thisRunData.batchQuantity}
              </h4>
            </div>
          )}
          <ButtonSpacer>
            {miniMode ? null : (
              <SetRunInfo
                currentRunId={props.currentRunId}
                thisRunData={thisRunData}
              />
            )}
            <Button
              onClick={() => setModalOverviewActive(true)}
              icon="details"
            />
          </ButtonSpacer>
          {modalOverviewActive ? (
            <Modal title="Run Overview" setActive={setModalOverviewActive}>
              <Button onClick={() => setModalOverviewActive(false)}>
                {t("Close")}
              </Button>
              <StageOverview currentRunId={props.currentRunId}></StageOverview>
            </Modal>
          ) : null}
        </div>
      )}
    </section>
  );
}

RunTitle.propTypes = {
  currentRunId: PropTypes.number.isRequired,
  mini: PropTypes.bool,
};

export default RunTitle;
