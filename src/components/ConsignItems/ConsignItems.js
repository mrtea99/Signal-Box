import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import FormItem from "../FormItem/FormItem.js";
import InfoPod from "../InfoPod/InfoPod.js";
import InfoPodItem from "../InfoPod/InfoPodItem/InfoPodItem.js";
import InfoPodSection from "../InfoPod/InfoPodSection/InfoPodSection.js";
import ModalControl from "../Modal/ModalControl/ModalControl.js";
import ActivityTotals from "./ActivityTotals/ActivityTotals.js";
import FormLayout from "../FormItem/FormLayout/FormLayout.js";

import styles from "./ConsignItems.module.css";

import { selectRun } from "../RunList/runsSlice.js";
import { selectStageSessions } from "../SessionList/sessionsSlice.js";
import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";

import getItemType from "../../utils/getItemType.js";

// import stageNames from "../../data/stageNames.json";

import { useTranslation } from "react-i18next";

/**
 * Dialog for consigning items from a stage.
 * Creates consign sessions.
 * Updates the correct fields in the run.
 */

function ConsignItems(props) {
  const { t } = useTranslation();

  const activeUser = useSelector(selectCurrentUser);
  const thisRunData = useSelector((state) =>
    selectRun(state, props.currentRunId)
  );

  const [countGood, setCountGood] = useState(0);
  const [countBad, setCountBad] = useState(0);

  const resetState = function () {
    setCountGood(0);
    setCountBad(0);
  };

  const dispatch = useDispatch();
  const updateRun = function (runId, dataSection, dataKey, newValue) {
    dispatch({
      type: "runs/update",
      payload: {
        runId,
        dataSection,
        dataKey,
        newValue,
      },
    });
  };

  const stageSessions = useSelector((state) =>
    selectStageSessions(state, props.currentRunId, props.thisStage)
  );

  const handleSubmit = function () {
    let updateGoodField = "";
    let updateBadField = "";
    switch (props.thisStage) {
      case 1:
        updateGoodField = "consignedManufacturing";
        updateBadField = "defectiveManufacturing";
        break;
      case 2:
        updateGoodField = "consignedPackaging";
        updateBadField = "defectivePackaging";
        break;
      case 3:
        updateGoodField = "consignedLabeling";
        updateBadField = "defectiveLabeling";
        break;
      default:
        updateGoodField = undefined;
        updateBadField = undefined;
        break;
    }

    updateRun(
      props.currentRunId,
      null,
      updateGoodField,
      thisRunData[updateGoodField] + countGood
    );
    updateRun(
      props.currentRunId,
      null,
      updateBadField,
      thisRunData[updateBadField] + countBad
    );

    //Force activate stocking stage
    if (props.thisStage === 3) {
      props.updateStageActive(true, props.thisStage + 1);
    }

    //Add session
    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      runId: props.currentRunId,
      // stage: stageNames[props.thisStage],
      stage: props.thisStage,
      type: "consign",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      user: activeUser,
      amount: countGood,
      amountType: getItemType(props.thisStage),
      amountBad: countBad,
    };

    dispatch({
      type: "sessions/add",
      payload: {
        sessionData: newSession,
      },
    });

    resetState();
  };

  const handleCancel = function () {
    resetState();
  };

  let itemName;
  switch (props.thisStage) {
    case 1:
      itemName = t("Batches");
      break;
    case 2:
    case 3:
      itemName = t("Units");
      break;
    default:
      itemName = t("Items");
      break;
  }

  const triggerCopy = `${t("Consign")} ${itemName}`;

  const consInfoPod = (
    <InfoPod fullWidth>
      <InfoPodSection
        layout="vert"
        viewMode="full"
        bubbles={[
          <InfoPodItem
            active
            key={"remaining"}
            name={t("Remaining")}
            value={
              props.stageStatus.targetItemCount - props.stageStatus.itemCount
            }
          />,
        ]}
      >
        <InfoPodItem
          name={t("Consigned")}
          value={props.stageStatus.completionFraction}
        />
      </InfoPodSection>
    </InfoPod>
  );

  return (
    <div className={styles.wrapper}>
      {consInfoPod}
      <ModalControl
        title={triggerCopy}
        triggerCopy={triggerCopy}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        buttonAttrs={{ color: "complete", icon: "next" }}
      >
        <h4>{t("Activity Totals")}:</h4>
        <ActivityTotals sessions={stageSessions} itemName={itemName} />
        <h4>{t("Consignments Summary")}:</h4>
        {consInfoPod}
        <h4>{t("New Consignment")}:</h4>
        <FormLayout>
          <FormItem
            label={`${t("Consignment amount")}:`}
            type="number"
            ident="consign-items"
            updateHandler={(value) => {
              setCountGood(parseInt(value));
            }}
            min="0"
            value={countGood}
          />

          <FormItem
            label={`${t("Defective amount")}:`}
            type="number"
            ident="consign-items-bad"
            updateHandler={(value) => {
              setCountBad(parseInt(value));
            }}
            min="0"
            value={countBad}
          />
        </FormLayout>
      </ModalControl>
    </div>
  );
}

ConsignItems.propTypes = {
  thisStage: PropTypes.number.isRequired,
  updateStageActive: PropTypes.func.isRequired,
  stageStatus: PropTypes.object.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default ConsignItems;
