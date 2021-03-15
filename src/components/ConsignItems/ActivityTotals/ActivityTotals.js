import React from "react";
import PropTypes from "prop-types";

const ActivityTotals = function (props) {
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

  return (
    <table>
      <thead>
        <tr>
          <th>Activity</th>
          <th>{props.itemName || 'Item'}</th>
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
  );
};

ActivityTotals.propTypes = {
  thisStage: PropTypes.number.isRequired,
  thisRunData: PropTypes.object.isRequired,
  itemName: PropTypes.string,
};

export default ActivityTotals;
