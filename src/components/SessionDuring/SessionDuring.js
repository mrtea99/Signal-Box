import React from "react";

import Timer from "../Timer/Timer.js";

import styles from "./SessionDuring.module.css";

function SessionDuring(props) {
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

  const handleFieldChange = function (value, setState, dataKey) {
    setState(value);
    props.updateSession(
      { [dataKey]: value },
      props.thisStage,
      props.activeSessionData.sessionUid
    );
  };

  return (
    <>
      <div>
        <h4 className={styles.sessionTitle}>
          {props.activeSessionData.activity} Session{" "}
          {props.activeSessionData.sessionUid} in progress
        </h4>
        <dl>
          <dt>Start Time:</dt>
          <dd>{props.activeSessionData.startTime}</dd>
          <dt>Activity:</dt>
          <dd>{props.activeSessionData.activity}</dd>
        </dl>
        <p>
          <Timer startTime={props.activeSessionData.startTime} />
        </p>
      </div>
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
                  ? "(Target " +
                    props.thisRunData.productInfo.batchQuantity +
                    ")"
                  : ""}
              </label>
              <input
                id={"sess-amount-step-" + props.thisStage}
                type="number"
                min="0"
                onChange={(e) =>
                  handleFieldChange(
                    parseInt(e.target.value),
                    setAmount,
                    "amount"
                  )
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
      </form>
    </>
  );
}

export default SessionDuring;
