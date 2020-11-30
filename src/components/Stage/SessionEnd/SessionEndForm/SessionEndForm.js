import React from "react";

import Button from "../../../Button/Button.js";
import ButtonSpacer from "../../../Button/ButtonSpacer/ButtonSpacer.js";
import CheckOpenerForm from "../../../CheckOpener/CheckOpenerForm/CheckOpenerForm.js";
import FormItem from "../../../FormItem/FormItem.js";
import WeightField from "../../../FormItem/WeightField/WeightField.js";

import UnitSystemContext from "../../../../contexts/DateFormatContext.js";

function SessionEndForm(props) {
  const unitSystem = React.useContext(UnitSystemContext);

  const showAmounts = props.activeSessionData.activity.fields.includes(
    "amounts"
  );
  const showWeight = props.activeSessionData.activity.fields.includes("weight");
  const showQa = props.activeSessionData.activity.fields.includes("qa");

  // After Statuses
  // Notes (all)
  const [noteData, setNoteData] = React.useState(
    props.activeSessionData["notes"] || ""
  );
  // Amount made (manu, pack, label)
  const [amount, setAmount] = React.useState(
    props.activeSessionData["amount"] || (showAmounts ? 0 : null)
  );
  // Amount Bad (manu, pack, label)
  const [amountBad, setAmountBad] = React.useState(
    props.activeSessionData["amountBad"] || (showAmounts ? 0 : null)
  );
  // Average unit/batch weight (manu, pack)
  const [averageWeight, setAverageWeight] = React.useState(
    props.activeSessionData["averageWeight"] || (showWeight ? 0 : null)
  );

  const [skipQa, setSkipQa] = React.useState(
    props.thisStage === 0 || props.thisStage === 4 || !showQa ? true : false
  );

  const [qaFormData, setQaFormData] = React.useState({
    notes: "",
    checker: 1,
    timeframe: "now",
  });

  const handleEndClick = function (e) {
    e.preventDefault();

    //Start QA Session
    if (!skipQa) {
      const newSessionUid = Date.now();

      const newSession = {
        sessionUid: newSessionUid,
        type: "qa",
        startTime: Date.now(),
        user: props.activeUser,
        resolved: false,
        ...qaFormData,
      };

      props.addSession(newSession, newSessionUid, props.thisStage);
    }

    //End Session
    const extraData = {
      resolved: true,
      notes: noteData,
      amount: amount,
      amountBad: amountBad,
      averageWeight: averageWeight,
    };

    props.endSession(extraData, props.thisStage, props.activeSessionData);

    props.setFormActive(false);
  };

  const handleFieldChange = function (value, setState, dataKey) {
    setState(value);
  };

  const weightLabel = function (stageNum, system) {
    let itemName = "";
    let targetWeight;

    switch (stageNum) {
      case 1:
        itemName = "Batch";
        targetWeight = props.thisRunData.productInfo.batchWeight;
        break;
      case 2:
        itemName = "Unit";
        targetWeight = props.thisRunData.productInfo.averageUnitWeight;
        break;
      default:
        return "Weight";
    }

    return `Average ${itemName} Weight (Target: ${
      unitSystem === "metric"
        ? Math.round(targetWeight / 0.035274) + "g"
        : targetWeight + "ozm"
    })`;
  };

  return (
    <form>
      <FormItem
        type="textarea"
        ident={"sess-notes-step-" + props.thisStage}
        label="Note"
        updateHandler={(value) =>
          handleFieldChange(value, setNoteData, "notes")
        }
        value={noteData}
      />

      {showAmounts ? (
        <>
          <FormItem
            type="number"
            ident={"sess-amount-step-" + props.thisStage}
            label={"Completed " + (props.thisStage === 1 ? "Batches" : "Units")}
            updateHandler={(value) =>
              handleFieldChange(value, setAmount, "amount")
            }
            value={amount}
            min="0"
          />
          <FormItem
            type="number"
            ident={"sess-amount-bad-step-" + props.thisStage}
            label={"Defective " + (props.thisStage === 1 ? "Batches" : "Units")}
            updateHandler={(value) =>
              handleFieldChange(value, setAmountBad, "amountBad")
            }
            value={amountBad}
            min="0"
          />
        </>
      ) : null}

      {showWeight ? (
        <WeightField
          ident={"sess-average-weight-step-" + props.thisStage}
          label={weightLabel(props.thisStage, unitSystem)}
          updateHandler={(value) =>
            handleFieldChange(value, setAverageWeight, "averageWeight")
          }
          value={averageWeight}
        />
      ) : null}

      {showQa ? (
        <>
          <FormItem
            label="Skip Qa"
            type="checkbox"
            ident="sess-skip-qa"
            updateHandler={(value) => setSkipQa(value)}
            checked={skipQa}
          />

          {skipQa ? (
            <p>QA Skipped</p>
          ) : (
            <CheckOpenerForm
              formData={qaFormData}
              setFormData={setQaFormData}
            />
          )}
        </>
      ) : null}

      <ButtonSpacer align="right">
        <Button onClick={() => props.setFormActive(false)} color="cancel">
          Cancel
        </Button>
        <Button onClick={handleEndClick} icon="stop">
          End Session
        </Button>
      </ButtonSpacer>
    </form>
  );
}

export default SessionEndForm;
