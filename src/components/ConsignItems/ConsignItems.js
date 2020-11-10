import React from "react";

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
  };

  const buildTotals = function () {
    const allSessions = props.thisRunData.stages[props.thisStage]["sessions"];

    let totalsData = {};

    allSessions.forEach((session, index) => {
      const activityKey = session.type === "qa" ? "QA" : session.activity;

      const activityDataOld = totalsData[activityKey];

      if (activityDataOld) {
        if (activityDataOld.amount) {
          activityDataOld.amount += session.amount ? session.amount : 0;
        } else {
          activityDataOld.amount = 0;
        }

        if (activityDataOld.amountBad) {
          activityDataOld.amountBad += session.amountBad
            ? session.amountBad
            : 0;
        } else {
          activityDataOld.amountBad = 0;
        }
      } else {
        totalsData[activityKey] = {
          amount: session.amount,
          amountBad: session.amountBad,
        };
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
    <ModalControl
      triggerCopy={triggerCopy()}
      handleSubmit={handleSubmit}
      buttonAttrs={{ fillWidth: true, color: "complete" }}
    >
      <div>
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Items</th>
              <th>Defective</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(activityTotals).map((key) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{activityTotals[key].amount}</td>
                  <td>{activityTotals[key].amountBad}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <label htmlFor="consign-items">Consignment amount</label>
        <input
          type="number"
          onChange={(e) => {
            setCountGood(parseInt(e.target.value));
          }}
          min="0"
          name="consign-items"
          id="consign-items"
        />
      </div>
      <div>
        <label htmlFor="consign-items">Defective amount</label>
        <input
          type="number"
          onChange={(e) => {
            setCountBad(parseInt(e.target.value));
          }}
          min="0"
          name="consign-items"
          id="consign-items"
        />
      </div>
    </ModalControl>
  );
}

export default ConsignItems;
