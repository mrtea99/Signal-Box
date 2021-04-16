import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import FormItem from "../../../FormItem/FormItem.js";
import Timer from "../../../Timer/Timer.js";
import Stopwatch from "./Stopwatch/Stopwatch.js";
import Button from "../../../Button/Button.js";
import ExpiryDate from "./ExpiryDate/ExpiryDate.js";

import styles from "./SessionDuring.module.css";
import ButtonSpacer from "../../../Button/ButtonSpacer/ButtonSpacer.js";
import DataList from "../../../DataList/DataList.js";
import DataListItem from "../../../DataList/DataListItem/DataListItem.js";

import getItemType from "../../../../utils/getItemType.js";

import stageNames from "../../../../data/stageNames.json";

import UnitSystemContext from "../../../../contexts/UnitSystemContext";

import { selectRun } from "../../../RunList/runsSlice.js";

import { useTranslation } from "react-i18next";

function SessionDuring(props) {
  const { t } = useTranslation();

  const unitSystem = useContext(UnitSystemContext);

  const thisRunData = useSelector((state) =>
    selectRun(state, props.currentRunId)
  );

  // After Statuses
  // Notes (all)
  const [noteData, setNoteData] = useState(
    props.activeSessionData ? props.activeSessionData["notes"] || "" : null
  );
  // Amount made (manu, pack, label)
  const [amount, setAmount] = useState(
    props.activeSessionData ? props.activeSessionData["amount"] || 0 : null
  );
  // Amount Bad (manu, pack, label)
  const [amountBad, setAmountBad] = useState(
    props.activeSessionData ? props.activeSessionData["amountBad"] || 0 : null
  );

  const itemType = getItemType(props.thisStage);

  const dispatch = useDispatch();

  const handleFieldChange = function (value, setState, dataKey) {
    setState(value);

    dispatch({
      type: "sessions/update",
      payload: {
        sessionId: props.activeSessionData.sessionId,
        extraData: { [dataKey]: value },
      },
    });
  };

  const showRecipe = function () {
    return props.activeSessionData.activity.fields.includes("recipe");
  };

  const activityFields = props.activeSessionData
    ? props.activeSessionData.activity.fields
    : null;

  const readOnlyFields = function () {
    switch (props.thisStage) {
      case 0:
      case 1:
        let weightNode;
        if (activityFields.includes("weight")) {
          const weightOz =
            thisRunData.productInfo.batchWeight * thisRunData.batchQuantity;

          const weightGrams = weightOz * 28.3495; // todo replace conversion with util

          weightNode = (
            <DataListItem
              dataKey={t("Target Total Weight")}
              dataValue={
                unitSystem === "metric" ? `${weightGrams} g` : `${weightOz} oz`
              }
            />
          );
        }

        let inventoryNode;
        if (activityFields.includes("inventory")) {
          inventoryNode = (
            <DataListItem dataKey={t("Shopify Inventory")} dataValue="TODO" />
          );
        }

        let difficultyNode;
        if (activityFields.includes("difficulty")) {
          difficultyNode = (
            <DataListItem
              dataKey={t("Difficulty")}
              dataValue={
                <ul>
                  <li>
                    {stageNames[0]}: {thisRunData.productInfo.prepDifficulty}
                  </li>
                  <li>
                    {stageNames[1]}:{" "}
                    {thisRunData.productInfo.manufacturingDifficulty}
                  </li>
                  <li>
                    {stageNames[2]}:{" "}
                    {thisRunData.productInfo.packagingDifficulty}
                  </li>
                  <li>
                    {stageNames[3]}:{" "}
                    {thisRunData.productInfo.labelingDifficulty}
                  </li>
                </ul>
              }
            />
          );
        }
        return (
          <>
            {weightNode}
            {inventoryNode}
            {difficultyNode}
          </>
        );
      case 2:
        return (
          <>
            <DataListItem
              dataKey={t("Target Unit Quantity")}
              dataValue={
                thisRunData.consignedManufacturing *
                thisRunData.productInfo.unitsPerBatch
              }
            />
            <DataListItem
              dataKey={t("Target Unit Weight")}
              dataValue={`${thisRunData.productInfo.unitWeight} ozm`}
            />
          </>
        );
      case 3:
        return (
          <>
            <DataListItem
              dataKey={t("Target Unit Quantity")}
              dataValue={thisRunData.consignedPackaging}
            />
            <DataListItem
              dataKey={t("Expiration Date")}
              dataValue={<ExpiryDate currentRunId={props.currentRunId} />}
            />
            <DataListItem dataKey={t("Run ID")} dataValue={thisRunData.id} />
          </>
        );
      case 4:
        return (
          <>
            <DataListItem
              dataKey={t("Total Units")}
              dataValue={thisRunData.consignedLabeling}
            />
            <DataListItem dataKey="Wicker Park Stock Amount" dataValue="TODO" />
            <DataListItem
              dataKey={t("Warehouse Storage Location")}
              dataValue={thisRunData.productInfo.storageLocation}
            />
            <DataListItem
              dataKey={t("Shopify Sales Channel Availability")}
              dataValue="TODO"
            />
            <DataListItem dataKey={t("Shopify inventory")} dataValue="TODO" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {props.activeSessionData ? (
        <article className={styles.session}>
          <h4 className={styles.sessionTitle}>
            {props.activeSessionData.activity.name} Session
          </h4>
          <div className={styles.readOnly}>
            <DataList className={styles.readOnlyList}>
              {readOnlyFields()}
            </DataList>
            <div>
              <ButtonSpacer direction="vert">
                <Stopwatch>
                  <Timer startTime={props.activeSessionData.startTime} />
                </Stopwatch>
                {showRecipe() ? (
                  <Button href={thisRunData.productInfo.recipeLink} fillWidth>
                    Recipe
                  </Button>
                ) : null}
              </ButtonSpacer>
            </div>
          </div>

          <div className={styles.userInput}>
            <form className={styles.userInputForm}>
              <FormItem
                type="textarea"
                ident={"sess-notes-step-" + props.thisStage}
                label={`${t("Notes")}:`}
                updateHandler={(value) =>
                  handleFieldChange(value, setNoteData, "notes")
                }
                value={noteData}
                className={styles.notesField}
              />
              {props.activeSessionData.activity.fields.includes("amounts") ? (
                <div className={styles.numberFieldsWrap}>
                  <FormItem
                    type="number"
                    ident={"sess-amount-step-" + props.thisStage}
                    label={`${"Completed"} ${itemType}:`}
                    updateHandler={(value) =>
                      handleFieldChange(value, setAmount, "amount")
                    }
                    value={amount}
                    min="0"
                    className={styles.numberField}
                  />

                  <FormItem
                    type="number"
                    ident={"sess-amount-bad-step-" + props.thisStage}
                    label={`${"Defective"} ${itemType}:`}
                    updateHandler={(value) =>
                      handleFieldChange(value, setAmountBad, "amountBad")
                    }
                    value={amountBad}
                    min="0"
                    className={styles.numberField}
                  />
                </div>
              ) : null}
            </form>
          </div>
        </article>
      ) : (
        <div className={styles.sessionPlaceholder}></div>
      )}
    </>
  );
}

SessionDuring.propTypes = {
  activeSessionData: PropTypes.object,
  thisStage: PropTypes.number,
  currentRunId: PropTypes.number,
};

export default SessionDuring;
