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
      countGood
    );
    props.updateRunData(props.thisRunData.uid, null, updateBadField, countBad);
  };

  const buildTotals = function () {
    const allSessions = props.thisRunData.stages[props.thisStage]["sessions"];

    let totalsData = {};

    allSessions.forEach((session, index) => {
      const activityKey = session.type === "qa" ? "QA" : session.activity;

      const activityDataOld = totalsData[activityKey];

      if (activityDataOld) {
        activityDataOld.amount += session.amount ? session.amount : 0;
        activityDataOld.amountBad += session.amountBad ? session.amountBad : 0;
      } else {
        totalsData[activityKey] = {
          amount: session.amount,
          amountBad: session.amountBad,
        };
      }
    });

    console.log(totalsData);
    return totalsData;
  };

  const tots = buildTotals();

  return (
    <ModalControl triggerCopy="Consign" handleSubmit={handleSubmit}>
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
            {Object.keys(tots).map((key) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{tots[key].amount}</td>
                  <td>{tots[key].amountBad}</td>
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
            setCountGood(e.target.value);
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
            setCountBad(e.target.value);
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
