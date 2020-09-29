import React from 'react';

import Timer from '../Timer/Timer.js';

function SessionEnd(props) {
  // After Statuses
    // Notes (all)
    const [noteData, setNoteData] = React.useState(props.activeSessionData === undefined ? '' : props.activeSessionData['notes']);
    // QA check (manu, pack, label)
    // Quantity made (manu, pack, label)
    // Number Defective (manu, pack, label)
    // Batch weight (manu)
    // Average unti weight (pack)
  
  function handleEndClick(e) {
    e.preventDefault();

    const extraData = {
      notes: noteData,
    }

    props.endSession(extraData);

    setNoteData('');
    // setActivityData(activityList[props.thisStage][0]);
  }

  function handleNoteChange(e) {
    setNoteData(e.target.value);
    props.updateSession({notes: e.target.value})
  }

  return(
    <>
      <div>
        <h4>Session {props.activeSession} in progress</h4>
        {props.activeSessionData ? 
        <>
          <dl>
            <dt>Start Time:</dt>
            <dd>{props.activeSessionData.startTime}</dd>
            <dt>Activity:</dt>
            <dd>{props.activeSessionData.activity}</dd>
          </dl>
          <p><Timer startTime={props.activeSessionData.startTime} /></p>
        </>
        :
        <></>
        }
      </div>
      <form>
        <div>
          <label htmlFor={"sess-notes-step-" + props.thisStage}>Notes:</label>
          <textarea id={"sess-notes-step-" + props.thisStage} onChange={(e) => handleNoteChange(e)} value={noteData}></textarea>
        </div>
        <button onClick={handleEndClick}>End Session</button>
      </form>
    </>
  )
}

export default SessionEnd;