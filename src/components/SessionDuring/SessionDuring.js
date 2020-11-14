import React from "react";

import Timer from "../Timer/Timer.js";

import styles from "./SessionDuring.module.css";

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

  return (
    <>
      {props.activeSessionData ? (
        <article className={styles.session}>
          <h4 className={styles.sessionTitle}>
            {props.activeSessionData.activity} Session
          </h4>
          <div className={styles.readOnly}>
            <ul className={styles.readOnlyList}>
              <li className={styles.rolKey}>
                Start Time: {props.activeSessionData.startTime}
              </li>
              <li className={styles.rolKey}>
                Activity: {props.activeSessionData.activity}
              </li>
            </ul>
            <p>
              <Timer startTime={props.activeSessionData.startTime} />
            </p>
          </div>
          <div className={styles.userInput}>
            <form className={styles.userInputForm}>
              <div>
                <label htmlFor={"sess-notes-step-" + props.thisStage}>
                  Notes:
                </label>
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
          </div>
        </article>
      ) : (
        <div className={styles.sessionPlaceholder}></div>
      )}
    </>
  );
}

export default SessionDuring;
