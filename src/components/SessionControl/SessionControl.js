import React from 'react';

function SessionControl(props) {
  // Before states
    // Activity type (all)
    // Room temp (prep and cool)
    // Room humidity (prep and cool)
  // After Statuses
    // Notes (all)
    const [noteData, setNoteData] = React.useState('');
    // QA check (manu, pack, label)
    // Quantity made (manu?, pack, label)
    // Number Defective (manu?, pack, label)
    // Batch weight (manu)
    // Average unti weight (pack)

  function handleNewClick(e) {
    e.preventDefault();

    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      startTime: Date.now()
    }

    props.addSession(newSession, newSessionUid)
  }

  function handleEndClick(e) {
    e.preventDefault();

    const extraData = {
      notes: noteData
    }

    props.endSession(extraData);
  }

  const activityPicker = () => {
    return (
      <>
        <select>
          <option>1</option>
        </select>
      </>
    )
  }

  return (
    <>
      <h3>Session Control</h3>

      <h4>Session: { props.activeSession !== null ? props.activeSession : '' }</h4>
      {props.activeSession ?
        <form>
          <div>
            <label htmlFor={"sess-notes-step-" + props.thisStage}>Notes:</label>
            <textarea id={"sess-notes-step-" + props.thisStage} onChange={(e) => setNoteData(e.target.value)}></textarea>
          </div>
          <button onClick={handleEndClick}>End Session</button>
        </form>
      : 
        <form>
          <div>
            {activityPicker}
            <label htmlFor="sess-temp">Room Temperature:</label>
            <input id="sess-temp" type="text" />
          </div>
          <button onClick={handleNewClick}>Start New Session</button>
        </form>
      }
      {/* <button disabled={props.activeSession ? 'disabled' : '' } onClick={handleNewClick}>Start New Session</button>
      <button disabled={props.activeSession ? '' : 'disabled' } onClick={handleEndClick}>End Session</button> */}
      
    </>
  )
}

export default SessionControl;