import React from "react";
import InfoPod from "../InfoPod/InfoPod.js";
import InfoPodItem from "../InfoPod/InfoPodItem/InfoPodItem.js";
import InfoPodSection from "../InfoPod/InfoPodSection/InfoPodSection.js";

import ModalControl from "../Modal/ModalControl/ModalControl.js";

function ConsignItems(props) {
  const [countGood, setCountGood] = React.useState(0);
  const [countBad, setCountBad] = React.useState(0);

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
      props.thisRunData.uid,
      null,
      updateGoodField,
      (props.thisRunData[updateGoodField] += countGood)
    );
    props.updateRunData(
      props.thisRunData.uid,
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
          activityName = session.activity;
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

  const triggerCopy = function () {
    const prefix = "Consign ";

    switch (props.thisStage) {
      case 1:
        return prefix + "Batches";
      case 2:
      case 3:
        return prefix + "Units";
      default:
        return prefix + "Items";
    }
  };

  return (
    <>
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
        triggerCopy={triggerCopy()}
        handleSubmit={handleSubmit}
        buttonAttrs={{ fillWidth: true, color: "complete", icon: "next" }}
      >
        <div>
          <h3>{triggerCopy()}</h3>
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Items</th>
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
        </div>
        <p>
          Consigned: {props.stageStatus.completionFraction}
          <br />
          Remaining:{" "}
          {props.stageStatus.targetItemCount - props.stageStatus.itemCount}
        </p>
        <div>
          <label htmlFor="consign-items">Consignment amount:</label>
          <input
            type="number"
            onChange={(e) => {
              setCountGood(parseInt(e.target.value));
            }}
            min="0"
            name="consign-items"
            id="consign-items"
            defaultValue="0"
          />
        </div>
        <div>
          <label htmlFor="consign-items">Defective amount:</label>
          <input
            type="number"
            onChange={(e) => {
              setCountBad(parseInt(e.target.value));
            }}
            min="0"
            name="consign-items"
            id="consign-items"
            defaultValue="0"
          />
        </div>
      </ModalControl>
    </>
  );
}

export default ConsignItems;
