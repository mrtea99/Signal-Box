import React from "react";

import FormItem from "../../FormItem/FormItem.js";
import Timer from "../../Timer/Timer.js";
import Stopwatch from "./Stopwatch/Stopwatch.js";
import Button from "../../Button/Button.js";

import styles from "./SessionDuring.module.css";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer.js";

function SessionDuring(props) {
  // After Statuses
  // Notes (all)
  const [noteData, setNoteData] = React.useState(
    props.activeSessionData ? props.activeSessionData["notes"] || "" : null
  );
  // Amount made (manu, pack, label)
  const [amount, setAmount] = React.useState(
    props.activeSessionData ? props.activeSessionData["amount"] || 0 : null
  );
  // Amount Bad (manu, pack, label)
  const [amountBad, setAmountBad] = React.useState(
    props.activeSessionData ? props.activeSessionData["amountBad"] || 0 : null
  );

  const handleFieldChange = function (value, setState, dataKey) {
    setState(value);
    props.updateSession(
      { [dataKey]: value },
      props.thisStage,
      props.activeSessionData.sessionUid
    );
  };

  const expiryCalc = function (start, months) {
    // const st
    const startDate = new Date(start);
    const expiryDate = new Date(
      startDate.setMonth(startDate.getMonth() + months)
    );

    return expiryDate.getTime();
  };

  const showRecipe = function () {
    return (
      props.thisStage === 1 ||
      props.activeSessionData.activity.name === "Create Blend / Base"
    );
  };

  const readOnlyFields = function () {
    switch (props.thisStage) {
      case 0:
      case 1:
        if (showRecipe()) {
          return (
            <>
              <li className={styles.rolKey}>
                Target Total Weight:{" "}
                {props.thisRunData.productInfo.batchWeight *
                  props.thisRunData.batchQuantity}
                ozm
              </li>
              {/* <li className={styles.rolKey}>
                Link To Recipe:{" "}
                <Button href={props.thisRunData.productInfo.recipeLink}>
                  Recipe
                </Button>
              </li> */}
            </>
          );
        } else {
          return (
            <>
              <li className={styles.rolKey}>Shopify Inventory: TODO</li>
              <li className={styles.rolKey}>
                Difficulty:{" "}
                <ul>
                  <li>Prep: {props.thisRunData.productInfo.prepDifficulty}</li>
                  <li>
                    Craft:{" "}
                    {props.thisRunData.productInfo.manufacturingDifficulty}
                  </li>
                  <li>
                    Package: {props.thisRunData.productInfo.packagingDifficulty}
                  </li>
                  <li>
                    Label: {props.thisRunData.productInfo.labelingDifficulty}
                  </li>
                  {/* <li>
                    Stock: {props.thisRunData.productInfo.stockingDifficulty}
                  </li> */}
                </ul>
              </li>
            </>
          );
        }
      case 2:
        return (
          <>
            <li className={styles.rolKey}>
              Target Unit Quantity:{" "}
              {props.thisRunData.consignedManufacturing *
                props.thisRunData.productInfo.unitsPerBatch}
            </li>
            <li className={styles.rolKey}>
              Target Unit Weight: {props.thisRunData.productInfo.unitWeight} ozm
            </li>
          </>
        );
      case 3:
        return (
          <>
            <li className={styles.rolKey}>
              Target Unit Quantity: {props.thisRunData.consignedPackaging}
            </li>
            <li className={styles.rolKey}>
              Expiration Date:{" "}
              {expiryCalc(
                //needs to be month plus one
                props.thisRunData.stages[1].sessions[0].startTime,
                props.thisRunData.productInfo.expirationDuration
              )}
            </li>
            <li className={styles.rolKey}>
              Batch ID: {props.thisRunData.runId}
            </li>
          </>
        );
      case 4:
        return (
          <>
            <li className={styles.rolKey}>
              Total Units: {props.thisRunData.consignedLabeling}
            </li>
            {/* <li className={styles.rolKey}>Wicker Park Stock Amount:</li> */}
            <li className={styles.rolKey}>
              Warehouse Storage Location:{" "}
              {props.thisRunData.productInfo.storageLocation}
            </li>
            <li className={styles.rolKey}>
              Shopify sales channel availability: TODO
            </li>
            <li className={styles.rolKey}>Shopify inventory: TODO</li>
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
            <ul className={styles.readOnlyList}>
              {/* <li className={styles.rolKey}>
                Start Time: {props.activeSessionData.startTime}
              </li> */}
              {/* <li className={styles.rolKey}>
            Activity: {props.activeSessionData.activity.name}
          </li> */}
              {/* <li className={styles.rolKey}>
            Difficulty:
          </li> */}
              {props.activeSessionData.activity.notes ? (
                <li className={styles.rolKey}>
                  Notes: ${props.activeSessionData.activity.notes}
                </li>
              ) : null}
              {readOnlyFields()}
            </ul>
            <div>
              <ButtonSpacer direction="vert">
                <Stopwatch>
                  <Timer startTime={props.activeSessionData.startTime} />
                </Stopwatch>
                {showRecipe() ? (
                  <Button
                    href={props.thisRunData.productInfo.recipeLink}
                    fillWidth
                  >
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
                label="Notes:"
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
                    label={`
                      Completed ${
                        props.thisStage === 1 ? "Batches" : "Units"
                      }:`}
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
                    label={`
                      Defective ${
                        props.thisStage === 1 ? "Batches" : "Units"
                      }:`}
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

export default SessionDuring;
