import React from "react";
import PropTypes from "prop-types";
import FormItem from "../FormItem/FormItem.js";

import InfoPod from "../InfoPod/InfoPod.js";
import InfoPodItem from "../InfoPod/InfoPodItem/InfoPodItem.js";
import InfoPodSection from "../InfoPod/InfoPodSection/InfoPodSection.js";
import ModalControl from "../Modal/ModalControl/ModalControl.js";
import ActivityTotals from "./ActivityTotals/ActivityTotals.js";

import styles from "./ConsignItems.module.css";

import getItemType from "../../utils/getItemType.js";

function ConsignItems(props) {
  const [countGood, setCountGood] = React.useState(0);
  const [countBad, setCountBad] = React.useState(0);

  const resetState = function () {
    setCountGood(0);
    setCountBad(0);
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

    props.updateRunData(
      props.thisRunData.id,
      null,
      updateGoodField,
      (props.thisRunData[updateGoodField] += countGood)
    );
    props.updateRunData(
      props.thisRunData.id,
      null,
      updateBadField,
      (props.thisRunData[updateBadField] += countBad)
    );

    //Force activate stocking stage
    if (props.thisStage === 3) {
      props.updateStageActive(true, props.thisStage + 1);
    }

    //Add session
    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      type: "consign",
      startTime: Date.now(),
      endTime: Date.now(),
      user: props.activeUser,
      amount: countGood,
      amountType: getItemType(props.thisStage),
      amountBad: countBad,
    };

    props.addSession(newSession, props.thisStage);

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
        <ActivityTotals
          thisRunData={props.thisRunData}
          thisStage={props.thisStage}
          itemName={itemName}
        />
        {consInfoPod}

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
  updateRunData: PropTypes.func.isRequired,
  thisRunData: PropTypes.object.isRequired,
  updateStageActive: PropTypes.func.isRequired,
  activeUser: PropTypes.string.isRequired,
  addSession: PropTypes.func.isRequired,
  stageStatus: PropTypes.object.isRequired,
};

export default ConsignItems;
