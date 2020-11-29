import React from "react";

import Button from "../../Button/Button.js";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer.js";
import CheckOpenerForm from "../../CheckOpener/CheckOpenerForm/CheckOpenerForm.js";
import FormItem from "../../FormItem/FormItem.js";
import WeightField from "../../FormItem/WeightField/WeightField.js";

import UnitSystemContext from "../../../contexts/DateFormatContext.js";

function SessionEndForm(props) {
  const unitSystem = React.useContext(UnitSystemContext);

  // After Statuses
  // Notes (all)
  const [noteData, setNoteData] = React.useState(
    props.activeSessionData["notes"] || ""
  );
  // Amount made (manu, pack, label)
  const [amount, setAmount] = React.useState(
    props.activeSessionData["amount"] || 0
  );
  // Amount Bad (manu, pack, label)
  const [amountBad, setAmountBad] = React.useState(
    props.activeSessionData["amountBad"] || 0
  );
  // Average unit/batch weight (manu, pack)
  const [averageWeight, setAverageWeight] = React.useState(
    props.activeSessionData["averageWeight"] || 0
  );

  const [skipQa, setSkipQa] = React.useState(
    props.thisStage === 0 || props.thisStage === 4 ? true : false
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
      {props.thisStage === 1 ||
      props.thisStage === 2 ||
      props.thisStage === 3 ? (
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
      ) : (
        <></>
      )}
      {props.thisStage === 1 || props.thisStage === 2 ? (
        <WeightField
          ident={"sess-average-weight-step-" + props.thisStage}
          label={`Average ${props.thisStage === 1 ? "Batch" : "Unit"} Weight 
            ${
              props.thisStage === 1
                ? "(Target " +
                  (unitSystem === "metric"
                    ? Math.round(
                        props.thisRunData.productInfo.batchWeight / 0.035274
                      ) + "g"
                    : props.thisRunData.productInfo.batchWeight + "ozm") +
                  ")"
                : ""
            }
            ${
              props.thisStage === 2
                ? "(Target " +
                  (unitSystem === "metric"
                    ? Math.round(
                        props.thisRunData.productInfo.averageUnitWeight /
                          0.035274
                      ) + "g"
                    : props.thisRunData.productInfo.averageUnitWeight + "ozm") +
                  ")"
                : ""
            }`}
          updateHandler={(value) =>
            handleFieldChange(value, setAverageWeight, "averageWeight")
          }
          value={averageWeight}
        />
      ) : (
        // <FormItem
        //   type="number"
        //   ident={"sess-average-weight-step-" + props.thisStage}
        // label={`Average ${props.thisStage === 1 ? "Batch" : "Unit"} Weight:
        //   ${
        //     props.thisStage === 1
        //       ? "(Target " + props.thisRunData.productInfo.batchWeight + ")"
        //       : ""
        //   }
        //   ${
        //     props.thisStage === 2
        //       ? "(Target " +
        //         props.thisRunData.productInfo.averageUnitWeight +
        //         ")"
        //       : ""
        //   }`}
        //   updateHandler={(value) =>
        //     handleFieldChange(value, setAverageWeight, "averageWeight")
        //   }
        //   value={averageWeight}
        //   min="0"
        // />
        <></>
      )}
      <div>
        <label htmlFor="sess-skip-qa">Skip Qa</label>
        <input
          id="sess-skip-qa"
          name="sess-skip-qa"
          type="checkbox"
          checked={skipQa}
          onChange={(e) => setSkipQa(e.target.checked)}
        />
      </div>

      {skipQa ? (
        <p>QA Skipped</p>
      ) : (
        <CheckOpenerForm formData={qaFormData} setFormData={setQaFormData} />
      )}
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
