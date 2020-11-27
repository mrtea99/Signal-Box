import React from "react";
import FormItem from "../FormItem/FormItem.js";

import Timer from "../Timer/Timer.js";

import styles from "./SessionDuring.module.css";
import Stopwatch from "./Stopwatch/Stopwatch.js";

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
            {props.activeSessionData.activity.name} Session
          </h4>
          <div className={styles.readOnly}>
            <ul className={styles.readOnlyList}>
              <li className={styles.rolKey}>
                Start Time: {props.activeSessionData.startTime}
              </li>
              <li className={styles.rolKey}>
                Activity: {props.activeSessionData.activity.name}
              </li>
            </ul>
            <Stopwatch>
              <Timer startTime={props.activeSessionData.startTime} />
            </Stopwatch>
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
                // onChange={(e) =>
                //   handleFieldChange(e.target.value, setNoteData, "notes")
                // }
                value={noteData}
                className={styles.notesField}
              />

              {props.thisStage === 1 ||
              props.thisStage === 2 ||
              props.thisStage === 3 ? (
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
