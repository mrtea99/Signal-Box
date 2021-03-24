import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../../../Button/Button.js";
import ButtonSpacer from "../../../../Button/ButtonSpacer/ButtonSpacer.js";
import CheckOpenerForm from "../../../../CheckOpener/CheckOpenerForm/CheckOpenerForm.js";
import FormItem from "../../../../FormItem/FormItem.js";
import WeightField from "../../../../FormItem/WeightField/WeightField.js";

import UnitSystemContext from "../../../../../contexts/DateFormatContext.js";

import getItemType from "../../../../../utils/getItemType.js";

import stageNames from "../../../../../data/stageNames.json";

function SessionEndForm(props) {
  const unitSystem = React.useContext(UnitSystemContext);

  const activeUser = useSelector((state) => state.users.currentUser);

  const itemType = getItemType(props.thisStage);

  const showAmounts = props.activeSessionData.activity.fields.includes(
    "amounts"
  );
  const showWeight = props.activeSessionData.activity.fields.includes("weight");
  const showQa = props.activeSessionData.activity.fields.includes("qa");

  const dispatch = useDispatch();

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
    extra: "now",
  });

  const handleEndClick = function (e) {
    e.preventDefault();

    //Start QA Session
    if (!skipQa) {
      const newsessionId = Date.now();

      const newSession = {
        sessionId: newsessionId,
        runId: props.currentRunUid,
        stage: stageNames[props.thisStage],
        type: "qa",
        startTime: Date.now(),
        endTime: null,
        user: activeUser,
        ...qaFormData,
      };

      dispatch({
        type: "runs/addSession",
        payload: {
          runId: props.currentRunUid,
          stage: props.thisStage,
          sessionData: newSession,
        },
      });
    }

    //End Session
    const extraData = {
      notes: noteData,
      amount: amount,
      amountType: itemType,
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
        targetWeight = props.thisRunData.productInfo.unitWeight;
        break;
      default:
        return "Weight";
    }

    //todo abstract metric conversion
    return `Average ${itemName} Weight (Target: ${
      unitSystem === "metric"
        ? Math.round(targetWeight / 0.035274) + " g"
        : targetWeight + " ozm"
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
            label={"Completed " + itemType}
            updateHandler={(value) =>
              handleFieldChange(value, setAmount, "amount")
            }
            value={amount}
            min="0"
          />
          <FormItem
            type="number"
            ident={"sess-amount-bad-step-" + props.thisStage}
            label={"Defective " + itemType}
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
              thisStage={props.thisStage}
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

SessionEndForm.propTypes = {
  activeSessionData: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
  addSession: PropTypes.func.isRequired,
  endSession: PropTypes.func.isRequired,
  setFormActive: PropTypes.func.isRequired,
  thisRunData: PropTypes.object.isRequired,
  currentRunUid: PropTypes.number.isRequired,
};

export default SessionEndForm;
