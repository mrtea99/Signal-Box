import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import FormItem from "../FormItem/FormItem.js";
import InfoPod from "../InfoPod/InfoPod.js";
import InfoPodItem from "../InfoPod/InfoPodItem/InfoPodItem.js";
import InfoPodSection from "../InfoPod/InfoPodSection/InfoPodSection.js";
import ModalControl from "../Modal/ModalControl/ModalControl.js";
import ActivityTotals from "./ActivityTotals/ActivityTotals.js";

import styles from "./ConsignItems.module.css";

import getItemType from "../../utils/getItemType.js";

import stageNames from "../../data/stageNames.json";

function ConsignItems(props) {
  const activeUser = useSelector((state) => state.users.currentUser);

  const [countGood, setCountGood] = React.useState(0);
  const [countBad, setCountBad] = React.useState(0);

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
      props.thisRunData.id,
      null,
      updateGoodField,
      props.thisRunData[updateGoodField] + countGood
    );
    updateRun(
      props.thisRunData.id,
      null,
      updateBadField,
      props.thisRunData[updateBadField] + countBad
    );

    //Force activate stocking stage
    if (props.thisStage === 3) {
      props.updateStageActive(true, props.thisStage + 1);
    }

    //Add session
    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      runId: props.currentRunUid,
      stage: stageNames[props.thisStage],
      type: "consign",
      startTime: Date.now(),
      endTime: Date.now(),
      user: activeUser,
      amount: countGood,
      amountType: getItemType(props.thisStage),
      amountBad: countBad,
    };

    dispatch({
      type: "runs/addSession",
      payload: {
        runId: props.currentRunUid,
        stage: props.thisStage,
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
      itemName = "Batches";
      break;
    case 2:
    case 3:
      itemName = "Units";
      break;
    default:
      itemName = "Items";
      break;
  }

  const triggerCopy = "Consign " + itemName;

  const consInfoPod = (
    <InfoPod fullWidth>
      <InfoPodSection
        layout="vert"
        viewMode="full"
        bubbles={[
          <InfoPodItem
            active
            key={"remaining"}
            name="Remaining"
            value={
              props.stageStatus.targetItemCount - props.stageStatus.itemCount
            }
          />,
        ]}
      >
        <InfoPodItem
          name="Consigned"
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
        <h4>Activity Totals:</h4>
        <ActivityTotals
          sessions={props.thisRunData.stages[props.thisStage]["sessions"]}
          thisStage={props.thisStage}
          itemName={itemName}
        />
        <h4>Consignments Summary:</h4>
        {consInfoPod}
        <h4>New Consignment:</h4>
        <FormItem
          label="Consignment amount:"
          type="number"
          ident="consign-items"
          updateHandler={(value) => {
            setCountGood(parseInt(value));
          }}
          min="0"
          value={countGood}
        />

        <FormItem
          label="Defective amount:"
          type="number"
          ident="consign-items-bad"
          updateHandler={(value) => {
            setCountBad(parseInt(value));
          }}
          min="0"
          value={countBad}
        />
      </ModalControl>
    </div>
  );
}

ConsignItems.propTypes = {
  thisStage: PropTypes.number.isRequired,
  thisRunData: PropTypes.object.isRequired,
  updateStageActive: PropTypes.func.isRequired,
  stageStatus: PropTypes.object.isRequired,
  currentRunUid: PropTypes.number.isRequired,
};

export default ConsignItems;
