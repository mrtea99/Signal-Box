import React from "react";
import PropTypes from "prop-types";

import TableHeader from "../../TableHeader/TableHeader";

import styles from "./ActivityTotals.module.css";

const ActivityTotals = function (props) {
  const buildTotals = function () {
    let totalsData = [{ name: "QA", amount: 0, amountBad: 0 }];

    props.sessions.forEach((session, index) => {
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

  const columns = [
    { copy: "Activity", className: styles.colActivity },
    { copy: props.itemName || "Item", className: styles.colItem },
    { copy: "Defective", className: styles.colDefective },
  ];

  return (
    <>
      <TableHeader items={columns} />
      <ul className={styles.activityList}>
        {activityTotals.map((activity, index) => {
          return (
            <li key={activity.name} className={styles.activityItem}>
              <div className={styles.colActivity}>{activity.name}</div>
              <div className={styles.colItem}>{activity.amount}</div>
              <div className={styles.colDefective}>{activity.amountBad}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

ActivityTotals.propTypes = {
  sessions: PropTypes.array.isRequired,
  itemName: PropTypes.string,
};

export default ActivityTotals;
