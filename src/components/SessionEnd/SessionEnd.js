import React from "react";

import Timer from "../Timer/Timer.js";
import Button from "../Button/Button.js";

import styles from "./SessionEnd.module.css";

function SessionEnd(props) {
  // After Statuses
  // Notes (all)
  const [noteData, setNoteData] = React.useState(
    props.activeSessionData["notes"] || ""
  );
  // Quantity made (manu, pack, label)
  const [countMade, setCountMade] = React.useState(
    props.activeSessionData["countMade"] || 0
  );
  // Number Defective (manu, pack, label)
  // Batch weight (manu)
  // Average unit weight (pack)
  // QA check (prep, manu, pack, label)

  function handleEndClick(e) {
    e.preventDefault();

    const extraData = {
      notes: noteData,
    };

    props.endSession(extraData);
  }

  function handleFieldChange(value, setState, dataKey) {
    setState(value);
    props.updateSession({ [dataKey]: value });
  }

  return (
    <>
      <div>
        <h4 className={styles.sessionTitle}>
          Session {props.activeSession} in progress
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
        props.thisStage === 3 ||
        props.thisStage === 4 ? (
          <div>
            <label htmlFor={"sess-count-made-step-" + props.thisStage}>
              Completed {props.thisStage === 1 ? "Batches" : "Units"}:
            </label>
            <input
              id={"sess-count-made-step-" + props.thisStage}
              type="number"
              min="0"
              onChange={(e) =>
                handleFieldChange(e.target.value, setCountMade, "countMade")
              }
              value={countMade}
            />
          </div>
        ) : (
          <></>
        )}
        <Button text="End Session" clickHandler={handleEndClick} />
      </form>
    </>
  );
}

export default SessionEnd;
