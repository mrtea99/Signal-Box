import React from "react";
import FormItem from "../FormItem/FormItem.js";

import InfoPod from "../InfoPod/InfoPod.js";
import InfoPodItem from "../InfoPod/InfoPodItem/InfoPodItem.js";
import InfoPodSection from "../InfoPod/InfoPodSection/InfoPodSection.js";
import ModalControl from "../Modal/ModalControl/ModalControl.js";
import styles from "./ConsignItems.module.css";

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
      props.thisRunData.runId,
      null,
      updateGoodField,
      (props.thisRunData[updateGoodField] += countGood)
    );
    props.updateRunData(
      props.thisRunData.runId,
      null,
      updateBadField,
      (props.thisRunData[updateBadField] += countBad)
    );

    //Force activate stocking stage
    if (props.thisStage === 3) {
      props.updateStageActive(true, props.thisStage + 1);
    }

    //Add session
    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      type: "consign",
      startTime: Date.now(),
      endTime: Date.now(),
      resolved: true,
      user: props.activeUser,
      amount: countGood,
      amountBad: countBad,
    };

    props.addSession(newSession, newSessionUid, props.thisStage);

    resetState();
  };

  const handleCancel = function () {
    resetState();
  };

  const buildTotals = function () {
    const allSessions = props.thisRunData.stages[props.thisStage]["sessions"];

    let totalsData = [{ name: "QA", amount: 0, amountBad: 0 }];

    allSessions.forEach((session, index) => {
      let activityName;
      switch (session.type) {
        case "qa":
          activityName = "QA";
          break;
        case "work":
          activityName = session.activity.name;
          break;
        default:
          return false;
      }

      const activityDataOld = totalsData.find(
        (activity) => activity.name === activityName
      );

      if (activityDataOld) {
        activityDataOld.amount += session.amount || 0;
        activityDataOld.amountBad += session.amountBad || 0;
      } else {
        totalsData.push({
          name: activityName,
          amount: session.amount || 0,
          amountBad: session.amountBad || 0,
        });
      }
    });

    return totalsData;
  };

  const activityTotals = buildTotals();

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

  return (
    <div className={styles.wrapper}>
      <InfoPod fullWidth>
        <InfoPodSection
          layout="vert"
          flags={[
            <InfoPodItem active key={"remaining"}>
              Remaining:{" "}
              {props.stageStatus.targetItemCount - props.stageStatus.itemCount}
            </InfoPodItem>,
          ]}
        >
          <InfoPodItem>
            Consigned: {props.stageStatus.completionFraction}
          </InfoPodItem>
        </InfoPodSection>
      </InfoPod>

      <ModalControl
        title={triggerCopy}
        triggerCopy={triggerCopy}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        buttonAttrs={{ color: "complete", icon: "next" }}
      >
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>{itemName}</th>
              <th>Defective</th>
            </tr>
          </thead>
          <tbody>
            {activityTotals.map((activity, index) => {
              return (
                <tr key={activity.name}>
                  <td>{activity.name}</td>
                  <td>{activity.amount}</td>
                  <td>{activity.amountBad}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>
          Consigned: {props.stageStatus.completionFraction}
          <br />
          Remaining:{" "}
          {props.stageStatus.targetItemCount - props.stageStatus.itemCount}
        </p>

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

export default ConsignItems;
