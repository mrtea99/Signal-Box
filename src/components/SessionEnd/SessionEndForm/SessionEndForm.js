import React from "react";

import Button from "../../Button/Button.js";
import CheckOpenerForm from "../../CheckOpener/CheckOpenerForm/CheckOpenerForm.js";

function SessionEndForm(props) {
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

  const [skipQa, setSkipQa] = React.useState(false);

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
      <div>
        <label htmlFor={"sess-notes-step-" + props.thisStage}>Notes:</label>
        <textarea
          id={"sess-notes-step-" + props.thisStage}
          onChange={(e) =>
            handleFieldChange(e.target.value, setNoteData, "notes")
          }
          value={noteData}
        />
      </div>
      {props.thisStage === 1 ||
      props.thisStage === 2 ||
      props.thisStage === 3 ? (
        <>
          <div>
            <label htmlFor={"sess-amount-step-" + props.thisStage}>
              Completed {props.thisStage === 1 ? "Batches" : "Units"}:
              {props.thisStage === 1
                ? "(Target " + props.thisRunData.productInfo.batchQuantity + ")"
                : ""}
            </label>
            <input
              id={"sess-amount-step-" + props.thisStage}
              type="number"
              min="0"
              onChange={(e) =>
                handleFieldChange(parseInt(e.target.value), setAmount, "amount")
              }
              value={amount}
            />
          </div>
          <div>
            <label htmlFor={"sess-amount-bad-step-" + props.thisStage}>
              Defective {props.thisStage === 1 ? "Batches" : "Units"}:
            </label>
            <input
              id={"sess-amount-bad-step-" + props.thisStage}
              type="number"
              min="0"
              onChange={(e) =>
                handleFieldChange(
                  parseInt(e.target.value),
                  setAmountBad,
                  "amountBad"
                )
              }
              value={amountBad}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      {props.thisStage === 1 || props.thisStage === 2 ? (
        <>
          <div>
            <label htmlFor={"sess-average-weight-step-" + props.thisStage}>
              Average {props.thisStage === 1 ? "Batch" : "Unit"} Weight:
              {props.thisStage === 1
                ? "(Target " + props.thisRunData.productInfo.batchWeight + ")"
                : ""}
              {props.thisStage === 2
                ? "(Target " +
                  props.thisRunData.productInfo.averageUnitWeight +
                  ")"
                : ""}
            </label>
            <input
              id={"sess-average-weight-step-" + props.thisStage}
              type="number"
              min="0"
              onChange={(e) =>
                handleFieldChange(
                  parseInt(e.target.value),
                  setAverageWeight,
                  "averageWeight"
                )
              }
              value={averageWeight}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      <div>
        <label htmlFor="sess-skip-qa">Skip Qa</label>
        <input
          id="sess-skip-qa"
          name="sess-skip-qa"
          type="checkbox"
          onChange={(e) => setSkipQa(e.target.checked)}
        />
      </div>

      {skipQa ? (
        <p>QA Skipped</p>
      ) : (
        <CheckOpenerForm formData={qaFormData} setFormData={setQaFormData} />
      )}

      <Button onClick={() => props.setFormActive(false)}>Cancel</Button>
      <Button onClick={handleEndClick}>End Session</Button>
    </form>
  );
}

export default SessionEndForm;
