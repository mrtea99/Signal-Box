import React from "react";
import PropTypes from "prop-types";

import TableHeader from "../../TableHeader/TableHeader";

import styles from "./ActivityTotals.module.css";

import activityList from "../../../data/activities.json";

import { useTranslation } from "react-i18next";

/**
 * Displays a summary of work sessions in a stage,
 * showing total counts for each activity type and also QA.
 * Designed to allow users to decide how many items should be consigned.
 */

const ActivityTotals = function (props) {
  const { t } = useTranslation();

  const buildTotals = function () {
    let totalsData = [{ name: t("QA"), amount: 0, amountBad: 0 }];

    props.sessions.forEach((session, index) => {
      let activityName;
      switch (session.type) {
        case "qa":
          activityName = t("QA");
          break;
        case "work":
          activityName = session.activity.name;
          break;
        default:
          return false;
      }

      // If this activity doesn't include an amounts field, then don't add it to the list
      if (session.stage && session.type === "work") {
        const activityHasAmounts = activityList[session.stage]
          .find((obj) => {
            return obj.name === activityName;
          })
          .fields.includes("amounts");

        if (!activityHasAmounts) {
          return false;
        }
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

    // Move QA from start of array to end
    totalsData.push(totalsData.splice(0, 1)[0]);

    return totalsData;
  };

  const activityTotals = buildTotals();

  const columns = [
    { copy: t("Activity"), className: styles.colActivity },
    { copy: props.itemName || t("Items"), className: styles.colItem },
    { copy: t("Defective"), className: styles.colDefective },
  ];

  return (
    <>
      <TableHeader items={columns} />
      <ul className={styles.activityList}>
        {activityTotals.map((activity, index) => {
          return (
            <li
              key={activity.name}
              className={`${styles.activityItem} ${
                activity.name === t("QA") ? styles.activityItemQa : ""
              }`}
            >
              <div className={`${styles.colActivity} ${styles.activityName}`}>
                {activity.name}
              </div>
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
